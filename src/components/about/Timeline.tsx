"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import type { TimelineEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

const easing = [0.16, 1, 0.3, 1] as const;

export function Timeline({ events }: { events: TimelineEvent[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mx-auto max-w-5xl">
      {/* central rail (desktop) / left rail (mobile) */}
      <div className="absolute bottom-0 left-6 top-0 w-px bg-current/10 md:left-1/2 md:-translate-x-1/2" />
      <motion.div
        style={{ scaleY: lineScale }}
        className="absolute bottom-0 left-6 top-0 w-px origin-top bg-gold-gradient md:left-1/2 md:-translate-x-1/2"
      />

      <div className="flex flex-col gap-16 md:gap-24">
        {events.map((event, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={event.year}
              className={cn(
                "relative grid items-center gap-x-12 pl-16 md:grid-cols-2 md:pl-0",
              )}
            >
              {/* node */}
              <span className="absolute left-6 top-2 z-10 -translate-x-1/2 md:left-1/2">
                <span className="block h-3.5 w-3.5 rounded-full border border-gold bg-warm-white dark:bg-deep-charcoal">
                  <span className="block h-full w-full scale-50 rounded-full bg-gold-gradient" />
                </span>
              </span>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.9, ease: easing }}
                className={cn(
                  "md:col-start-1",
                  isLeft
                    ? "md:pr-16 md:text-right"
                    : "md:order-2 md:col-start-2 md:pl-16 md:text-left",
                )}
              >
                <span className="font-display text-5xl text-gold/40 sm:text-6xl">
                  {event.year}
                </span>
                <h3 className="mt-3 font-display text-2xl leading-tight ink sm:text-3xl">
                  {event.title}
                </h3>
                {event.location && (
                  <p
                    className={cn(
                      "mt-2 flex items-center gap-1.5 text-[0.65rem] uppercase tracking-luxe-sm text-gold",
                      isLeft && "md:justify-end",
                    )}
                  >
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </p>
                )}
                <p className="mt-4 max-w-md font-serif text-lg leading-relaxed muted md:ml-auto md:max-w-none">
                  {event.description}
                </p>
              </motion.div>

              {/* spacer for the empty column on desktop */}
              <div className="hidden md:block" aria-hidden />
            </div>
          );
        })}
      </div>
    </div>
  );
}
