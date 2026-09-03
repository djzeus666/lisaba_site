import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "default" | "narrow" | "wide";
  as?: "section" | "footer";
};

const containerSizes = {
  default: "max-w-7xl",
  narrow: "max-w-3xl",
  wide: "max-w-5xl",
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  size = "default",
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag id={id} className={cn("section-padding scroll-mt-28", className)}>
      <div
        className={cn(
          "section-container",
          containerSizes[size],
          containerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
