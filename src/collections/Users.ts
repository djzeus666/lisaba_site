import type { CollectionConfig } from 'payload'

const isHttps = (process.env.NEXT_PUBLIC_SERVER_URL || '').startsWith('https')

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Пользователь',
    plural: 'Пользователи',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Система',
    defaultColumns: ['email', 'updatedAt'],
  },
  auth: {
    // HTTP (IP) deploy: Secure cookies would be dropped by the browser
    cookies: {
      sameSite: 'Lax',
      secure: isHttps,
    },
    tokenExpiration: 60 * 60 * 24 * 7,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
    },
  ],
}
