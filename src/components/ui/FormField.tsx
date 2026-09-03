import { cn } from "@/lib/cn";

const fieldClass =
  "focus-ring h-12 w-full rounded-xl border border-brand-black/10 bg-brand-white px-4 text-sm text-brand-black shadow-soft transition-all duration-200 placeholder:text-brand-black/35 focus:border-brand-blue focus:shadow-md";

export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-medium text-brand-black/70"
    >
      {children}
      {required && <span className="ml-0.5 text-brand-orange">*</span>}
    </label>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClass, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        fieldClass,
        "h-auto min-h-[120px] resize-none py-3.5 leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export function FormField({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
    </div>
  );
}
