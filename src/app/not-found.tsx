import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { BRAND } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-deep-charcoal px-6 text-center text-ivory">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(50% 60% at 50% 30%, rgba(184,146,74,0.25), transparent 70%)",
        }}
      />
      <span className="eyebrow relative mb-6">{BRAND.signature} · Lost Canvas</span>
      <h1 className="relative font-display text-[clamp(5rem,22vw,16rem)] font-medium leading-none text-gold-shimmer">
        404
      </h1>
      <p className="relative mt-4 max-w-md font-serif text-2xl italic text-ivory/70">
        This work has found another home. Let us guide you back to the gallery.
      </p>
      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/" variant="gold" size="lg">
          Return Home
        </ButtonLink>
        <ButtonLink href="/shop" variant="outline" size="lg" className="text-ivory">
          Browse the Gallery
        </ButtonLink>
      </div>
      <Link
        href="/contact"
        className="link-underline relative mt-8 text-[0.7rem] uppercase tracking-luxe-sm text-ivory/50"
      >
        Need assistance? Contact the atelier
      </Link>
    </div>
  );
}
