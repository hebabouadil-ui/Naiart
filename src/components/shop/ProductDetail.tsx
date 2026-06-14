"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Expand,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import type { Artwork } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { collections } from "@/lib/data";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ArtworkCard } from "@/components/ui/ArtworkCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, TextReveal } from "@/components/ui/Reveal";

const easing = [0.16, 1, 0.3, 1] as const;

const availabilityMeta: Record<
  Artwork["availability"],
  { label: string; tone: string }
> = {
  available: { label: "Available", tone: "border-gold/40 text-gold" },
  reserved: { label: "Reserved", tone: "border-current/30 muted" },
  sold: { label: "Sold", tone: "border-current/30 muted" },
  commission: { label: "Commission", tone: "border-gold/40 text-gold" },
};

/* ---------------- accordion ---------------- */

function Accordion({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-current/10">
      <button
        data-cursor="hover"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 py-5 text-left"
      >
        <span className="text-gold">{icon}</span>
        <span className="flex-1 font-sans text-[0.7rem] uppercase tracking-luxe-sm ink">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 muted transition-transform duration-500 ease-luxe",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: easing }}
            className="overflow-hidden"
          >
            <div className="pb-6 font-serif text-base leading-relaxed muted">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- magnify image ---------------- */

function MainImage({
  src,
  alt,
  onExpand,
}: {
  src: string;
  alt: string;
  onExpand: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <div
      ref={ref}
      data-cursor="view"
      data-cursor-label="Zoom"
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={onMove}
      className="group relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-sm surface"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: easing }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-300 ease-out"
            style={{
              transformOrigin: `${pos.x}% ${pos.y}%`,
              transform: zoom ? "scale(1.9)" : "scale(1)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      <button
        data-cursor="hover"
        onClick={(e) => {
          e.stopPropagation();
          onExpand();
        }}
        aria-label="Open fullscreen"
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full glass-strong text-charcoal opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      >
        <Expand className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ---------------- lightbox ---------------- */

function Lightbox({
  images,
  index,
  alt,
  onClose,
  onSelect,
}: {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onSelect: (i: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex flex-col bg-deep-charcoal/95 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-6 py-6 sm:px-10">
        <span className="font-sans text-[0.65rem] uppercase tracking-luxe-sm text-ivory/60">
          {alt}
        </span>
        <button
          data-cursor="hover"
          onClick={onClose}
          aria-label="Close"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-6 pb-6 sm:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: easing }}
            className="relative h-full w-full"
          >
            <Image
              src={images[index]}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-3 px-6 pb-10">
          {images.map((img, i) => (
            <button
              key={img + i}
              data-cursor="hover"
              onClick={() => onSelect(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative h-16 w-14 overflow-hidden rounded-sm ring-1 transition-all duration-300",
                i === index
                  ? "ring-2 ring-gold"
                  : "opacity-50 ring-ivory/20 hover:opacity-100",
              )}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ---------------- main ---------------- */

export function ProductDetail({
  artwork,
  related,
}: {
  artwork: Artwork;
  related: Artwork[];
}) {
  const router = useRouter();
  const cart = useCart();
  const wishlist = useWishlist();

  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const saved = wishlist.has(artwork.id);
  const isSold = artwork.availability === "sold";
  const collection = collections.find((c) => c.slug === artwork.collection);
  const meta = availabilityMeta[artwork.availability];

  const ldStatus =
    artwork.availability === "available"
      ? "https://schema.org/InStock"
      : artwork.availability === "sold"
        ? "https://schema.org/SoldOut"
        : "https://schema.org/LimitedAvailability";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: artwork.title,
    image: artwork.images,
    description: artwork.description,
    category: collection?.name ?? artwork.collection,
    brand: { "@type": "Brand", name: "Naïart" },
    offers: {
      "@type": "Offer",
      price: artwork.price,
      priceCurrency: "USD",
      availability: ldStatus,
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const addToCart = () => {
    cart.add(artwork);
    cart.open();
  };

  const buyNow = () => {
    cart.add(artwork);
    router.push("/checkout");
  };

  return (
    <main className="pb-28 pt-28 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-luxe">
        {/* breadcrumb */}
        <Reveal y={16}>
          <nav className="flex flex-wrap items-center gap-2 font-sans text-[0.65rem] uppercase tracking-luxe-sm muted">
            <Link href="/shop" className="link-underline transition-colors hover:text-gold">
              Gallery
            </Link>
            <span className="text-gold/50">/</span>
            <Link
              href={`/collections/${artwork.collection}`}
              className="link-underline transition-colors hover:text-gold"
            >
              {collection?.name ?? artwork.collection}
            </Link>
            <span className="text-gold/50">/</span>
            <span className="ink">{artwork.title}</span>
          </nav>
        </Reveal>

        {/* main two-column */}
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* gallery */}
          <div className="flex flex-col gap-5">
            <Reveal y={24}>
              <MainImage
                src={artwork.images[active]}
                alt={artwork.title}
                onExpand={() => setLightbox(true)}
              />
            </Reveal>

            {artwork.images.length > 1 && (
              <div className="flex gap-4">
                {artwork.images.map((img, i) => (
                  <button
                    key={img + i}
                    data-cursor="hover"
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                    className={cn(
                      "relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-sm ring-1 transition-all duration-500 sm:w-24",
                      i === active
                        ? "ring-2 ring-gold"
                        : "opacity-60 ring-current/10 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* details */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-sans text-[0.58rem] uppercase tracking-luxe-sm",
                  meta.tone,
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    artwork.availability === "available" ? "bg-gold" : "bg-current",
                  )}
                />
                {meta.label}
              </span>
              {artwork.limited && (
                <span className="font-sans text-[0.58rem] uppercase tracking-luxe-sm text-gold">
                  Limited Edition
                </span>
              )}
            </div>

            <TextReveal
              as="h1"
              text={artwork.title}
              className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] ink"
            />

            <Reveal delay={0.05} y={18}>
              <p className="mt-3 font-serif text-lg italic muted">
                {artwork.medium}, {artwork.year}
              </p>

              <p className="mt-7 font-serif text-3xl ink">
                {formatPrice(artwork.price)}
              </p>

              {/* spec rows */}
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-current/10 pt-8">
                {[
                  ["Dimensions", artwork.dimensions],
                  ["Year", String(artwork.year)],
                  ["Medium", artwork.medium],
                  ["Palette", artwork.colorName],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-sans text-[0.6rem] uppercase tracking-luxe-sm muted">
                      {label}
                    </dt>
                    <dd className="mt-1.5 font-serif text-base ink">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* purchase */}
              <div className="mt-9 flex flex-col gap-3">
                {isSold ? (
                  <ButtonLink
                    href="/contact"
                    variant="primary"
                    size="lg"
                    magnetic={false}
                    className="w-full"
                  >
                    Sold — Enquire About a Similar Work
                  </ButtonLink>
                ) : (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      variant="gold"
                      size="lg"
                      magnetic={false}
                      onClick={buyNow}
                      className="flex-1"
                    >
                      Buy Now
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      magnetic={false}
                      onClick={addToCart}
                      className="flex-1"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    data-cursor="hover"
                    onClick={() => wishlist.toggle(artwork.id)}
                    aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
                    className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-current/20 ink transition-colors hover:border-gold hover:text-gold"
                  >
                    <Heart
                      className={cn("h-5 w-5", saved && "fill-gold text-gold")}
                    />
                  </button>
                  <ButtonLink
                    href="/commission"
                    variant="outline"
                    size="lg"
                    magnetic={false}
                    className="flex-1"
                  >
                    Request Custom Commission
                  </ButtonLink>
                </div>
              </div>

              {/* certificate reassurance */}
              <div className="mt-9 flex items-start gap-4 rounded-sm border border-gold/25 bg-gold/[0.04] p-5">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
                <div>
                  <h3 className="font-display text-lg ink">
                    Certificate of Authenticity
                  </h3>
                  <p className="mt-1.5 font-serif text-base leading-relaxed muted">
                    Every work ships with a hand-signed certificate, archival
                    documentation, and museum-grade packaging — guaranteed an
                    original by the artist.
                  </p>
                </div>
              </div>

              {/* story */}
              <div className="mt-10 space-y-5 border-t border-current/10 pt-9">
                <p className="font-serif text-lg leading-relaxed ink">
                  {artwork.description}
                </p>
                <p className="font-serif text-base leading-relaxed muted">
                  {artwork.story}
                </p>
              </div>

              {/* accordions */}
              <div className="mt-8">
                <Accordion
                  title="Shipping & Delivery"
                  icon={<Truck className="h-4 w-4" />}
                  defaultOpen
                >
                  Complimentary white-glove shipping worldwide, fully insured and
                  hand-delivered. Works are crated to museum standards; delivery
                  typically takes 7–14 business days depending on destination.
                </Accordion>
                <Accordion
                  title="Returns & Provenance"
                  icon={<ShieldCheck className="h-4 w-4" />}
                >
                  A 14-day collector&rsquo;s assurance period applies from the day of
                  delivery. Full provenance and condition reports are maintained in
                  the studio archive for the lifetime of the work.
                </Accordion>
              </div>
            </Reveal>
          </div>
        </div>

        {/* related */}
        {related.length > 0 && (
          <section className="mt-28 sm:mt-36">
            <SectionHeading
              eyebrow="Continue Collecting"
              title="You May Also Collect"
              description={`More from the ${collection?.name ?? ""} collection, chosen to sit alongside this work.`}
              link={{ href: "/shop", label: "View the gallery" }}
            />
            <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((a, i) => (
                <ArtworkCard key={a.id} artwork={a} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={artwork.images}
            index={active}
            alt={artwork.title}
            onClose={() => setLightbox(false)}
            onSelect={setActive}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
