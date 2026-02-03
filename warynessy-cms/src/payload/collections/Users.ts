import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'usuarios',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName'],
  },
  access: {
    // Only admins can create, read, update, and delete users
    create: ({ req: { user } }) => user?.role === 'admin',
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'Nombre',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Apellidos',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      required: true,
      defaultValue: 'editor',
      options: [
        {
          label: 'Administrador',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
    },
  ],
}
