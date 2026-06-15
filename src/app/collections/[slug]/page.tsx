import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  collections,
  getCollection,
  getArtworksByCollection,
} from "@/lib/data";
import { ArtworkCard } from "@/components/ui/ArtworkCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, TextReveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection Not Found" };

  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      title: `${collection.name} — Naiart`,
      description: collection.description,
      type: "website",
      images: [{ url: collection.cover, alt: collection.name }],
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const works = getArtworksByCollection(slug);

  return (
    <main className="min-h-screen pb-32">
      {/* Dark full-bleed hero */}
      <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-deep-charcoal">
        <Image
          src={collection.cover}
          alt={collection.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-deep-charcoal/40 to-deep-charcoal/30" />
        <div className="grain absolute inset-0" />

        <div className="container-luxe relative z-10 pb-20 sm:pb-28">
          <Link
            href="/collections"
            data-cursor="hover"
            className="group mb-8 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-luxe-sm text-ivory/70 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All collections
          </Link>
          <span className="eyebrow mb-5 flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold" />
            {collection.tagline}
          </span>
          <TextReveal
            as="h1"
            text={collection.name}
            className="font-display text-[clamp(3rem,11vw,9rem)] font-medium leading-[0.92] tracking-[-0.03em] text-ivory"
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl font-serif text-xl leading-relaxed text-ivory/70">
              {collection.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Works grid */}
      <section className="container-luxe pt-24 sm:pt-32">
        {works.length > 0 ? (
          <>
            <div className="mb-14 flex items-end justify-between gap-8 border-b border-current/10 pb-8">
              <span className="font-serif text-lg italic muted">
                {works.length} {works.length === 1 ? "work" : "works"} in this
                collection
              </span>
              <Link
                href="/collections"
                data-cursor="hover"
                className="group hidden items-center gap-2 text-[0.7rem] uppercase tracking-luxe-sm text-gold transition-colors hover:text-gold-light sm:flex"
              >
                Browse all collections
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {works.map((artwork, i) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  index={i}
                  priority={i < 3}
                />
              ))}
            </div>
          </>
        ) : (
          // Empty state — e.g. the "custom" collection
          <Reveal>
            <div className="mx-auto flex max-w-xl flex-col items-center py-16 text-center">
              <span className="eyebrow text-gold">By Commission Only</span>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] ink">
                A work conceived for you alone
              </h2>
              <p className="mt-6 font-serif text-lg leading-relaxed muted">
                There are no finished pieces to show here — and that is the
                point. Each work in this collection is painted in dialogue with
                its owner, its space, and its light. Begin the conversation, and
                we will create something that exists nowhere else.
              </p>
              <div className="mt-12">
                <ButtonLink href="/commission" variant="gold" size="lg">
                  Begin a Commission
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        )}
      </section>
    </main>
  );
}
