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

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField").then((m) => m.ParticleField),
  { ssr: false },
);

const easing = [0.16, 1, 0.3, 1] as const;
const headline = ["Where", "Emotion", "Meets", "Canvas"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const hero = featuredArtworks[0];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-ivory-glow"
    >
      {/* ambient gold glow + particles behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(60% 55% at 78% 30%, rgba(184,146,74,0.18), transparent 65%)",
        }}
      />
      <ParticleField className="pointer-events-none absolute inset-0 z-[1] opacity-70" />

      <div className="container-luxe relative z-10 grid min-h-[100svh] items-center gap-10 pb-16 pt-32 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-0">
        {/* ---------------- left: editorial text ---------------- */}
        <motion.div style={{ y: textY }} className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.85, duration: 1, ease: easing }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gold" />
            <span className="font-sans text-[0.66rem] uppercase tracking-luxe text-clay">
              {BRAND.role}
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.8rem,7.5vw,7rem)] font-medium leading-[0.94] tracking-[-0.025em] text-charcoal">
            {headline.map((word, i) => (
              <span key={word} className="block overflow-hidden py-[0.02em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.55 + i * 0.11, duration: 1.05, ease: easing }}
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
            transition={{ delay: 2.25, duration: 1, ease: easing }}
            className="mt-8 max-w-md font-serif text-xl leading-relaxed text-graphite"
          >
            Original paintings from the Arles atelier of {BRAND.full} — where light,
            memory, and pigment become something to live with.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.45, duration: 1, ease: easing }}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="/shop" variant="gold" size="lg">
              Explore the Collection
            </ButtonLink>
            <ButtonLink href="/about" variant="outline" size="lg">
              Meet the Artist
            </ButtonLink>
          </motion.div>

          {/* trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7, duration: 1 }}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-charcoal/10 pt-7"
          >
            {[
              ["120+", "Works collected"],
              ["30", "Countries shipped"],
              ["15 yrs", "In the atelier"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-2xl text-charcoal">{n}</p>
                <p className="text-[0.6rem] uppercase tracking-luxe-sm text-clay">
                  {l}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------------- right: framed featured artwork ---------------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: easing, delay: 0.2 }}
          className="relative order-1 mx-auto w-full max-w-[34rem] lg:order-2"
        >
          {/* decorative gold frame offset */}
          <div
            aria-hidden
            className="absolute -right-3 -top-3 bottom-3 left-3 hidden rounded-sm border border-gold/40 lg:block"
          />
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ delay: 1.4, duration: 1.3, ease: [0.83, 0, 0.17, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-lift ring-1 ring-charcoal/10"
          >
            <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
              <Image
                src={hero.images[0]}
                alt={hero.title}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />

            {/* floating caption card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.9, ease: easing }}
              className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6"
            >
              <Link
                href={`/artwork/${hero.slug}`}
                data-cursor="view"
                data-cursor-label="View"
                className="group flex items-center justify-between gap-4 rounded-sm glass-strong px-5 py-4"
              >
                <div>
                  <p className="text-[0.55rem] uppercase tracking-luxe text-gold">
                    Featured Work
                  </p>
                  <p className="mt-1 font-display text-xl text-charcoal">
                    {hero.title}
                  </p>
                  <p className="font-serif text-sm italic text-graphite">
                    {hero.medium} · {formatPrice(hero.price)}
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal text-ivory transition-colors duration-500 group-hover:bg-gold group-hover:text-charcoal">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-clay lg:flex"
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
