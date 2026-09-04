import type { GlobalConfig } from "payload";

export const NotificationSettings: GlobalConfig = {
  slug: "notification-settings",
  label: "Уведомления о заявках",
  access: {
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    description:
      "Все настройки Telegram и Email для новых заявок с формы. Секреты хранятся в базе — не публикуйте их.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Telegram",
          fields: [
            {
              name: "telegramEnabled",
              type: "checkbox",
              label: "Включить Telegram",
              defaultValue: false,
            },
            {
              name: "telegramBotToken",
              type: "text",
              label: "Токен бота",
              admin: {
                description:
                  "Создайте бота у @BotFather и вставьте токен вида 123456:ABC-DEF...",
              },
            },
            {
              name: "telegramChatId",
              type: "text",
              label: "Chat ID (личный или группа)",
              admin: {
                description:
                  "Напишите боту /start, затем узнайте chat_id через @userinfobot или getUpdates.",
              },
            },
          ],
        },
        {
          label: "Email (SMTP)",
          fields: [
            {
              name: "emailEnabled",
              type: "checkbox",
              label: "Включить Email",
              defaultValue: false,
            },
            {
              name: "notifyEmails",
              type: "array",
              label: "Адреса получателей",
              labels: {
                singular: "Email",
                plural: "Emails",
              },
              fields: [
                {
                  name: "email",
                  type: "email",
                  label: "Email",
                  required: true,
                },
              ],
            },
            {
              name: "smtpHost",
              type: "text",
              label: "SMTP хост",
              admin: {
                description: "Например smtp.yandex.ru, smtp.mail.ru, smtp.gmail.com",
              },
            },
            {
              name: "smtpPort",
              type: "number",
              label: "SMTP порт",
              defaultValue: 587,
              admin: {
                description: "Обычно 587 (STARTTLS) или 465 (SSL)",
              },
            },
            {
              name: "smtpUser",
              type: "text",
              label: "SMTP логин",
            },
            {
              name: "smtpPass",
              type: "text",
              label: "SMTP пароль",
              admin: {
                description: "Пароль приложения / пароль почтового ящика",
              },
            },
            {
              name: "smtpFrom",
              type: "email",
              label: "Отправитель (From)",
              admin: {
                description: "Если пусто — используется SMTP логин",
              },
            },
          ],
        },
      ],
    },
  ],
};
