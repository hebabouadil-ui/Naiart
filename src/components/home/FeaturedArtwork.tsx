"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredArtworks } from "@/lib/data";
import { ArtworkCard } from "@/components/ui/ArtworkCard";

export function FeaturedArtwork() {
  return (
    <section className="container-luxe py-16 sm:py-24" id="featured">
      <div className="flex items-end justify-between gap-6 border-b border-current/10 pb-10">
        <div>
          <span className="text-[0.6rem] uppercase tracking-luxe text-clay">
            The Collection
          </span>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.8rem)] font-medium leading-[1.04] tracking-[-0.02em] text-charcoal dark:text-ivory">
            Works to live with
          </h2>
        </div>
        <Link
          href="/shop"
          className="group mb-1 hidden shrink-0 items-center gap-2 text-[0.62rem] uppercase tracking-luxe-sm text-clay transition-colors hover:text-gold sm:flex"
        >
          View all
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {featuredArtworks.slice(0, 3).map((aw, i) => (
          <ArtworkCard key={aw.id} artwork={aw} index={i} priority={i < 3} />
        ))}
      </div>
    </section>
  );
}
