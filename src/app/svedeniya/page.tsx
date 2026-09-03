import type { Metadata } from "next";
import { OsnovnyeContent } from "@/components/sections/OsnovnyeContent";
import { ProviderShell } from "@/components/sections/ProviderShell";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Сведения о поставщике социальных услуг",
  description: `Сведения о поставщике социальных услуг — ${siteConfig.name}`,
};

export default function ProviderInfoPage() {
  return (
    <ProviderShell
      basePath="/svedeniya"
      currentId="osnovnye"
      eyebrow="Сведения о поставщике социальных услуг"
      title="Основные сведения"
    >
      <OsnovnyeContent />
    </ProviderShell>
  );
}
