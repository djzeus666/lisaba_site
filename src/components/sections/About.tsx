"use client";

import { motion } from "framer-motion";
import { Award, HeartHandshake, Microscope, Sparkles } from "lucide-react";
import { Card, IconBox } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

const values = [
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

export function About() {
  return (
    <Section id="about" className="bg-accent-blue-light/8">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <Reveal>
          <SectionHeader
            align="left"
            eyebrow="О центре"
            title="Пространство, где каждый ребёнок раскрывает свой потенциал"
          />
          <p className="mt-6 text-base leading-relaxed font-light text-brand-black/65 sm:text-lg">
            Центр «ЛИСАБА» — это команда специалистов, объединённых миссией помочь детям
            с особенностями развития обрести уверенность, навыки саморегуляции и радость
            от познания мира.
          </p>
          <p className="mt-4 text-base leading-relaxed font-light text-brand-black/65 sm:text-lg">
            Мы работаем в тесном контакте с родителями, обеспечивая прозрачность процесса
            и измеримые результаты на каждом этапе.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-brand-black/8 pt-8 sm:gap-6">
            {[
              { value: "10+", label: "лет опыта" },
              { value: "500+", label: "семей" },
              { value: "ИППСУ", label: "доступен" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-2xl font-extrabold text-brand-blue sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-brand-black/50 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <StaggerContainer className="grid-cards sm:grid-cols-2">
          {values.map((item) => (
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
