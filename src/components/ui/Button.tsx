"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline-dark";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-orange text-white shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 border border-transparent",
  secondary:
    "bg-brand-white text-brand-black/75 border border-brand-black/12 hover:border-brand-blue hover:text-brand-blue shadow-sm",
  ghost:
    "bg-brand-black/5 text-brand-black/70 hover:bg-brand-blue/10 hover:text-brand-blue border border-transparent",
  "outline-dark":
    "bg-transparent text-white border border-white/20 hover:border-brand-orange hover:text-brand-orange",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2",
};

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
};

type ButtonAsButton = BaseProps &
  Omit<HTMLMotionProps<"button">, "children"> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    icon,
    fullWidth,
    ...rest
  } = props;

  const classes = cn(
    "focus-ring inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 whitespace-nowrap",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    const isExternal = href.startsWith("http");
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn("inline-flex", fullWidth && "w-full")}
      >
        <Link
          href={href}
          target={isExternal ? target : undefined}
          rel={isExternal && target === "_blank" ? rel ?? "noopener noreferrer" : undefined}
          className={classes}
          data-cursor-hover
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      data-cursor-hover
      {...(rest as HTMLMotionProps<"button">)}
    >
      {content}
    </motion.button>
  );
}

export function PillButton({
  active,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-200",
        active
          ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20"
          : "bg-brand-black/5 text-brand-black/65 hover:bg-brand-blue/10 hover:text-brand-blue",
        className,
      )}
      data-cursor-hover
      {...props}
    >
      {children}
    </button>
  );
}

export function IconButton({
  children,
  className,
  active,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-200",
        active
          ? "border border-brand-blue bg-brand-blue/10 text-brand-blue"
          : "bg-brand-black/5 text-brand-black/55 hover:bg-brand-blue/10 hover:text-brand-blue",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
