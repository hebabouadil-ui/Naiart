"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Minus,
  Plus,
  X,
  ShieldCheck,
  Lock,
  Truck,
  Check,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/store/cart";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { Button, ButtonLink } from "@/components/ui/Button";
import { cn, formatPrice } from "@/lib/utils";

const REGIONS = [
  { value: "europe", label: "Europe — Complimentary", cost: 0 },
  { value: "north-america", label: "North America", cost: 250 },
  { value: "asia", label: "Asia Pacific", cost: 320 },
  { value: "world", label: "Rest of World", cost: 400 },
] as const;

const reassurance = [
  {
    icon: ShieldCheck,
    title: "Certificate of Authenticity",
    copy: "Each work is signed and accompanied by a numbered certificate.",
  },
  {
    icon: Lock,
    title: "Secure Payment",
    copy: "Encrypted checkout via Stripe with buyer protection.",
  },
  {
    icon: Truck,
    title: "White-Glove Shipping",
    copy: "Insured, climate-controlled delivery worldwide.",
  },
];

export default function CartPage() {
  const cart = useCart();
  const [mounted, setMounted] = useState(false);
  const [region, setRegion] = useState<(typeof REGIONS)[number]["value"]>(
    "europe",
  );
  const [code, setCode] = useState("");
  const [promoMsg, setPromoMsg] = useState<{
    type: "ok" | "error";
    text: string;
  } | null>(null);

  useEffect(() => setMounted(true), []);

  const shipping = REGIONS.find((r) => r.value === region)!.cost;
  const subtotal = mounted ? cart.subtotal() : 0;
  const total = mounted ? cart.total() : 0;
  const grandTotal = total + shipping;
  const items = mounted ? cart.items : [];

  const handleApply = () => {
    if (!code.trim()) return;
    const ok = cart.applyPromo(code);
    setPromoMsg(
      ok
        ? { type: "ok", text: "Promotion applied to your order." }
        : { type: "error", text: "That code is not recognised." },
    );
    if (ok) setCode("");
  };

  return (
    <main className="container-luxe pt-32 pb-28 sm:pt-40">
      {/* header */}
      <header className="max-w-3xl">
        <Reveal>
          <span className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            The Acquisition
          </span>
        </Reveal>
        <TextReveal
          as="h1"
          text="Your Selection"
          className="font-display text-[clamp(2.6rem,7vw,6rem)] font-medium leading-[0.98] tracking-[-0.02em] ink"
        />
        {mounted && items.length > 0 && (
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl font-serif text-xl leading-relaxed muted">
              {cart.count()} {cart.count() === 1 ? "work" : "works"} reserved for
              you. Complete your acquisition to receive each piece with its signed
              certificate of authenticity.
            </p>
          </Reveal>
        )}
      </header>

      {/* empty state */}
      {mounted && items.length === 0 ? (
        <Reveal>
          <div className="mt-16 flex min-h-[46vh] flex-col items-center justify-center rounded-sm surface px-6 py-24 text-center">
            <span className="font-display text-7xl text-gold/30">∅</span>
            <h2 className="mt-8 font-display text-3xl ink">
              Your selection is empty
            </h2>
            <p className="mt-4 max-w-sm font-serif text-lg leading-relaxed muted">
              Explore the gallery and begin a collection of original works,
              painted by hand in the Arles atelier.
            </p>
            <div className="mt-9">
              <ButtonLink href="/shop" variant="gold" size="lg">
                Enter the Gallery
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          {/* line items */}
          <section>
            <div className="hidden items-center gap-3 border-b border-current/10 pb-4 text-[0.6rem] uppercase tracking-luxe-sm muted sm:flex">
              <span className="flex-1">Work</span>
              <span className="w-32 text-center">Quantity</span>
              <span className="w-28 text-right">Total</span>
              <span className="w-6" />
            </div>

            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-5 border-b border-current/10 py-7 sm:flex-row sm:items-center"
                >
                  {/* image + meta */}
                  <div className="flex flex-1 items-center gap-5">
                    <Link
                      href={`/artwork/${item.slug}`}
                      className="relative h-28 w-24 shrink-0 overflow-hidden rounded-sm surface"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-700 ease-luxe hover:scale-105"
                      />
                    </Link>
                    <div className="min-w-0">
                      <Link href={`/artwork/${item.slug}`}>
                        <h3 className="font-display text-xl leading-tight ink transition-colors hover:text-gold">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="mt-1 font-serif text-sm italic muted">
                        {item.medium}
                      </p>
                      <p className="mt-0.5 text-[0.62rem] uppercase tracking-luxe-sm muted">
                        {item.dimensions}
                      </p>
                      <p className="mt-2 font-serif text-base ink">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* quantity */}
                  <div className="flex w-32 items-center justify-start gap-1 sm:justify-center">
                    <button
                      data-cursor="hover"
                      aria-label="Decrease quantity"
                      onClick={() => cart.setQuantity(item.id, item.quantity - 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-current/20 ink transition-colors hover:border-gold hover:text-gold"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center font-serif text-lg tabular-nums ink">
                      {item.quantity}
                    </span>
                    <button
                      data-cursor="hover"
                      aria-label="Increase quantity"
                      onClick={() => cart.setQuantity(item.id, item.quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-current/20 ink transition-colors hover:border-gold hover:text-gold"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* line total */}
                  <span className="w-28 text-left font-serif text-lg ink sm:text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  {/* remove */}
                  <button
                    data-cursor="hover"
                    aria-label="Remove from selection"
                    onClick={() => cart.remove(item.id)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-full muted transition-colors hover:text-clay sm:self-center"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>

            <Link
              href="/shop"
              className="group mt-8 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-luxe-sm text-gold"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Continue Browsing
            </Link>
          </section>

          {/* order summary */}
          <aside>
            <div className="sticky top-32 surface rounded-sm p-8">
              <h2 className="font-display text-2xl ink">Order Summary</h2>

              <dl className="mt-7 space-y-4 font-serif text-base">
                <div className="flex items-center justify-between">
                  <dt className="muted">Subtotal</dt>
                  <dd className="ink">{formatPrice(subtotal)}</dd>
                </div>

                {mounted && cart.promo && (
                  <div className="flex items-center justify-between text-gold">
                    <dt className="flex items-center gap-2">
                      Promotion · {cart.promo.code}
                      <button
                        data-cursor="hover"
                        aria-label="Remove promotion"
                        onClick={() => {
                          cart.removePromo();
                          setPromoMsg(null);
                        }}
                        className="muted transition-colors hover:text-clay"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </dt>
                    <dd>−{formatPrice(subtotal - total)}</dd>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <dt className="muted">Shipping</dt>
                  <dd className="ink">
                    {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
                  </dd>
                </div>
              </dl>

              {/* promo input */}
              <div className="mt-7 border-t border-current/10 pt-6">
                <label className="eyebrow mb-3 block text-[0.6rem]">
                  Promotion Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleApply()}
                    placeholder="ATELIER10"
                    className="w-full border-b border-current/20 bg-transparent py-2.5 font-sans text-sm uppercase tracking-luxe-sm ink outline-none transition-colors placeholder:muted focus:border-gold"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    magnetic={false}
                    onClick={handleApply}
                  >
                    Apply
                  </Button>
                </div>
                {promoMsg && (
                  <p
                    className={cn(
                      "mt-3 flex items-center gap-1.5 font-serif text-sm",
                      promoMsg.type === "ok" ? "text-gold" : "text-clay",
                    )}
                  >
                    {promoMsg.type === "ok" && <Check className="h-3.5 w-3.5" />}
                    {promoMsg.text}
                  </p>
                )}
              </div>

              {/* shipping region */}
              <div className="mt-6">
                <label
                  htmlFor="region"
                  className="eyebrow mb-3 block text-[0.6rem]"
                >
                  Shipping Destination
                </label>
                <select
                  id="region"
                  value={region}
                  onChange={(e) =>
                    setRegion(
                      e.target.value as (typeof REGIONS)[number]["value"],
                    )
                  }
                  className="w-full cursor-pointer border-b border-current/20 bg-transparent py-2.5 font-serif text-base ink outline-none transition-colors focus:border-gold"
                >
                  {REGIONS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                      {r.cost > 0 ? ` — ${formatPrice(r.cost)}` : ""}
                    </option>
                  ))}
                </select>
                <p className="mt-3 font-serif text-xs leading-relaxed muted">
                  Every shipment is fully insured for its declared value and
                  delivered by white-glove courier.
                </p>
              </div>

              {/* grand total */}
              <div className="mt-7 flex items-end justify-between border-t border-current/10 pt-6">
                <span className="font-sans text-[0.65rem] uppercase tracking-luxe-sm muted">
                  Total
                </span>
                <span className="font-display text-3xl ink">
                  {formatPrice(grandTotal)}
                </span>
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <ButtonLink
                  href="/checkout"
                  variant="gold"
                  size="lg"
                  magnetic={false}
                  className="w-full"
                >
                  Proceed to Checkout
                </ButtonLink>
                <ButtonLink
                  href="/shop"
                  variant="ghost"
                  size="md"
                  magnetic={false}
                  className="w-full"
                >
                  Continue Browsing
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* reassurance row */}
      <Reveal>
        <div className="mt-24 grid gap-8 border-t border-current/10 pt-14 sm:grid-cols-3 sm:gap-12">
          {reassurance.map((r) => (
            <div key={r.title} className="flex items-start gap-4">
              <r.icon className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
              <div>
                <h3 className="font-display text-lg ink">{r.title}</h3>
                <p className="mt-1.5 font-serif text-sm leading-relaxed muted">
                  {r.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
