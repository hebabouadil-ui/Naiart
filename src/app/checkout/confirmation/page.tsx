"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Download, ShieldCheck, Truck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { BRAND } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const easing = [0.16, 1, 0.3, 1] as const;

type OrderLine = {
  title: string;
  price: number;
  quantity: number;
  dimensions?: string;
};

type StoredOrder = {
  id: string;
  paymentRef?: string;
  date: string;
  name?: string;
  email?: string;
  shipping?: {
    line1?: string;
    line2?: string;
    city?: string;
    postal?: string;
    country?: string;
  };
  items: OrderLine[];
  subtotal: number;
  discount: number;
  promo?: string | null;
  shippingFee: number;
  total: number;
};

function ConfirmationInner() {
  const params = useSearchParams();
  const orderId = params.get("order") ?? "NAI-0000";
  const totalRaw = Number(params.get("total"));
  const totalFromUrl =
    Number.isFinite(totalRaw) && totalRaw > 0 ? totalRaw : null;

  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("naiart:last-order");
      if (raw) {
        const parsed: StoredOrder = JSON.parse(raw);
        if (parsed.id === orderId) setOrder(parsed);
      }
    } catch {
      /* ignore — fall back to URL params */
    }
  }, [orderId]);

  const total = order?.total ?? totalFromUrl;
  const dateLabel = new Date(order?.date ?? Date.now()).toLocaleDateString(
    "en-GB",
    { day: "2-digit", month: "long", year: "numeric" },
  );

  const ship = order?.shipping;
  const shipLine = ship
    ? [ship.line1, ship.line2, [ship.postal, ship.city].filter(Boolean).join(" "), ship.country]
        .filter(Boolean)
        .join(", ")
    : null;

  return (
    <main className="container-luxe flex min-h-[80vh] flex-col items-center pt-32 pb-28 text-center sm:pt-40">
      {/* celebratory header (not printed) */}
      <div className="no-print flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: easing }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient shadow-gold"
        >
          <Check className="h-9 w-9 text-charcoal" />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing, delay: 0.15 }}
          className="eyebrow mt-9 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gold" />
          Acquisition Complete
          <span className="h-px w-8 bg-gold" />
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easing, delay: 0.25 }}
          className="mt-6 font-display text-[clamp(3rem,9vw,7rem)] font-medium leading-[0.95] tracking-[-0.02em] ink"
        >
          Thank you
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easing, delay: 0.4 }}
          className="mt-7 max-w-xl font-serif text-xl leading-relaxed muted"
        >
          Your acquisition is confirmed. Your receipt is below — download it for
          your records. A certificate of authenticity and white-glove shipping
          details will follow by email.
        </motion.p>
      </div>

      {/* ── printable receipt ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: easing, delay: 0.5 }}
        className="receipt mt-14 w-full max-w-2xl rounded-sm border border-current/10 bg-warm-white p-8 text-left shadow-soft sm:p-10 dark:bg-graphite"
      >
        {/* header */}
        <div className="flex items-start justify-between gap-6 border-b border-current/10 pb-6">
          <div>
            <p className="font-display text-3xl leading-none ink">
              {BRAND.name}
            </p>
            <p className="mt-1.5 text-[0.5rem] uppercase tracking-luxe text-gold">
              Original Artwork · Receipt
            </p>
          </div>
          <div className="text-right">
            <p className="eyebrow text-[0.55rem]">Order</p>
            <p className="mt-1 font-display text-xl ink">{order?.id ?? orderId}</p>
            <p className="mt-0.5 font-serif text-xs muted">{dateLabel}</p>
          </div>
        </div>

        {/* parties */}
        <div className="grid grid-cols-2 gap-6 border-b border-current/10 py-6">
          <div>
            <p className="eyebrow mb-2 text-[0.5rem]">Billed To</p>
            <p className="font-serif text-sm ink">{order?.name || "Valued Collector"}</p>
            {order?.email && (
              <p className="font-serif text-sm muted">{order.email}</p>
            )}
          </div>
          <div>
            <p className="eyebrow mb-2 text-[0.5rem]">Shipped To</p>
            <p className="font-serif text-sm leading-relaxed muted">
              {shipLine || "On file with your account"}
            </p>
          </div>
        </div>

        {/* line items */}
        {order?.items?.length ? (
          <div className="border-b border-current/10 py-4">
            {order.items.map((it, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between gap-4 py-2.5 font-serif text-sm"
              >
                <span className="ink">
                  {it.title}
                  {it.dimensions && (
                    <span className="muted"> · {it.dimensions}</span>
                  )}
                  {it.quantity > 1 && (
                    <span className="muted"> × {it.quantity}</span>
                  )}
                </span>
                <span className="shrink-0 ink">
                  {formatPrice(it.price * it.quantity)}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {/* totals */}
        <dl className="space-y-2.5 py-6 font-serif text-sm">
          {order && (
            <>
              <div className="flex justify-between">
                <dt className="muted">Subtotal</dt>
                <dd className="ink">{formatPrice(order.subtotal)}</dd>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-gold">
                  <dt>Discount{order.promo ? ` · ${order.promo}` : ""}</dt>
                  <dd>−{formatPrice(order.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="muted">Shipping &amp; Insurance</dt>
                <dd className="ink">{formatPrice(order.shippingFee)}</dd>
              </div>
            </>
          )}
          <div className="mt-3 flex items-end justify-between border-t border-current/10 pt-4">
            <dt className="font-sans text-[0.6rem] uppercase tracking-luxe-sm muted">
              Total Paid
            </dt>
            <dd className="font-display text-2xl ink">
              {total !== null ? formatPrice(total) : "—"}
            </dd>
          </div>
        </dl>

        {/* footer */}
        <div className="border-t border-current/10 pt-5">
          {order?.paymentRef && order.paymentRef !== "demo" && (
            <p className="font-serif text-[0.7rem] muted">
              Payment reference · {order.paymentRef}
            </p>
          )}
          <p className="mt-1 font-serif text-[0.7rem] leading-relaxed muted">
            {BRAND.full} · {BRAND.email} — Thank you for collecting an original
            work. Each acquisition includes a hand-signed certificate of
            authenticity.
          </p>
        </div>
      </motion.div>

      {/* actions (not printed) */}
      <div className="no-print mt-8 flex flex-col items-center gap-4">
        <button
          onClick={() => window.print()}
          data-cursor="hover"
          className="group inline-flex items-center gap-3 rounded-full bg-charcoal px-7 py-4 text-[0.62rem] uppercase tracking-luxe-sm text-ivory transition-colors duration-500 hover:bg-gold hover:text-charcoal dark:bg-ivory dark:text-charcoal dark:hover:bg-gold"
        >
          <Download className="h-4 w-4" />
          Download Receipt (PDF)
        </button>

        <div className="mt-6 grid w-full max-w-2xl gap-8 border-t border-current/10 pt-10 text-left sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Certificate of Authenticity",
              copy: "Signed and numbered, included with each work.",
            },
            {
              icon: Truck,
              title: "White-Glove Shipping",
              copy: "Insured, climate-controlled delivery.",
            },
            {
              icon: Download,
              title: "Receipt Ready",
              copy: "Download now; emailed once your domain is live.",
            },
          ].map((b) => (
            <div key={b.title} className="flex items-start gap-3">
              <b.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <h3 className="font-display text-base ink">{b.title}</h3>
                <p className="mt-1 font-serif text-sm leading-relaxed muted">
                  {b.copy}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <ButtonLink href="/account" variant="gold" size="lg">
            View Your Account
          </ButtonLink>
          <ButtonLink href="/shop" variant="ghost" size="md">
            Continue Browsing
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="container-luxe flex min-h-[80vh] items-center justify-center pt-32 sm:pt-40">
          <span className="font-serif text-lg muted">Loading…</span>
        </main>
      }
    >
      <ConfirmationInner />
    </Suspense>
  );
}
