import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Контакты',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Короткое название',
              required: true,
            },
            {
              name: 'fullName',
              type: 'text',
              label: 'Полное название',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Телефон',
            },
            {
              name: 'phoneHref',
              type: 'text',
              label: 'Ссылка телефона',
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email',
            },
            {
              name: 'orgEmail',
              type: 'email',
              label: 'Организационный email',
            },
            {
              name: 'city',
              type: 'text',
              label: 'Город',
            },
            {
              name: 'address',
              type: 'text',
              label: 'Адрес',
            },
            {
              name: 'addressShort',
              type: 'text',
              label: 'Короткий адрес',
            },
            {
              name: 'workingHours',
              type: 'text',
              label: 'Часы работы',
            },
            {
              name: 'website',
              type: 'text',
              label: 'Сайт',
            },
            {
              name: 'logo',
              type: 'upload',
              label: 'Логотип',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Соцсети и ссылки',
          fields: [
            {
              name: 'vk',
              type: 'text',
              label: 'ВКонтакте',
            },
            {
              name: 'ok',
              type: 'text',
              label: 'Одноклассники',
            },
            {
              name: 'telegram',
              type: 'text',
              label: 'Telegram',
            },
            {
              name: 'youtube',
              type: 'text',
              label: 'YouTube',
            },
            {
              name: 'maxBooking',
              type: 'text',
              label: 'Ссылка записи (Max / якорь)',
            },
            {
              name: 'socialProviderUrl',
              type: 'text',
              label: 'URL сведений о поставщике',
            },
            {
              name: 'specialistsPage',
              type: 'text',
              label: 'Страница специалистов',
            },
            {
              name: 'privacyPolicy',
              type: 'text',
              label: 'Политика конфиденциальности',
            },
            {
              name: 'rekvizityUrl',
              type: 'text',
              label: 'URL реквизитов',
            },
            {
              name: 'promoVideoId',
              type: 'text',
              label: 'ID промо-видео YouTube',
            },
            {
              name: 'mapEmbedUrl',
              type: 'textarea',
              label: 'URL встраивания карты',
            },
          ],
        },
        {
          label: 'Главный экран',
          fields: [
            {
              name: 'heroBadges',
              type: 'array',
              label: 'Бейджи героя',
              labels: {
                singular: 'Бейдж',
                plural: 'Бейджи',
              },
              fields: [
                {
                  name: 'id',
                  type: 'text',
                  label: 'ID',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Подпись',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Иконка',
                },
              ],
            },
          ],
        },
        {
          label: 'О центре',
          fields: [
            {
              name: 'aboutTitle',
              type: 'textarea',
              label: 'Заголовок блока «О центре»',
            },
            {
              name: 'aboutLead',
              type: 'textarea',
              label: 'Лид',
            },
            {
              name: 'aboutBody',
              type: 'textarea',
              label: 'Основной текст',
            },
            {
              name: 'aboutStats',
              type: 'array',
              label: 'Статистика',
              labels: {
                singular: 'Показатель',
                plural: 'Показатели',
              },
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: 'Значение',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Подпись',
                  required: true,
                },
              ],
            },
            {
              name: 'aboutValues',
              type: 'array',
              label: 'Ценности',
              labels: {
                singular: 'Ценность',
                plural: 'Ценности',
              },
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Иконка (microscope|heart|award|sparkles)',
                },
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
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
