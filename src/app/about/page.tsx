import type { Metadata } from "next";
import { timeline, awards, exhibitions } from "@/lib/data";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Timeline } from "@/components/about/Timeline";
import { ArtistIntro } from "@/components/about/ArtistIntro";

export const metadata: Metadata = {
  title: "The Artist",
  description:
    "The life and practice of Rabia Nainia — a French painter from the Camargue working in oil and cold wax from her atelier in Arles, Provence.",
};

const studioPhotos = [
  "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&h=1040&q=85&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=1040&q=85&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1505847119291-32d6f0a1f0a8?w=800&h=1040&q=85&fit=crop&auto=format",
];

export default function AboutPage() {
  return (
    <>
      {/* Editable hero + biography (reads the persisted artist profile) */}
      <ArtistIntro />

      {/* Studio gallery */}
      <section className="bg-warm-white py-24 dark:bg-deep-charcoal sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="The Atelier"
            title="Where the work is made"
            description="A converted printworks in the heart of Arles, where the eastern windows throw long blades of gold across the floor each morning."
            className="mb-16"
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {studioPhotos.map((src, i) => (
              <Reveal key={src} delay={i * 0.1}>
                <div
                  className={`relative overflow-hidden rounded-sm ${
                    i === 1 ? "aspect-[3/4] sm:mt-12" : "aspect-[3/4]"
                  }`}
                >
                  <SafeImage
                    src={src}
                    alt={`Studio detail ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 90vw, 30vw"
                    className="object-cover transition-transform duration-[1.2s] ease-luxe hover:scale-105"
                    fallbackColor="#2A2723"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="surface py-24 sm:py-36">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="The Journey"
            title="A path measured in light"
            align="center"
            className="mb-20"
          />
          <Timeline events={timeline} />
        </div>
      </section>

      {/* Awards & Exhibitions */}
      <section className="bg-warm-white py-24 dark:bg-deep-charcoal sm:py-32">
        <div className="container-luxe grid gap-20 lg:grid-cols-2">
          <div>
            <span className="eyebrow mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-gold" /> Recognition
            </span>
            <h2 className="mb-10 font-display text-4xl ink sm:text-5xl">
              Awards
            </h2>
            <ul>
              {awards.map((award, i) => (
                <Reveal key={award.title} delay={i * 0.05}>
                  <li className="group flex items-baseline gap-6 border-t border-current/10 py-6 last:border-b">
                    <span className="w-16 shrink-0 font-display text-2xl text-gold">
                      {award.year}
                    </span>
                    <div>
                      <h3 className="font-display text-xl ink transition-colors group-hover:text-gold">
                        {award.title}
                      </h3>
                      <p className="mt-1 font-serif text-base italic muted">
                        {award.org}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-gold" /> Selected
            </span>
            <h2 className="mb-10 font-display text-4xl ink sm:text-5xl">
              Exhibitions
            </h2>
            <ul>
              {exhibitions.map((show, i) => (
                <Reveal key={show.title} delay={i * 0.05}>
                  <li className="group flex items-baseline gap-6 border-t border-current/10 py-6 last:border-b">
                    <span className="w-16 shrink-0 font-display text-2xl text-gold">
                      {show.year}
                    </span>
                    <div>
                      <h3 className="font-display text-xl ink transition-colors group-hover:text-gold">
                        {show.title}
                      </h3>
                      <p className="mt-1 font-serif text-base italic muted">
                        {show.venue}, {show.city}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-deep-charcoal py-28 sm:py-40">
        <div className="grain absolute inset-0" />
        <div className="container-luxe relative z-10 flex flex-col items-center text-center">
          <Reveal>
            <span className="eyebrow mb-6">Begin Your Collection</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ivory">
              Own a piece of the light
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-xl font-serif text-xl leading-relaxed text-ivory/70">
              Acquire an original work from the atelier, or commission a singular
              painting conceived for your own space and story.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
              <ButtonLink href="/shop" variant="gold" size="lg">
                Explore the Gallery
              </ButtonLink>
              <ButtonLink href="/commission" variant="outline" size="lg">
                Commission a Work
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
