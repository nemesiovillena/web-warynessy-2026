import type { CollectionConfig } from 'payload'

export const Archivos: CollectionConfig = {
  slug: 'archivos',
  labels: {
    singular: 'Archivo',
    plural: 'Archivos',
  },
  admin: {
    group: 'Medios',
  },
  access: {
    read: () => true, // Public read access
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
      },
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto Alternativo',
      admin: {
        description: 'Descripción de la imagen para SEO y accesibilidad',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Pie de Foto',
      admin: {
        description: 'Texto que aparece debajo de la imagen (opcional)',
      },
    },
  ],
}
