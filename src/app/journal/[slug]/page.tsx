import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { journal, getJournalPost } from "@/lib/data";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: `${post.title} — Naïart Journal`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.cover, alt: post.title }],
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const more = journal.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen pb-32">
      {/* Hero cover */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden bg-deep-charcoal">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-deep-charcoal/40 to-deep-charcoal/20" />
        <div className="grain absolute inset-0" />

        <div className="container-luxe relative z-10 pb-16 sm:pb-24">
          <Link
            href="/journal"
            data-cursor="hover"
            className="group mb-8 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-luxe-sm text-ivory/70 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            The Journal
          </Link>
          <div className="flex items-center gap-4 text-[0.65rem] uppercase tracking-luxe-sm text-gold">
            <span>{post.category}</span>
            <span className="h-px w-6 bg-gold/50" />
            <span className="text-ivory/60">{post.readTime} min read</span>
          </div>
          <TextReveal
            as="h1"
            text={post.title}
            className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.98] tracking-[-0.03em] text-ivory"
          />
          <div className="mt-8 flex items-center gap-4 text-sm text-ivory/70">
            <span className="font-serif italic text-ivory">{post.author}</span>
            <span className="h-1 w-1 rounded-full bg-ivory/40" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="container-luxe pt-20 sm:pt-28">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="font-serif text-2xl leading-snug ink first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[5.5rem] first-letter:leading-[0.8] first-letter:text-gold">
              {post.content[0]}
            </p>
          </Reveal>

          {post.content.slice(1).map((para, i) => (
            <Reveal key={i} delay={0.05}>
              <p className="mt-8 font-serif text-xl leading-relaxed muted">
                {para}
              </p>
            </Reveal>
          ))}

          {/* Tags */}
          <Reveal>
            <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-current/10 pt-10">
              <span className="mr-2 text-[0.62rem] uppercase tracking-luxe-sm text-gold">
                Filed under
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-current/15 px-4 py-1.5 text-[0.62rem] uppercase tracking-luxe-sm muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Signature */}
          <Reveal>
            <p className="mt-12 font-display text-3xl text-gold">— {post.author}</p>
          </Reveal>
        </div>
      </article>

      {/* More from the Journal */}
      {more.length > 0 && (
        <section className="container-luxe mt-28 sm:mt-36">
          <div className="mb-14 flex items-end justify-between border-b border-current/10 pb-6">
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-medium tracking-[-0.02em] ink">
              More from the Journal
            </h2>
            <Link
              href="/journal"
              data-cursor="hover"
              className="group hidden items-center gap-2 text-[0.7rem] uppercase tracking-luxe-sm text-gold transition-colors hover:text-gold-light sm:flex"
            >
              All articles
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <article key={p.id} className="group">
                <Link
                  href={`/journal/${p.slug}`}
                  data-cursor="view"
                  data-cursor-label="Read"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm surface">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover transition-transform duration-[1.2s] ease-luxe will-change-transform group-hover:scale-[1.07]"
                    />
                  </div>
                  <span className="mt-5 block text-[0.62rem] uppercase tracking-luxe-sm text-gold">
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-display text-xl leading-tight ink transition-colors duration-500 group-hover:text-gold">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-serif text-sm leading-relaxed muted">
                    {p.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
