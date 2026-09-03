import type { Metadata } from "next";
import { OsnovnyeContent } from "@/components/sections/OsnovnyeContent";
import { ProviderShell } from "@/components/sections/ProviderShell";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Сведения об образовательной организации",
  description: `Сведения об образовательной организации — ${siteConfig.name}`,
};

export default function EducationOrgPage() {
  return (
    <ProviderShell
      basePath="/svedeniya"
      osnovnyeHref="/obrazovanie"
      currentId="osnovnye"
      eyebrow="Сведения об образовательной организации"
      title="Основные сведения"
    >
      <OsnovnyeContent />
    </ProviderShell>
  );
}
