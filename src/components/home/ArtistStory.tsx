"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BRAND } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";

const portrait =
  "https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&h=1125&q=85&fit=crop&auto=format";

export function ArtistStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section className="surface relative overflow-hidden py-16 sm:py-24">
      <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* portrait */}
        <div ref={ref} className="relative mx-auto w-full max-w-[20rem] lg:mx-0 lg:max-w-[24rem]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <motion.div style={{ scale: imgScale }} className="absolute inset-0">
              <SafeImage
                src={portrait}
                alt={BRAND.full}
                fill
                sizes="(max-width: 1024px) 80vw, 30vw"
                className="object-cover"
                fallbackColor="#8B6F47"
              />
            </motion.div>
          </div>
          <motion.div
            style={{ y }}
            className="glass-strong absolute -bottom-6 -right-3 max-w-[13rem] rounded-sm p-5 sm:-right-6"
          >
            <p className="font-display text-3xl text-gold">15+</p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-luxe-sm muted">
              Years devoted to the canvas
            </p>
          </motion.div>
          <span className="absolute -left-2 top-4 hidden font-display text-[7rem] leading-none text-gold/10 lg:block">
            “
          </span>
        </div>

        {/* text */}
        <div>
          <span className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" /> The Artist
          </span>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.02em] ink">
            Painting is how I keep what light forgets
          </h2>
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
