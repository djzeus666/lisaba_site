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
      "Куда слать новые заявки. Токен бота и SMTP-пароль задаются в .env на сервере (секреты).",
  },
  fields: [
    {
      type: "collapsible",
      label: "Telegram",
      fields: [
        {
          name: "telegramEnabled",
          type: "checkbox",
          label: "Включить Telegram",
          defaultValue: true,
        },
        {
          name: "telegramChatId",
          type: "text",
          label: "Chat ID (личный или группа)",
          admin: {
            description:
              "Напишите боту /start, затем узнайте chat_id через @userinfobot или getUpdates. Env: TELEGRAM_BOT_TOKEN",
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Email",
      fields: [
        {
          name: "emailEnabled",
          type: "checkbox",
          label: "Включить Email",
          defaultValue: true,
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
          admin: {
            description: "SMTP настраивается в .env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM",
          },
        },
      ],
    },
  ],
};
