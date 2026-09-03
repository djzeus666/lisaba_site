"use client";

import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/data/brand";
import { cn } from "@/lib/cn";

type LisabaLogoProps = {
  className?: string;
  variant?: "default" | "light";
  /** PNG already contains wordmark — extra text is off by default */
  showText?: boolean;
  compact?: boolean;
};

export function LisabaLogo({
  className = "",
  variant = "default",
  showText = false,
  compact = false,
}: LisabaLogoProps) {
  const isLight = variant === "light";

  return (
    <div className={cn("inline-flex items-center", className)} aria-label="ЛИСАБА — логотип">
      <Image
        src={brandAssets.logo}
        alt="ЛИСАБА"
        width={compact ? 120 : 140}
        height={compact ? 36 : 44}
        priority
        className={cn(
          "w-auto shrink-0 object-contain object-left",
          compact ? "h-8 sm:h-9" : "h-9 sm:h-10",
        )}
      />
      {showText && (
        <span
          className={cn(
            "ml-2 text-xl font-extrabold tracking-tight",
            isLight ? "text-white" : "text-brand-black",
          )}
        >
          ЛИСАБА
        </span>
      )}
    </div>
  );
}

export function LisabaLogoLink({
  variant = "default",
  className,
  compact = false,
}: {
  variant?: "default" | "light";
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("focus-ring shrink-0 rounded-lg", className)}
      aria-label="ЛИСАБА — на главную"
    >
      <LisabaLogo variant={variant} compact={compact} />
    </Link>
  );
}
