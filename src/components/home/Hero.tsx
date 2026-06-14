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
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const hero = featuredArtworks[0];

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-ivory-glow pb-16 pt-32 text-charcoal sm:pt-36 lg:pb-0 lg:pt-0"
    >
      {/* soft gold dust */}
      <SafeCanvas>
        <ParticleField className="pointer-events-none absolute inset-0 z-[1]" />
      </SafeCanvas>

      {/* decorative vertical hairlines */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-charcoal/[0.06] lg:block"
      />

      <div className="container-luxe relative z-10 grid h-full min-h-[100svh] grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ── Left: editorial copy ── */}
        <motion.div style={{ y, opacity }} className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.9, ease: easing }}
            className="mb-7 flex items-center gap-4 text-[0.7rem] uppercase tracking-luxe text-clay"
          >
            <span className="h-px w-12 bg-gold/60" />
            {BRAND.role}
          </motion.span>

          <h1 className="font-display text-[clamp(2.9rem,7.5vw,6.4rem)] font-medium leading-[0.95] tracking-[-0.02em]">
            {headline.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 1.5 + i * 0.11,
                    duration: 1.05,
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
            transition={{ delay: 2.1, duration: 0.9, ease: easing }}
            className="mt-8 max-w-md font-serif text-xl leading-relaxed text-charcoal/70 sm:text-2xl"
          >
            Original paintings from the Arles atelier of {BRAND.full} — where
            light, memory, and pigment become something to live with.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.9, ease: easing }}
            className="mt-10 flex flex-wrap items-center gap-5"
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
            transition={{ delay: 2.5, duration: 0.9, ease: easing }}
            className="mt-14 flex max-w-md items-end gap-10 border-t border-charcoal/10 pt-7"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl leading-none text-charcoal sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-2 text-[0.62rem] uppercase tracking-luxe-sm text-charcoal/50">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Right: framed featured painting ── */}
        <motion.div
          style={{ y: artY }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.4, duration: 1.3, ease: easing }}
            className="relative"
          >
            {/* floating "featured" tag */}
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.6, duration: 0.8, ease: easing }}
              className="absolute -left-3 top-6 z-20 rounded-full bg-charcoal px-4 py-2 text-[0.58rem] uppercase tracking-luxe-sm text-ivory shadow-lift sm:-left-6"
            >
              Featured Work
            </motion.span>

            {/* gallery frame: mat + canvas */}
            <Link
              href={`/artwork/${hero.slug}`}
              data-cursor="hover"
              className="group block"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative overflow-hidden rounded-[3px] bg-warm-white p-3 shadow-lift ring-1 ring-charcoal/10 sm:p-4"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-beige">
                  <Image
                    src={hero.images[0]}
                    alt={hero.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent" />
                  <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-warm-white/90 text-charcoal opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>

              {/* brass gallery plaque */}
              <div className="mt-5 flex items-end justify-between gap-4 px-1">
                <div>
                  <p className="font-display text-xl italic leading-tight text-charcoal sm:text-2xl">
                    {hero.title}
                  </p>
                  <p className="mt-1.5 text-[0.62rem] uppercase tracking-luxe-sm text-charcoal/50">
                    {hero.medium} · {hero.year}
                  </p>
                </div>
                <p className="shrink-0 font-grotesk text-sm text-gold">
                  {formatPrice(hero.price)}
                </p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-charcoal/50 lg:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-luxe">Scroll</span>
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
