import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'allergen',
  title: '⚠️ Alérgenos',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del Alérgeno',
      type: 'string',
      description: 'Ej: Gluten, Lactosa, Frutos secos, etc.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'codigo',
      title: 'Código',
      type: 'string',
      description: 'Código corto del alérgeno (ej: G para Gluten)',
      validation: (Rule) => Rule.required().max(3),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 2,
      description: 'Descripción detallada del alérgeno',
    }),
    defineField({
      name: 'icono',
      title: 'Icono del Alérgeno',
      type: 'string',
      description: 'Emoji o icono del alérgeno (ej: 🌾)',
    }),
    defineField({
      name: 'orden',
      title: 'Orden de Aparición',
      type: 'number',
      description: 'Número para ordenar los alérgenos',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],

  preview: {
    select: {
      title: 'nombre',
      subtitle: 'codigo',
      media: 'icono',
    },
    prepare({title, subtitle}) {
      return {
        title: `${title} (${subtitle})`,
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
