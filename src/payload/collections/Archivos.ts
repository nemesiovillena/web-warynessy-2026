import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { syncDocToBunny } from '../utils/bunny-upload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    // After create or update, push file + variants to Bunny Storage
    afterOperation: [
      async ({ operation, result }) => {
        if (operation === 'create' || operation === 'update') {
          // Fire-and-forget: don't block the response
          syncDocToBunny(result).catch((err) =>
            console.error('[Bunny] syncDocToBunny error:', err)
          )
        }
        return result
      },
    ],
  },
  upload: {
    staticDir: path.resolve(__dirname, '../../../media'),
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
