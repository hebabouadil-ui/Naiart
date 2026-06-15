"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { BRAND, featuredArtworks } from "@/lib/data";
import { ButtonLink } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { GoldDust } from "@/components/home/GoldDust";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const hero = featuredArtworks[0];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-ivory-glow"
    >
      {/* ambient layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(70% 60% at 72% 28%, rgba(184,146,74,0.16), transparent 68%), radial-gradient(50% 50% at 12% 85%, rgba(184,146,74,0.08), transparent 70%)",
        }}
      />
      <GoldDust className="pointer-events-none absolute inset-0 z-[1]" />

      {/* vertical credential rail */}
      <div className="pointer-events-none absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 xl:block">
        <span className="block rotate-180 text-[0.6rem] uppercase tracking-luxe text-clay [writing-mode:vertical-rl]">
          Est. Atelier · Arles, Provence
        </span>
      </div>

      <div className="container-luxe relative z-[2] grid min-h-[92svh] items-center gap-y-10 pb-14 pt-28 sm:pt-32 lg:grid-cols-12 lg:gap-x-8 lg:pb-0">
        {/* ---------- left: editorial type ---------- */}
        <motion.div
          style={{ opacity: fade }}
          className="order-2 lg:order-1 lg:col-span-7 lg:pr-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.62rem] uppercase tracking-luxe text-clay">
              {BRAND.role}
            </span>
          </motion.div>

          <h1 className="font-display font-medium leading-[0.92] tracking-[-0.02em] text-charcoal">
            {["Where", "Emotion", "Meets", "Canvas"].map((w, i) => (
              <span key={w} className="block overflow-hidden">
                <motion.span
                  className="inline-block text-[clamp(3rem,9vw,8.5rem)]"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4 + i * 0.09, duration: 1, ease }}
                >
                  {i === 1 || i === 3 ? (
                    <em className="not-italic italic text-gold-shimmer">{w}</em>
                  ) : (
                    w
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9, ease }}
            className="mt-7 max-w-md font-serif text-lg leading-relaxed text-graphite"
          >
            Original paintings from the atelier of {BRAND.full} — where light,
            memory and pigment become something to live with.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/shop" variant="gold" size="lg">
              Explore the Collection
            </ButtonLink>
            <ButtonLink href="/about" variant="outline" size="lg">
              Meet the Artist
            </ButtonLink>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-11 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-charcoal/10 pt-7"
          >
            {[
              ["120+", "Works collected"],
              ["30", "Countries shipped"],
              ["15 yrs", "In the atelier"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl text-charcoal">{n}</dt>
                <dd className="text-[0.58rem] uppercase tracking-luxe-sm text-clay">
                  {l}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------- right: the hung painting ---------- */}
        <motion.div
          style={{ opacity: fade }}
          className="relative order-1 mx-auto w-full max-w-[26rem] lg:order-2 lg:col-span-5 lg:max-w-none"
        >
          {/* offset gold frame */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 1, ease }}
            className="absolute -right-3 -top-3 bottom-3 left-3 hidden rounded-[2px] border border-gold/45 lg:block"
          />

          <motion.figure
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.4 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] shadow-lift ring-1 ring-charcoal/10"
          >
            <motion.div style={{ y: imgY }} className="absolute inset-0 scale-105">
              <Image
                src={hero.images[0]}
                alt={hero.title}
                fill
                priority
                sizes="(max-width: 1024px) 85vw, 40vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-charcoal/5" />
          </motion.figure>

          {/* museum label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9, ease }}
            className="relative z-10 mx-auto -mt-10 w-[88%] sm:-mt-12"
          >
            <Link
              href={`/artwork/${hero.slug}`}
              data-cursor="view"
              data-cursor-label="View"
              className="group flex items-center justify-between gap-4 rounded-[2px] glass-strong px-5 py-4 shadow-lift"
            >
              <div className="min-w-0">
                <p className="text-[0.52rem] uppercase tracking-luxe text-gold">
                  Featured Work · {hero.year}
                </p>
                <p className="mt-1 truncate font-display text-lg text-charcoal">
                  {hero.title}
                </p>
                <p className="truncate font-serif text-xs italic text-graphite">
                  {hero.medium} · {formatPrice(hero.price)}
                </p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-ivory transition-colors duration-500 group-hover:bg-gold group-hover:text-charcoal">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 z-[2] hidden -translate-x-1/2 items-center gap-2 text-[0.55rem] uppercase tracking-luxe text-clay lg:flex"
      >
        Scroll to explore
        <ArrowDownRight className="h-3.5 w-3.5 animate-bounce" />
      </motion.div>
    </section>
  );
}
