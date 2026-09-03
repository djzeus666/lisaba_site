import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/content";
import { cn } from "@/lib/cn";

type InfoPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
};

export function InfoPageShell({
  eyebrow,
  title,
  description,
  children,
  className,
  actions,
}: InfoPageProps) {
  return (
    <div className={cn("mesh-gradient min-h-[70vh] pt-28 pb-16 md:pt-36 md:pb-24", className)}>
      <div className="section-container max-w-3xl">
        <Link
          href="/"
          className="focus-ring text-sm font-medium text-brand-blue transition-colors hover:text-brand-orange"
        >
          ← На главную
        </Link>
        <p className="section-eyebrow mt-8">{eyebrow}</p>
        <h1 className="section-title">{title}</h1>
        <p className="section-description">{description}</p>
        {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
        <div className="section-block space-y-6 text-sm leading-relaxed text-brand-black/75 sm:text-base">
          {children}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/#contacts" size="md">
            Связаться с нами
          </Button>
          <Button href={siteConfig.phoneHref} variant="secondary" size="md">
            {siteConfig.phone}
          </Button>
        </div>
      </div>
    </div>
  );
}
