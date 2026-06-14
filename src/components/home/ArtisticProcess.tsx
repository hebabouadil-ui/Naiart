"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/data";
import { getLenis } from "@/components/providers/SmoothScroll";

export function ArtisticProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || window.innerWidth < 1024) return;

    gsap.registerPlugin(ScrollTrigger);

    // Keep ScrollTrigger in sync with Lenis smooth scroll
    const lenis = getLenis();
    const onScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onScroll);

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const totalShift = track.scrollWidth - window.innerWidth;

      const horizontal = gsap.to(track, {
        x: -totalShift,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalShift + window.innerHeight * 0.4}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax each artwork image relative to the horizontal scroll
      gsap.utils.toArray<HTMLElement>(".process-img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.22 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".process-panel"),
              containerAnimation: horizontal,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => {
      lenis?.off("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-deep-charcoal text-ivory"
    >
      {/* mobile fallback header */}
      <div className="container-luxe pb-10 pt-24 lg:absolute lg:left-0 lg:top-0 lg:z-10 lg:pt-16">
        <span className="eyebrow mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-gold" /> The Process
        </span>
        <h2 className="max-w-md font-display text-[clamp(2rem,4.5vw,3.6rem)] font-medium leading-[1.02] text-ivory">
          From inspiration <span className="italic text-gold-shimmer">to release</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col gap-16 px-6 pb-24 lg:h-screen lg:flex-row lg:items-center lg:gap-0 lg:px-0 lg:pb-0"
      >
        {/* spacer for desktop intro */}
        <div className="hidden w-[42vw] shrink-0 lg:block" />
        {processSteps.map((step) => (
          <article
            key={step.index}
            className="process-panel flex w-full shrink-0 flex-col items-start gap-8 lg:h-screen lg:w-[60vw] lg:flex-row lg:items-center lg:gap-14 lg:px-[5vw]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm lg:h-[62vh] lg:w-[26vw]">
              <Image
                src={step.image}
                alt={step.title}
                fill
                sizes="(max-width:1024px) 90vw, 26vw"
                className="process-img object-cover"
              />
              <span className="absolute left-5 top-4 font-display text-7xl text-ivory/80 mix-blend-overlay">
                {step.index}
              </span>
            </div>
            <div className="max-w-md">
              <span className="text-[0.65rem] uppercase tracking-luxe text-gold">
                {step.subtitle}
              </span>
              <h3 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                {step.title}
              </h3>
              <p className="mt-5 font-serif text-lg leading-relaxed text-ivory/70">
                {step.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
