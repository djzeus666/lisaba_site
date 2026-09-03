"use client";

import { Play } from "lucide-react";
import { siteConfig } from "@/data/content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function VideoSection() {
  return (
    <Section className="bg-brand-white py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="О нас"
          title="Видео про центр"
          description="Центр «ЛИСАБА» был создан для улучшения качества жизни ребёнка и его родителей"
        />
        <Reveal delay={0.1} className="section-block">
          <div className="overflow-hidden rounded-2xl border border-brand-black/8 bg-brand-black shadow-elevated">
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${siteConfig.promoVideoId}?rel=0`}
                title="Видео про центр ЛИСАБА"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${siteConfig.promoVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center justify-center gap-2 bg-brand-black px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:text-brand-orange"
            >
              <Play className="h-4 w-4" />
              Смотреть на YouTube
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
