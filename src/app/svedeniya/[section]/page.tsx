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
import { providerNav } from "@/data/providerNav";
import { siteConfig } from "@/data/content";

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
  const item = providerNav.find((s) => s.id === section);
  return {
    title: item?.title ?? "Сведения",
    description: `${item?.title ?? "Сведения"} — ${siteConfig.name}`,
  };
}

export default async function ProviderSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const item = providerNav.find((s) => s.id === section);
  const Body = bodies[section];
  if (!item || !Body) notFound();

  return (
    <ProviderShell
      basePath="/svedeniya"
      currentId={section}
      eyebrow="Сведения о поставщике социальных услуг"
      title={item.title}
    >
      <Body />
    </ProviderShell>
  );
}
