import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'banner',
  title: '📢 Banners y Anuncios',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título del Banner',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'texto',
      title: 'Texto del Banner',
      type: 'text',
      rows: 3,
      description: 'Texto descriptivo del anuncio',
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen del Banner',
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
      name: 'link',
      title: 'Enlace (opcional)',
      type: 'object',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'URL',
        },
        {
          name: 'texto',
          type: 'string',
          title: 'Texto del enlace',
        },
        {
          name: 'externo',
          type: 'boolean',
          title: '¿Link externo?',
          description: 'Se abrirá en nueva pestaña',
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: 'fechaInicio',
      title: 'Fecha de Inicio',
      type: 'datetime',
      description: 'Fecha desde la que se muestra el banner',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fechaFin',
      title: 'Fecha de Fin',
      type: 'datetime',
      description: 'Fecha hasta la que se muestra el banner',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'posicion',
      title: 'Posición en la Web',
      type: 'string',
      options: {
        list: [
          {title: 'Home - Superior', value: 'home-top'},
          {title: 'Home - Medio', value: 'home-middle'},
          {title: 'Home - Inferior', value: 'home-bottom'},
          {title: 'Carta - Superior', value: 'carta-top'},
          {title: 'Menús - Superior', value: 'menus-top'},
          {title: 'Global - Banner superior', value: 'global-top'},
        ],
      },
      description: 'Dónde se mostrará el banner',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo de Banner',
      type: 'string',
      options: {
        list: [
          {title: 'Informativo', value: 'info'},
          {title: 'Promoción', value: 'promo'},
          {title: 'Aviso', value: 'warning'},
          {title: 'Evento', value: 'event'},
        ],
      },
      description: 'Tipo de banner para aplicar estilos',
    }),
    defineField({
      name: 'activo',
      title: '¿Activo?',
      type: 'boolean',
      description: 'Activa o desactiva el banner manualmente',
      initialValue: true,
    }),
    defineField({
      name: 'prioridad',
      title: 'Prioridad',
      type: 'number',
      description: 'Orden si hay múltiples banners (mayor número = mayor prioridad)',
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: 'titulo',
      posicion: 'posicion',
      activo: 'activo',
      media: 'imagen',
      fechaInicio: 'fechaInicio',
      fechaFin: 'fechaFin',
    },
    prepare({title, posicion, activo, media, fechaInicio, fechaFin}) {
      const now = new Date()
      const inicio = new Date(fechaInicio)
      const fin = new Date(fechaFin)
      const vigente = now >= inicio && now <= fin

      return {
        title,
        subtitle: `${posicion} - ${activo && vigente ? '✅ Visible' : '❌ No visible'}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Prioridad',
      name: 'prioridadDesc',
      by: [{field: 'prioridad', direction: 'desc'}],
    },
    {
      title: 'Fecha inicio',
      name: 'fechaInicioDesc',
      by: [{field: 'fechaInicio', direction: 'desc'}],
    },
  ],
})
