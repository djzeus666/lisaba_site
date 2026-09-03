import type { GlobalConfig } from 'payload'

export const Organization: GlobalConfig = {
  slug: 'organization',
  label: 'Организация',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Реквизиты',
          fields: [
            {
              name: 'fullName',
              type: 'textarea',
              label: 'Полное наименование',
            },
            {
              name: 'shortName',
              type: 'text',
              label: 'Краткое наименование',
            },
            {
              name: 'legalAddress',
              type: 'textarea',
              label: 'Юридический адрес',
            },
            {
              name: 'postalAddress',
              type: 'textarea',
              label: 'Почтовый адрес',
            },
            {
              name: 'innKpp',
              type: 'text',
              label: 'ИНН / КПП',
            },
            {
              name: 'bank',
              type: 'text',
              label: 'Банк',
            },
            {
              name: 'bik',
              type: 'text',
              label: 'БИК',
            },
            {
              name: 'checkingAccount',
              type: 'text',
              label: 'Расчётный счёт',
            },
            {
              name: 'correspondentAccount',
              type: 'text',
              label: 'Корреспондентский счёт',
            },
            {
              name: 'registrationDate',
              type: 'text',
              label: 'Дата регистрации',
            },
            {
              name: 'founder',
              type: 'textarea',
              label: 'Учредитель',
            },
            {
              name: 'branches',
              type: 'text',
              label: 'Филиалы',
            },
            {
              name: 'phones',
              type: 'text',
              label: 'Телефоны',
            },
            {
              name: 'email',
              type: 'text',
              label: 'Email',
            },
          ],
        },
        {
          label: 'Полустационар',
          fields: [
            {
              name: 'semiStationary',
              type: 'group',
              label: 'Полустационарная форма оказания социальных услуг',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Название',
                },
                {
                  name: 'address',
                  type: 'textarea',
                  label: 'Адрес',
                },
                {
                  name: 'transport',
                  type: 'text',
                  label: 'Проезд',
                },
                {
                  name: 'schedule',
                  type: 'array',
                  label: 'Расписание',
                  labels: {
                    singular: 'Строка',
                    plural: 'Строки',
                  },
                  fields: [
                    {
                      name: 'line',
                      type: 'text',
                      label: 'Текст',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Услуги на дому',
          fields: [
            {
              name: 'homeServices',
              type: 'group',
              label: 'Оказание социальных услуг на дому',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Название',
                },
                {
                  name: 'addresses',
                  type: 'array',
                  label: 'Адреса',
                  labels: {
                    singular: 'Адрес',
                    plural: 'Адреса',
                  },
                  fields: [
                    {
                      name: 'address',
                      type: 'textarea',
                      label: 'Адрес',
                      required: true,
                    },
                    {
                      name: 'transport',
                      type: 'text',
                      label: 'Проезд',
                    },
                  ],
                },
                {
                  name: 'schedule',
                  type: 'array',
                  label: 'Расписание',
                  labels: {
                    singular: 'Строка',
                    plural: 'Строки',
                  },
                  fields: [
                    {
                      name: 'line',
                      type: 'text',
                      label: 'Текст',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
