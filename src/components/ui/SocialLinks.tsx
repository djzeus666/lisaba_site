"use client";

import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/data/brand";
import { siteConfig } from "@/data/content";
import { cn } from "@/lib/cn";

const socialItems = [
  { key: "vk", href: siteConfig.vk, label: "ВКонтакте", icon: brandAssets.social.vk },
  { key: "ok", href: siteConfig.ok, label: "Одноклассники", icon: brandAssets.social.ok },
  { key: "telegram", href: siteConfig.telegram, label: "Telegram", icon: brandAssets.social.telegram },
  { key: "youtube", href: siteConfig.youtube, label: "YouTube", icon: brandAssets.social.youtube },
] as const;

export function SocialLinks({
  variant = "light",
  compact = false,
  className,
}: {
  variant?: "light" | "dark";
  compact?: boolean;
  className?: string;
}) {
  const isDark = variant === "dark";
  const size = compact ? "h-9 w-9" : "h-11 w-11";
  const iconSize = compact ? "h-4 w-4" : "h-[18px] w-[18px]";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {socialItems.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={cn(
            "focus-ring inline-flex shrink-0 items-center justify-center rounded-full transition-all duration-200",
            size,
            isDark
              ? "bg-white/10 hover:bg-brand-blue"
              : "bg-brand-black/8 hover:bg-brand-blue/12",
          )}
        >
          <Image
            src={item.icon}
            alt=""
            width={18}
            height={18}
            className={cn(
              iconSize,
              "object-contain",
              isDark ? "brightness-0 invert" : "brightness-0 opacity-60",
            )}
          />
        </Link>
      ))}
    </div>
  );
}
