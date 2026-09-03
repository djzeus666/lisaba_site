import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/cms/payload";

export const runtime = "nodejs";

type Body = {
  name?: unknown;
  phone?: unknown;
  childAge?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const childAge = typeof body.childAge === "string" ? body.childAge.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ error: "Укажите имя (2–80 символов)" }, { status: 400 });
    }
    if (phone.length < 5 || phone.length > 40) {
      return NextResponse.json({ error: "Укажите корректный телефон" }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: "Комментарий слишком длинный" }, { status: 400 });
    }

    const payload = await getPayloadClient();
    const doc = await payload.create({
      collection: "leads",
      data: {
        name,
        phone,
        childAge: childAge || undefined,
        message: message || undefined,
        status: "new",
        source: "contact_form",
      },
      overrideAccess: true,
    });

    return NextResponse.json({ ok: true, id: doc.id });
  } catch (err) {
    console.error("leads POST", err);
    return NextResponse.json({ error: "Не удалось отправить заявку" }, { status: 500 });
  }
}
