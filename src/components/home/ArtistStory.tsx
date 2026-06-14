"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BRAND } from "@/lib/data";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const portrait =
  "/art/1544717305-2782549b5136.svg";

export function ArtistStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section className="surface relative overflow-hidden py-24 sm:py-36">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
        {/* portrait */}
        <div ref={ref} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <motion.div style={{ scale: imgScale }} className="absolute inset-0">
              <Image
                src={portrait}
                alt={BRAND.full}
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          </div>
          <motion.div
            style={{ y }}
            className="glass-strong absolute -bottom-8 -right-4 max-w-[15rem] rounded-sm p-6 sm:-right-10"
          >
            <p className="font-display text-4xl text-gold">15+</p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-luxe-sm muted">
              Years devoted to the canvas
            </p>
          </motion.div>
          <span className="absolute -left-3 top-6 hidden font-display text-[10rem] leading-none text-gold/10 lg:block">
            “
          </span>
        </div>

        {/* text */}
        <div>
          <span className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" /> The Artist
          </span>
          <TextReveal
            as="h2"
            text="Painting is how I keep what light forgets"
            className="font-display text-[clamp(2rem,4.5vw,3.8rem)] font-medium leading-[1.04] tracking-[-0.02em] ink"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 font-serif text-xl leading-relaxed muted">
              {BRAND.full} grew up between the salt marshes of the Camargue and
              the print studios of Marseille. What began as an architect's eye for
              structure became, over fifteen years, a painter's hunger for
              feeling.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 font-serif text-xl leading-relaxed muted">
              From her atelier in Arles, she works slowly — building and breaking
              surfaces of oil and cold wax until a painting holds light the way
              memory holds a moment: imperfectly, and forever.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <ButtonLink href="/about" variant="primary">
                Read Her Story
              </ButtonLink>
              <div className="font-display text-3xl italic text-gold">
                {BRAND.full}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
