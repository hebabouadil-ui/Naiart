"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Lock,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/store/cart";
import { Reveal } from "@/components/ui/Reveal";
import { Button, ButtonLink } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn, formatPrice } from "@/lib/utils";

const easing = [0.16, 1, 0.3, 1] as const;

const COUNTRIES = [
  "France",
  "United Kingdom",
  "Germany",
  "Switzerland",
  "Italy",
  "Spain",
  "United States",
  "Canada",
  "United Arab Emirates",
  "Japan",
  "Singapore",
  "Australia",
];

const STEPS = [
  { id: 1, label: "Contact" },
  { id: 2, label: "Shipping" },
  { id: 3, label: "Payment" },
] as const;

const SHIPPING = 250;

type Contact = { email: string; name: string; phone: string };
type Shipping = {
  line1: string;
  line2: string;
  city: string;
  postal: string;
  country: string;
  notes: string;
};
type Card = { number: string; expiry: string; cvc: string; name: string };

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="eyebrow mb-3 block text-[0.6rem]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full border-b bg-transparent py-2.5 font-serif text-base ink outline-none transition-colors placeholder:muted focus:border-gold",
          error ? "border-clay" : "border-current/20",
        )}
      />
    </label>
  );
}

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const [method, setMethod] = useState<"card" | "paypal">("card");
  const [processing, setProcessing] = useState(false);

  const [contact, setContact] = useState<Contact>({
    email: "",
    name: "",
    phone: "",
  });
  const [shipping, setShipping] = useState<Shipping>({
    line1: "",
    line2: "",
    city: "",
    postal: "",
    country: "France",
    notes: "",
  });
  const [card, setCard] = useState<Card>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  useEffect(() => setMounted(true), []);

  const items = mounted ? cart.items : [];
  const subtotal = mounted ? cart.subtotal() : 0;
  const discounted = mounted ? cart.total() : 0;
  const grandTotal = discounted + SHIPPING;
  const promo = mounted ? cart.promo : null;

  const valid = useMemo(() => {
    if (step === 1) {
      return (
        /\S+@\S+\.\S+/.test(contact.email) &&
        contact.name.trim().length > 1 &&
        contact.phone.trim().length >= 6
      );
    }
    if (step === 2) {
      return (
        shipping.line1.trim().length > 2 &&
        shipping.city.trim().length > 1 &&
        shipping.postal.trim().length > 2 &&
        shipping.country.trim().length > 0
      );
    }
    if (method === "card") {
      return (
        card.number.replace(/\s/g, "").length >= 12 &&
        /\d\d\s*\/\s*\d\d/.test(card.expiry) &&
        card.cvc.trim().length >= 3 &&
        card.name.trim().length > 1
      );
    }
    return true;
  }, [step, contact, shipping, card, method]);

  const next = () => {
    if (!valid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((s) => Math.min(3, s + 1));
  };

  const back = () => {
    setShowErrors(false);
    setStep((s) => Math.max(1, s - 1));
  };

  const pay = async () => {
    if (!valid) {
      setShowErrors(true);
      return;
    }
    setProcessing(true);
    // Demo checkout — navigate to confirmation after a brief processing animation.
    const id = "NAI-" + Math.floor(1000 + Math.random() * 9000);
    setTimeout(() => {
      cart.clear();
      router.push(`/checkout/confirmation?order=${id}&total=${grandTotal}`);
    }, 1400);
  };

  // empty cart notice
  if (mounted && items.length === 0) {
    return (
      <main className="container-luxe pt-32 pb-28 sm:pt-40">
        <Reveal>
          <div className="mx-auto flex min-h-[52vh] max-w-lg flex-col items-center justify-center rounded-sm surface px-6 py-24 text-center">
            <span className="font-display text-7xl text-gold/30">∅</span>
            <h1 className="mt-8 font-display text-3xl ink">
              Your selection is empty
            </h1>
            <p className="mt-4 max-w-sm font-serif text-lg leading-relaxed muted">
              There is nothing to check out just yet. Discover the collection and
              reserve a work painted by hand in the Arles atelier.
            </p>
            <div className="mt-9">
              <ButtonLink href="/shop" variant="gold" size="lg">
                Enter the Gallery
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </main>
    );
  }

  return (
    <main className="container-luxe pt-32 pb-28 sm:pt-40">
      <header className="max-w-3xl">
        <Reveal>
          <span className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            Secure Acquisition
          </span>
        </Reveal>
        <h1 className="font-display text-[clamp(2.6rem,7vw,6rem)] font-medium leading-[0.98] tracking-[-0.02em] ink">
          Checkout
        </h1>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
        {/* form column */}
        <section>
          {/* step indicator */}
          <div className="flex items-center gap-3 sm:gap-5">
            {STEPS.map((s, i) => {
              const done = step > s.id;
              const active = step === s.id;
              return (
                <div key={s.id} className="flex flex-1 items-center gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-serif text-sm transition-colors duration-500",
                        done && "border-gold bg-gold-gradient text-charcoal",
                        active && "border-gold text-gold",
                        !done && !active && "border-current/20 muted",
                      )}
                    >
                      {done ? <Check className="h-4 w-4" /> : s.id}
                    </span>
                    <span
                      className={cn(
                        "hidden text-[0.62rem] uppercase tracking-luxe-sm sm:block",
                        active || done ? "text-gold" : "muted",
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <span
                      className={cn(
                        "h-px flex-1 transition-colors duration-500",
                        step > s.id ? "bg-gold" : "bg-current/15",
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 surface rounded-sm p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.5, ease: easing }}
                >
                  <h2 className="font-display text-2xl ink">Contact Details</h2>
                  <p className="mt-2 font-serif text-base muted">
                    Where shall we send your order confirmation and certificate?
                  </p>
                  <div className="mt-8 grid gap-7">
                    <Field
                      label="Email Address"
                      type="email"
                      value={contact.email}
                      onChange={(v) => setContact({ ...contact, email: v })}
                      placeholder="you@example.com"
                      error={showErrors && !/\S+@\S+\.\S+/.test(contact.email)}
                    />
                    <Field
                      label="Full Name"
                      value={contact.name}
                      onChange={(v) => setContact({ ...contact, name: v })}
                      placeholder="First and last name"
                      error={showErrors && contact.name.trim().length <= 1}
                    />
                    <Field
                      label="Phone"
                      type="tel"
                      value={contact.phone}
                      onChange={(v) => setContact({ ...contact, phone: v })}
                      placeholder="+33 6 00 00 00 00"
                      error={showErrors && contact.phone.trim().length < 6}
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.5, ease: easing }}
                >
                  <h2 className="font-display text-2xl ink">Shipping Address</h2>
                  <p className="mt-2 font-serif text-base muted">
                    Your work is delivered insured by white-glove courier.
                  </p>
                  <div className="mt-8 grid gap-7 sm:grid-cols-2">
                    <Field
                      className="sm:col-span-2"
                      label="Address Line 1"
                      value={shipping.line1}
                      onChange={(v) => setShipping({ ...shipping, line1: v })}
                      placeholder="Street and number"
                      error={showErrors && shipping.line1.trim().length <= 2}
                    />
                    <Field
                      className="sm:col-span-2"
                      label="Address Line 2 (optional)"
                      value={shipping.line2}
                      onChange={(v) => setShipping({ ...shipping, line2: v })}
                      placeholder="Apartment, suite, etc."
                    />
                    <Field
                      label="City"
                      value={shipping.city}
                      onChange={(v) => setShipping({ ...shipping, city: v })}
                      placeholder="City"
                      error={showErrors && shipping.city.trim().length <= 1}
                    />
                    <Field
                      label="Postal Code"
                      value={shipping.postal}
                      onChange={(v) => setShipping({ ...shipping, postal: v })}
                      placeholder="Postal code"
                      error={showErrors && shipping.postal.trim().length <= 2}
                    />
                    <label className="block sm:col-span-2">
                      <span className="eyebrow mb-3 block text-[0.6rem]">
                        Country
                      </span>
                      <select
                        value={shipping.country}
                        onChange={(e) =>
                          setShipping({ ...shipping, country: e.target.value })
                        }
                        className="w-full cursor-pointer border-b border-current/20 bg-transparent py-2.5 font-serif text-base ink outline-none transition-colors focus:border-gold"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="eyebrow mb-3 block text-[0.6rem]">
                        Delivery Notes (optional)
                      </span>
                      <textarea
                        value={shipping.notes}
                        onChange={(e) =>
                          setShipping({ ...shipping, notes: e.target.value })
                        }
                        rows={3}
                        placeholder="Concierge details, preferred delivery window…"
                        className="w-full resize-none border-b border-current/20 bg-transparent py-2.5 font-serif text-base ink outline-none transition-colors placeholder:muted focus:border-gold"
                      />
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.5, ease: easing }}
                >
                  <h2 className="font-display text-2xl ink">Payment</h2>
                  <p className="mt-2 font-serif text-base muted">
                    This is a demonstration checkout — no real payment is taken.
                  </p>

                  {/* method toggle */}
                  <div className="mt-7 grid grid-cols-2 gap-3">
                    {(["card", "paypal"] as const).map((m) => (
                      <button
                        key={m}
                        data-cursor="hover"
                        onClick={() => setMethod(m)}
                        className={cn(
                          "rounded-sm border px-4 py-4 text-center text-[0.65rem] uppercase tracking-luxe-sm transition-colors",
                          method === m
                            ? "border-gold text-gold"
                            : "border-current/15 muted hover:border-current/40",
                        )}
                      >
                        {m === "card" ? "Card · Stripe" : "PayPal"}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {method === "card" ? (
                      <motion.div
                        key="card"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4, ease: easing }}
                        className="mt-8 grid gap-7"
                      >
                        <label className="block">
                          <span className="eyebrow mb-3 flex items-center justify-between text-[0.6rem]">
                            Card Number
                            <span className="flex gap-1.5 text-[0.7rem] not-italic tracking-normal muted">
                              <span className="rounded bg-current/10 px-1.5 py-0.5">VISA</span>
                              <span className="rounded bg-current/10 px-1.5 py-0.5">MC</span>
                              <span className="rounded bg-current/10 px-1.5 py-0.5">AMEX</span>
                            </span>
                          </span>
                          <div className="flex items-center gap-3 border-b border-current/20 transition-colors focus-within:border-gold">
                            <CreditCard className="h-4 w-4 shrink-0 muted" />
                            <input
                              inputMode="numeric"
                              value={card.number}
                              onChange={(e) =>
                                setCard({ ...card, number: e.target.value })
                              }
                              placeholder="4242 4242 4242 4242"
                              className="w-full bg-transparent py-2.5 font-serif text-base tracking-wider ink outline-none placeholder:muted"
                            />
                          </div>
                        </label>
                        <div className="grid grid-cols-2 gap-7">
                          <Field
                            label="Expiry"
                            value={card.expiry}
                            onChange={(v) => setCard({ ...card, expiry: v })}
                            placeholder="MM / YY"
                            error={
                              showErrors && !/\d\d\s*\/\s*\d\d/.test(card.expiry)
                            }
                          />
                          <Field
                            label="CVC"
                            value={card.cvc}
                            onChange={(v) => setCard({ ...card, cvc: v })}
                            placeholder="123"
                            error={showErrors && card.cvc.trim().length < 3}
                          />
                        </div>
                        <Field
                          label="Name on Card"
                          value={card.name}
                          onChange={(v) => setCard({ ...card, name: v })}
                          placeholder="As shown on card"
                          error={showErrors && card.name.trim().length <= 1}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="paypal"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4, ease: easing }}
                        className="mt-8"
                      >
                        <div className="rounded-sm border border-current/15 bg-soft-beige/40 px-6 py-10 text-center">
                          <span className="font-display text-2xl tracking-tight">
                            <span className="text-[#003087]">Pay</span>
                            <span className="text-[#0070ba]">Pal</span>
                          </span>
                          <p className="mx-auto mt-3 max-w-xs font-serif text-sm leading-relaxed muted">
                            You will be redirected to PayPal to complete payment
                            securely. (Demonstration only.)
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="mt-7 flex items-center gap-2 font-serif text-sm muted">
                    <Lock className="h-4 w-4 shrink-0 text-gold" />
                    Secured by Stripe — your payment is encrypted end to end.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* nav buttons */}
            <div className="mt-10 flex items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  data-cursor="hover"
                  onClick={back}
                  className="group inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-luxe-sm text-gold"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back
                </button>
              ) : (
                <span />
              )}

              {step < 3 ? (
                <Button variant="primary" size="lg" magnetic={false} onClick={next}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="gold"
                  size="lg"
                  magnetic={false}
                  onClick={pay}
                  disabled={processing}
                >
                  {processing
                    ? "Processing…"
                    : `Pay ${formatPrice(grandTotal)}`}
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* order summary */}
        <aside>
          <div className="sticky top-32 surface rounded-sm p-8">
            <h2 className="font-display text-2xl ink">Order Summary</h2>

            <div className="mt-7 space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-sm surface">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[0.6rem] text-ivory">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-display text-base ink">
                      {item.title}
                    </h3>
                    <p className="truncate font-serif text-xs italic muted">
                      {item.dimensions}
                    </p>
                  </div>
                  <span className="font-serif text-sm ink">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <dl className="mt-7 space-y-4 border-t border-current/10 pt-6 font-serif text-base">
              <div className="flex items-center justify-between">
                <dt className="muted">Subtotal</dt>
                <dd className="ink">{formatPrice(subtotal)}</dd>
              </div>
              {promo && (
                <div className="flex items-center justify-between text-gold">
                  <dt>Promotion · {promo.code}</dt>
                  <dd>−{formatPrice(subtotal - discounted)}</dd>
                </div>
              )}
              <div className="flex items-center justify-between">
                <dt className="muted">Shipping & Insurance</dt>
                <dd className="ink">{formatPrice(SHIPPING)}</dd>
              </div>
            </dl>

            <div className="mt-7 flex items-end justify-between border-t border-current/10 pt-6">
              <span className="font-sans text-[0.65rem] uppercase tracking-luxe-sm muted">
                Total
              </span>
              <span className="font-display text-3xl ink">
                {formatPrice(grandTotal)}
              </span>
            </div>

            <p className="mt-7 flex items-start gap-2.5 font-serif text-xs leading-relaxed muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              Every acquisition includes a signed certificate of authenticity and
              fully insured white-glove delivery.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
