import type { CollectionConfig } from 'payload'

export const Categorias: CollectionConfig = {
  slug: 'categorias',
  labels: {
    singular: 'Categoría',
    plural: 'Categorías',
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'orden', 'activa'],
    group: 'Carta',
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre de la Categoría',
      required: true,
      localized: true,
      admin: {
        description: 'Ej: Entrantes, Carnes, Pescados, Postres, etc.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL amigable para la categoría',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.nombre) {
              return data.nombre
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción',
      localized: true,
      admin: {
        description: 'Descripción opcional de la categoría',
      },
    },
    {
      name: 'orden',
      type: 'number',
      label: 'Orden de Aparición',
      required: true,
      min: 0,
      defaultValue: 1,
      admin: {
        description: 'Orden en el que aparece en el menú (1, 2, 3...)',
      },
    },
    {
      name: 'activa',
      type: 'checkbox',
      label: '¿Categoría Activa?',
      defaultValue: true,
      admin: {
        description: 'Desactiva para ocultar la categoría sin borrarla',
      },
    },
    {
      name: 'imagen',
      type: 'upload',
      label: 'Imagen de la Categoría',
      relationTo: 'archivos',
      admin: {
        description: 'Imagen representativa (opcional)',
      },
    },
  ],
  defaultSort: 'orden',
}
