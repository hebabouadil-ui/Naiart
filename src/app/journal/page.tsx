import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { journal } from "@/lib/data";
import { Reveal, TextReveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from the atelier — essays on process, materials, light, and the slow craft of painting by Rabia Nainia.",
};

export default function JournalPage() {
  const sorted = [...journal].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const [featured, ...rest] = sorted;
  const categories = Array.from(new Set(journal.map((p) => p.category)));

  return (
    <main className="grain min-h-screen pb-32 pt-32 sm:pt-40">
      {/* Header */}
      <header className="container-luxe">
        <Reveal>
          <span className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            Notes from the Atelier
          </span>
        </Reveal>
        <TextReveal
          as="h1"
          text="The Journal"
          className="font-display text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.95] tracking-[-0.03em] ink"
        />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl font-serif text-xl leading-relaxed muted">
            Essays on process and material, on the light of Provence, and on the
            patient, unhurried craft of building a painting one layer at a time.
          </p>
        </Reveal>

        {/* Category chips (static) */}
        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full border border-gold bg-gold-gradient px-5 py-2 text-[0.62rem] uppercase tracking-luxe-sm text-charcoal">
              All
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-current/15 px-5 py-2 text-[0.62rem] uppercase tracking-luxe-sm muted"
              >
                {cat}
              </span>
            ))}
          </div>
        </Reveal>
      </header>

      {/* Featured latest post */}
      {featured && (
        <section className="container-luxe mt-20 sm:mt-28">
          <Reveal y={48}>
            <Link
              href={`/journal/${featured.slug}`}
              data-cursor="view"
              data-cursor-label="Read"
              className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-sm surface">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  className="object-cover transition-transform duration-[1.4s] ease-luxe will-change-transform group-hover:scale-[1.05]"
                />
                <span className="absolute left-5 top-5 rounded-full bg-gold-gradient px-4 py-1.5 text-[0.55rem] uppercase tracking-luxe-sm text-charcoal">
                  Latest
                </span>
              </div>
              <div>
                <div className="flex items-center gap-4 text-[0.65rem] uppercase tracking-luxe-sm text-gold">
                  <span>{featured.category}</span>
                  <span className="h-px w-6 bg-gold/40" />
                  <span className="muted">{featured.readTime} min read</span>
                </div>
                <h2 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] ink transition-colors duration-500 group-hover:text-gold">
                  {featured.title}
                </h2>
                <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed muted">
                  {featured.excerpt}
                </p>
                <div className="mt-8 flex items-center gap-4 text-sm">
                  <span className="font-serif italic ink">
                    {featured.author}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-current/30" />
                  <span className="muted">{formatDate(featured.publishedAt)}</span>
                  <ArrowUpRight className="ml-2 h-5 w-5 text-gold transition-transform duration-500 ease-luxe group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* Grid of remaining posts */}
      {rest.length > 0 && (
        <section className="container-luxe mt-24 sm:mt-32">
          <div className="mb-14 border-b border-current/10 pb-6">
            <span className="eyebrow">More Reading</span>
          </div>
          <StaggerGroup className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <StaggerItem key={post.id}>
                <article className="group">
                  <Link
                    href={`/journal/${post.slug}`}
                    data-cursor="view"
                    data-cursor-label="Read"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm surface">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                        className="object-cover transition-transform duration-[1.2s] ease-luxe will-change-transform group-hover:scale-[1.07]"
                      />
                      <span className="glass-strong absolute left-4 top-4 rounded-full px-3 py-1 text-[0.55rem] uppercase tracking-luxe-sm text-charcoal">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl leading-tight ink transition-colors duration-500 group-hover:text-gold">
                      {post.title}
                    </h3>
                    <p className="mt-3 font-serif text-base leading-relaxed muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-3 text-[0.62rem] uppercase tracking-luxe-sm muted">
                      <span>{post.author}</span>
                      <span className="h-1 w-1 rounded-full bg-current/30" />
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="h-1 w-1 rounded-full bg-current/30" />
                      <span>{post.readTime} min</span>
                    </div>
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      )}
    </main>
  );
}
