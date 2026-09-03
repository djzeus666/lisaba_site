"use client";

import { motion } from "framer-motion";
import { Award, HeartHandshake, Microscope, Sparkles, type LucideIcon } from "lucide-react";
import { Card, IconBox } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

const defaultValues = [
  {
    icon: Microscope,
    title: "Научный подход",
    description:
      "Современные методы работы, подтверждённые научными исследованиями.",
  },
  {
    icon: HeartHandshake,
    title: "Эмпатия и забота",
    description:
      "Мы понимаем переживания родителей и создаём атмосферу принятия для каждого ребёнка.",
  },
  {
    icon: Award,
    title: "Лицензия и опыт",
    description:
      "Образовательная лицензия, сертифицированные специалисты, более 10 лет практики.",
  },
  {
    icon: Sparkles,
    title: "Индивидуальность",
    description:
      "Программа разрабатывается персонально — с учётом диагностики, возраста и целей семьи.",
  },
];

const defaultStats = [
  { value: "10+", label: "лет опыта" },
  { value: "500+", label: "семей" },
  { value: "ИППСУ", label: "доступен" },
];

const defaultTitle = "Пространство, где каждый ребёнок раскрывает свой потенциал";
const defaultLead =
  "Центр «ЛИСАБА» — это команда специалистов, объединённых миссией помочь детям с особенностями развития обрести уверенность, навыки саморегуляции и радость от познания мира.";
const defaultBody =
  "Мы работаем в тесном контакте с родителями, обеспечивая прозрачность процесса и измеримые результаты на каждом этапе.";

const iconMap: Record<string, LucideIcon> = {
  microscope: Microscope,
  heart: HeartHandshake,
  award: Award,
  sparkles: Sparkles,
};

type Props = {
  title?: string;
  lead?: string;
  body?: string;
  stats?: { value: string; label: string }[];
  values?: { icon?: string; title: string; description: string }[];
};

export function About({
  title = defaultTitle,
  lead = defaultLead,
  body = defaultBody,
  stats = defaultStats,
  values,
}: Props = {}) {
  const resolvedValues: { icon: LucideIcon; title: string; description: string }[] = values
    ? values.map((item) => ({
        title: item.title,
        description: item.description,
        icon: (item.icon && iconMap[item.icon]) || Sparkles,
      }))
    : defaultValues;

  return (
    <Section id="about" className="bg-accent-blue-light/8">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <Reveal>
          <SectionHeader align="left" eyebrow="О центре" title={title} />
          <p className="mt-6 text-base leading-relaxed font-light text-brand-black/65 sm:text-lg">
            {lead}
          </p>
          <p className="mt-4 text-base leading-relaxed font-light text-brand-black/65 sm:text-lg">
            {body}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-brand-black/8 pt-8 sm:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-2xl font-extrabold text-brand-blue sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-brand-black/50 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <StaggerContainer className="grid-cards sm:grid-cols-2">
          {resolvedValues.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <motion.div whileHover={{ y: -4 }} className="h-full" data-cursor-hover>
                <Card hover className="flex h-full flex-col">
                  <IconBox size="md">
                    <item.icon className="h-5 w-5" />
                  </IconBox>
                  <h3 className="mt-4 text-base font-bold text-brand-black">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed font-light text-brand-black/60">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}
