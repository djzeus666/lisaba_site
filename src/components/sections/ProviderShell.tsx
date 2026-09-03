import Link from "next/link";
import { providerNav as defaultNav } from "@/data/providerNav";
import { cn } from "@/lib/cn";

export function ProviderShell({
  basePath,
  currentId,
  eyebrow,
  title,
  children,
  osnovnyeHref,
  navItems = defaultNav,
}: {
  basePath: string;
  currentId: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  /** Separate landing URL for «Основные сведения» (e.g. /obrazovanie) */
  osnovnyeHref?: string;
  navItems?: { id: string; title: string }[];
}) {
  const hrefFor = (id: string) =>
    id === "osnovnye" ? (osnovnyeHref ?? basePath) : `${basePath}/${id}`;

  return (
    <div className="mesh-gradient min-h-[70vh] pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="section-container max-w-7xl">
        <Link
          href="/"
          className="focus-ring text-sm font-medium text-brand-blue transition-colors hover:text-brand-orange"
        >
          ← На главную
        </Link>
        <p className="section-eyebrow mt-8">{eyebrow}</p>
        <h1 className="section-title max-w-4xl">{title}</h1>

        <div className="section-block grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
          <nav className="lg:sticky lg:top-32" aria-label="Разделы сведений">
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {navItems.map((item) => {
                const active = item.id === currentId;
                return (
                  <li key={item.id} className="shrink-0 lg:shrink">
                    <Link
                      href={hrefFor(item.id)}
                      className={cn(
                        "focus-ring block rounded-xl px-3 py-2.5 text-sm leading-snug transition-colors",
                        active
                          ? "bg-brand-blue text-white"
                          : "text-brand-black/70 hover:bg-brand-blue/8 hover:text-brand-blue",
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="min-w-0 space-y-6 text-sm leading-relaxed text-brand-black/75 sm:text-base">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DocList({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={`${item.label}-${item.href || ""}`}>
          <a
            href={item.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-blue underline-offset-2 hover:underline"
          >
            {item.label} →
          </a>
        </li>
      ))}
    </ul>
  );
}

export function InfoCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-brand-black/8 bg-brand-white/80 p-5 sm:p-6">
      {title && <h2 className="text-lg font-bold text-brand-black">{title}</h2>}
      <div className={title ? "mt-4 space-y-3" : "space-y-3"}>{children}</div>
    </section>
  );
}
