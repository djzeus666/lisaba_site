import type { Metadata } from "next";
import { SimplePageBody } from "@/components/ui/SimplePageBody";
import { InfoPageShell } from "@/components/ui/InfoPageShell";
import { siteConfig } from "@/data/content";
import { getPageBySlug } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Благотворителям",
  description: `Поддержка центра ${siteConfig.name}: как помочь детям и семьям`,
};

function StaticDonorsContent() {
  return (
    <>
      <p>
        Центр «{siteConfig.name}» открыт к сотрудничеству с частными благотворителями, фондами и
        компаниями. Поддержка помогает семьям оплачивать диагностику и курсы занятий, развивать
        оборудование сенсорного зала и расширять доступность помощи.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Целевая помощь конкретным программам и семьям</li>
        <li>Поддержка оснащения сенсорно-динамического зала</li>
        <li>Партнёрские и корпоративные инициативы</li>
      </ul>
      <p>
        Чтобы обсудить формат помощи, свяжитесь с нами:{" "}
        <a href={siteConfig.phoneHref} className="font-medium text-brand-blue">
          {siteConfig.phone}
        </a>
        ,{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-blue">
          {siteConfig.email}
        </a>
        .
      </p>
    </>
  );
}

export default async function ForDonorsPage() {
  const page = await getPageBySlug("blagotvoritelyam");
  const hasCmsBody = Boolean(page?.body);

  return (
    <InfoPageShell
      eyebrow={page?.eyebrow || "Поддержка"}
      title={page?.title || "Благотворителям"}
      description={
        page?.description ||
        "Вы можете помочь детям с особенностями развития получить занятия и поддержку специалистов."
      }
    >
      {hasCmsBody && page?.body ? <SimplePageBody body={page.body} /> : <StaticDonorsContent />}
    </InfoPageShell>
  );
}
