"use client";

import { Eye, Menu, Phone, X, Contrast, Type } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAccessibility } from "@/components/providers/AccessibilityProvider";
import { LisabaLogoLink } from "@/components/ui/LisabaLogo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { navLinks, siteConfig, topBarLinks } from "@/data/content";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggle, isImpaired, isHighContrast } = useAccessibility();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const a11yLabel =
    mode === "default"
      ? "Режим для слабовидящих"
      : mode === "impaired"
        ? "Высокий контраст"
        : "Обычный режим";

  const A11yIcon = isHighContrast ? Contrast : isImpaired ? Type : Eye;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-brand-white transition-shadow duration-300 md:top-9",
        scrolled && "border-b border-brand-blue/10 shadow-[0_4px_24px_-4px_rgb(2_157_224/0.12)]",
      )}
    >
      <div className="section-container grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2 lg:h-[4.25rem] lg:gap-3">
        <LisabaLogoLink compact className="z-10" />

        {/* Desktop nav — middle column, scrolls if tight */}
        <nav
          className="hidden min-w-0 xl:block"
          aria-label="Основная навигация"
        >
          <ul className="flex items-center justify-center gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <Link
                  href={link.href}
                  className="focus-ring whitespace-nowrap rounded-full px-2 py-2 text-xs font-medium text-brand-black/70 transition-colors hover:bg-brand-blue/5 hover:text-brand-blue 2xl:px-2.5 2xl:text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-1.5 justify-self-end xl:flex 2xl:gap-2">
          {/* Phone only on xl when TopBar address line is hidden */}
          <a
            href={siteConfig.phoneHref}
            className="focus-ring hidden h-9 w-9 items-center justify-center rounded-full bg-brand-black/6 text-brand-black/65 transition-all hover:bg-brand-blue/10 hover:text-brand-blue xl:inline-flex 2xl:hidden"
            aria-label={`Позвонить: ${siteConfig.phone}`}
          >
            <Phone className="h-4 w-4" />
          </a>

          <div className="hidden min-[1440px]:block">
            <SocialLinks variant="light" compact />
          </div>

          <div className="mx-0.5 hidden h-5 w-px bg-brand-black/10 min-[1440px]:block" aria-hidden />

          <button
            type="button"
            onClick={toggle}
            className={cn(
              "focus-ring inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all",
              mode !== "default"
                ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                : "border-brand-black/12 bg-brand-white text-brand-black/70 hover:border-brand-blue/30 hover:text-brand-blue",
            )}
            aria-label={a11yLabel}
            title={a11yLabel}
          >
            <A11yIcon className="h-4 w-4 shrink-0" />
          </button>

          <Button href={siteConfig.maxBooking} size="sm" className="shrink-0 whitespace-nowrap">
            <span className="2xl:hidden">Записаться</span>
            <span className="hidden 2xl:inline">Записаться онлайн</span>
          </Button>
        </div>

        {/* Mobile / tablet: CTA + menu */}
        <div className="flex shrink-0 items-center gap-2 justify-self-end xl:hidden">
          <Button href={siteConfig.maxBooking} size="sm" className="hidden sm:inline-flex">
            Записаться
          </Button>
          <button
            type="button"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-black/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-brand-blue/10 bg-brand-white/98 backdrop-blur-xl xl:hidden">
          <nav className="section-container flex flex-col gap-0.5 py-3" aria-label="Мобильная навигация">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="focus-ring rounded-xl px-4 py-3 text-base font-medium text-brand-black/80 hover:bg-brand-blue/5 hover:text-brand-blue"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-brand-black/8 pt-2">
              <p className="px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-brand-black/40 uppercase">
                Сведения
              </p>
              {topBarLinks.map((link) =>
                "external" in link && link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="focus-ring block rounded-xl px-4 py-3 text-sm font-medium text-brand-black/70 hover:bg-brand-blue/5 hover:text-brand-blue"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="focus-ring block rounded-xl px-4 py-3 text-sm font-medium text-brand-black/70 hover:bg-brand-blue/5 hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
            <div className="mt-2 flex flex-col gap-2 border-t border-brand-black/8 pt-3">
              <a
                href={siteConfig.phoneHref}
                className="flex h-11 items-center gap-3 whitespace-nowrap px-4 text-brand-black/75 tabular-nums"
              >
                <Phone className="h-4 w-4 shrink-0" /> {siteConfig.phone}
              </a>
              <SocialLinks variant="light" className="px-4" compact />
              <button
                type="button"
                onClick={toggle}
                className="focus-ring flex h-11 items-center gap-3 rounded-xl px-4 text-left font-medium text-brand-blue"
              >
                <A11yIcon className="h-4 w-4" /> {a11yLabel}
              </button>
              <Button href={siteConfig.maxBooking} fullWidth size="md">
                Записаться онлайн
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
