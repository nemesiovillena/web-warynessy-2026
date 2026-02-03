'use client'
import React, { useEffect, useState } from 'react'
import { useField, useConfig, FieldLabel } from '@payloadcms/ui'

export const ChecklistRelationship: React.FC<any> = (props) => {
    // En Payload 3.0, las propiedades pueden venir en la raíz o dentro de 'field'
    const { path, label } = props
    const fieldObj = props.field || {}
    const fieldRelationTo = props.relationTo || fieldObj.relationTo || 'alergenos'
    const relationTo = Array.isArray(fieldRelationTo) ? fieldRelationTo[0] : fieldRelationTo

    const { value, setValue } = useField<string[] | { id: string }[]>({ path })
    const [options, setOptions] = useState<{ id: string; nombre: string }[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { config } = useConfig()

    useEffect(() => {
        const fetchOptions = async () => {
            if (!relationTo || typeof relationTo !== 'string') {
                console.error('[Checklist] relationTo no válido:', relationTo)
                setIsLoading(false)
                return
            }

            try {
                // Prioridad: API URL relativa para evitar problemas de CORS o dominios
                const endpoints = [
                    `/api/${relationTo}?limit=100&depth=0`,
                    `${config.serverURL || ''}/api/${relationTo}?limit=100&depth=0`
                ]

                let success = false
                for (const url of endpoints) {
                    if (success) break;
                    try {
                        console.log(`[Checklist] Intentando cargar desde: ${url}`)
                        const response = await fetch(url, {
                            headers: { 'Accept': 'application/json' }
                        })

                        if (response.ok) {
                            const data = await response.json()
                            const sortedDocs = (data.docs || []).sort((a: any, b: any) =>
                                a.nombre?.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
                            )
                            setOptions(sortedDocs)
                            success = true
                        }
                    } catch (e) {
                        console.warn(`[Checklist] Fallo en ${url}:`, e)
                    }
                }
            } catch (error) {
                console.error('[Checklist] Error general:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchOptions()
    }, [relationTo, config.serverURL])

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
        <div className="field-type relationship" style={{
            marginBottom: '25px',
            border: '1px solid var(--theme-elevation-150)',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: 'var(--theme-elevation-50)'
        }}>
            <div style={{ marginBottom: '15px' }}>
                <FieldLabel label={label as any} />
                {props.admin?.description && (
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.6 }}>
                        {typeof props.admin.description === 'string' ? props.admin.description : ''}
                    </p>
                )}
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '10px',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    padding: '4px'
                }}
            >
                {isLoading && <p style={{ fontSize: '13px', opacity: 0.6 }}>Cargando alérgenos...</p>}
                {!isLoading && options.length === 0 && <p style={{ fontSize: '13px', opacity: 0.6 }}>No se encontraron opciones.</p>}

                {options.map((opt) => (
                    <label
                        key={opt.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            padding: '8px 12px',
                            background: selectedIds.includes(opt.id) ? 'var(--theme-elevation-200)' : 'var(--theme-elevation-100)',
                            borderRadius: '6px',
                            transition: 'all 0.2s ease',
                            border: selectedIds.includes(opt.id) ? '1px solid var(--theme-primary-500)' : '1px solid transparent'
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(opt.id)}
                            onChange={() => handleChange(opt.id)}
                            style={{
                                cursor: 'pointer',
                                width: '16px',
                                height: '16px',
                                accentColor: 'var(--theme-primary-500)'
                            }}
                        />
                        <span style={{ fontWeight: selectedIds.includes(opt.id) ? '600' : '400' }}>
                            {opt.nombre}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    )
}
