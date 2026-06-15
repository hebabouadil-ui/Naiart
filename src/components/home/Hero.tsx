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
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const hero = featuredArtworks[0];

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      <div className="container-luxe grid items-center gap-y-12 pb-20 pt-28 sm:pt-32 lg:min-h-[90svh] lg:grid-cols-12 lg:gap-x-14 lg:pb-0">

        {/* ── text ── */}
        <div className="order-2 lg:order-1 lg:col-span-6 lg:pr-4">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold" />
            <span className="text-[0.6rem] uppercase tracking-luxe text-clay">
              {BRAND.role}
            </span>
          </motion.div>

          <h1 className="font-display font-medium leading-[0.95] tracking-[-0.025em] text-charcoal dark:text-ivory">
            {["Where", "Emotion", "Meets", "Canvas"].map((w, i) => (
              <span key={w} className="block overflow-hidden">
                <motion.span
                  className="inline-block text-[clamp(2.6rem,6.8vw,5.6rem)]"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.9, ease }}
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
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-7 max-w-md font-serif text-lg leading-relaxed text-graphite dark:text-ivory/60"
          >
            Original paintings from the atelier of {BRAND.full} — where light and
            memory become something to live with.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 rounded-full bg-charcoal px-7 py-4 text-[0.62rem] uppercase tracking-luxe-sm text-ivory transition-colors duration-500 hover:bg-gold hover:text-charcoal dark:bg-ivory dark:text-charcoal dark:hover:bg-gold"
            >
              Explore the Collection
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/about"
              className="link-underline text-[0.62rem] uppercase tracking-luxe-sm text-charcoal transition-colors hover:text-gold dark:text-ivory"
            >
              Meet the Artist
            </Link>
          </motion.div>
        </div>

        {/* ── image ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease }}
          className="relative order-1 mx-auto w-full max-w-sm lg:order-2 lg:col-span-6 lg:max-w-none"
        >
          {/* gold frame accent */}
          <span
            aria-hidden
            className="absolute -right-2.5 -top-2.5 bottom-2.5 left-2.5 hidden rounded-[2px] border border-gold/40 lg:block"
          />

          <motion.figure
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ delay: 0.3, duration: 1.1, ease: [0.83, 0, 0.17, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] shadow-lift ring-1 ring-charcoal/10"
          >
            <motion.div style={{ y: imgY }} className="absolute inset-0 scale-105">
              <SafeImage
                src={hero.images[0]}
                alt={hero.title}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
                fallbackColor={hero.dominantColor}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
          </motion.figure>

          {/* museum caption */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease }}
            className="relative z-10 mx-auto -mt-9 w-[88%]"
          >
            <Link
              href={`/artwork/${hero.slug}`}
              data-cursor="view"
              data-cursor-label="View"
              className="group flex items-center justify-between gap-4 rounded-[2px] glass-strong px-5 py-3.5 shadow-lift"
            >
              <div className="min-w-0">
                <p className="text-[0.5rem] uppercase tracking-luxe text-gold">
                  Featured Work · {hero.year}
                </p>
                <p className="mt-0.5 truncate font-display text-base text-charcoal dark:text-ivory">
                  {hero.title}
                </p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-charcoal text-ivory transition-colors duration-500 group-hover:bg-gold group-hover:text-charcoal dark:bg-ivory dark:text-charcoal">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
