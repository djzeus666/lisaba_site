"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { matkapitalSteps, siteConfig } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function Matkapital({
  steps = matkapitalSteps,
}: { steps?: typeof matkapitalSteps } = {}) {
  return (
    <Section
      id="matkapital"
      className="overflow-hidden bg-brand-black text-brand-white"
    >
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <Reveal>
          <SectionHeader
            align="left"
            eyebrow="Маткапитал+"
            eyebrowClassName="text-brand-orange"
            title="Оплата материнским капиталом — просто и понятно"
            description="Мы сопровождаем вас на каждом этапе: от консультации до начала занятий. Все документы для ПФР подготовим вместе."
            descriptionClassName="text-white/65"
          />

          <ul className="mt-8 space-y-3.5">
            {[
              "Лицензия на образовательную деятельность",
              "Индивидуальная программа развития (ИПР)",
              "Помощь в оформлении заявления в ПФР",
              "Прямая оплата из средств маткапитала",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/80 sm:text-base">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-green" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button href={siteConfig.maxBooking} size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Бесплатная консультация
            </Button>
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute top-3 bottom-3 left-[18px] w-px bg-brand-blue/35 md:left-[22px]" />
          <div className="space-y-4 md:space-y-5">
            {steps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.06}>
                <div className="relative flex gap-5 pl-12 md:pl-14" data-cursor-hover>
                  <div className="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-sm font-bold md:h-11 md:w-11">
                    {step.step}
                  </div>
                  <div className="min-h-[88px] flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-brand-blue/30 hover:bg-white/[0.07]">
                    <h3 className="text-base font-bold md:text-lg">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed font-light text-white/65">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
