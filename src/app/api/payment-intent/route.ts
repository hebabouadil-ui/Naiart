import { NextResponse } from "next/server";
import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY;

/** Shipping & insurance, matching the checkout UI (whole USD). */
const SHIPPING = 250;

interface IncomingItem {
  id?: string;
  title: string;
  price: number; // whole USD
  quantity: number;
}

/**
 * Creates a Stripe PaymentIntent for the cart and returns its client secret.
 * The amount is computed server-side from the items so it can't be tampered
 * with on the client. Returns 503 when Stripe isn't configured so the UI can
 * fall back to the demo flow.
 */
export async function POST(req: Request) {
  if (!secret) {
    return NextResponse.json(
      { error: "Payments are not configured yet." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => null);
  const items: IncomingItem[] = body?.items ?? [];
  if (!items.length) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const amount =
    items.reduce(
      (sum, i) => sum + Math.round(i.price * 100) * Math.max(1, i.quantity),
      0,
    ) +
    SHIPPING * 100;

  const stripe = new Stripe(secret);

  const intent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    receipt_email: body?.email || undefined,
    description: "Naiart — original artwork acquisition",
    metadata: {
      customer: body?.name ?? "Guest",
      items: items
        .map((i) => `${i.title} ×${i.quantity}`)
        .join(", ")
        .slice(0, 480),
    },
  });

  return NextResponse.json({ clientSecret: intent.client_secret, amount });
}
