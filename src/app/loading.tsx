import { BRAND } from "@/lib/data";

export default function Loading() {
  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-warm-white dark:bg-deep-charcoal">
      <div className="flex flex-col items-center gap-6">
        <span className="font-display text-4xl tracking-luxe-sm text-gold-shimmer">
          {BRAND.name}
        </span>
        <span className="relative h-px w-40 overflow-hidden bg-current/10">
          <span className="absolute inset-y-0 left-0 w-1/3 animate-marquee bg-gold-gradient" />
        </span>
        <span className="text-[0.6rem] uppercase tracking-luxe muted">
          Preparing the gallery
        </span>
      </div>
    </div>
  );
}
