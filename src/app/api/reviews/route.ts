import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ReviewPayload = {
  name: string;
  text: string;
  rating: number;
  phone?: string;
};

type StoredReview = ReviewPayload & {
  id: string;
  createdAt: string;
};

function dataPath() {
  return path.join(process.cwd(), "data", "review-submissions.json");
}

async function ensureStore(): Promise<StoredReview[]> {
  const file = dataPath();
  await mkdir(path.dirname(file), { recursive: true });
  try {
    const raw = await readFile(file, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ReviewPayload>;
    const name = String(body.name ?? "").trim();
    const text = String(body.text ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const rating = Number(body.rating);

    if (!name || name.length < 2 || name.length > 80) {
      return NextResponse.json({ error: "Укажите имя" }, { status: 400 });
    }
    if (!text || text.length < 10 || text.length > 2000) {
      return NextResponse.json({ error: "Текст отзыва слишком короткий" }, { status: 400 });
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Выберите оценку" }, { status: 400 });
    }

    const reviews = await ensureStore();
    const entry: StoredReview = {
      id: crypto.randomUUID(),
      name,
      text,
      rating: Math.round(rating),
      phone: phone || undefined,
      createdAt: new Date().toISOString(),
    };
    reviews.push(entry);
    await writeFile(dataPath(), JSON.stringify(reviews, null, 2), "utf8");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Не удалось сохранить отзыв" }, { status: 500 });
  }
}
