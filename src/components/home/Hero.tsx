"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BRAND, featuredArtworks } from "@/lib/data";
import { SafeImage } from "@/components/ui/SafeImage";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const hero = featuredArtworks[0];

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      <div className="container-luxe grid items-center gap-10 pb-16 pt-24 sm:pt-28 lg:grid-cols-[58fr_42fr] lg:gap-14 lg:pb-16 lg:pt-28">

        {/* ── text ── */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold" />
            <span className="text-[0.6rem] uppercase tracking-luxe text-clay">
              {BRAND.role}
            </span>
          </motion.div>

          {/* Headline flows naturally across 2–3 lines — compact & above the fold */}
          <h1 className="font-display font-medium leading-[1] tracking-[-0.025em] text-charcoal dark:text-ivory text-[clamp(2.4rem,4.6vw,5rem)]">
            {["Where", "Emotion", "Meets", "Canvas"].map((w, i) => (
              <span key={w} className="inline overflow-hidden">
                <motion.span
                  className="inline-block mr-[0.18em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease }}
                >
                  {i === 1 || i === 3 ? (
                    <em className="italic text-gold">{w}</em>
                  ) : (
                    w
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-6 max-w-md font-serif text-base leading-relaxed text-graphite dark:text-ivory/60"
          >
            Original paintings from the atelier of {BRAND.full} — where light and
            memory become something to live with.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 rounded-full bg-charcoal px-6 py-3.5 text-[0.62rem] uppercase tracking-luxe-sm text-ivory transition-colors duration-500 hover:bg-gold hover:text-charcoal dark:bg-ivory dark:text-charcoal dark:hover:bg-gold"
            >
              Explore the Collection
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/about"
              className="link-underline text-[0.62rem] uppercase tracking-luxe-sm text-clay transition-colors hover:text-gold"
            >
              Meet the Artist
            </Link>
          </motion.div>
        </div>

        {/* ── image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.83, 0, 0.17, 1] }}
          className="relative order-1 w-full lg:order-2"
        >
          {/* gold frame accent */}
          <span
            aria-hidden
            className="absolute -right-2 -top-2 bottom-2 left-2 hidden rounded-[2px] border border-gold/35 lg:block"
          />

          <div className="relative w-full overflow-hidden rounded-[2px] shadow-lift ring-1 ring-charcoal/10"
               style={{ height: "clamp(280px, 68svh, 600px)" }}>
            <motion.div style={{ y: imgY }} className="absolute inset-0 scale-105">
              <SafeImage
                src={hero.images[0]}
                alt={hero.title}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover"
                fallbackColor={hero.dominantColor}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
          </div>

          {/* museum caption */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease }}
            className="relative z-10 mx-auto -mt-8 w-[88%]"
          >
            <Link
              href={`/artwork/${hero.slug}`}
              data-cursor="view"
              className="group flex items-center justify-between gap-4 rounded-[2px] glass-strong px-5 py-3 shadow-lift"
            >
              <div className="min-w-0">
                <p className="text-[0.5rem] uppercase tracking-luxe text-gold">
                  Featured · {hero.year}
                </p>
                <p className="mt-0.5 truncate font-display text-sm text-charcoal dark:text-ivory">
                  {hero.title}
                </p>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-charcoal text-ivory transition-colors duration-500 group-hover:bg-gold group-hover:text-charcoal dark:bg-ivory dark:text-charcoal">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
