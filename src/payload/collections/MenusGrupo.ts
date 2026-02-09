import type { CollectionConfig } from 'payload'

export const MenusGrupo: CollectionConfig = {
    slug: 'menus-grupo',
    labels: {
        singular: 'Menú de Grupo',
        plural: 'Menús de Grupo',
    },
    admin: {
        useAsTitle: 'nombre',
        defaultColumns: ['nombre', 'orden', 'activo'],
        group: 'Carta',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'nombre',
            type: 'text',
            label: 'Nombre del Grupo de Menús',
            required: true,
            admin: {
                description: 'Ej: Menús de Empresa, Menús de Celebración, etc.',
            },
        },
        {
            name: 'descripcion',
            type: 'textarea',
            label: 'Descripción del Grupo',
            admin: {
                description: 'Breve introducción para este conjunto de menús.',
            },
        },
        {
            name: 'imagenPortada',
            type: 'upload',
            label: 'Imagen de Portada',
            relationTo: 'archivos',
            admin: {
                description: 'Imagen que representará a este grupo de menús.',
            },
        },
        {
            name: 'menus',
            type: 'relationship',
            label: 'Menús Incluidos',
            relationTo: 'menus',
            hasMany: true,
            required: true,
            admin: {
                description: 'Selecciona los menús individuales que forman parte de este grupo.',
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
            name: 'activo',
            type: 'checkbox',
            label: '¿Visible en la Web?',
            defaultValue: true,
        },
    ],
    defaultSort: 'orden',
}
