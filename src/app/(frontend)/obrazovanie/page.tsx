import type { Metadata } from "next";
import { OsnovnyeContent } from "@/components/sections/OsnovnyeContent";
import { ProviderShell } from "@/components/sections/ProviderShell";
import { getOrganization, getProviderNav, getSiteSettings } from "@/lib/cms/queries";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    title: "Сведения об образовательной организации",
    description: `Сведения об образовательной организации — ${site.name}`,
  };
}

export default async function EducationOrgPage() {
  const [org, site, navItems] = await Promise.all([
    getOrganization(),
    getSiteSettings(),
    getProviderNav("education"),
  ]);

  return (
    <ProviderShell
      basePath="/svedeniya"
      osnovnyeHref="/obrazovanie"
      currentId="osnovnye"
      eyebrow="Сведения об образовательной организации"
      title="Основные сведения"
      navItems={navItems}
    >
      <OsnovnyeContent org={org} rekvizityUrl={site.rekvizityUrl} />
    </ProviderShell>
  );
}
