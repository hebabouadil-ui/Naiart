import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections, getArtworksByCollection } from "@/lib/data";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore the collections of Rabia Nainia — abstract, modern, landscape, portrait, and bespoke commissioned works from the Arles atelier.",
};

export default function CollectionsPage() {
  return (
    <main className="grain min-h-screen pb-32 pt-32 sm:pt-40">
      {/* Header */}
      <header className="container-luxe">
        <Reveal>
          <span className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            The Body of Work
          </span>
        </Reveal>
        <TextReveal
          as="h1"
          text="Collections"
          className="font-display text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.95] tracking-[-0.03em] ink"
        />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl font-serif text-xl leading-relaxed muted">
            Five distinct currents run through the studio — each a different way
            of listening to light, surface, and silence. Choose a thread and
            follow it inward.
          </p>
        </Reveal>
      </header>

      {/* Alternating editorial rows */}
      <div className="mt-24 flex flex-col gap-28 sm:mt-32 sm:gap-40">
        {collections.map((collection, i) => {
          const count = getArtworksByCollection(collection.slug).length;
          const flipped = i % 2 === 1;
          return (
            <Reveal key={collection.slug} y={48}>
              <article className="container-luxe">
                <Link
                  href={`/collections/${collection.slug}`}
                  data-cursor="view"
                  data-cursor-label="Explore"
                  className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
                >
                  {/* Image */}
                  <div
                    className={cn(
                      "relative aspect-[4/5] overflow-hidden rounded-sm surface sm:aspect-[5/6]",
                      flipped && "lg:order-2",
                    )}
                  >
                    <Image
                      src={collection.cover}
                      alt={collection.name}
                      fill
                      sizes="(max-width: 1024px) 90vw, 45vw"
                      className="object-cover transition-transform duration-[1.4s] ease-luxe will-change-transform group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/10" />
                    <span className="absolute left-6 top-6 font-display text-[clamp(3rem,6vw,5rem)] leading-none text-ivory/90 mix-blend-difference">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Text */}
                  <div className={cn(flipped && "lg:order-1")}>
                    <span className="eyebrow text-gold">{collection.tagline}</span>
                    <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.02em] ink transition-colors duration-500 group-hover:text-gold">
                      {collection.name}
                    </h2>
                    <p className="mt-6 max-w-md font-serif text-lg leading-relaxed muted">
                      {collection.description}
                    </p>
                    <div className="mt-9 flex items-center gap-6">
                      <span className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-luxe-sm text-gold">
                        Explore collection
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                      <span className="hairline h-px flex-1" />
                      <span className="font-serif text-sm italic muted">
                        {count > 0
                          ? `${count} ${count === 1 ? "work" : "works"}`
                          : "By commission"}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>
    </main>
  );
}
