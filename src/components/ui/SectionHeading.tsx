import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextReveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  link?: { href: string; label: string };
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full items-end justify-between gap-8",
          align === "center" && "flex-col items-center",
        )}
      >
        <div className={cn(align === "center" && "flex flex-col items-center")}>
          <span className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            {eyebrow}
          </span>
          <TextReveal
            as="h2"
            text={title}
            className={cn(
              "max-w-3xl font-display text-[clamp(2.2rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em]",
              align === "center" && "justify-center",
              dark ? "text-ivory" : "ink",
            )}
          />
        </div>
        {link && (
          <Link
            href={link.href}
            data-cursor="hover"
            className="group hidden shrink-0 items-center gap-2 whitespace-nowrap text-[0.7rem] uppercase tracking-luxe-sm text-gold transition-colors hover:text-gold-light sm:flex"
          >
            {link.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
      {description && (
        <p
          className={cn(
            "max-w-2xl font-serif text-xl leading-relaxed",
            dark ? "text-ivory/70" : "muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
