import type { Metadata } from "next";
import { InfoPageShell } from "@/components/ui/InfoPageShell";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Специалистам",
  description: `Сотрудничество и профессиональное развитие для специалистов — ${siteConfig.name}`,
};

export default function ForSpecialistsPage() {
  return (
    <InfoPageShell
      eyebrow="Партнёрам"
      title="Специалистам"
      description="Приглашаем коллег к сотрудничеству, стажировкам и профессиональному обмену опытом."
    >
      <p>
        Если вы логопед, дефектолог, психолог, нейропсихолог или специалист по сенсорной
        интеграции — будем рады знакомству. В центре «{siteConfig.name}» можно обсудить
        совместную практику, направление семей и участие в образовательных мероприятиях.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Стажировки и обмен опытом</li>
        <li>Совместные программы для семей</li>
        <li>Консультации по сенсорной интеграции и смежным направлениям</li>
      </ul>
      <p>
        Напишите на{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-blue">
          {siteConfig.email}
        </a>{" "}
        или позвоните{" "}
        <a href={siteConfig.phoneHref} className="font-medium text-brand-blue">
          {siteConfig.phone}
        </a>
        — расскажем о форматах сотрудничества.
      </p>
    </InfoPageShell>
  );
}
