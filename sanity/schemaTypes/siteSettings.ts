import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: '⚙️ Configuración Global del Sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Restaurante',
      type: 'string',
      description: 'Nombre oficial del restaurante',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo del Restaurante',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          description: 'Importante para SEO y accesibilidad',
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Descripción del Restaurante',
      type: 'text',
      rows: 3,
      description: 'Descripción breve para SEO y redes sociales',
      validation: (Rule) => Rule.max(160),
    }),

    // Información de Contacto
    defineField({
      name: 'contact',
      title: 'Información de Contacto',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Teléfono',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Dirección Completa',
          type: 'text',
          rows: 2,
        },
        {
          name: 'postalCode',
          title: 'Código Postal',
          type: 'string',
        },
        {
          name: 'city',
          title: 'Ciudad',
          type: 'string',
        },
        {
          name: 'province',
          title: 'Provincia',
          type: 'string',
        },
        {
          name: 'country',
          title: 'País',
          type: 'string',
        },
        {
          name: 'googleMapsUrl',
          title: 'URL de Google Maps',
          type: 'url',
        },
        {
          name: 'coordinates',
          title: 'Coordenadas GPS',
          type: 'object',
          fields: [
            {name: 'lat', type: 'number', title: 'Latitud'},
            {name: 'lng', type: 'number', title: 'Longitud'},
          ],
        },
      ],
    }),

    // Horarios
    defineField({
      name: 'openingHours',
      title: 'Horarios de Apertura',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'days',
              title: 'Días',
              type: 'string',
              description: 'Ej: "Lunes a Viernes", "Sábados", etc.',
            },
            {
              name: 'hours',
              title: 'Horario',
              type: 'string',
              description: 'Ej: "13:00 - 16:00 y 20:00 - 23:00"',
            },
            {
              name: 'closed',
              title: '¿Cerrado?',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              days: 'days',
              hours: 'hours',
              closed: 'closed',
            },
            prepare({days, hours, closed}) {
              return {
                title: days,
                subtitle: closed ? 'Cerrado' : hours,
              }
            },
          },
        },
      ],
    }),

    // Redes Sociales
    defineField({
      name: 'socialMedia',
      title: 'Redes Sociales',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter/X URL',
          type: 'url',
        },
        {
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        },
        {
          name: 'tripadvisor',
          title: 'TripAdvisor URL',
          type: 'url',
        },
      ],
    }),

    // Logos del Footer (Sicted, certificaciones, etc.)
    defineField({
      name: 'footerLogos',
      title: 'Logos del Footer (Certificaciones)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
            },
            {
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Enlace (opcional)',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'logo',
            },
          },
        },
      ],
    }),

    // Copyright y textos legales
    defineField({
      name: 'copyright',
      title: 'Texto de Copyright',
      type: 'string',
      description: 'Ej: © 2026 Restaurante Warynessy. Todos los derechos reservados.',
    }),

    // CoverManager ID
    defineField({
      name: 'coverManagerId',
      title: 'ID de CoverManager',
      type: 'string',
      description: 'ID para el widget de reservas',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
})
