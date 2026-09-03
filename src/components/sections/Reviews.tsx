"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Send, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormField, Input, Textarea } from "@/components/ui/FormField";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { reviewImages, siteConfig } from "@/data/content";
import { cn } from "@/lib/cn";

type Props = {
  images?: typeof reviewImages;
  texts?: { id: string; name: string; text: string; rating?: number }[];
  privacyPolicy?: string;
};

export function Reviews({
  images = reviewImages,
  texts = [],
  privacyPolicy = siteConfig.privacyPolicy,
}: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") {
        setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length));
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, images.length]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          text: data.get("text"),
          rating,
        }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Ошибка отправки");
      setSubmitted(true);
      form.reset();
      setRating(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось отправить отзыв");
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="reviews" className="bg-brand-white">
      <SectionHeader
        eyebrow="Отзывы"
        title="Что говорят родители"
        description="Реальные отзывы семей, которые проходят занятия в центре ЛИСАБА"
      />

      <Reveal delay={0.08} className="section-block">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              className="focus-ring mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-brand-black/8 bg-brand-black/[0.02] shadow-soft transition-shadow hover:shadow-card"
              data-cursor-hover
              aria-label={`Открыть ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={720}
                height={960}
                className="h-auto w-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </button>
          ))}
        </div>
      </Reveal>

      {texts.length > 0 && (
        <Reveal delay={0.1} className="section-block">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {texts.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-brand-black/8 bg-accent-blue-light/10 p-5 shadow-soft"
              >
                <div className="flex items-center gap-1" aria-label={`Оценка ${review.rating ?? 5}`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < (review.rating ?? 5)
                          ? "fill-brand-orange text-brand-orange"
                          : "text-brand-black/20",
                      )}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-brand-black/75">{review.text}</p>
                <p className="mt-4 text-sm font-semibold text-brand-black">{review.name}</p>
              </article>
            ))}
          </div>
        </Reveal>
      )}

      <Reveal delay={0.12} className="mt-14 md:mt-16">
        <div className="mx-auto max-w-2xl">
          <h3 className="text-center text-xl font-extrabold text-brand-black sm:text-2xl">
            Оставить отзыв
          </h3>
          <p className="mt-2 text-center text-sm font-light text-brand-black/60 sm:text-base">
            Поделитесь впечатлениями — отзыв появится после проверки
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 rounded-2xl border border-accent-green/30 bg-accent-green/10 p-8 text-center"
            >
              <p className="text-lg font-semibold text-brand-black">Спасибо за отзыв!</p>
              <p className="mt-2 text-sm text-brand-black/60">
                Мы получили сообщение и опубликуем его после модерации.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="focus-ring mt-5 text-sm font-semibold text-brand-blue hover:underline"
              >
                Написать ещё один
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-2xl border border-brand-black/8 bg-accent-blue-light/10 p-6 sm:p-8"
            >
              <div className="grid gap-5">
                <div>
                  <p className="mb-2 text-sm font-medium text-brand-black/70">Оценка</p>
                  <div className="flex items-center gap-1" role="radiogroup" aria-label="Оценка">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={rating === value}
                        onClick={() => setRating(value)}
                        className="focus-ring rounded-md p-1"
                        data-cursor-hover
                      >
                        <Star
                          className={cn(
                            "h-7 w-7 transition-colors",
                            value <= rating
                              ? "fill-brand-orange text-brand-orange"
                              : "text-brand-black/20",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <FormField label="Ваше имя" htmlFor="review-name" required>
                  <Input
                    id="review-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={80}
                    placeholder="Как подписаться под отзывом?"
                  />
                </FormField>

                <FormField label="Телефон" htmlFor="review-phone">
                  <Input
                    id="review-phone"
                    name="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__ (необязательно)"
                  />
                </FormField>

                <FormField label="Ваш отзыв" htmlFor="review-text" required>
                  <Textarea
                    id="review-text"
                    name="text"
                    required
                    minLength={10}
                    maxLength={2000}
                    placeholder="Расскажите о занятиях, специалистах и результате"
                  />
                </FormField>

                {error && (
                  <p className="text-sm font-medium text-red-600" role="alert">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={sending}
                  icon={<Send className="h-4 w-4" />}
                >
                  {sending ? "Отправляем…" : "Отправить отзыв"}
                </Button>

                <p className="text-center text-xs leading-relaxed text-brand-black/45">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <Link
                    href={privacyPolicy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue underline-offset-2 hover:underline"
                  >
                    политикой обработки персональных данных
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </Reveal>

      <AnimatePresence>
        {active !== null && images[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-black/80 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр отзыва"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="focus-ring absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length));
              }}
              className="focus-ring absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 md:left-6"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.div
              key={images[active].id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl bg-brand-white shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active].src}
                alt={images[active].alt}
                width={900}
                height={1200}
                className="h-auto max-h-[85vh] w-auto object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i === null ? i : (i + 1) % images.length));
              }}
              className="focus-ring absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 md:right-6"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
