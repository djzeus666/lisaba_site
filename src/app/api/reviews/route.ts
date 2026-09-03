import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/cms/payload";

export const runtime = "nodejs";

type Body = {
  name?: unknown;
  text?: unknown;
  rating?: unknown;
  phone?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const text = typeof body.text === "string" ? body.text.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const rating = Number(body.rating);

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ error: "Укажите имя (2–80 символов)" }, { status: 400 });
    }
    if (text.length < 10 || text.length > 2000) {
      return NextResponse.json({ error: "Текст отзыва: 10–2000 символов" }, { status: 400 });
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Оценка должна быть от 1 до 5" }, { status: 400 });
    }

    const payload = await getPayloadClient();
    const doc = await payload.create({
      collection: "reviews",
      data: {
        type: "text",
        name,
        text,
        rating,
        phone: phone || undefined,
        status: "draft",
        source: "form",
      },
      overrideAccess: true,
    });

    return NextResponse.json({ ok: true, id: doc.id });
  } catch (err) {
    console.error("reviews POST", err);
    return NextResponse.json({ error: "Не удалось сохранить отзыв" }, { status: 500 });
  }
}
