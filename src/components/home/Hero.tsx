"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BRAND, featuredArtworks } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const hero = featuredArtworks[0];

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      <div className="grid min-h-[100svh] lg:grid-cols-[58fr_42fr]">

        {/* ── Left: full-bleed painting ── */}
        <motion.div
          className="relative order-2 min-h-[62svh] lg:order-1 lg:min-h-[100svh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.div style={{ y: imgY }} className="absolute inset-0 scale-[1.04]">
            <Image
              src={hero.images[0]}
              alt={hero.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </motion.div>
          {/* seamless right-edge fade into text panel */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-48 bg-gradient-to-r from-transparent to-warm-white dark:to-deep-charcoal lg:block" />
        </motion.div>

        {/* ── Right: editorial text ── */}
        <div className="relative order-1 flex flex-col justify-between px-8 py-20 lg:order-2 lg:px-14 lg:py-28">

          {/* top credential */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-6 bg-gold" />
            <span className="text-[0.6rem] uppercase tracking-luxe text-clay">
              {BRAND.role}
            </span>
          </motion.div>

          {/* headline + body + CTA */}
          <div>
            <h1 className="font-display font-medium leading-[0.93] tracking-[-0.025em] text-charcoal dark:text-ivory">
              {["Where", "Emotion", "Meets", "Canvas"].map((w, i) => (
                <span key={w} className="block overflow-hidden">
                  <motion.span
                    className="inline-block text-[clamp(2.8rem,6.5vw,5.5rem)]"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.6 + i * 0.09, duration: 0.9, ease }}
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
              transition={{ delay: 1.2, duration: 0.9 }}
              className="mt-8 max-w-xs font-serif text-base leading-relaxed text-graphite dark:text-ivory/60"
            >
              Original paintings from the atelier of {BRAND.full} — where light
              and memory become something to live with.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-10"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center gap-4 text-[0.65rem] uppercase tracking-luxe-sm text-charcoal dark:text-ivory transition-colors hover:text-gold dark:hover:text-gold"
              >
                Explore the Collection
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/40 dark:border-ivory/30 transition-all duration-500 group-hover:bg-gold group-hover:border-gold group-hover:text-charcoal">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* bottom: artwork attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <Link
              href={`/artwork/${hero.slug}`}
              className="group inline-flex items-center gap-3 text-[0.55rem] uppercase tracking-luxe text-clay transition-colors hover:text-gold"
            >
              <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
              {hero.title} · {hero.year}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
