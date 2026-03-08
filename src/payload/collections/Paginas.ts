import type { CollectionConfig } from 'payload'
import { callTranslationAgent, translateLexical, translateDocument } from '../utils/translation-utils'

export const Paginas: CollectionConfig = {
    slug: 'paginas',
    labels: {
        singular: 'Página',
        plural: 'Páginas',
    },
    admin: {
        useAsTitle: 'tituloInterno',
        defaultColumns: ['tituloInterno', 'slug', 'updatedAt'],
        group: 'Contenido',
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
                const _locale = (req as any).locale;
                if (_locale && _locale !== 'es') return;
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
                            const fieldsToTranslate = ['titulo', 'descripcion', 'slug_es_manual', 'slug_ca_manual', 'slug_en_manual', 'slug_fr_manual', 'slug_de_manual', 'hero', 'layout'];

                            console.log(`[PAGINAS] [Background] Iniciando traducciones para ID: ${doc.id}`);

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
                                    console.log(`[PAGINAS] [Background] Aplicando traducciones a locale ${locale} para ID: ${doc.id}...`);
                                    await req.payload.update({
                                        collection: 'paginas',
                                        id: doc.id,
                                        locale: locale as any,
                                        data: translatedData,
                                        req: { payload: req.payload, disableHooks: true } as any,
                                    });
                                }
                            }
                            console.log(`[PAGINAS] [Background] Traducciones completadas para ID: ${doc.id}.`);
                        } catch (error) {
                            console.error('[PAGINAS] [Background] Error en hook de traducción:', error);
                        }
                    };

                    executeTranslations();
                }
            }

        ]
    },
    fields: [
        {
            name: 'tituloInterno',
            type: 'text',
            label: 'Nombre Interno (Admin)',
            required: true,
            admin: {
                description: 'Ej: Página de Inicio, Nosotros, etc.',
            },
        },
        {
            name: 'slug',
            type: 'text',
            label: 'Slug (URL)',
            required: true,
            unique: true,
            admin: {
                description: 'Identificador único (historia, carta, contacto...)',
            },
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Cabecera (Hero)',
                    fields: [
                        {
                            name: 'heroImage',
                            type: 'upload',
                            label: 'Imagen Hero',
                            relationTo: 'archivos',
                            required: true,
                        },
                        {
                            name: 'heroTitle',
                            type: 'text',
                            label: 'Título de la Cabecera',
                            localized: true,
                        },
                        {
                            name: 'heroSubtitle',
                            type: 'textarea',
                            label: 'Subtítulo de la Cabecera',
                            localized: true,
                        },
                    ],
                },
                {
                    label: 'Layout Espacios',
                    admin: {
                        condition: (data) => data?.slug === 'espacios',
                    },
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'imagenEspacio1',
                                    type: 'upload',
                                    label: 'Imagen 1 (Superior izquierda)',
                                    relationTo: 'archivos',
                                    admin: {
                                        width: '50%',
                                    },
                                },
                                {
                                    name: 'imagenEspacio2',
                                    type: 'upload',
                                    label: 'Imagen 2 (Superior derecha)',
                                    relationTo: 'archivos',
                                    admin: {
                                        width: '50%',
                                    },
                                },
                            ],
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'imagenEspacio3',
                                    type: 'upload',
                                    label: 'Imagen 3 (Inferior izquierda)',
                                    relationTo: 'archivos',
                                    admin: {
                                        width: '50%',
                                    },
                                },
                                {
                                    name: 'imagenEspacio4',
                                    type: 'upload',
                                    label: 'Imagen 4 (Inferior derecha)',
                                    relationTo: 'archivos',
                                    admin: {
                                        width: '50%',
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Layout Historia',
                    admin: {
                        condition: (data, siblingData) => {
                            const slug = data?.slug || siblingData?.slug;
                            return slug?.toLowerCase() === 'historia';
                        },
                    },
                    fields: [
                        {
                            name: 'historiaMision',
                            type: 'textarea',
                            label: 'Nuestra Misión / Introducción',
                            localized: true,
                        },
                        {
                            name: 'historiaHitos',
                            type: 'array',
                            label: 'Hitos Históricos',
                            fields: [
                                {
                                    name: 'titulo',
                                    type: 'text',
                                    label: 'Título del Hito (ej: Los Inicios)',
                                    required: true,
                                    localized: true,
                                },
                                {
                                    name: 'descripcion',
                                    type: 'textarea',
                                    label: 'Descripción del Hito',
                                    required: true,
                                    localized: true,
                                },
                                {
                                    name: 'imagen',
                                    type: 'upload',
                                    relationTo: 'archivos',
                                    label: 'Imagen Asociada (Opcional)',
                                },
                            ]
                        }
                    ]
                },
                {
                    label: 'SEO y Metadatos',
                    fields: [
                        {
                            name: 'metaTitle',
                            type: 'text',
                            label: 'Título SEO (Meta Title)',
                            localized: true,
                            admin: {
                                description: 'Aparece en la pestaña del navegador y Google',
                            },
                        },
                        {
                            name: 'metaDescription',
                            type: 'textarea',
                            label: 'Descripción SEO (Meta Description)',
                            localized: true,
                            admin: {
                                description: 'Breve resumen para los resultados de búsqueda',
                            },
                        },
                    ],
                },
            ],
        },
    ],
}
