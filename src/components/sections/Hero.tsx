"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Heart, Shield, Users, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { heroBadges, siteConfig } from "@/data/content";
import { cn } from "@/lib/cn";

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  heart: Heart,
  file: FileText,
  users: Users,
};

const iconStroke = 1.75;

const defaultSubtitle =
  "ЛИСАБА — центр когнитивного и сенсорно-поведенческого развития. Научный подход, заботливые специалисты и индивидуальные программы для каждого ребёнка.";

type Props = {
  site?: typeof siteConfig;
  badges?: typeof heroBadges;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

function HeroBadgeTile({
  label,
  icon: Icon,
  index,
  layout = "horizontal",
}: {
  label: string;
  icon: LucideIcon;
  index: number;
  layout?: "horizontal" | "vertical";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.08, duration: 0.45 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-2xl border border-brand-blue/10 bg-brand-white shadow-soft transition-shadow hover:shadow-card",
        layout === "horizontal"
          ? "grid min-h-[92px] grid-cols-[44px_1fr] items-center gap-3 px-4 py-4"
          : "flex min-h-[88px] flex-col items-center justify-center gap-2.5 px-3 py-4 text-center",
      )}
      data-cursor-hover
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue",
          layout === "horizontal" ? "h-11 w-11" : "h-10 w-10",
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={iconStroke} />
      </div>
      <span
        className={cn(
          "font-semibold text-brand-black",
          layout === "horizontal"
            ? "text-sm leading-snug"
            : "text-[11px] leading-tight sm:text-xs",
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

export function Hero({
  site = siteConfig,
  badges = heroBadges,
  eyebrow,
  title,
  subtitle,
}: Props = {}) {
  const resolvedEyebrow = eyebrow ?? `Центр развития · ${site.city}`;
  const resolvedSubtitle = subtitle ?? defaultSubtitle;

  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] items-start overflow-hidden pt-[5.25rem] pb-14 md:min-h-[calc(100dvh-7rem)] md:items-center md:pt-[7.5rem] md:pb-20">
      <div className="mesh-gradient absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_50%,rgb(2_157_224/0.06),transparent_50%)]" />

      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] h-64 w-64 rounded-full bg-brand-blue/5 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-[5%] h-48 w-48 rounded-full bg-accent-green/10 blur-3xl"
      />

      <div className="section-container grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
        <div className="max-w-xl">
          <Reveal>
            <span className="inline-flex h-9 items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 text-xs font-semibold tracking-[0.14em] text-brand-blue uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
              {resolvedEyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight text-brand-black sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              {title ? (
                title
              ) : (
                <>
                  Путь к{" "}
                  <span className="text-gradient-blue">гармоничному</span>{" "}
                  развитию вашего ребёнка
                </>
              )}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 max-w-lg text-base leading-relaxed font-light text-brand-black/65 sm:text-lg">
              {resolvedSubtitle}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href={site.maxBooking}
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Записаться онлайн
              </Button>
              <Button href="#services" variant="secondary" size="lg">
                Наши услуги
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Desktop badges */}
        <Reveal delay={0.25} className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mx-auto w-full max-w-[440px] rounded-3xl border border-brand-blue/10 bg-brand-white/75 p-6 shadow-elevated backdrop-blur-sm xl:p-7"
          >
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, i) => {
                const Icon = iconMap[badge.icon] ?? Shield;
                return (
                  <HeroBadgeTile
                    key={badge.id}
                    label={badge.label}
                    icon={Icon}
                    index={i}
                    layout="horizontal"
                  />
                );
              })}
            </div>
          </motion.div>
        </Reveal>

        {/* Mobile badges */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {badges.map((badge, i) => {
            const Icon = iconMap[badge.icon] ?? Shield;
            return (
              <HeroBadgeTile
                key={badge.id}
                label={badge.label}
                icon={Icon}
                index={i}
                layout="vertical"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
