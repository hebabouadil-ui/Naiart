import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma, dbEnabled } from "@/lib/db";

const stripeEnabled = Boolean(process.env.STRIPE_SECRET_KEY);

interface IncomingItem {
  id?: string;
  title: string;
  price: number; // whole USD
  quantity: number;
  image?: string;
}

export async function POST(req: Request) {
  if (!stripeEnabled) {
    return NextResponse.json(
      { ok: false, error: "Payments are not configured yet." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => null);
  const items: IncomingItem[] = body?.items ?? [];
  const email: string | undefined = body?.email;
  if (!items.length) {
    return NextResponse.json({ ok: false, error: "Cart is empty." }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: items.map((i) => ({
      quantity: i.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(i.price * 100),
        product_data: {
          name: i.title,
          images: i.image?.startsWith("http") ? [i.image] : undefined,
        },
      },
    })),
    success_url: `${origin}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  });

  // Record a pending order when a database is available.
  if (dbEnabled) {
    try {
      await prisma.order.create({
        data: {
          stripeSessionId: session.id,
          customerName: body?.name ?? "Guest",
          email: email ?? "",
          total: items.reduce((n, i) => n + i.price * i.quantity, 0),
          status: "new",
          items: {
            create: items.map((i) => ({
              title: i.title,
              price: i.price,
              quantity: i.quantity,
              artworkId: i.id,
            })),
          },
        },
      });
    } catch {
      // non-fatal: checkout can still proceed
    }
  }

  return NextResponse.json({ ok: true, url: session.url });
}
