import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'experience',
  title: '🎁 Experiencias / Regalos',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título de la Experiencia',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titulo',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Descripción completa de la experiencia',
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen Corto',
      type: 'text',
      rows: 2,
      description: 'Descripción breve para la tarjeta',
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: 'precio',
      title: 'Precio (€)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen Destacada',
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
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkCompra',
      title: 'Link de Compra',
      type: 'url',
      description: 'URL externa para comprar la experiencia',
    }),
    defineField({
      name: 'colorFondo',
      title: 'Color de Fondo (Hex)',
      type: 'string',
      description: 'Color de fondo para la tarjeta (ej: #F5F5DC)',
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          name: 'hex',
          invert: false,
        }).error('Debe ser un color hexadecimal válido (ej: #FF5733)'),
    }),
    defineField({
      name: 'incluye',
      title: '¿Qué Incluye?',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Lista de cosas que incluye la experiencia',
    }),
    defineField({
      name: 'validez',
      title: 'Validez',
      type: 'string',
      description: 'Ej: "Válido durante 1 año desde la compra"',
    }),
    defineField({
      name: 'activo',
      title: '¿Visible en la Web?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'destacado',
      title: '¿Destacado?',
      type: 'boolean',
      description: 'Marca para mostrar en posición destacada',
      initialValue: false,
    }),
    defineField({
      name: 'orden',
      title: 'Orden de Aparición',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: 'titulo',
      precio: 'precio',
      activo: 'activo',
      media: 'imagen',
    },
    prepare({title, precio, activo, media}) {
      return {
        title,
        subtitle: `${precio}€ ${activo ? '✅' : '❌'}`,
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
