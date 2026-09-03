import type { Access, CollectionConfig, CollectionAfterChangeHook } from "payload";
import { notifyLeadCreated } from "@/lib/notify/leads";

const isAuthenticated: Access = ({ req: { user } }) => Boolean(user);

const afterChange: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== "create") return doc;
  // Avoid double-notify on seeded/admin bulk; only form + manual creates notify
  try {
    await notifyLeadCreated(doc, req.payload);
  } catch (err) {
    req.payload.logger.error({ err, msg: "Lead notification failed" });
  }
  return doc;
};

export const Leads: CollectionConfig = {
  slug: "leads",
  labels: {
    singular: "Заявка",
    plural: "Заявки",
  },
  defaultSort: "-createdAt",
  admin: {
    useAsTitle: "name",
    group: "Заявки",
    defaultColumns: ["name", "phone", "status", "source", "createdAt"],
    description: "Заявки с формы на сайте. Новые приходят в Telegram и на email.",
  },
  access: {
    read: isAuthenticated,
    create: () => true,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    afterChange: [afterChange],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Имя",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      label: "Телефон",
      required: true,
    },
    {
      name: "childAge",
      type: "text",
      label: "Возраст ребёнка",
    },
    {
      name: "message",
      type: "textarea",
      label: "Комментарий",
    },
    {
      name: "status",
      type: "select",
      label: "Статус",
      required: true,
      defaultValue: "new",
      options: [
        { label: "Новая", value: "new" },
        { label: "В работе", value: "in_progress" },
        { label: "Закрыта", value: "done" },
        { label: "Спам", value: "spam" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "source",
      type: "select",
      label: "Источник",
      required: true,
      defaultValue: "contact_form",
      options: [
        { label: "Форма на сайте", value: "contact_form" },
        { label: "Вручную в админке", value: "admin" },
      ],
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "adminNote",
      type: "textarea",
      label: "Заметка менеджера",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "notifiedTelegram",
      type: "checkbox",
      label: "Уведомление в Telegram отправлено",
      defaultValue: false,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "notifiedEmail",
      type: "checkbox",
      label: "Уведомление на email отправлено",
      defaultValue: false,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
  ],
};
