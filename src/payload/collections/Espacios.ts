import type { CollectionConfig } from 'payload'

export const Espacios: CollectionConfig = {
  slug: 'espacios',
  labels: {
    singular: 'Espacio',
    plural: 'Espacios',
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'capacidad', 'activo'],
    group: 'Contenido',
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre del Espacio',
      required: true,
      admin: {
        description: 'Ej: Salón Principal, Zona Bar, Terraza, Sala Privada, etc.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
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
      type: 'richText',
      label: 'Descripción del Espacio',
      admin: {
        description: 'Descripción detallada del espacio',
      },
    },
    {
      name: 'galeria',
      type: 'array',
      label: 'Galería de Imágenes',
      fields: [
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'archivos',
          required: true,
        },
      ],
      admin: {
        description: 'Múltiples imágenes del espacio',
      },
    },
    {
      name: 'capacidad',
      type: 'number',
      label: 'Capacidad',
      admin: {
        description: 'Número de personas que puede albergar',
      },
    },
    {
      name: 'caracteristicas',
      type: 'array',
      label: 'Características',
      fields: [
        {
          name: 'caracteristica',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Ej: "Aire acondicionado", "Vista panorámica", "WiFi", etc.',
      },
    },
    {
      name: 'orden',
      type: 'number',
      label: 'Orden de Aparición',
      required: true,
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'activo',
      type: 'checkbox',
      label: '¿Visible en la Web?',
      defaultValue: true,
    },
    {
      name: 'disponibleEventos',
      type: 'checkbox',
      label: '¿Disponible para Eventos Privados?',
      defaultValue: false,
      admin: {
        description: 'Marca si este espacio se puede reservar para eventos',
      },
    },
  ],
  defaultSort: 'orden',
}
