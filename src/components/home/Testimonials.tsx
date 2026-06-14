"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const t = testimonials[index];

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  };

  return (
    <section className="surface relative overflow-hidden py-24 sm:py-36">
      <div className="grain absolute inset-0" />
      <div className="container-luxe relative">
        <span className="eyebrow mb-12 flex items-center justify-center gap-3 text-center">
          <span className="h-px w-8 bg-gold" /> In Their Words{" "}
          <span className="h-px w-8 bg-gold" />
        </span>

        <div className="relative mx-auto min-h-[20rem] max-w-4xl text-center">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={t.id}
              custom={dir}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-8 flex justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-display text-[clamp(1.6rem,3.5vw,3rem)] font-medium leading-[1.18] tracking-[-0.01em] ink">
                “{t.quote}”
              </p>
              <footer className="mt-10">
                <p className="font-serif text-xl italic text-gold">{t.author}</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-luxe-sm muted">
                  {t.role} · {t.location}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            data-cursor="hover"
            aria-label="Previous"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-current/20 transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-8 bg-gold" : "w-1.5 bg-current/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            data-cursor="hover"
            aria-label="Next"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-current/20 transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
