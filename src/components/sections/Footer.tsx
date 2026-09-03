"use client";

import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useCms } from "@/components/providers/CmsProvider";
import { LisabaLogoLink } from "@/components/ui/LisabaLogo";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const { site, nav } = useCms();
  const { navLinks, topBarLinks } = nav;

  return (
    <footer className="bg-brand-black text-white">
      <div className="section-container max-w-7xl py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <LisabaLogoLink variant="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed font-light text-white/60">
              {site.fullName}
            </p>
            <ul className="mt-6 space-y-3.5 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="focus-ring inline-flex min-h-11 items-center gap-3 text-white/80 transition-colors hover:text-brand-orange"
                >
                  <Phone className="h-4 w-4 shrink-0" /> {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="focus-ring inline-flex min-h-11 items-center gap-3 text-white/80 transition-colors hover:text-brand-orange"
                >
                  <Mail className="h-4 w-4 shrink-0" /> {site.email}
                </a>
              </li>
              <li className="flex min-h-11 items-start gap-3 text-white/80">
                <MapPin className="mt-1 h-4 w-4 shrink-0" /> {site.address}
              </li>
              <li className="flex min-h-11 items-center gap-3 text-white/80">
                <Clock className="h-4 w-4 shrink-0" /> {site.workingHours}
              </li>
            </ul>
            <SocialLinks variant="dark" className="mt-6" />
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold tracking-[0.14em] text-white/40 uppercase">
              Навигация
            </h3>
            <nav className="mt-4 flex flex-col gap-1" aria-label="Навигация в подвале">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring inline-flex min-h-11 items-center text-sm text-white/70 transition-colors hover:text-brand-orange"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <h3 className="mt-8 text-xs font-bold tracking-[0.14em] text-white/40 uppercase">
              Сведения
            </h3>
            <nav className="mt-4 flex flex-col gap-1" aria-label="Сведения в подвале">
              {topBarLinks.map((link) =>
                "external" in link && (link as { external?: boolean }).external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex min-h-11 items-center text-sm text-white/70 transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="focus-ring inline-flex min-h-11 items-center text-sm text-white/70 transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <div className="md:col-span-2 lg:col-span-4">
            <h3 className="text-xs font-bold tracking-[0.14em] text-white/40 uppercase">
              Как нас найти
            </h3>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Карта — центр ЛИСАБА"
                src={site.mapEmbedUrl}
                width="100%"
                height="240"
                className="block"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Научный межотраслевой центр.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href={site.privacyPolicy}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/70"
            >
              Политика персональных данных
            </a>
            <a
              href={site.website}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/70"
            >
              lisaba.ru
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
