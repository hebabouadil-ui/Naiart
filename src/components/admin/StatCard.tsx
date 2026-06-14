"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  trend,
  icon: Icon,
  index = 0,
}: {
  label: string;
  value: string;
  trend?: number;
  icon: LucideIcon;
  index?: number;
}) {
  const up = (trend ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-charcoal/8 bg-warm-white p-6 shadow-soft"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/5 transition-transform duration-700 ease-luxe group-hover:scale-150" />
      <div className="relative flex items-start justify-between">
        <span className="font-grotesk text-[0.66rem] uppercase tracking-luxe-sm text-graphite/70">
          {label}
        </span>
        <span className="rounded-xl bg-gold/10 p-2 text-gold">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="relative mt-5 font-display text-4xl tracking-tight text-charcoal">
        {value}
      </div>
      {trend !== undefined && (
        <div className="relative mt-3 flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-grotesk text-[0.66rem] font-medium",
              up
                ? "bg-emerald-500/12 text-emerald-600"
                : "bg-rose-500/12 text-rose-600",
            )}
          >
            {up ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(trend)}%
          </span>
          <span className="font-sans text-xs text-graphite/55">
            vs last period
          </span>
        </div>
      )}
    </motion.div>
  );
}
