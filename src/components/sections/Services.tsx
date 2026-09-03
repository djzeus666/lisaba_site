"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  MessageCircle,
  Scan,
  BookOpen,
  Heart,
  Check,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { PillButton } from "@/components/ui/Button";
import { IconBox } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  message: MessageCircle,
  scan: Scan,
  book: BookOpen,
  heart: Heart,
};

export function Services({ items = services }: { items?: typeof services } = {}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const cardRef = useRef<HTMLDivElement>(null);
  const active = items.find((s) => s.id === activeId) ?? items[0];

  const selectService = (id: string) => {
    setActiveId(id);
    requestAnimationFrame(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  };

  return (
    <Section id="services" className="bg-brand-white">
      <SectionHeader
        eyebrow="Услуги и диагностика"
        title="Компас развития"
        description="Индивидуальные программы, основанные на научных методах и многолетнем опыте"
      />

      {!items.length || !active ? (
        <p className="section-block text-center text-sm text-brand-black/50">
          Услуги скоро появятся
        </p>
      ) : (
        <>
          <Reveal delay={0.1} className="section-block">
            <div
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
              role="tablist"
              aria-label="Направления услуг"
            >
              {items.map((service) => {
                const Icon = iconMap[service.icon] ?? Brain;
                const isActive = service.id === activeId;
                return (
                  <PillButton
                    key={service.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="service-panel"
                    active={isActive}
                    onClick={() => selectService(service.id)}
                    className="max-w-[220px] shrink-0 sm:max-w-none"
                    title={service.title}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{service.title}</span>
                  </PillButton>
                );
              })}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              ref={cardRef}
              id="service-panel"
              role="tabpanel"
              key={activeId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 md:mt-10"
            >
              <ServiceCard service={active} />
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </Section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[service.icon] ?? Brain;

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-blue/15 bg-gradient-to-br from-brand-white to-accent-blue-light/15 shadow-card">
      <div className="grid gap-8 p-6 md:grid-cols-2 md:items-start md:p-8 lg:p-10">
        <div>
          <div className="flex items-start gap-4">
            <IconBox size="lg" variant="solid">
              <Icon className="h-6 w-6" />
            </IconBox>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-extrabold text-brand-black sm:text-2xl">{service.title}</h3>
              <p className="mt-2 inline-flex h-8 items-center rounded-full bg-brand-orange/10 px-3 text-sm font-semibold text-brand-orange">
                {service.priceFrom}
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed font-light text-brand-black/70 sm:text-base">
            {service.summary}
          </p>
        </div>

        <div className="rounded-2xl border border-brand-black/6 bg-brand-white/70 p-5 md:p-6">
          <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-brand-black/45 uppercase">
            Когда нужна помощь
          </p>
          <ul className="space-y-3">
            {service.symptoms.map((symptom) => (
              <li key={symptom} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-green/20">
                  <Check className="h-3 w-3 text-accent-green" strokeWidth={3} />
                </span>
                <span className="text-sm leading-relaxed text-brand-black/75">{symptom}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-blue/10 px-6 pb-6 md:px-8 md:pb-8 lg:px-10">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="focus-ring mt-5 flex h-12 w-full items-center justify-between rounded-xl bg-brand-black/5 px-5 text-left text-sm font-semibold text-brand-black transition-colors hover:bg-brand-blue/10 hover:text-brand-blue sm:text-base"
          aria-expanded={expanded}
          data-cursor-hover
        >
          {expanded ? "Скрыть подробности" : "Читать подробнее"}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-5 w-5 shrink-0" />
          </motion.span>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-6 pt-4">
                <p className="text-sm leading-relaxed font-light text-brand-black/70 sm:text-base">
                  {service.details}
                </p>

                {service.sections?.map((section) => (
                  <div key={section.title}>
                    <h4 className="text-base font-bold text-brand-black sm:text-lg">
                      {section.title}
                    </h4>
                    {section.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 48)}
                        className="mt-3 text-sm leading-relaxed font-light text-brand-black/70 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.items && section.items.length > 0 && (
                      <ul className="mt-3 space-y-2.5">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/10">
                              <Check className="h-3 w-3 text-brand-blue" strokeWidth={3} />
                            </span>
                            <span className="text-sm leading-relaxed text-brand-black/75">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
