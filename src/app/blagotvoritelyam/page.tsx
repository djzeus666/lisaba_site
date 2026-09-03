import type { Metadata } from "next";
import { InfoPageShell } from "@/components/ui/InfoPageShell";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Благотворителям",
  description: `Поддержка центра ${siteConfig.name}: как помочь детям и семьям`,
};

export default function ForDonorsPage() {
  return (
    <InfoPageShell
      eyebrow="Поддержка"
      title="Благотворителям"
      description="Вы можете помочь детям с особенностями развития получить занятия и поддержку специалистов."
    >
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
    </InfoPageShell>
  );
}
