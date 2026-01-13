import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'space',
  title: '🏛️ Espacios del Restaurante',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del Espacio',
      type: 'string',
      description: 'Ej: Salón Principal, Zona Bar, Terraza, Sala Privada, etc.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'nombre',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción del Espacio',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Descripción detallada del espacio',
    }),
    defineField({
      name: 'galeria',
      title: 'Galería de Imágenes',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de foto',
            },
          ],
        },
      ],
      description: 'Múltiples imágenes del espacio',
    }),
    defineField({
      name: 'capacidad',
      title: 'Capacidad',
      type: 'number',
      description: 'Número de personas que puede albergar',
    }),
    defineField({
      name: 'caracteristicas',
      title: 'Características',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Ej: "Aire acondicionado", "Vista panorámica", "WiFi", etc.',
    }),
    defineField({
      name: 'orden',
      title: 'Orden de Aparición',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: 'activo',
      title: '¿Visible en la Web?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'disponibleEventos',
      title: '¿Disponible para Eventos Privados?',
      type: 'boolean',
      description: 'Marca si este espacio se puede reservar para eventos',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'nombre',
      capacidad: 'capacidad',
      activo: 'activo',
      media: 'galeria.0',
    },
    prepare({title, capacidad, activo, media}) {
      return {
        title,
        subtitle: `${capacidad ? `Capacidad: ${capacidad} personas` : ''} ${activo ? '✅' : '❌'}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Orden',
      name: 'ordenAsc',
      by: [{field: 'orden', direction: 'asc'}],
    },
  ],
})
