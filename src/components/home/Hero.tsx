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

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const hero = featuredArtworks[0];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-ivory-glow"
    >
      {/* subtle ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(55% 50% at 75% 25%, rgba(184,146,74,0.12), transparent 70%)",
        }}
      />
      <ParticleField className="pointer-events-none absolute inset-0 z-[1] opacity-50" />

      <div className="container-luxe relative z-10 grid items-center gap-8 pb-12 pt-28 sm:pt-32 lg:grid-cols-[1fr_0.9fr] lg:gap-14 lg:pb-16 lg:pt-36">
        {/* left: headline */}
        <motion.div style={{ y: textY }} className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold" />
            <span className="text-[0.62rem] uppercase tracking-luxe text-clay">
              {BRAND.role}
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease }}
              className="font-display text-[clamp(2.6rem,6.5vw,5.5rem)] font-medium leading-[1] tracking-[-0.02em] text-charcoal"
            >
              Where{" "}
              <em className="not-italic text-gold-shimmer">Emotion</em>
              <br />
              Meets{" "}
              <em className="not-italic italic text-gold-shimmer">Canvas</em>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease }}
            className="mt-6 max-w-sm font-serif text-[1.05rem] leading-relaxed text-graphite"
          >
            Original paintings from the Arles atelier of {BRAND.full} — light,
            memory and pigment made permanent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/shop" variant="gold" size="lg">
              Explore Works
            </ButtonLink>
            <ButtonLink href="/about" variant="outline" size="lg">
              The Artist
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-10 flex items-center gap-8 border-t border-charcoal/10 pt-6"
          >
            {[
              ["120+", "Works collected"],
              ["30", "Countries shipped"],
              ["15 yrs", "In the atelier"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-xl text-charcoal">{n}</p>
                <p className="text-[0.58rem] uppercase tracking-luxe-sm text-clay">{l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* right: featured artwork */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="relative order-1 mx-auto w-full max-w-[30rem] lg:order-2"
        >
          {/* decorative frame */}
          <div
            aria-hidden
            className="absolute -right-2 -top-2 bottom-2 left-2 hidden rounded-sm border border-gold/35 lg:block"
          />

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-lift ring-1 ring-charcoal/8">
            <motion.div style={{ y: imgY }} className="absolute inset-0">
              <Image
                src={hero.images[0]}
                alt={hero.title}
                fill
                priority
                sizes="(max-width: 1024px) 85vw, 42vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />

            {/* caption card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8, ease }}
              className="absolute inset-x-4 bottom-4"
            >
              <Link
                href={`/artwork/${hero.slug}`}
                data-cursor="view"
                data-cursor-label="View"
                className="group flex items-center justify-between gap-4 rounded-sm glass-strong px-4 py-3.5"
              >
                <div>
                  <p className="text-[0.52rem] uppercase tracking-luxe text-gold">Featured</p>
                  <p className="mt-0.5 font-display text-lg text-charcoal">{hero.title}</p>
                  <p className="font-serif text-xs italic text-graphite">
                    {hero.medium} · {formatPrice(hero.price)}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-charcoal text-ivory transition-colors duration-500 group-hover:bg-gold group-hover:text-charcoal">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-clay lg:flex"
      >
        <span className="text-[0.55rem] uppercase tracking-luxe">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
