import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: '🍽️ Platos de la Carta',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del Plato',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción / Ingredientes',
      type: 'text',
      rows: 3,
      description: 'Descripción del plato e ingredientes principales',
    }),
    defineField({
      name: 'precio',
      title: 'Precio (€)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen del Plato',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          description: 'Descripción de la imagen para SEO',
        },
      ],
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alergenos',
      title: 'Alérgenos',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'allergen'}]}],
      description: 'Selecciona todos los alérgenos que contiene el plato',
    }),
    defineField({
      name: 'activo',
      title: '¿Disponible?',
      type: 'boolean',
      description: 'Desactiva cuando el plato esté agotado o no disponible',
      initialValue: true,
    }),
    defineField({
      name: 'destacado',
      title: '¿Plato Destacado?',
      type: 'boolean',
      description: 'Marca como plato destacado o recomendado',
      initialValue: false,
    }),
    defineField({
      name: 'orden',
      title: 'Orden dentro de la Categoría',
      type: 'number',
      description: 'Orden de aparición dentro de su categoría',
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
    }),
    defineField({
      name: 'etiquetas',
      title: 'Etiquetas',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Ej: "Vegano", "Picante", "Recomendado del Chef", etc.',
    }),
  ],

  preview: {
    select: {
      title: 'nombre',
      categoria: 'categoria.nombre',
      precio: 'precio',
      activo: 'activo',
      media: 'imagen',
    },
    prepare({title, categoria, precio, activo, media}) {
      return {
        title,
        subtitle: `${categoria} - ${precio}€ ${activo ? '✅' : '❌ Agotado'}`,
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
    {
      title: 'Precio (menor a mayor)',
      name: 'precioAsc',
      by: [{field: 'precio', direction: 'asc'}],
    },
    {
      title: 'Precio (mayor a menor)',
      name: 'precioDesc',
      by: [{field: 'precio', direction: 'desc'}],
    },
  ],
})
