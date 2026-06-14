import type { Metadata } from "next";
import Image from "next/image";
import { BRAND, timeline, awards, exhibitions } from "@/lib/data";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Timeline } from "@/components/about/Timeline";

export const metadata: Metadata = {
  title: "The Artist",
  description:
    "The life and practice of Naïa Lemaire — a French painter from the Camargue working in oil and cold wax from her atelier in Arles, Provence.",
};

const portrait =
  "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1100&h=1400&q=80";

const studioPhotos = [
  "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=1200&h=1500&q=80",
  "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&h=1500&q=80",
  "https://images.unsplash.com/photo-1505847119291-32d6f0a1f0a8?auto=format&fit=crop&w=1200&h=1500&q=80",
];

export default function AboutPage() {
  return (
    <>
      {/* Cinematic dark header */}
      <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-deep-charcoal">
        <div className="grain absolute inset-0" />
        <Image
          src="https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=2000&h=1300&q=80"
          alt="The atelier in Arles"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-deep-charcoal/60 to-transparent" />
        <div className="container-luxe relative z-10 pb-20 sm:pb-28">
          <span className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" /> The Artist
          </span>
          <TextReveal
            as="h1"
            text="The hand behind the light"
            className="max-w-5xl font-display text-[clamp(2.6rem,8vw,7rem)] font-medium leading-[0.98] tracking-[-0.02em] text-ivory"
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl font-serif text-2xl italic text-ivory/70">
              {BRAND.full}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Portrait + biography */}
      <section className="surface relative overflow-hidden py-24 sm:py-36">
        <div className="container-luxe grid items-start gap-16 lg:grid-cols-[0.85fr_1fr]">
          <Reveal className="lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src={portrait}
                alt={BRAND.full}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="mt-6 text-[0.65rem] uppercase tracking-luxe-sm muted">
              {BRAND.full} — Atelier Naïa, Arles
            </p>
          </Reveal>

          <div>
            <span className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold" /> A Life in Paint
            </span>
            <TextReveal
              as="h2"
              text="I paint to keep what the light forgets"
              className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.02em] ink"
            />
            <div className="mt-10 space-y-6 font-serif text-xl leading-relaxed muted">
              <Reveal delay={0.05}>
                <p>
                  I was born between the salt marshes of the Camargue and the
                  print studios of Marseille, raised on the particular silver of
                  southern light and the smell of ink drying on paper. For years
                  I trained as an architect, learning to love structure — but it
                  was always the feeling held inside a building, not the
                  building, that moved me. Painting was where that feeling
                  finally had somewhere to go.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  For more than fifteen years I have worked in oil and cold wax,
                  a slow and sculptural language that refuses to be rushed. Each
                  canvas is built in layers — applied, scraped back, polished,
                  and broken again — until the surface begins to hold light the
                  way skin does: softly, unevenly, alive. A single painting may
                  take forty mornings. The waiting is not lost time; it is the
                  time in which the work decides what it wants to become.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  My philosophy is simple and unfashionable: a painting should
                  give more the longer you live with it. I am not interested in
                  the image you see across a room, but in the one that reveals
                  itself on a quiet afternoon, years later. From my atelier in
                  Arles — a converted printworks flooded with morning sun — I
                  make work for people who want to keep looking.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="mt-12 font-display text-4xl italic text-gold">
                {BRAND.full}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

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
                  <Image
                    src={src}
                    alt={`Studio detail ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 90vw, 30vw"
                    className="object-cover transition-transform duration-[1.2s] ease-luxe hover:scale-105"
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
          <span className="eyebrow mb-6">Begin Your Collection</span>
          <TextReveal
            as="h2"
            text="Own a piece of the light"
            className="justify-center font-display text-[clamp(2.2rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ivory"
          />
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
