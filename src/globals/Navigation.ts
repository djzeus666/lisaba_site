import type { GlobalConfig } from 'payload'

const linkFields = [
  {
    name: 'href',
    type: 'text' as const,
    label: 'Ссылка',
    required: true,
  },
  {
    name: 'label',
    type: 'text' as const,
    label: 'Текст',
    required: true,
  },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Навигация',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'topBarLinks',
      type: 'array',
      label: 'Ссылки верхней панели',
      labels: {
        singular: 'Ссылка',
        plural: 'Ссылки',
      },
      fields: linkFields,
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Основное меню',
      labels: {
        singular: 'Ссылка',
        plural: 'Ссылки',
      },
      fields: linkFields,
    },
  ],
}
