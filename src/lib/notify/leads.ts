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

type NotifySettings = {
  telegramEnabled?: boolean | null;
  telegramBotToken?: string | null;
  telegramChatId?: string | null;
  emailEnabled?: boolean | null;
  notifyEmails?: Array<{ email?: string | null } | null> | null;
  smtpHost?: string | null;
  smtpPort?: number | null;
  smtpUser?: string | null;
  smtpPass?: string | null;
  smtpFrom?: string | null;
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

export async function sendTelegramLead(
  lead: LeadLike,
  chatId: string,
  botToken: string,
): Promise<boolean> {
  if (!botToken || !chatId) return false;

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
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

export async function sendEmailLead(
  lead: LeadLike,
  to: string[],
  smtp: {
    host: string;
    port: number;
    user: string;
    pass: string;
    from: string;
  },
): Promise<boolean> {
  if (!to.length) return false;
  if (!smtp.host || !smtp.user || !smtp.pass || !smtp.from) {
    console.warn("SMTP not configured in admin — skip email notification");
    return false;
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: { user: smtp.user, pass: smtp.pass },
  });

  await transporter.sendMail({
    from: smtp.from,
    to: to.join(", "),
    subject: `Заявка с сайта: ${lead.name || "без имени"} — ${lead.phone || ""}`,
    text: formatLeadText(lead),
  });

  return true;
}

function resolveTelegram(settings: NotifySettings) {
  return {
    token: settings.telegramBotToken || process.env.TELEGRAM_BOT_TOKEN || "",
    chatId: settings.telegramChatId || "",
  };
}

function resolveSmtp(settings: NotifySettings) {
  const host = settings.smtpHost || process.env.SMTP_HOST || "";
  const user = settings.smtpUser || process.env.SMTP_USER || "";
  const pass = settings.smtpPass || process.env.SMTP_PASS || "";
  const from = settings.smtpFrom || process.env.SMTP_FROM || user;
  const port = Number(settings.smtpPort || process.env.SMTP_PORT || 587);
  return { host, user, pass, from, port };
}

export async function notifyLeadCreated(lead: LeadLike, payload: Payload) {
  const settings = (await payload.findGlobal({
    slug: "notification-settings",
    depth: 0,
  })) as NotifySettings;

  let telegramOk = false;
  let emailOk = false;

  if (settings.telegramEnabled) {
    const { token, chatId } = resolveTelegram(settings);
    if (token && chatId) {
      try {
        telegramOk = await sendTelegramLead(lead, chatId, token);
      } catch (err) {
        payload.logger.error({ err, msg: "Telegram notify failed" });
      }
    } else {
      payload.logger.warn("Telegram enabled but bot token or chat ID is missing");
    }
  }

  if (settings.emailEnabled) {
    const emails = (settings.notifyEmails || [])
      .map((row) => row?.email)
      .filter((email): email is string => Boolean(email));
    const smtp = resolveSmtp(settings);
    try {
      emailOk = await sendEmailLead(lead, emails, smtp);
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
