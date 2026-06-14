"use client";

import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-xl border border-charcoal/12 bg-warm-white px-4 py-3 font-sans text-sm text-charcoal outline-none transition-colors placeholder:text-graphite/40 focus:border-gold focus:ring-2 focus:ring-gold/20";

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block font-grotesk text-[0.66rem] font-medium uppercase tracking-luxe-sm text-graphite/80">
      {children}
    </label>
  );
}

export function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input {...props} className={cn(inputBase, props.className)} />;
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={cn(inputBase, "min-h-[120px] resize-y leading-relaxed", props.className)}
    />
  );
}

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  return (
    <select
      {...props}
      className={cn(inputBase, "cursor-pointer appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat", props.className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%237a7060' stroke-width='2'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
        ...props.style,
      }}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3"
    >
      <span
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors duration-300",
          checked ? "bg-gold" : "bg-charcoal/15",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-warm-white shadow-soft transition-transform duration-300",
            checked ? "translate-x-[1.4rem]" : "translate-x-0.5",
          )}
        />
      </span>
      {label && (
        <span className="font-sans text-sm text-charcoal">{label}</span>
      )}
    </button>
  );
}

export function FieldGroup({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
