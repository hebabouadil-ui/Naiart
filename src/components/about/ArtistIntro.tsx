"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import { useSiteContent, DEFAULT_PROFILE } from "@/store/site-content";

/** About-page hero + biography. Reads the artist profile from the persisted
 *  content store so admin edits are reflected live. Falls back to defaults
 *  before hydration so the server and first client paint match. */
export function ArtistIntro() {
  const hydrated = useSiteContent((s) => s.hydrated);
  const stored = useSiteContent((s) => s.profile);
  const p = hydrated ? stored : DEFAULT_PROFILE;
  const titleLines = p.heroTitle.split("\n");

  return (
    <>
      {/* Cinematic dark header — editorial split layout */}
      <section className="relative overflow-hidden bg-deep-charcoal pb-20 pt-36 sm:pt-44">
        <div className="grain absolute inset-0" />
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="container-luxe grid items-center gap-16 lg:grid-cols-[1fr_0.75fr]">
          {/* Text */}
          <div>
            <Reveal>
              <span className="eyebrow mb-6 flex items-center gap-3 text-gold/80">
                <span className="h-px w-8 bg-gold" /> The Artist
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.96] tracking-[-0.02em] text-ivory">
                {titleLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-8 max-w-lg font-serif text-xl leading-relaxed text-ivory/65">
                {p.heroSubtitle}
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="mt-10 font-display text-3xl italic text-gold">
                {p.name}
              </p>
            </Reveal>
          </div>

          {/* Portrait */}
          <Reveal delay={0.15} className="relative">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-sm lg:mx-0">
              <SafeImage
                src={p.portrait}
                alt={p.name}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 30vw"
                className="object-cover"
                fallbackColor="#4A3728"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-charcoal/40 to-transparent" />
            </div>
            <p className="mt-4 text-center text-[0.6rem] uppercase tracking-luxe-sm text-ivory/30 lg:text-left">
              {p.name} — Atelier Rabia, Arles
            </p>
          </Reveal>
        </div>
      </section>

      {/* Biography */}
      <section className="surface relative overflow-hidden py-24 sm:py-32">
        <div className="container-luxe max-w-4xl">
          <Reveal>
            <span className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold" /> A Life in Paint
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.02em] ink">
              I paint to keep what the light forgets
            </h2>
          </Reveal>
          <div className="mt-10 space-y-6 font-serif text-xl leading-relaxed muted">
            {p.bio.map((para, i) => (
              <Reveal key={i} delay={0.12 + i * 0.04}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
