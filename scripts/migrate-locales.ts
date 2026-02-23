/**
 * Script de Migración de Localización con DeepL
 * 
 * Este script:
 * 1. Lee todos los datos existentes en español (es)
 * 2. Traduce automáticamente a inglés, francés y alemán usando DeepL
 * 3. Actualiza los registros con las traducciones
 * 
 * Uso: npx tsx scripts/migrate-locales.ts
 */

import { getPayloadClient } from '../src/payload/server'
import dotenv from 'dotenv'
import { Translator, TargetLanguageCode } from 'deepl-node'

dotenv.config({ path: '.env' })

const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY

if (!DEEPL_AUTH_KEY || DEEPL_AUTH_KEY === 'your_deepl_api_key_here') {
    console.error('❌ ERROR: DEEPL_AUTH_KEY no configurado en .env')
    console.log('📝 Por favor, añade tu API key de DeepL al archivo .env')
    process.exit(1)
}

const translator = new Translator(DEEPL_AUTH_KEY)
const targetLocales: TargetLanguageCode[] = ['en-GB', 'fr', 'de']

// Campos a traducir por colección
const fieldsToTranslate: Record<string, string[]> = {
    platos: ['nombre', 'descripcion', 'etiquetas'],
    categorias: ['nombre', 'descripcion'],
    menus: ['nombre', 'etiqueta', 'descripcion_menu', 'fechasDias', 'descripcion'],
    espacios: ['nombre', 'descripcion', 'caracteristicas'],
    banners: ['titulo', 'texto', 'link.texto'],
    paginas: ['tituloInterno', 'heroTitle', 'heroSubtitle', 'metaTitle', 'metaDescription'],
    experiencias: ['titulo', 'descripcion', 'resumen', 'incluye', 'validez'],
}

// Campos que son arrays y necesitan procesamiento especial
const arrayFields: Record<string, string[]> = {
    platos: ['etiquetas'],
    espacios: ['caracteristicas'],
    experiencias: ['incluye'],
}

// Campos que son objetos anidados
const nestedFields: Record<string, string[]> = {
    banners: ['link.texto'],
}

// Función para traducir texto con reintentos
async function translateText(
    text: string,
    targetLang: string,
    retries = 3
): Promise<string> {
    if (!text || text.trim() === '') return text

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const result = await translator.translateText(text, 'es', targetLang)
            return result.text
        } catch (error: any) {
            console.warn(`⚠️  Reintento ${attempt + 1}/${retries} para traducción a ${targetLang}:`, error.message)
            if (attempt === retries - 1) {
                console.error(`❌ Error al traducir "${text.substring(0, 50)}..." a ${targetLang}:`, error)
                return text // Retornar texto original si falla
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)))
        }
    }
    return text
}

// Función para traducir campos de un documento
async function translateDocumentFields(
    collection: string,
    doc: any,
    fields: string[]
): Promise<any> {
    const updates: any = {}

    for (const field of fields) {
        const value = doc[field]

        if (!value) continue

        // Si es un array de objetos (ej: etiquetas)
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
            const arrayFieldName = Object.keys(value[0])[0]
            updates[field] = await Promise.all(
                value.map(async (item: any) => ({
                    ...item,
                    ...(await translateField(collection, arrayFieldName, item[arrayFieldName]))
                }))
            )
        }
        // Si es un objeto anidado
        else if (typeof value === 'object' && value !== null) {
            updates[field] = {}
            for (const [key, nestedValue] of Object.entries(value)) {
                const translated = await translateField(collection, `${field}.${key}`, nestedValue as string)
                if (translated) {
                    updates[field][key] = translated
                }
            }
        }
        // Si es texto plano
        else {
            const translated = await translateField(collection, field, value as string)
            if (translated) {
                updates[field] = translated
            }
        }
    }

    return updates
}

// Función para traducir un campo específico a todos los idiomas
async function translateField(
    collection: string,
    fieldPath: string,
    text: string
): Promise<any> {
    if (!text || typeof text !== 'string') return null

    const translations: any = {}

    for (const locale of targetLocales) {
        try {
            const translated = await translateText(text, locale)
            translations[locale] = translated
            console.log(`✓ ${collection}.${fieldPath}: "${text.substring(0, 30)}..." → ${locale}`)
        } catch (error) {
            console.error(`❌ Error traduciendo ${collection}.${fieldPath} a ${locale}:`, error)
            translations[locale] = text // Fallback al texto original
        }
    }

    return translations
}

// Función principal de migración
async function migrateCollection(collectionSlug: string) {
    console.log(`\n🔄 Migrando colección: ${collectionSlug}`)
    console.log('='.repeat(50))

    const payload = await getPayloadClient()
    const fields = fieldsToTranslate[collectionSlug]

    if (!fields) {
        console.log(`⚠️  No hay campos configurados para ${collectionSlug}, saltando...`)
        return
    }

    try {
        // Obtener todos los documentos
        const docs = await payload.find({
            collection: collectionSlug,
            depth: 0,
            limit: 1000,
            locale: 'es',
        })

        if (!docs.docs || docs.docs.length === 0) {
            console.log(`ℹ️  No hay documentos en ${collectionSlug}`)
            return
        }

        console.log(`📊 Encontrados ${docs.docs.length} documentos`)

        let updatedCount = 0
        let errorCount = 0

        for (const doc of docs.docs) {
            try {
                console.log(`\n📝 Procesando: ${doc.nombre || doc.titulo || doc.id}`)

                // Traducir campos
                const updates = await translateDocumentFields(collectionSlug, doc, fields)

                // Actualizar documento con todas las traducciones
                if (Object.keys(updates).length > 0) {
                    await payload.update({
                        collection: collectionSlug,
                        id: doc.id,
                        data: updates,
                        locale: undefined, // Actualizar todos los locales
                        depth: 0,
                    })
                    updatedCount++
                    console.log(`✅ Documento ${doc.id} actualizado`)
                } else {
                    console.log(`⚠️  No se encontraron campos para traducir`)
                }

                // Pausa para no sobrepasar límites de API
                await new Promise(resolve => setTimeout(resolve, 500))

            } catch (error) {
                errorCount++
                console.error(`❌ Error procesando documento ${doc.id}:`, error)
            }
        }

        console.log(`\n📈 Resumen ${collectionSlug}:`)
        console.log(`   - Documentos encontrados: ${docs.docs.length}`)
        console.log(`   - Documentos actualizados: ${updatedCount}`)
        console.log(`   - Errores: ${errorCount}`)

    } catch (error) {
        console.error(`❌ Error general en ${collectionSlug}:`, error)
    }
}

// Función para migrar globals
async function migrateGlobal(globalSlug: string) {
    console.log(`\n🔄 Migrando global: ${globalSlug}`)
    console.log('='.repeat(50))

    const payload = await getPayloadClient()
    const fields = fieldsToTranslate[globalSlug]

    if (!fields) {
        console.log(`⚠️  No hay campos configurados para ${globalSlug}, saltando...`)
        return
    }

    try {
        const doc = await payload.findGlobal({
            slug: globalSlug,
            locale: 'es',
            depth: 0,
        })

        if (!doc) {
            console.log(`ℹ️  No hay datos en ${globalSlug}`)
            return
        }

        console.log(`📝 Procesando global...`)

        // Traducir campos
        const updates = await translateDocumentFields(globalSlug, doc, fields)

        // Actualizar global
        if (Object.keys(updates).length > 0) {
            await payload.updateGlobal({
                slug: globalSlug,
                data: updates,
                locale: undefined,
                depth: 0,
            })
            console.log(`✅ Global ${globalSlug} actualizado`)
        }

    } catch (error) {
        console.error(`❌ Error en ${globalSlug}:`, error)
    }
}

// Ejecutar migración
async function main() {
    console.log('🚀 Iniciando migración de localización con DeepL')
    console.log('='.repeat(50))
    console.log(`🌍 Idiomas objetivo: ${targetLocales.join(', ')}`)
    console.log(`📚 Colecciones a migrar: ${Object.keys(fieldsToTranslate).join(', ')}`)
    console.log('='.repeat(50))

    // Migrar colecciones en orden
    for (const collection of Object.keys(fieldsToTranslate)) {
        await migrateCollection(collection)
        await new Promise(resolve => setTimeout(resolve, 1000))
    }

    // Migrar globals si existen
    const globalsToTranslate = ['pagina-inicio', 'configuracion-sitio']
    for (const global of globalsToTranslate) {
        await migrateGlobal(global)
        await new Promise(resolve => setTimeout(resolve, 1000))
    }

    console.log('\n' + '='.repeat(50))
    console.log('✅ Migración completada')
    console.log('='.repeat(50))
}

main().catch(error => {
    console.error('❌ Error fatal:', error)
    process.exit(1)
})