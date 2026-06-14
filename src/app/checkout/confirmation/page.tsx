"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Mail, ShieldCheck, Truck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

const easing = [0.16, 1, 0.3, 1] as const;

function ConfirmationInner() {
  const params = useSearchParams();
  const order = params.get("order") ?? "NAI-0000";
  const totalRaw = Number(params.get("total"));
  const total = Number.isFinite(totalRaw) && totalRaw > 0 ? totalRaw : null;

  return (
    <main className="container-luxe flex min-h-[80vh] flex-col items-center justify-center pt-32 pb-28 text-center sm:pt-40">
      {/* seal */}
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
        Your acquisition is confirmed. A certificate of authenticity and your
        white-glove shipping details will follow shortly by email.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easing, delay: 0.55 }}
        className="mt-12 grid w-full max-w-md grid-cols-2 overflow-hidden rounded-sm surface"
      >
        <div className="border-r border-current/10 px-6 py-7">
          <p className="eyebrow mb-3 text-[0.6rem]">Order Number</p>
          <p className="font-display text-2xl ink">{order}</p>
        </div>
        <div className="px-6 py-7">
          <p className="eyebrow mb-3 text-[0.6rem]">Total Paid</p>
          <p className="font-display text-2xl ink">
            {total !== null ? formatPrice(total) : "—"}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easing, delay: 0.7 }}
        className="mt-12 grid w-full max-w-2xl gap-8 border-t border-current/10 pt-10 text-left sm:grid-cols-3"
      >
        {[
          {
            icon: Mail,
            title: "Confirmation Sent",
            copy: "A receipt is on its way to your inbox.",
          },
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easing, delay: 0.85 }}
        className="mt-14 flex flex-col items-center gap-4 sm:flex-row"
      >
        <ButtonLink href="/account" variant="gold" size="lg">
          View Your Account
        </ButtonLink>
        <ButtonLink href="/shop" variant="ghost" size="md">
          Continue Browsing
        </ButtonLink>
      </motion.div>
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
