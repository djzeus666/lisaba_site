import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
};

const paddings = {
  sm: "p-5",
  md: "p-6",
  lg: "p-6 md:p-8",
};

export function Card({ children, className, padding = "md", hover }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-black/8 bg-brand-white shadow-soft",
        paddings[padding],
        hover && "transition-all duration-300 hover:border-brand-blue/20 hover:shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function IconBox({
  children,
  className,
  size = "md",
  variant = "soft",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "soft" | "solid";
}) {
  const sizes = {
    sm: "h-10 w-10 rounded-xl",
    md: "h-12 w-12 rounded-xl",
    lg: "h-14 w-14 rounded-2xl",
  };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center",
        sizes[size],
        variant === "solid"
          ? "bg-brand-blue text-white"
          : "bg-brand-blue/10 text-brand-blue",
        className,
      )}
    >
      {children}
    </div>
  );
}
