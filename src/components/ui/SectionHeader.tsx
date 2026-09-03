import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  eyebrowClassName?: string;
  descriptionClassName?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  eyebrowClassName,
  descriptionClassName,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      <span className={cn("section-eyebrow", eyebrowClassName)}>{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {description && (
        <p className={cn("section-description", descriptionClassName)}>{description}</p>
      )}
    </div>
  );
}
