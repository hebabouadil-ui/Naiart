"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function CollectionsSection() {
  return (
    <section className="container-luxe py-24 sm:py-36">
      <SectionHeading
        eyebrow="Explore"
        title="Collections"
        description="Five distinct bodies of work — each a different way of seeing the world through paint."
        link={{ href: "/collections", label: "All Collections" }}
      />

      <div className="mt-14 grid auto-rows-[18rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[22rem]">
        {collections.map((c, i) => (
          <Reveal
            key={c.slug}
            delay={i * 0.06}
            className={
              i === 0
                ? "lg:col-span-3 lg:row-span-2"
                : i === 1
                  ? "lg:col-span-3"
                  : "lg:col-span-2"
            }
          >
            <Link
              href={`/collections/${c.slug}`}
              data-cursor="view"
              data-cursor-label="Open"
              className="group relative block h-full w-full overflow-hidden rounded-sm"
            >
              <Image
                src={c.cover}
                alt={c.name}
                fill
                sizes="(max-width:1024px) 90vw, 50vw"
                className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-7 text-ivory">
                <span className="text-[0.6rem] uppercase tracking-luxe text-gold-light">
                  {c.tagline}
                </span>
                <div className="mt-1 flex items-end justify-between">
                  <h3 className="font-display text-3xl sm:text-4xl">{c.name}</h3>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 transition-all duration-500 group-hover:bg-ivory group-hover:text-charcoal">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 max-w-md font-serif text-base leading-relaxed text-ivory/0 opacity-0 transition-all duration-500 group-hover:text-ivory/80 group-hover:opacity-100">
                  {c.description}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
