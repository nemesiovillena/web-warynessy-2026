import type { CollectionConfig } from 'payload'

export const Menus: CollectionConfig = {
  slug: 'menus',
  labels: {
    singular: 'Menú',
    plural: 'Menús',
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'precio', 'activo'],
    group: 'Carta',
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre del Menú',
      required: true,
      admin: {
        description: 'Ej: Menú del Día, Menú Degustación, Menú San Valentín, etc.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.nombre) {
              return data.nombre
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'imagen',
      type: 'upload',
      label: 'Imagen Promocional del Menú',
      relationTo: 'archivos',
    },
    {
      name: 'precio',
      type: 'number',
      label: 'Precio (€)',
      required: true,
      min: 0,
    },
    {
      name: 'fechasDias',
      type: 'text',
      label: 'Fecha y Días de Validez',
      admin: {
        description: 'Ej: "Válido del 1 al 15 de Agosto, solo mediodías"',
      },
    },
    {
      name: 'fechaInicio',
      type: 'date',
      label: 'Fecha de Inicio',
      admin: {
        description: 'Fecha desde la que está disponible el menú',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'fechaFin',
      type: 'date',
      label: 'Fecha de Fin',
      admin: {
        description: 'Fecha hasta la que está disponible el menú',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'descripcion',
      type: 'richText',
      label: 'Descripción / Composición del Menú',
      admin: {
        description: 'Descripción detallada del menú con formato',
      },
    },
    {
      name: 'pdf',
      type: 'upload',
      label: 'PDF del Menú',
      relationTo: 'media',
      admin: {
        description: 'PDF descargable del menú (opcional)',
      },
    },
    {
      name: 'activo',
      type: 'checkbox',
      label: '¿Visible en la Web?',
      defaultValue: true,
      admin: {
        description: 'Activa o desactiva la visibilidad del menú',
      },
    },
    {
      name: 'destacado',
      type: 'checkbox',
      label: '¿Menú Destacado?',
      defaultValue: false,
      admin: {
        description: 'Marca para mostrar en posición destacada',
      },
    },
    {
      name: 'orden',
      type: 'number',
      label: 'Orden de Aparición',
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'diasSemana',
      type: 'select',
      label: 'Días de la Semana Disponibles',
      hasMany: true,
      options: [
        { label: 'Lunes', value: 'lunes' },
        { label: 'Martes', value: 'martes' },
        { label: 'Miércoles', value: 'miercoles' },
        { label: 'Jueves', value: 'jueves' },
        { label: 'Viernes', value: 'viernes' },
        { label: 'Sábado', value: 'sabado' },
        { label: 'Domingo', value: 'domingo' },
      ],
      admin: {
        description: 'Selecciona los días en que está disponible',
      },
    },
    {
      name: 'horario',
      type: 'select',
      label: 'Horario',
      options: [
        { label: 'Solo Comidas', value: 'comidas' },
        { label: 'Solo Cenas', value: 'cenas' },
        { label: 'Comidas y Cenas', value: 'ambos' },
      ],
    },
  ],
  defaultSort: 'orden',
}
