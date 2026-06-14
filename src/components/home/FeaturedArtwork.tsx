"use client";

import { featuredArtworks, limitedEditions, newArrivals } from "@/lib/data";
import { ArtworkCard } from "@/components/ui/ArtworkCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "featured", label: "Best Works", data: featuredArtworks },
  { key: "new", label: "New Arrivals", data: newArrivals },
  { key: "limited", label: "Limited Editions", data: limitedEditions },
] as const;

export function FeaturedArtwork() {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("featured");
  const current = tabs.find((t) => t.key === active)!;

  return (
    <section className="container-luxe py-24 sm:py-36" id="featured">
      <SectionHeading
        eyebrow="The Collection"
        title="Works to live with"
        description="A curated selection of original paintings — each one signed, certified, and shipped worldwide with white-glove care."
        link={{ href: "/shop", label: "View Full Gallery" }}
      />

      {/* tabs */}
      <div className="mt-12 flex flex-wrap gap-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            data-cursor="hover"
            onClick={() => setActive(t.key)}
            className={cn(
              "rounded-full border px-6 py-2.5 text-[0.65rem] uppercase tracking-luxe-sm transition-all duration-500",
              active === t.key
                ? "border-charcoal bg-charcoal text-ivory dark:border-ivory dark:bg-ivory dark:text-charcoal"
                : "border-current/20 text-current/60 hover:border-gold hover:text-gold",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {current.data.slice(0, 6).map((aw, i) => (
          <ArtworkCard key={aw.id} artwork={aw} index={i} priority={i < 3} />
        ))}
      </div>
    </section>
  );
}
