import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: '🏠 Página de Inicio',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Título Principal (Hero)',
      type: 'string',
      description: 'Título principal de la página de inicio',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtítulo (Hero)',
      type: 'text',
      rows: 2,
      description: 'Subtítulo o claim del restaurante',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen Hero',
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

    // Sección de Bienvenida
    defineField({
      name: 'welcomeTitle',
      title: 'Título de Bienvenida',
      type: 'string',
      description: 'Título de la sección "Sobre nosotros"',
    }),
    defineField({
      name: 'welcomeText',
      title: 'Texto de Bienvenida / Fundación',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Historia y filosofía del restaurante',
    }),

    // Galería de Bienvenida
    defineField({
      name: 'galeriaInicio',
      title: 'Galería de Imágenes Inicio',
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
      description: 'Galería de imágenes para la página de inicio',
    }),

    // CTA (Call to Action)
    defineField({
      name: 'ctaTitle',
      title: 'Título del CTA de Reservas',
      type: 'string',
      description: 'Texto del call to action para reservar',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del CTA',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Texto del Botón CTA',
      type: 'string',
      description: 'Texto del botón de reserva',
      initialValue: 'Reservar ahora',
    }),

    // Espacios destacados
    defineField({
      name: 'espaciosDestacados',
      title: 'Espacios Destacados en Home',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'space'}]}],
      description: 'Selecciona los espacios a mostrar en el home',
      validation: (Rule) => Rule.max(5),
    }),

    // Experiencias destacadas
    defineField({
      name: 'experienciasDestacadas',
      title: 'Experiencias Destacadas en Home',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'experience'}]}],
      description: 'Selecciona las experiencias a mostrar en el home',
      validation: (Rule) => Rule.max(3),
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO: Título',
      type: 'string',
      description: 'Título para SEO (meta title)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO: Descripción',
      type: 'text',
      rows: 2,
      description: 'Descripción para SEO (meta description)',
      validation: (Rule) => Rule.max(160),
    }),
  ],

  preview: {
    select: {
      title: 'heroTitle',
      media: 'heroImage',
    },
  },
})
