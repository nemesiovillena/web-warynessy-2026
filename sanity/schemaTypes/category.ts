import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: '📂 Categorías de la Carta',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre de la Categoría',
      type: 'string',
      description: 'Ej: Entrantes, Carnes, Pescados, Postres, etc.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL amigable para la categoría',
      options: {
        source: 'nombre',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Descripción opcional de la categoría',
    }),
    defineField({
      name: 'orden',
      title: 'Orden de Aparición',
      type: 'number',
      description: 'Orden en el que aparece en el menú (1, 2, 3...)',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 1,
    }),
    defineField({
      name: 'activa',
      title: '¿Categoría Activa?',
      type: 'boolean',
      description: 'Desactiva para ocultar la categoría sin borrarla',
      initialValue: true,
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen de la Categoría',
      type: 'image',
      description: 'Imagen representativa (opcional)',
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
    }),
  ],

  preview: {
    select: {
      title: 'nombre',
      orden: 'orden',
      activa: 'activa',
      media: 'imagen',
    },
    prepare({title, orden, activa, media}) {
      return {
        title: `${orden}. ${title}`,
        subtitle: activa ? '✅ Activa' : '❌ Inactiva',
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
    {
      title: 'Nombre',
      name: 'nombreAsc',
      by: [{field: 'nombre', direction: 'asc'}],
    },
  ],
})
