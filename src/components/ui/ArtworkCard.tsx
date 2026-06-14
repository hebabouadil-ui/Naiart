"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { Artwork } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { useWishlist } from "@/store/wishlist";
import { useCart } from "@/store/cart";
import { TiltCard } from "./TiltCard";

const availabilityLabel: Record<Artwork["availability"], string> = {
  available: "Available",
  sold: "Sold",
  reserved: "Reserved",
  commission: "Commission",
};

export function ArtworkCard({
  artwork,
  index = 0,
  priority = false,
}: {
  artwork: Artwork;
  index?: number;
  priority?: boolean;
}) {
  const wishlist = useWishlist();
  const cart = useCart();
  const saved = wishlist.has(artwork.id);
  const isSold = artwork.availability === "sold";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      className="group relative"
    >
      <TiltCard intensity={5} className="preserve-3d">
        <Link
          href={`/artwork/${artwork.slug}`}
          data-cursor="view"
          data-cursor-label="View"
          className="block"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm surface">
            <Image
              src={artwork.images[0]}
              alt={artwork.title}
              fill
              priority={priority}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className="object-cover transition-transform duration-[1.2s] ease-luxe will-change-transform group-hover:scale-[1.07]"
            />
            {/* darken on hover */}
            <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/15" />

            {/* badges */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {artwork.limited && (
                <span className="glass-strong rounded-full px-3 py-1 text-[0.55rem] uppercase tracking-luxe-sm text-charcoal">
                  Limited
                </span>
              )}
              {artwork.newArrival && (
                <span className="rounded-full bg-gold-gradient px-3 py-1 text-[0.55rem] uppercase tracking-luxe-sm text-charcoal">
                  New
                </span>
              )}
            </div>

            {/* availability */}
            <span
              className={cn(
                "absolute right-4 top-4 rounded-full px-3 py-1 text-[0.55rem] uppercase tracking-luxe-sm",
                isSold
                  ? "bg-charcoal/80 text-ivory"
                  : "glass-strong text-charcoal",
              )}
            >
              {availabilityLabel[artwork.availability]}
            </span>

            {/* price reveal bar */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-charcoal/85 px-5 py-4 text-ivory backdrop-blur-md transition-transform duration-500 ease-luxe group-hover:translate-y-0">
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg">
                  {formatPrice(artwork.price)}
                </span>
                <span className="text-[0.6rem] uppercase tracking-luxe-sm text-ivory/70">
                  {artwork.dimensions}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </TiltCard>

      {/* actions */}
      <div className="absolute right-4 top-4 z-20 flex translate-x-3 flex-col gap-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
        <button
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          data-cursor="hover"
          onClick={() => wishlist.toggle(artwork.id)}
          className="mt-10 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-charcoal backdrop-blur transition-colors hover:bg-gold hover:text-ivory"
        >
          <Heart className={cn("h-4 w-4", saved && "fill-gold text-gold")} />
        </button>
        {!isSold && (
          <button
            aria-label="Add to cart"
            data-cursor="hover"
            onClick={() => cart.add(artwork)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-charcoal backdrop-blur transition-colors hover:bg-charcoal hover:text-ivory"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* meta */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <Link href={`/artwork/${artwork.slug}`}>
            <h3 className="font-display text-xl leading-tight ink transition-colors group-hover:text-gold">
              {artwork.title}
            </h3>
          </Link>
          <p className="mt-1 font-serif text-sm italic muted">
            {artwork.medium}, {artwork.year}
          </p>
        </div>
        <span className="whitespace-nowrap font-serif text-base ink">
          {formatPrice(artwork.price)}
        </span>
      </div>
    </motion.article>
  );
}
