import { Download } from "lucide-react";
import { organizationInfo, siteConfig } from "@/data/content";

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-brand-black/8 py-3 last:border-b-0 sm:grid-cols-[220px_1fr] sm:gap-4">
      <dt className="text-sm font-semibold text-brand-black/55">{label}</dt>
      <dd className="text-sm leading-relaxed text-brand-black/80 sm:text-base">{value}</dd>
    </div>
  );
}

export function OsnovnyeContent({
  org = organizationInfo,
  rekvizityUrl = siteConfig.rekvizityUrl,
}: {
  org?: typeof organizationInfo;
  rekvizityUrl?: string;
} = {}) {
  return (
    <>
      <a
        href={rekvizityUrl}
        download="rekvizity-nmc.txt"
        className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full border border-brand-black/12 bg-brand-white px-6 text-sm font-semibold text-brand-black/75 shadow-sm transition-all hover:border-brand-blue hover:text-brand-blue"
      >
        <Download className="h-4 w-4" />
        Скачать реквизиты
      </a>

      <section className="rounded-2xl border border-brand-black/8 bg-brand-white/80 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-brand-black">Реквизиты организации</h2>
        <dl className="mt-2">
          <InfoRow label="Полное наименование" value={org.fullName} />
          <InfoRow label="Краткое наименование" value={org.shortName} />
          <InfoRow label="Дата регистрации" value={org.registrationDate} />
          <InfoRow label="Юридический адрес" value={org.legalAddress} />
          <InfoRow label="Почтовый адрес" value={org.postalAddress} />
          <InfoRow label="ИНН / КПП" value={org.innKpp} />
          <InfoRow label="Банк" value={org.bank} />
          <InfoRow label="БИК" value={org.bik} />
          <InfoRow label="Расчётный счёт" value={org.checkingAccount} />
          <InfoRow label="Корр. счёт" value={org.correspondentAccount} />
          <InfoRow label="Учредитель" value={org.founder} />
          <InfoRow label="Филиалы" value={org.branches} />
          <InfoRow
            label="Телефон / факс"
            value={
              <a href="tel:+73432714044" className="text-brand-blue hover:underline">
                {org.phones}
              </a>
            }
          />
          <InfoRow
            label="Электронная почта"
            value={
              <a href={`mailto:${org.email}`} className="text-brand-blue hover:underline">
                {org.email}
              </a>
            }
          />
        </dl>
      </section>

      <section className="rounded-2xl border border-brand-black/8 bg-brand-white/80 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-brand-black">{org.semiStationary.title}</h2>
        <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-brand-black/45 uppercase">
          Адрес места фактического осуществления деятельности
        </p>
        <p className="mt-2">{org.semiStationary.address}</p>
        <p className="mt-2 text-brand-black/60">{org.semiStationary.transport}</p>
        <p className="mt-5 text-xs font-semibold tracking-[0.12em] text-brand-black/45 uppercase">
          Режим и график работы
        </p>
        <ul className="mt-2 space-y-1.5">
          {org.semiStationary.schedule.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-brand-black/8 bg-brand-white/80 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-brand-black">{org.homeServices.title}</h2>
        <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-brand-black/45 uppercase">
          Адреса мест фактического осуществления деятельности
        </p>
        <ul className="mt-3 space-y-4">
          {org.homeServices.addresses.map((item) => (
            <li key={item.address}>
              <p>{item.address}</p>
              <p className="mt-1 text-brand-black/60">{item.transport}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs font-semibold tracking-[0.12em] text-brand-black/45 uppercase">
          Режим и график работы
        </p>
        <ul className="mt-2 space-y-1.5">
          {org.homeServices.schedule.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
