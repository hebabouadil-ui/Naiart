"use client";

import { cn } from "@/lib/utils";

/** Semantic colour map for every status value used across the admin. */
const STYLES: Record<string, string> = {
  // orders
  new: "bg-gold/12 text-gold border-gold/30",
  paid: "bg-emerald-500/12 text-emerald-600 border-emerald-500/30",
  shipped: "bg-sky-500/12 text-sky-600 border-sky-500/30",
  completed: "bg-charcoal/10 text-charcoal border-charcoal/20",
  refunded: "bg-amber-500/12 text-amber-600 border-amber-500/30",
  cancelled: "bg-rose-500/12 text-rose-600 border-rose-500/30",
  // commissions
  pending: "bg-gold/12 text-gold border-gold/30",
  accepted: "bg-emerald-500/12 text-emerald-600 border-emerald-500/30",
  rejected: "bg-rose-500/12 text-rose-600 border-rose-500/30",
  "in-progress": "bg-sky-500/12 text-sky-600 border-sky-500/30",
  // artwork availability
  available: "bg-emerald-500/12 text-emerald-600 border-emerald-500/30",
  sold: "bg-charcoal/10 text-charcoal border-charcoal/20",
  reserved: "bg-amber-500/12 text-amber-600 border-amber-500/30",
  commission: "bg-sky-500/12 text-sky-600 border-sky-500/30",
  archived: "bg-charcoal/10 text-graphite border-charcoal/20",
};

export function StatusPill({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-grotesk text-[0.62rem] font-medium uppercase tracking-luxe-sm",
        STYLES[status] ?? "bg-charcoal/10 text-graphite border-charcoal/20",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {status.replace("-", " ")}
    </span>
  );
}
