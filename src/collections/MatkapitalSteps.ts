import type { CollectionConfig } from 'payload'

export const MatkapitalSteps: CollectionConfig = {
  slug: 'matkapital-steps',
  labels: {
    singular: 'Шаг маткапитала',
    plural: 'Маткапитал: шаги',
  },
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'title',
    group: 'Контент',
    defaultColumns: ['title', 'sortOrder'],
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
      name: 'description',
      type: 'textarea',
      label: 'Описание',
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
