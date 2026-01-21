import type { CollectionConfig } from 'payload'

export const Alergenos: CollectionConfig = {
  slug: 'alergenos',
  labels: {
    singular: 'Alérgeno',
    plural: 'Alérgenos',
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'codigo', 'icono'],
    group: 'Carta',
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre del Alérgeno',
      required: true,
      admin: {
        description: 'Ej: Gluten, Lactosa, Frutos secos, etc.',
      },
    },
    {
      name: 'codigo',
      type: 'text',
      label: 'Código',
      required: true,
      maxLength: 3,
      admin: {
        description: 'Código corto del alérgeno (ej: G para Gluten)',
      },
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción',
      admin: {
        description: 'Descripción detallada del alérgeno',
      },
    },
    {
      name: 'icono',
      type: 'text',
      label: 'Emoji del Alérgeno',
      admin: {
        description: 'Emoji del alérgeno (ej: 🌾) - Fallback si no hay imagen',
      },
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'archivos',
      label: 'Icono Gráfico',
      admin: {
        description: 'Imagen del icono del alérgeno (preferiblemente WebP o SVG)',
      },
    },
    {
      name: 'orden',
      type: 'number',
      label: 'Orden de Aparición',
      required: true,
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Número para ordenar los alérgenos',
      },
    },
  ],
  defaultSort: 'orden',
}
