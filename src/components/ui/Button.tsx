"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  magnetic?: boolean;
}

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-sans uppercase tracking-luxe-sm transition-colors duration-500 ease-luxe disabled:cursor-not-allowed disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "px-6 py-2.5 text-[0.62rem]",
  md: "px-8 py-3.5 text-[0.68rem]",
  lg: "px-10 py-4 text-[0.72rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-charcoal text-ivory hover:text-charcoal border border-charcoal",
  gold: "bg-gold-gradient text-charcoal border border-transparent shadow-gold",
  outline:
    "border border-current text-charcoal dark:text-ivory hover:text-ivory dark:hover:text-charcoal",
  ghost: "text-charcoal dark:text-ivory hover:text-gold",
};

function Inner({
  variant = "primary",
  children,
}: {
  variant: Variant;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* fill sweep */}
      {(variant === "primary" || variant === "outline") && (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 -z-0 origin-bottom scale-y-0 transition-transform duration-500 ease-luxe group-hover:scale-y-100",
            variant === "primary" ? "bg-ivory" : "bg-charcoal dark:bg-ivory",
          )}
        />
      )}
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  magnetic = true,
  ...props
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const btn = (
    <button
      data-cursor="hover"
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
  return magnetic ? <Magnetic strength={0.3}>{btn}</Magnetic> : btn;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  magnetic = true,
  onClick,
}: BaseProps & { href: string; onClick?: () => void }) {
  const link = (
    <Link
      href={href}
      data-cursor="hover"
      onClick={onClick}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      <Inner variant={variant}>{children}</Inner>
    </Link>
  );
  return magnetic ? <Magnetic strength={0.3}>{link}</Magnetic> : link;
}
