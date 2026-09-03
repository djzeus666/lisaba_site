"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormField, Input, Textarea } from "@/components/ui/FormField";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function ContactForm({
  site = siteConfig,
}: { site?: typeof siteConfig } = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          childAge: data.get("child-age"),
          message: data.get("message"),
        }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Ошибка отправки");
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось отправить заявку");
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="contacts" size="narrow" className="bg-accent-blue-light/10">
      <SectionHeader
        eyebrow="Запись"
        title="Оставьте заявку"
        description="Мы свяжемся с вами в течение рабочего дня"
      />

      <Reveal delay={0.1} className="section-block">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-accent-green/30 bg-accent-green/10 p-8 text-center"
          >
            <p className="text-lg font-semibold text-brand-black">Спасибо! Заявка отправлена.</p>
            <p className="mt-2 text-sm text-brand-black/60">
              Или позвоните нам:{" "}
              <a href={site.phoneHref} className="font-semibold text-brand-blue">
                {site.phone}
              </a>
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-brand-black/8 bg-brand-white p-6 shadow-soft sm:p-8"
          >
            <div className="grid gap-5">
              <FormField label="Ваше имя" htmlFor="name" required>
                <Input id="name" name="name" type="text" required placeholder="Как к вам обращаться?" />
              </FormField>

              <FormField label="Телефон" htmlFor="phone" required>
                <Input id="phone" name="phone" type="tel" required placeholder="+7 (___) ___-__-__" />
              </FormField>

              <FormField label="Возраст ребёнка" htmlFor="child-age">
                <Input id="child-age" name="child-age" type="text" placeholder="Например: 4 года" />
              </FormField>

              <FormField label="Комментарий" htmlFor="message">
                <Textarea id="message" name="message" placeholder="Расскажите, с чем нужна помощь" />
              </FormField>

              {error ? (
                <p className="text-sm font-medium text-red-600" role="alert">
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={sending}
                icon={<Send className="h-4 w-4" />}
              >
                {sending ? "Отправка…" : "Отправить заявку"}
              </Button>

              <p className="text-center text-xs leading-relaxed text-brand-black/45">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <Link
                  href={site.privacyPolicy}
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
      </Reveal>
    </Section>
  );
}
