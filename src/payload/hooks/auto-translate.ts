import type { CollectionAfterChangeHook } from 'payload'
import * as deepl from 'deepl-node'

const targetLocales = ['en', 'fr', 'de'] as const
type TargetLocale = typeof targetLocales[number]

// Mapa de códigos de idioma de Payload a códigos de DeepL
const deepLLocaleMap: Record<TargetLocale, deepl.TargetLanguageCode> = {
    en: 'en-US', // Usamos inglés americano por defecto
    fr: 'fr',
    de: 'de',
}

export const createAutoTranslateHook = (fieldsToTranslate: string[]): CollectionAfterChangeHook => {
    return async ({ doc, req, collection }) => {
        // 1. Verificaciones básicas
        if (!process.env.DEEPL_API_KEY) {
            // Silenciosamente ignorar si no hay API Key (para dev sin key)
            // console.warn('DEEPL_API_KEY no configurada, saltando traducción automática')
            return doc
        }

        // Evitar bucles infinitos
        if (req.context.triggerAutoTranslate) {
            return doc
        }

        // Solo traducir si el cambio se hizo en el idioma por defecto (español)
        // Nota: req.locale es el idioma en el que se está realizando la operación
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
                            console.error(`Error traduciendo campo ${field} a ${targetLocale}:`, translationError)
                        }
                    }
                }

                // 4. Actualizar el documento en el idioma destino si hay cambios
                if (hasLocaleUpdates) {
                    await req.payload.update({
                        collection: collection.slug,
                        id: doc.id,
                        data: localeUpdates,
                        locale: targetLocale as any,
                        context: { triggerAutoTranslate: true }, // Flag para evitar recursión
                    })
                    console.log(`[AutoTranslate] Traducido ${collection.slug}:${doc.id} a ${targetLocale}`)
                }
            }
        } catch (error) {
            console.error('[AutoTranslate] Error general en hook de traducción:', error)
        }

        return doc
    }
}
