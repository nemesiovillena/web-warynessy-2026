'use client'
import React, { useEffect, useState } from 'react'
import { useField, useConfig, FieldLabel } from '@payloadcms/ui'

export const ChecklistRelationship: React.FC<any> = (props) => {
    // En Payload 3.0, las propiedades del campo suelen estar dentro de 'field'
    const { path, label } = props
    const fieldRelationTo = props.relationTo || props.field?.relationTo || 'alergenos'
    const relationTo = Array.isArray(fieldRelationTo) ? fieldRelationTo[0] : fieldRelationTo

    const { value, setValue } = useField<string[] | { id: string }[]>({ path })
    const [options, setOptions] = useState<{ id: string; nombre: string }[]>([])
    const { config } = useConfig()

    console.log('[Checklist] Props recibidas:', { path, label, relationTo, value })

    // En Payload 3.0 (Next.js), el serverURL puede venir de la config o ser relativo
    const serverURL = config.serverURL || ''

    useEffect(() => {
        const fetchOptions = async () => {
            if (!relationTo || typeof relationTo !== 'string') {
                console.error('[Checklist] relationTo is missing or not a string:', relationTo)
                return
            }

            try {
                // En el navegador, preferimos usar el origin actual para evitar problemas de puerto/host
                const origin = typeof window !== 'undefined' ? window.location.origin : (serverURL || '')
                const endpoint = `${origin}/api/${relationTo}?limit=100&depth=0`

                console.log(`[Checklist] Intentando cargar desde: ${endpoint}`)

                const response = await fetch(endpoint, {
                    headers: {
                        'Accept': 'application/json',
                    }
                })

                if (response.ok) {
                    const data = await response.json()
                    const sortedDocs = (data.docs || []).sort((a: any, b: any) =>
                        a.nombre?.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
                    )
                    console.log(`[Checklist] Éxito: ${sortedDocs.length} elementos encontrados para "${relationTo}"`)
                    setOptions(sortedDocs)
                } else {
                    console.error(`[Checklist] Error API (${response.status}):`, await response.text())
                    // Intento desesperado: ruta relativa pura
                    const relResp = await fetch(`/api/${relationTo}?limit=100`)
                    if (relResp.ok) {
                        const relData = await relResp.json()
                        const sortedRelDocs = (relData.docs || []).sort((a: any, b: any) =>
                            a.nombre?.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
                        )
                        setOptions(sortedRelDocs)
                    }
                }
            } catch (error) {
                console.error('[Checklist] Error de red:', error)
            }
        }
        fetchOptions()
    }, [relationTo, serverURL])

    const handleChange = (id: string) => {
        const currentItems = value || []
        const currentIds = currentItems.map((val: any) => (typeof val === 'object' ? val.id : val))

        let newIds: string[]
        if (currentIds.includes(id)) {
            newIds = currentIds.filter((cid: string) => cid !== id)
        } else {
            newIds = [...currentIds, id]
        }

        setValue(newIds)
    }

    const selectedIds = (value || []).map((val: any) => (typeof val === 'object' ? val.id : val))

    return (
        <div className="field-type relationship" style={{ marginBottom: '20px', border: '1px solid var(--theme-border-color)', padding: '15px', borderRadius: '4px' }}>
            <FieldLabel label={label as any} />
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                    gap: '12px',
                    marginTop: '10px'
                }}
            >
                {options.length === 0 && <p style={{ fontSize: '13px', opacity: 0.6 }}>Cargando opciones...</p>}
                {options.map((opt) => (
                    <label
                        key={opt.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            padding: '4px 8px',
                            background: selectedIds.includes(opt.id) ? 'var(--theme-bg-active)' : 'transparent',
                            borderRadius: '4px'
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(opt.id)}
                            onChange={() => handleChange(opt.id)}
                            style={{ cursor: 'pointer' }}
                        />
                        {opt.nombre}
                    </label>
                ))}
            </div>
            {props.admin?.description && (
                <div style={{ marginTop: '10px', fontSize: '12px', opacity: 0.5, fontStyle: 'italic' }}>
                    {typeof props.admin.description === 'string'
                        ? props.admin.description
                        : typeof props.admin.description === 'object' && props.admin.description !== null
                            ? (props.admin.description as any)?.es || (props.admin.description as any)?.en || ''
                            : ''}
                </div>
            )}
        </div>
    )
}
