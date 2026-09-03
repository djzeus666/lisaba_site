import type { CollectionConfig } from 'payload'

export const Specialists: CollectionConfig = {
  slug: 'specialists',
  labels: {
    singular: 'Специалист',
    plural: 'Специалисты',
  },
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'name',
    group: 'Контент',
    defaultColumns: ['name', 'role', 'sortOrder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'ФИО',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      label: 'Должность',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Биография',
    },
    {
      name: 'photo',
      type: 'upload',
      label: 'Фото',
      relationTo: 'media',
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        step: 1,
      },
    },
  ],
}
