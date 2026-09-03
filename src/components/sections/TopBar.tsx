"use client";

import Link from "next/link";
import { useCms } from "@/components/providers/CmsProvider";

export function TopBar() {
  const { site, nav } = useCms();
  const { topBarLinks } = nav;

  return (
    <div className="relative z-[60] hidden border-b border-brand-blue/10 bg-brand-white md:fixed md:inset-x-0 md:top-0 md:block">
      <div className="section-container flex h-9 max-w-7xl items-center justify-between gap-4 text-xs text-brand-black/55">
        <nav
          className="flex min-w-0 flex-1 items-center gap-x-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Сведения и аудитории"
        >
          {topBarLinks.map((link, index) => (
            <span key={link.label} className="inline-flex shrink-0 items-center gap-x-3">
              {index > 0 && (
                <span className="text-brand-black/20" aria-hidden>
                  ·
                </span>
              )}
              {"external" in link && (link as { external?: boolean }).external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring whitespace-nowrap transition-colors hover:text-brand-blue"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="focus-ring whitespace-nowrap transition-colors hover:text-brand-blue"
                >
                  {link.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
        <p className="hidden shrink-0 xl:block">
          {site.addressShort} · {site.phone}
        </p>
      </div>
    </div>
  );
}
