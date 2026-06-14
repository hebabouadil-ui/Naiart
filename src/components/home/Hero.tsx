"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { BRAND, featuredArtworks } from "@/lib/data";
import { ButtonLink } from "@/components/ui/Button";

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
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const hero = featuredArtworks[0];

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-deep-charcoal text-ivory"
    >
      {/* Background artwork with parallax */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image
          src={hero.images[0]}
          alt={hero.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-charcoal/40 via-deep-charcoal/20 to-deep-charcoal/90" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_40%,rgba(14,13,11,0.6)_100%)]" />
      </motion.div>

      {/* WebGL particles */}
      <ParticleField className="absolute inset-0 z-[1]" />

      {/* light sweep */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-[2] opacity-40"
        animate={{ backgroundPositionX: ["0%", "100%"] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{
          backgroundImage:
            "radial-gradient(60% 80% at 30% 20%, rgba(216,184,114,0.22), transparent 60%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="container-luxe relative z-10 flex h-full flex-col justify-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1, ease: easing }}
          className="mb-6 flex items-center gap-4 text-[0.7rem] uppercase tracking-luxe text-gold-light"
        >
          <span className="h-px w-12 bg-gold-light/60" />
          {BRAND.role}
        </motion.span>

        <h1 className="font-display text-[clamp(3rem,11vw,11rem)] font-medium leading-[0.92] tracking-[-0.02em]">
          {headline.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 1.6 + i * 0.12,
                  duration: 1.1,
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 1, ease: easing }}
          className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-ivory/80 sm:text-2xl"
        >
          Original paintings from the Arles atelier of {BRAND.full} — where light,
          memory, and pigment become something to live with.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1, ease: easing }}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <ButtonLink href="/shop" variant="gold" size="lg">
            Explore the Collection
          </ButtonLink>
          <ButtonLink href="/about" variant="outline" size="lg" className="text-ivory">
            Meet the Artist
          </ButtonLink>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory/60"
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
