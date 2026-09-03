"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { PillButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pricing } from "@/data/content";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

type Filter = "all" | "diagnostics" | "classes";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Все услуги" },
  { id: "diagnostics", label: "Диагностика" },
  { id: "classes", label: "Занятия" },
];

export function Pricing({ items = pricing }: { items?: typeof pricing } = {}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((p) => p.category === filter)),
    [filter, items],
  );

  return (
    <Section id="pricing" size="wide" className="bg-accent-blue-light/6">
      <SectionHeader
        eyebrow="Прозрачность"
        title="Цены на услуги"
        description="Чёткая структура без скрытых платежей. Принимаем материнский капитал."
      />

      <Reveal delay={0.1} className="section-block flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <PillButton
            key={f.id}
            active={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </PillButton>
        ))}
      </Reveal>

      <Reveal delay={0.15} className="mt-8 overflow-hidden rounded-2xl border border-brand-blue/20 shadow-soft md:mt-10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-brand-blue/15 bg-brand-blue/5">
                <th className="w-[52%] px-5 py-4 text-xs font-bold tracking-[0.12em] text-brand-black uppercase md:px-6">
                  Услуга
                </th>
                <th className="w-[22%] px-5 py-4 text-xs font-bold tracking-[0.12em] text-brand-black uppercase md:px-6">
                  Длительность
                </th>
                <th className="w-[26%] px-5 py-4 text-right text-xs font-bold tracking-[0.12em] text-brand-black uppercase md:px-6">
                  Стоимость
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-brand-blue/8 transition-colors last:border-b-0 hover:bg-accent-blue-light/15"
                >
                  <td className="px-5 py-4 align-middle md:px-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                      <span className="text-sm font-medium text-brand-black md:text-base">{row.name}</span>
                      <span
                        className={cn(
                          "inline-flex h-6 w-fit items-center rounded-full px-2.5 text-[10px] font-bold tracking-wide uppercase",
                          row.category === "diagnostics"
                            ? "bg-brand-blue/10 text-brand-blue"
                            : "bg-accent-green/15 text-accent-green",
                        )}
                      >
                        {row.category === "diagnostics" ? "Диагностика" : "Занятие"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle text-sm text-brand-black/60 md:px-6">
                    {row.duration}
                  </td>
                  <td className="px-5 py-4 text-right align-middle text-base font-bold whitespace-nowrap text-brand-orange md:px-6 md:text-lg">
                    {row.price}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-6 text-center text-xs font-light text-brand-black/50 sm:text-sm">
          * Принимаем оплату материнским капиталом. Актуальные условия уточняйте у администратора.
        </p>
      </Reveal>
    </Section>
  );
}
