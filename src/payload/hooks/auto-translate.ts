import type { CollectionAfterChangeHook, GlobalAfterChangeHook, PayloadRequest } from 'payload'
import * as deepl from 'deepl-node'

const targetLocales = ['en', 'fr', 'de'] as const
type TargetLocale = typeof targetLocales[number]

// Mapa de códigos de idioma de Payload a códigos de DeepL
const deepLLocaleMap: Record<TargetLocale, deepl.TargetLanguageCode> = {
    en: 'en-US', // Usamos inglés americano por defecto
    fr: 'fr',
    de: 'de',
}

/**
 * Lógica interna compartida para traducir campos de un documento
 */
async function translateDocument({
    doc,
    req,
    fieldsToTranslate,
    slug,
    isGlobal = false,
}: {
    doc: any
    req: PayloadRequest
    fieldsToTranslate: string[]
    slug: string
    isGlobal?: boolean
}) {
    // 1. Verificaciones básicas
    if (!process.env.DEEPL_API_KEY) {
        return doc
    }

    // Evitar bucles infinitos
    if (req.context.triggerAutoTranslate) {
        return doc
    }

    // Solo traducir si el cambio se hizo en el idioma por defecto (español)
    if ((req.locale as string) !== 'es') {
        return doc
    }

    const translator = new deepl.Translator(process.env.DEEPL_API_KEY)

    try {
        // 2. Iterar sobre los idiomas destino
        for (const targetLocale of targetLocales) {
            const localeUpdates: Record<string, any> = {}
            let hasLocaleUpdates = false

            // 3. Traducir campos
            for (const field of fieldsToTranslate) {
                const sourceText = doc[field]

                // Solo traducir si hay texto y es un string
                if (typeof sourceText === 'string' && sourceText.trim().length > 0) {
                    try {
                        const result = await translator.translateText(
                            sourceText,
                            'es',
                            deepLLocaleMap[targetLocale]
                        )

                        if (result && 'text' in result) {
                            localeUpdates[field] = result.text
                            hasLocaleUpdates = true
                        }
                    } catch (translationError) {
                        console.error(`[AutoTranslate] Error traduciendo campo ${field} a ${targetLocale}:`, translationError)
                    }
                }
            }

            // 4. Actualizar el documento en el idioma destino si hay cambios
            if (hasLocaleUpdates) {
                if (isGlobal) {
                    await req.payload.updateGlobal({
                        slug: slug as any,
                        data: localeUpdates,
                        locale: targetLocale as any,
                        context: { triggerAutoTranslate: true },
                    })
                } else {
                    await req.payload.update({
                        collection: slug as any,
                        id: doc.id,
                        data: localeUpdates,
                        locale: targetLocale as any,
                        context: { triggerAutoTranslate: true },
                    })
                }
                console.log(`[AutoTranslate] Traducido ${isGlobal ? 'Global' : 'Colección'} ${slug}${!isGlobal ? `:${doc.id}` : ''} a ${targetLocale}`)
            }
        }
    } catch (error) {
        console.error('[AutoTranslate] Error general en proceso de traducción:', error)
    }

    return doc
}

export const createAutoTranslateHook = (fieldsToTranslate: string[]): CollectionAfterChangeHook => {
    return async ({ doc, req, collection }) => {
        return translateDocument({
            doc,
            req,
            fieldsToTranslate,
            slug: collection.slug,
            isGlobal: false,
        })
    }
}

export const createGlobalAutoTranslateHook = (fieldsToTranslate: string[]): GlobalAfterChangeHook => {
    return async ({ doc, req, global }) => {
        return translateDocument({
            doc,
            req,
            fieldsToTranslate,
            slug: global.slug,
            isGlobal: true,
        })
    }
}
