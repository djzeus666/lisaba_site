import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Страница',
    plural: 'Страницы',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Контент',
    defaultColumns: ['title', 'slug', 'published', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Слаг',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Краткое описание',
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Надзаголовок',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Подзаголовок страницы',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Содержимое (rich text)',
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Простой текст (абзацы через пустую строку; списки — строки с «- »)',
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Опубликовано',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
