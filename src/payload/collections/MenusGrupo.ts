import type { CollectionConfig } from 'payload'
import { callTranslationAgent, translateDocument } from '../utils/translation-utils'

export const MenusGrupo: CollectionConfig = {
    slug: 'menus-grupo',
    labels: {
        singular: 'Otro Menú',
        plural: 'Otros Menús',
    },
    admin: {
        useAsTitle: 'nombre',
        defaultColumns: ['nombre', 'orden', 'activo'],
        group: 'Carta',
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    hooks: {
        afterChange: [
            async ({ doc, previousDoc, operation, req }) => {
                const locale = (req as any).locale;

                // PROTECCIÓN CRÍTICA: Solo traducir si estamos editando explícitamente en español
                if (locale && locale !== 'es') {
                    return;
                }

                if (operation === 'create' || operation === 'update') {
                    const payload = req.payload;

                    const executeTranslations = async () => {
                        // Esperar un momento aleatorio para evitar colisiones
                        const randomDelay = Math.floor(Math.random() * 2000);
                        await new Promise(resolve => setTimeout(resolve, 1000 + randomDelay));

                        try {
                            const configTraduccion: any = await payload.findGlobal({ slug: 'configuracion-traduccion' as any });
                            const endpoint = configTraduccion?.endpointAgente || 'http://localhost:8000/translate';
                            const modelo = configTraduccion?.modeloIA || 'google/gemini-2.0-flash-001';

                            const targetLocales = ['ca', 'en', 'fr', 'de'] as const;
                            const fieldsToTranslate = ['nombre', 'descripcion'];

                            console.log(`[MENUS-GRUPO] [Background] Iniciando traducciones para ID: ${doc.id}`);

                            for (const locale of targetLocales) {
                                const { translatedData, hasTranslations } = await translateDocument({
                                    doc,
                                    previousDoc,
                                    fields: fieldsToTranslate,
                                    targetLang: locale,
                                    endpoint,
                                    model: modelo,
                                    operation
                                });

                                if (hasTranslations) {
                                    console.log(`[MENUS-GRUPO] [Background] Aplicando traducciones a locale ${locale} para ID: ${doc.id}...`);
                                    await req.payload.update({
                                        collection: 'menus-grupo',
                                        id: doc.id,
                                        locale: locale as any,
                                        data: translatedData,
                                        req: { payload: req.payload, disableHooks: true } as any,
                                    });
                                }
                            }
                            console.log(`[MENUS-GRUPO] [Background] Traducciones completadas para ID: ${doc.id}.`);
                        } catch (error) {
                            console.error('[MENUS-GRUPO] [Background] Error en hook de traducción:', error);
                        }
                    };

                    executeTranslations();
                }
            }
        ]
    },
    fields: [
        {
            name: 'nombre',
            type: 'text',
            label: 'Nombre del Grupo de Menús',
            required: true,
            localized: true,
            admin: {
                description: 'Ej: Menús de Empresa, Menús de Celebración, etc.',
            },
        },
        {
            name: 'descripcion',
            type: 'textarea',
            label: 'Descripción del Grupo',
            localized: true,
            admin: {
                description: 'Breve introducción para este conjunto de menús.',
            },
        },
        {
            name: 'imagenPortada',
            type: 'upload',
            label: 'Imagen de Portada',
            relationTo: 'archivos',
            admin: {
                description: 'Imagen que representará a este grupo de menús.',
            },
        },
        {
            name: 'menus',
            type: 'relationship',
            label: 'Menús Incluidos',
            relationTo: 'menus',
            hasMany: true,
            admin: {
                description: 'Selecciona los menús individuales que forman parte de este grupo.',
            },
        },
        {
            name: 'orden',
            type: 'number',
            label: 'Orden de Aparición',
            min: 0,
            defaultValue: 0,
        },
        {
            name: 'activo',
            type: 'checkbox',
            label: '¿Visible en la Web?',
            defaultValue: true,
        },
    ],
    defaultSort: 'orden',
}