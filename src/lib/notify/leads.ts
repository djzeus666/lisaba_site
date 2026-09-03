import type { Payload } from "payload";

type LeadLike = {
  id?: string | number;
  name?: string | null;
  phone?: string | null;
  childAge?: string | null;
  message?: string | null;
  source?: string | null;
  createdAt?: string | null;
};

function formatLeadText(lead: LeadLike): string {
  const lines = [
    "🆕 Новая заявка с сайта ЛИСАБА",
    "",
    `👤 Имя: ${lead.name || "—"}`,
    `📞 Телефон: ${lead.phone || "—"}`,
    `👶 Возраст ребёнка: ${lead.childAge || "—"}`,
    `💬 Комментарий: ${lead.message || "—"}`,
    `Источник: ${lead.source || "contact_form"}`,
  ];
  if (lead.createdAt) {
    lines.push(`Время: ${new Date(lead.createdAt).toLocaleString("ru-RU")}`);
  }
  if (lead.id != null) {
    lines.push(`ID: ${lead.id}`);
  }
  return lines.join("\n");
}

export async function sendTelegramLead(lead: LeadLike, chatId: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token || !chatId) return false;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatLeadText(lead),
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram error ${res.status}: ${body}`);
  }
  return true;
}

export async function sendEmailLead(lead: LeadLike, to: string[]): Promise<boolean> {
  if (!to.length) return false;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const port = Number(process.env.SMTP_PORT || 587);

  if (!host || !user || !pass || !from) {
    console.warn("SMTP not configured — skip email notification");
    return false;
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: to.join(", "),
    subject: `Заявка с сайта: ${lead.name || "без имени"} — ${lead.phone || ""}`,
    text: formatLeadText(lead),
  });

  return true;
}

export async function notifyLeadCreated(lead: LeadLike, payload: Payload) {
  const settings = await payload.findGlobal({
    slug: "notification-settings",
    depth: 0,
  });

  let telegramOk = false;
  let emailOk = false;

  if (settings.telegramEnabled && settings.telegramChatId) {
    try {
      telegramOk = await sendTelegramLead(lead, String(settings.telegramChatId));
    } catch (err) {
      payload.logger.error({ err, msg: "Telegram notify failed" });
    }
  }

  if (settings.emailEnabled) {
    const emails = (settings.notifyEmails || [])
      .map((row) => row?.email)
      .filter((email): email is string => Boolean(email));
    try {
      emailOk = await sendEmailLead(lead, emails);
    } catch (err) {
      payload.logger.error({ err, msg: "Email notify failed" });
    }
  }

  if (lead.id != null && (telegramOk || emailOk)) {
    try {
      await payload.update({
        collection: "leads",
        id: lead.id,
        data: {
          notifiedTelegram: telegramOk,
          notifiedEmail: emailOk,
        },
        overrideAccess: true,
      });
    } catch (err) {
      payload.logger.error({ err, msg: "Failed to update lead notify flags" });
    }
  }
}
