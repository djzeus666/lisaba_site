import { About } from "@/components/sections/About";
import { ContactForm } from "@/components/sections/ContactForm";
import { Equipment } from "@/components/sections/Equipment";
import { Hero } from "@/components/sections/Hero";
import { Matkapital } from "@/components/sections/Matkapital";
import { Pricing } from "@/components/sections/Pricing";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { VideoSection } from "@/components/sections/VideoSection";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type {
  EquipmentItem,
  PricingRow,
  ServiceItem,
  Specialist,
} from "@/data/content";
import { mediaUrl } from "@/lib/cms/media";
import type { CmsSiteSettings } from "@/lib/cms/queries";
import Image from "next/image";

type HomepageData = {
  site: CmsSiteSettings;
  services: ServiceItem[];
  specialists: Specialist[];
  pricing: PricingRow[];
  equipment: EquipmentItem[];
  matkapital: { step: number; title: string; description: string }[];
  reviews: {
    images: { id: string; src: string; alt: string }[];
    texts: { id: string; name: string; text: string; rating?: number }[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout: any[];
};

export function HomepageBlocks({ data }: { data: HomepageData }) {
  const { site, layout } = data;

  return (
    <>
      {layout.map((block, index) => {
        const key = `${block.blockType}-${index}`;
        switch (block.blockType) {
          case "hero":
            return (
              <Hero
                key={key}
                site={site}
                badges={site.heroBadges}
                eyebrow={block.eyebrow}
                title={block.title}
                subtitle={block.subtitle}
              />
            );
          case "about":
            return (
              <About
                key={key}
                title={site.aboutTitle}
                lead={site.aboutLead}
                body={site.aboutBody}
                stats={site.aboutStats}
                values={site.aboutValues}
              />
            );
          case "video":
            return <VideoSection key={key} videoId={site.promoVideoId} />;
          case "services":
            return <Services key={key} items={data.services} />;
          case "equipment":
            return <Equipment key={key} items={data.equipment} />;
          case "pricing":
            return <Pricing key={key} items={data.pricing} />;
          case "matkapital":
            return <Matkapital key={key} steps={data.matkapital} />;
          case "team":
            return <Team key={key} specialists={data.specialists} />;
          case "reviews":
            return (
              <Reviews
                key={key}
                images={data.reviews.images}
                texts={data.reviews.texts}
                privacyPolicy={site.privacyPolicy}
              />
            );
          case "contact":
            return <ContactForm key={key} site={site} />;
          case "gallery":
            return <GalleryBlock key={key} block={block} />;
          case "documents":
            return <DocumentsBlock key={key} block={block} />;
          case "cta":
            return <CtaBlock key={key} block={block} />;
          case "richText":
            return (
              <Section key={key} id={block.anchor || undefined}>
                {block.title ? (
                  <SectionHeader eyebrow="Раздел" title={block.title} />
                ) : null}
                <p className="mt-6 text-center text-sm text-brand-black/50">
                  Содержимое rich text редактируется в админке (/admin → Главная страница).
                </p>
              </Section>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

function GalleryBlock({
  block,
}: {
  block: { title?: string; images?: unknown[] };
}) {
  const images = (block.images || [])
    .map((img, i) => ({
      src: mediaUrl(img as never),
      alt: `Фото ${i + 1}`,
    }))
    .filter((i): i is { src: string; alt: string } => Boolean(i.src));

  if (!images.length) return null;

  return (
    <Section>
      {block.title ? <SectionHeader eyebrow="Галерея" title={block.title} /> : null}
      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((img) => (
          <div
            key={img.src}
            className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-brand-black/8"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

function DocumentsBlock({
  block,
}: {
  block: {
    title?: string;
    items?: { label: string; url?: string; file?: unknown }[];
  };
}) {
  const items = (block.items || []).map((item) => ({
    label: item.label,
    href: item.url || mediaUrl(item.file as never) || "#",
  }));
  if (!items.length) return null;
  return (
    <Section>
      {block.title ? <SectionHeader eyebrow="Документы" title={block.title} /> : null}
      <ul className="mx-auto mt-8 max-w-3xl space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="font-medium text-brand-blue hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function CtaBlock({
  block,
}: {
  block: { title: string; text?: string; buttonLabel: string; buttonHref: string };
}) {
  return (
    <Section className="bg-brand-blue/5">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-extrabold text-brand-black sm:text-3xl">{block.title}</h2>
        {block.text ? <p className="mt-4 text-brand-black/65">{block.text}</p> : null}
        <div className="mt-8 flex justify-center">
          <Button href={block.buttonHref}>{block.buttonLabel}</Button>
        </div>
      </div>
    </Section>
  );
}
