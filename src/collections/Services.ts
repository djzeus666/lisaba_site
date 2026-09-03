import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Услуга',
    plural: 'Услуги',
  },
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'title',
    group: 'Контент',
    defaultColumns: ['title', 'slug', 'priceFrom', 'published', 'sortOrder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
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
      name: 'icon',
      type: 'text',
      label: 'Иконка',
      admin: {
        description: 'Ключ иконки, например brain, scan, message, book, heart',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Краткое описание',
    },
    {
      name: 'details',
      type: 'textarea',
      label: 'Подробности',
    },
    {
      name: 'symptoms',
      type: 'array',
      label: 'Симптомы',
      labels: {
        singular: 'Симптом',
        plural: 'Симптомы',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Текст',
          required: true,
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Разделы',
      labels: {
        singular: 'Раздел',
        plural: 'Разделы',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок',
          required: true,
        },
        {
          name: 'paragraphs',
          type: 'array',
          label: 'Абзацы',
          labels: {
            singular: 'Абзац',
            plural: 'Абзацы',
          },
          fields: [
            {
              name: 'text',
              type: 'textarea',
              label: 'Текст',
              required: true,
            },
          ],
        },
        {
          name: 'items',
          type: 'array',
          label: 'Пункты списка',
          labels: {
            singular: 'Пункт',
            plural: 'Пункты',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Текст',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'priceFrom',
      type: 'text',
      label: 'Цена от',
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
    {
      name: 'published',
      type: 'checkbox',
      label: 'Опубликовано',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
