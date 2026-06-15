"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

/** True when the publishable key is present — checkout switches to live Stripe. */
export const stripeConfigured = Boolean(pk);

const stripePromise = pk ? loadStripe(pk) : null;

type CartLine = { id?: string; title: string; price: number; quantity: number };

function InnerForm({
  amountLabel,
  onPaid,
}: {
  amountLabel: string;
  onPaid: (ref: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const pay = async () => {
    if (!stripe || !elements) return;
    setBusy(true);
    setError(null);

    const { error: submitErr } = await elements.submit();
    if (submitErr) {
      setError(submitErr.message ?? "Please check your card details.");
      setBusy(false);
      return;
    }

    // redirect: "if_required" keeps test cards (e.g. 4242…) in-page; only
    // methods that truly need a redirect (3-D Secure, etc.) navigate away.
    const { error: confirmErr, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/checkout/confirmation`,
      },
    });

    if (confirmErr) {
      setError(confirmErr.message ?? "Payment could not be completed.");
      setBusy(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      onPaid(paymentIntent.id); // keep busy through navigation
      return;
    }

    setError("Payment did not complete. Please try again.");
    setBusy(false);
  };

  return (
    <div className="mt-8">
      <PaymentElement options={{ layout: "tabs" }} />

      {error && (
        <p className="mt-5 rounded-sm border border-clay/40 bg-clay/[0.06] px-4 py-3 font-serif text-sm text-clay">
          {error}
        </p>
      )}

      <p className="mt-6 flex items-center gap-2 font-serif text-sm muted">
        <Lock className="h-4 w-4 shrink-0 text-gold" />
        Secured by Stripe — your card is encrypted end to end.
      </p>

      <div className="mt-8 flex justify-end">
        <Button
          variant="gold"
          size="lg"
          magnetic={false}
          onClick={pay}
          disabled={busy || !stripe}
        >
          {busy ? "Processing…" : `Pay ${amountLabel}`}
        </Button>
      </div>
    </div>
  );
}

export function StripeCardStep({
  items,
  email,
  name,
  amountLabel,
  onPaid,
}: {
  items: CartLine[];
  email: string;
  name: string;
  amountLabel: string;
  onPaid: (ref: string) => void;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, email, name }),
    })
      .then(async (r) => {
        if (!r.ok) {
          const d = await r.json().catch(() => ({}));
          throw new Error(d.error ?? "Could not start payment.");
        }
        return r.json();
      })
      .then((d) => active && setClientSecret(d.clientSecret))
      .catch((e: Error) => active && setError(e.message));
    return () => {
      active = false;
    };
    // run once when the payment step mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <p className="mt-8 rounded-sm border border-clay/40 bg-clay/[0.06] px-4 py-3 font-serif text-sm text-clay">
        {error}
      </p>
    );
  }

  if (!clientSecret || !stripePromise) {
    return (
      <div className="mt-8 flex items-center gap-3 font-serif text-sm muted">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
        Preparing secure payment…
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "flat",
          variables: {
            colorPrimary: "#B8924A",
            colorBackground: "#FCFAF6",
            colorText: "#1A1815",
            colorDanger: "#8B6F47",
            fontFamily: "Georgia, serif",
            borderRadius: "2px",
            spacingUnit: "4px",
          },
        },
      }}
    >
      <InnerForm amountLabel={amountLabel} onPaid={onPaid} />
    </Elements>
  );
}
