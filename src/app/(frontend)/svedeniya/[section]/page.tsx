import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SectionChislennost,
  SectionFhd,
  SectionFinansy,
  SectionFormy,
  SectionLicenzii,
  SectionLna,
  SectionMesta,
  SectionMto,
  SectionNok,
  SectionPoleznaya,
  SectionPredpisaniya,
  SectionRezultaty,
  SectionRukovodstvo,
  SectionStruktura,
} from "@/components/sections/providerBodies";
import { ProviderShell } from "@/components/sections/ProviderShell";
import { ProviderBlocksRenderer } from "@/components/sections/ProviderBlocksRenderer";
import { providerNav } from "@/data/providerNav";
import { getProviderNav, getProviderSection, getSiteSettings } from "@/lib/cms/queries";

const bodies: Record<string, () => React.ReactNode> = {
  struktura: SectionStruktura,
  formy: SectionFormy,
  chislennost: SectionChislennost,
  rukovodstvo: SectionRukovodstvo,
  mto: SectionMto,
  mesta: SectionMesta,
  finansy: SectionFinansy,
  licenzii: SectionLicenzii,
  fhd: SectionFhd,
  lna: SectionLna,
  predpisaniya: SectionPredpisaniya,
  poleznaya: SectionPoleznaya,
  rezultaty: SectionRezultaty,
  nok: SectionNok,
};

export function generateStaticParams() {
  return providerNav.filter((s) => s.id !== "osnovnye").map((s) => ({ section: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const [cms, site] = await Promise.all([getProviderSection(section), getSiteSettings()]);
  const item = providerNav.find((s) => s.id === section);
  const title = cms?.title ?? item?.title ?? "Сведения";
  return {
    title,
    description: `${title} — ${site.name}`,
  };
}

export default async function ProviderSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const [cms, navItems] = await Promise.all([
    getProviderSection(section),
    getProviderNav("social"),
  ]);
  const item = providerNav.find((s) => s.id === section);
  const Body = bodies[section];

  if (!item && !cms) notFound();
  if (!cms && !Body) notFound();

  const title = cms?.title ?? item!.title;

  return (
    <ProviderShell
      basePath="/svedeniya"
      currentId={section}
      eyebrow="Сведения о поставщике социальных услуг"
      title={title}
      navItems={navItems}
    >
      {cms?.blocks?.length ? (
        <ProviderBlocksRenderer blocks={cms.blocks} />
      ) : Body ? (
        <Body />
      ) : null}
    </ProviderShell>
  );
}
