import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración Global',
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nombre del Restaurante',
      required: true,
      admin: {
        description: 'Nombre oficial del restaurante',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo del Restaurante',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción del Restaurante',
      maxLength: 160,
      admin: {
        description: 'Descripción breve para SEO y redes sociales',
      },
    },

    // Información de Contacto
    {
      name: 'contact',
      type: 'group',
      label: 'Información de Contacto',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Teléfono',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Dirección Completa',
        },
        {
          name: 'postalCode',
          type: 'text',
          label: 'Código Postal',
        },
        {
          name: 'city',
          type: 'text',
          label: 'Ciudad',
        },
        {
          name: 'province',
          type: 'text',
          label: 'Provincia',
        },
        {
          name: 'country',
          type: 'text',
          label: 'País',
        },
        {
          name: 'googleMapsUrl',
          type: 'text',
          label: 'URL de Google Maps',
        },
        {
          name: 'coordinates',
          type: 'group',
          label: 'Coordenadas GPS',
          fields: [
            {
              name: 'lat',
              type: 'number',
              label: 'Latitud',
            },
            {
              name: 'lng',
              type: 'number',
              label: 'Longitud',
            },
          ],
        },
      ],
    },

    // Horarios
    {
      name: 'openingHours',
      type: 'array',
      label: 'Horarios de Apertura',
      fields: [
        {
          name: 'days',
          type: 'text',
          label: 'Días',
          admin: {
            description: 'Ej: "Lunes a Viernes", "Sábados", etc.',
          },
        },
        {
          name: 'hours',
          type: 'text',
          label: 'Horario',
          admin: {
            description: 'Ej: "13:00 - 16:00 y 20:00 - 23:00"',
          },
        },
        {
          name: 'closed',
          type: 'checkbox',
          label: '¿Cerrado?',
          defaultValue: false,
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }) => data?.days || 'Horario',
        },
      },
    },

    // Redes Sociales
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Redes Sociales',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter/X URL',
        },
        {
          name: 'tiktok',
          type: 'text',
          label: 'TikTok URL',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
        },
        {
          name: 'tripadvisor',
          type: 'text',
          label: 'TripAdvisor URL',
        },
      ],
    },

    // Logos del Footer
    {
      name: 'footerLogos',
      type: 'array',
      label: 'Logos del Footer (Certificaciones)',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          label: 'Logo',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Texto alternativo',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Enlace (opcional)',
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }) => data?.alt || 'Logo',
        },
      },
    },

    // Copyright y textos legales
    {
      name: 'copyright',
      type: 'text',
      label: 'Texto de Copyright',
      admin: {
        description: 'Ej: © 2026 Restaurante Warynessy. Todos los derechos reservados.',
      },
    },

    // CoverManager ID
    {
      name: 'coverManagerId',
      type: 'text',
      label: 'ID de CoverManager',
      admin: {
        description: 'ID para el widget de reservas',
      },
    },
  ],
}
