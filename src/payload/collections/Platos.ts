import type { CollectionConfig } from 'payload'

export const Platos: CollectionConfig = {
  slug: 'platos',
  labels: {
    singular: 'Plato',
    plural: 'Platos',
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'categoria', 'precio', 'activo'],
    group: 'Carta',
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre del Plato',
      required: true,
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción / Ingredientes',
      admin: {
        description: 'Descripción del plato e ingredientes principales',
      },
    },
    {
      name: 'precio',
      type: 'number',
      label: 'Precio (€)',
      required: true,
      min: 0,
    },
    {
      name: 'imagen',
      type: 'upload',
      label: 'Imagen del Plato',
      relationTo: 'archivos',
    },
    {
      name: 'categoria',
      type: 'relationship',
      label: 'Categoría',
      relationTo: 'categorias',
      required: true,
      hasMany: false,
    },
    {
      name: 'alergenos',
      type: 'relationship',
      label: 'Alérgenos',
      relationTo: 'alergenos',
      hasMany: true,
      admin: {
        description: 'Selecciona todos los alérgenos que contiene el plato',
        components: {
          Field: '@/payload/components/ChecklistRelationship',
        },
      },
    },
    {
      name: 'activo',
      type: 'checkbox',
      label: '¿Disponible?',
      defaultValue: true,
      admin: {
        description: 'Desactiva cuando el plato esté agotado o no disponible',
      },
    },
    {
      name: 'destacado',
      type: 'checkbox',
      label: '¿Plato Destacado?',
      defaultValue: false,
      admin: {
        description: 'Marca como plato destacado o recomendado',
      },
    },
    {
      name: 'orden',
      type: 'number',
      label: 'Orden dentro de la Categoría',
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Orden de aparición dentro de su categoría',
      },
    },
    {
      name: 'etiquetas',
      type: 'array',
      label: 'Etiquetas',
      fields: [
        {
          name: 'etiqueta',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Ej: "Vegano", "Picante", "Recomendado del Chef", etc.',
      },
    },
  ],
  defaultSort: 'orden',
}
