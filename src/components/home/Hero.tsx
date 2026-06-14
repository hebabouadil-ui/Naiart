"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { BRAND, featuredArtworks } from "@/lib/data";
import { ButtonLink } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { SafeCanvas } from "@/components/three/SafeCanvas";

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField").then((m) => m.ParticleField),
  { ssr: false },
);

const easing = [0.16, 1, 0.3, 1] as const;
const headline = ["Where", "Emotion", "Meets", "Canvas"];

const stats = [
  { value: "200+", label: "Works placed" },
  { value: "32", label: "Countries" },
  { value: "15 yrs", label: "In the atelier" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const hero = featuredArtworks[0];

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-ivory-glow text-charcoal"
    >
      {/* soft gold dust (degrades gracefully if WebGL is unavailable) */}
      <SafeCanvas>
        <ParticleField className="pointer-events-none absolute inset-0 z-[1]" />
      </SafeCanvas>

      <div className="container-luxe relative z-10 grid min-h-[100svh] grid-cols-1 items-center gap-14 pb-24 pt-28 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pb-16 lg:pt-36">
        {/* ── Left: editorial copy ── */}
        <motion.div style={{ opacity }} className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.9, ease: easing }}
            className="mb-6 flex items-center gap-4 text-[0.68rem] uppercase tracking-luxe text-clay"
          >
            <span className="h-px w-12 bg-gold/60" />
            {BRAND.role}
          </motion.span>

          <h1 className="font-display font-medium leading-[0.95] tracking-[-0.02em] text-[clamp(2.6rem,6vw,5.25rem)]">
            {headline.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 1.4 + i * 0.1,
                    duration: 1,
                    ease: easing,
                  }}
                >
                  {i === 1 || i === 3 ? (
                    <span className="italic text-gold-shimmer">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.9, ease: easing }}
            className="mt-7 max-w-md font-serif text-lg leading-relaxed text-charcoal/70 sm:text-xl"
          >
            Original paintings from the Arles atelier of {BRAND.full} — where
            light, memory, and pigment become something to live with.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.9, ease: easing }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="/shop" variant="gold" size="lg">
              Explore the Collection
            </ButtonLink>
            <ButtonLink href="/about" variant="ghost" size="lg">
              Meet the Artist
            </ButtonLink>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.9, ease: easing }}
            className="mt-12 flex max-w-md items-end gap-8 border-t border-charcoal/10 pt-6 sm:gap-10"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl leading-none text-charcoal sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-2 text-[0.58rem] uppercase tracking-luxe-sm text-charcoal/50">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Right: featured painting (static, captioned) ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1.2, ease: easing }}
          className="mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-md"
        >
          <span className="mb-4 flex items-center gap-3 text-[0.6rem] uppercase tracking-luxe text-charcoal/45">
            <span className="h-px w-8 bg-gold/50" />
            Featured Work
          </span>

          <Link
            href={`/artwork/${hero.slug}`}
            data-cursor="hover"
            className="group block"
          >
            {/* gallery frame: mat + canvas */}
            <div className="relative overflow-hidden rounded-[3px] bg-warm-white p-3 shadow-lift ring-1 ring-charcoal/10 sm:p-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-beige">
                <Image
                  src={hero.images[0]}
                  alt={hero.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 88vw, 40vw"
                  className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.05]"
                />
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-warm-white/90 text-charcoal opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>

            {/* gallery plaque */}
            <div className="mt-5 flex items-end justify-between gap-4 px-1">
              <div>
                <p className="font-display text-lg italic leading-tight text-charcoal sm:text-xl">
                  {hero.title}
                </p>
                <p className="mt-1.5 text-[0.6rem] uppercase tracking-luxe-sm text-charcoal/50">
                  {hero.medium} · {hero.year}
                </p>
              </div>
              <p className="shrink-0 font-grotesk text-sm text-gold">
                {formatPrice(hero.price)}
              </p>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-charcoal/40 lg:flex"
      >
        <span className="text-[0.58rem] uppercase tracking-luxe">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
