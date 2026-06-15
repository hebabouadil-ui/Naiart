# Going live — Naiart setup guide

The site works right now on demo data. To let **Rabia upload real paintings
and sell them**, connect three free services and paste their keys into Vercel.
No coding required — just create accounts and copy values.

When a key is missing, that feature quietly falls back to demo mode, so you can
add them one at a time.

---

## What each service does

| Service | Purpose | Free tier |
|--------|---------|-----------|
| **Neon** (Postgres) | Stores artworks & orders permanently | Yes |
| **Cloudinary** | Hosts the painting photos Rabia uploads | Yes |
| **Stripe** | Takes real card payments at checkout | Pay-per-sale |

---

## Step 1 — Database (Neon)

1. Go to **neon.tech** → sign up (free).
2. Create a project. Copy the **connection string** (starts with `postgresql://`).
3. In Vercel → your project → **Settings → Environment Variables**, add:
   - `DATABASE_URL` = the connection string

Then create the tables (one time). On your computer, in the project folder:

```bash
npm install
npx prisma db push
```

(If you can't run commands, tell me and I'll trigger it for you.)

## Step 2 — Image hosting (Cloudinary)

1. Go to **cloudinary.com** → sign up (free).
2. On the dashboard you'll see **Cloud name**, **API Key**, **API Secret**.
3. Add these to Vercel Environment Variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

## Step 3 — Payments (Stripe)

1. Go to **stripe.com** → sign up.
2. **Developers → API keys** → copy the **Secret key** (`sk_...`).
3. Add to Vercel:
   - `STRIPE_SECRET_KEY`

## Step 4 — Admin & security

Add to Vercel:

- `ADMIN_EMAIL` — the email Rabia logs in with
- `ADMIN_PASSWORD` — a strong password
- `AUTH_SECRET` — any long random string (run `openssl rand -base64 32`)
- `NEXT_PUBLIC_SITE_URL` — your live domain, e.g. `https://naiart.com`

## Step 5 — Redeploy

In Vercel → **Deployments → Redeploy** (uncheck "use existing build cache").

---

## How Rabia uploads a painting (once live)

1. Log in at **/account** with the admin email/password.
2. Go to **/admin/artworks → Add Artwork**.
3. Drag in a high-res photo (it uploads to Cloudinary).
4. Fill in title, price, medium, dimensions → **Create Artwork**.
5. It appears in the public **/shop** immediately, ready to sell.

When a collector checks out, they pay through Stripe and the order shows in
**/admin/orders**.
