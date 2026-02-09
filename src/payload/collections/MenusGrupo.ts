import type { CollectionConfig } from 'payload'

export const MenusGrupo: CollectionConfig = {
    slug: 'menus-grupo',
    labels: {
        singular: 'Menú de Grupo',
        plural: 'Menús de Grupo',
    },
    admin: {
        useAsTitle: 'nombre',
        defaultColumns: ['nombre', 'activo'],
        group: 'Carta',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'nombre',
            type: 'text',
            label: 'Nombre del Grupo',
            required: true,
        },
        {
            name: 'activo',
            type: 'checkbox',
            label: 'Activo',
            defaultValue: true,
        },
        {
            name: 'menus',
            type: 'relationship',
            relationTo: 'menus',
            hasMany: true,
        }
    ],
}
