import type { Block, CollectionConfig } from 'payload'

const Paragraph: Block = {
  slug: 'paragraph',
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
}

const Heading: Block = {
  slug: 'heading',
  labels: {
    singular: 'Заголовок',
    plural: 'Заголовки',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      label: 'Текст',
      required: true,
    },
  ],
}

const List: Block = {
  slug: 'list',
  labels: {
    singular: 'Список',
    plural: 'Списки',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Пункты',
      labels: {
        singular: 'Пункт',
        plural: 'Пункты',
      },
      minRows: 1,
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
}

const Docs: Block = {
  slug: 'docs',
  labels: {
    singular: 'Документы',
    plural: 'Документы',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Файлы и ссылки',
      labels: {
        singular: 'Документ',
        plural: 'Документы',
      },
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'URL / ссылка',
        },
        {
          name: 'file',
          type: 'upload',
          label: 'Файл',
          relationTo: 'media',
        },
      ],
    },
  ],
}

const Card: Block = {
  slug: 'card',
  labels: {
    singular: 'Карточка',
    plural: 'Карточки',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
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
      name: 'lists',
      type: 'array',
      label: 'Списки',
      labels: {
        singular: 'Список',
        plural: 'Списки',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Заголовок списка',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Пункты',
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
      name: 'docs',
      type: 'array',
      label: 'Документы',
      labels: {
        singular: 'Документ',
        plural: 'Документы',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'Ссылка',
        },
      ],
    },
  ],
}

export const ProviderSections: CollectionConfig = {
  slug: 'provider-sections',
  labels: {
    singular: 'Раздел сведений',
    plural: 'Сведения организации',
  },
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'title',
    group: 'Сведения',
    defaultColumns: ['title', 'slug', 'scope', 'sortOrder'],
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
      name: 'scope',
      type: 'select',
      label: 'Область',
      required: true,
      defaultValue: 'both',
      options: [
        { label: 'Социальные услуги', value: 'social' },
        { label: 'Образование', value: 'education' },
        { label: 'Оба раздела', value: 'both' },
      ],
      admin: {
        position: 'sidebar',
      },
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
      name: 'blocks',
      type: 'blocks',
      label: 'Блоки',
      blocks: [Heading, Paragraph, List, Docs, Card],
    },
  ],
}
