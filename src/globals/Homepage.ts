import type { Block, GlobalConfig } from 'payload'

const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Герой',
    plural: 'Герой',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Надзаголовок (переопределение)',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок (переопределение)',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Подзаголовок (переопределение)',
    },
  ],
}

const marker = (slug: string, singular: string, plural: string): Block => ({
  slug,
  labels: { singular, plural },
  fields: [],
})

const Gallery: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Галерея',
    plural: 'Галереи',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
    },
    {
      name: 'images',
      type: 'upload',
      label: 'Изображения',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}

const RichTextBlock: Block = {
  slug: 'richText',
  labels: {
    singular: 'Текст',
    plural: 'Текстовые блоки',
  },
  fields: [
    {
      name: 'anchor',
      type: 'text',
      label: 'Якорь',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Содержимое',
      required: true,
    },
  ],
}

const Documents: Block = {
  slug: 'documents',
  labels: {
    singular: 'Документы',
    plural: 'Документы',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
    },
    {
      name: 'items',
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
          name: 'url',
          type: 'text',
          label: 'URL',
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

const Cta: Block = {
  slug: 'cta',
  labels: {
    singular: 'Призыв к действию',
    plural: 'Призывы к действию',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Текст',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Текст кнопки',
      required: true,
    },
    {
      name: 'buttonHref',
      type: 'text',
      label: 'Ссылка кнопки',
      required: true,
    },
  ],
}

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Главная страница',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      label: 'Макет',
      blocks: [
        Hero,
        marker('about', 'О центре', 'О центре'),
        marker('video', 'Видео', 'Видео'),
        marker('services', 'Услуги', 'Услуги'),
        marker('equipment', 'Оборудование', 'Оборудование'),
        marker('pricing', 'Цены', 'Цены'),
        marker('matkapital', 'Маткапитал', 'Маткапитал'),
        marker('team', 'Команда', 'Команда'),
        marker('reviews', 'Отзывы', 'Отзывы'),
        marker('contact', 'Контакты', 'Контакты'),
        Gallery,
        RichTextBlock,
        Documents,
        Cta,
      ],
    },
  ],
}
