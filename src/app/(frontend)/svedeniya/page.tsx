import type { Metadata } from "next";
import { OsnovnyeContent } from "@/components/sections/OsnovnyeContent";
import { ProviderShell } from "@/components/sections/ProviderShell";
import { getOrganization, getProviderNav, getSiteSettings } from "@/lib/cms/queries";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    title: "Сведения о поставщике социальных услуг",
    description: `Сведения о поставщике социальных услуг — ${site.name}`,
  };
}

export default async function ProviderInfoPage() {
  const [org, site, navItems] = await Promise.all([
    getOrganization(),
    getSiteSettings(),
    getProviderNav("social"),
  ]);

  return (
    <ProviderShell
      basePath="/svedeniya"
      currentId="osnovnye"
      eyebrow="Сведения о поставщике социальных услуг"
      title="Основные сведения"
      navItems={navItems}
    >
      <OsnovnyeContent org={org} rekvizityUrl={site.rekvizityUrl} />
    </ProviderShell>
  );
}
