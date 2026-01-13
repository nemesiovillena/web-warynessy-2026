import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'menu',
  title: '📋 Menús Ofertados',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del Menú',
      type: 'string',
      description: 'Ej: Menú del Día, Menú Degustación, Menú San Valentín, etc.',
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
      name: 'imagen',
      title: 'Imagen Promocional del Menú',
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
    }),
    defineField({
      name: 'precio',
      title: 'Precio (€)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'fechasDias',
      title: 'Fecha y Días de Validez',
      type: 'string',
      description: 'Ej: "Válido del 1 al 15 de Agosto, solo mediodías"',
    }),
    defineField({
      name: 'fechaInicio',
      title: 'Fecha de Inicio',
      type: 'date',
      description: 'Fecha desde la que está disponible el menú',
    }),
    defineField({
      name: 'fechaFin',
      title: 'Fecha de Fin',
      type: 'date',
      description: 'Fecha hasta la que está disponible el menú',
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción / Composición del Menú',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
      description: 'Descripción detallada del menú con formato',
    }),
    defineField({
      name: 'pdf',
      title: 'PDF del Menú',
      type: 'file',
      description: 'PDF descargable del menú (opcional)',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'activo',
      title: '¿Visible en la Web?',
      type: 'boolean',
      description: 'Activa o desactiva la visibilidad del menú',
      initialValue: true,
    }),
    defineField({
      name: 'destacado',
      title: '¿Menú Destacado?',
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
    defineField({
      name: 'diasSemana',
      title: 'Días de la Semana Disponibles',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Lunes', value: 'lunes'},
          {title: 'Martes', value: 'martes'},
          {title: 'Miércoles', value: 'miercoles'},
          {title: 'Jueves', value: 'jueves'},
          {title: 'Viernes', value: 'viernes'},
          {title: 'Sábado', value: 'sabado'},
          {title: 'Domingo', value: 'domingo'},
        ],
      },
      description: 'Selecciona los días en que está disponible',
    }),
    defineField({
      name: 'horario',
      title: 'Horario',
      type: 'string',
      options: {
        list: [
          {title: 'Solo Comidas', value: 'comidas'},
          {title: 'Solo Cenas', value: 'cenas'},
          {title: 'Comidas y Cenas', value: 'ambos'},
        ],
      },
    }),
  ],

  preview: {
    select: {
      title: 'nombre',
      precio: 'precio',
      activo: 'activo',
      media: 'imagen',
    },
    prepare({title, precio, activo, media}) {
      return {
        title,
        subtitle: `${precio}€ ${activo ? '✅ Activo' : '❌ Inactivo'}`,
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
