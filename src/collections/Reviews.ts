import type { Access, CollectionConfig } from 'payload'

const isAuthenticated: Access = ({ req: { user } }) => Boolean(user)

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Отзыв',
    plural: 'Отзывы',
  },
  defaultSort: '-createdAt',
  admin: {
    useAsTitle: 'name',
    group: 'Контент',
    defaultColumns: ['name', 'type', 'status', 'source', 'rating', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        status: {
          equals: 'published',
        },
      }
    },
    create: () => true,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Тип',
      required: true,
      defaultValue: 'text',
      options: [
        { label: 'Изображение', value: 'image' },
        { label: 'Текст', value: 'text' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Изображение отзыва',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'image',
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Текст отзыва',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Оценка',
      min: 1,
      max: 5,
      admin: {
        step: 1,
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Черновик', value: 'draft' },
        { label: 'Опубликован', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'source',
      type: 'select',
      label: 'Источник',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Форма на сайте', value: 'form' },
        { label: 'Админка', value: 'admin' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
