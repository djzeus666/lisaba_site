"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Box,
  Circle,
  Layers,
  Mountain,
  Sparkles,
  Target,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { equipmentItems } from "@/data/content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

const iconMap: Record<string, LucideIcon> = {
  barrel: Circle,
  trampoline: Activity,
  hammock: Waves,
  sandbox: Sparkles,
  pool: Layers,
  platform: Box,
  balance: Target,
  climb: Mountain,
};

export function Equipment() {
  return (
    <Section id="equipment" className="bg-accent-blue-light/8">
      <SectionHeader
        eyebrow="Инфраструктура"
        title="Оборудование центра"
        description="Сенсорная комната, оснащённая профессиональным оборудованием для комплексного развития"
      />

      <StaggerContainer className="section-block grid-cards sm:grid-cols-2 lg:grid-cols-4">
        {equipmentItems.map((item) => {
          const Icon = iconMap[item.icon] ?? Box;
          return (
            <StaggerItem key={item.id} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                className="flex h-full flex-col rounded-2xl border border-brand-black/8 bg-brand-white p-5 shadow-soft transition-shadow hover:shadow-card"
                data-cursor-hover
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-base font-bold text-brand-black">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed font-light text-brand-black/60">
                  {item.description}
                </p>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}
