import type { CollectionConfig } from 'payload'

export const PricingItems: CollectionConfig = {
  slug: 'pricing-items',
  labels: {
    singular: 'Позиция прайса',
    plural: 'Цены',
  },
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'name',
    group: 'Контент',
    defaultColumns: ['name', 'category', 'duration', 'price', 'sortOrder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Название',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категория',
      required: true,
      options: [
        { label: 'Диагностика', value: 'diagnostics' },
        { label: 'Занятия', value: 'classes' },
      ],
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Длительность',
    },
    {
      name: 'price',
      type: 'text',
      label: 'Цена',
      required: true,
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
