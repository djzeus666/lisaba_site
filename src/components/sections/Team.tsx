"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { specialists, siteConfig } from "@/data/content";
import { StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

export function Team() {
  return (
    <Section id="specialists" className="bg-accent-blue-light/12">
      <SectionHeader
        eyebrow="Команда"
        title="Специалисты, которым доверяют"
        description="Опытные профессионалы центра когнитивного и сенсорно-поведенческого развития"
      />

      <StaggerContainer className="section-block grid-cards sm:grid-cols-2 lg:grid-cols-3">
        {specialists.map((person) => (
          <StaggerItem key={person.id} className="h-full">
            <SpecialistCard person={person} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}

function SpecialistCard({ person }: { person: (typeof specialists)[0] }) {
  return (
    <article
      className="group relative h-full overflow-hidden rounded-2xl bg-brand-white shadow-soft"
      data-cursor-hover
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={person.image}
          alt={person.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-base font-bold text-white md:text-lg">{person.name}</h3>
          <p className="mt-1 text-sm text-brand-orange transition-colors group-hover:font-semibold">
            {person.role}
          </p>
          <p className="mt-0 max-h-0 overflow-hidden text-sm leading-relaxed text-white/85 opacity-0 transition-all duration-500 group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100">
            {person.bio}
          </p>
          <div className="mt-0 flex max-h-0 gap-2.5 overflow-hidden opacity-0 transition-all duration-500 group-hover:mt-4 group-hover:max-h-12 group-hover:opacity-100">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-brand-orange"
              aria-label={`Позвонить ${person.name}`}
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-brand-orange"
              aria-label={`Написать ${person.name}`}
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
