# Naïart — Luxury Art Gallery & E-Commerce

The official online gallery and sales platform for the contemporary painter
**Naïa Lemaire**. A cinematic, editorial, museum-grade experience for
discovering, exploring, and acquiring original paintings — with a complete
admin dashboard to run the studio.

Built to feel like a multi-million-dollar art brand: think Aesop × Dior ×
Sotheby's, with Awwwards-level motion design.

---

## ✦ Highlights

- **Cinematic landing page** — WebGL particle hero (Three.js), layered parallax,
  dynamic typographic reveals, GSAP pinned horizontal "Process" storytelling,
  premium loader, custom magnetic cursor, Lenis smooth scroll, animated page
  transitions.
- **Full storefront** — gallery with live search / multi-facet filtering
  (category, price, size, colour, availability) / sorting, luxury product pages
  with image zoom + fullscreen lightbox, tilt cards, wishlist, and a slide-in
  cart.
- **Commerce flow** — cart with promo codes & shipping estimates, a 3-step
  checkout (Stripe / PayPal UI), and an order confirmation page.
- **Customer account** — sign in / register, profile, order history, and saved
  works (wishlist).
- **Editorial pages** — About (with animated timeline, awards, exhibitions),
  Collections, Journal (blog) with article pages, Commission request form,
  Contact with map.
- **Complete admin dashboard** — overview with hand-built SVG charts, and
  management for artworks (CRUD + drag-drop upload + archive), orders,
  customers, commissions, journal, testimonials, analytics (with real CSV
  export), and settings.
- **SEO & performance** — dynamic metadata, Open Graph (generated OG image),
  JSON-LD structured data, sitemap, robots, manifest, fully responsive,
  reduced-motion aware, statically rendered where possible.

## ✦ Tech Stack

| Layer        | Choice |
|--------------|--------|
| Framework    | Next.js 15 (App Router) · React 19 · TypeScript |
| Styling      | Tailwind CSS (custom luxury design system) |
| Animation    | Framer Motion · GSAP + ScrollTrigger · Lenis · Three.js |
| State        | Zustand (cart, wishlist, auth) with `localStorage` persistence |
| Fonts        | Playfair Display · Cormorant Garamond · Inter · Manrope |
| Icons        | lucide-react |

## ✦ Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## ✦ Demo Credentials

- **Admin dashboard** (`/admin`): `admin@naiart.com` / `atelier`
- **Customer account** (`/account`): any email + a 4+ character password.
- **Promo codes** (cart): `ATELIER10` (10%), `COLLECTOR15` (15%), `WELCOME` (5%).

## ✦ Project Structure

```
src/
├─ app/                  # routes (home, shop, artwork, collections, journal,
│                        #  about, contact, commission, cart, checkout,
│                        #  account, admin/*) + sitemap/robots/manifest/og
├─ components/
│  ├─ home/              # landing-page sections
│  ├─ layout/            # navbar, footer, cart drawer
│  ├─ providers/         # smooth scroll, preloader, cursor, transitions, theme
│  ├─ shop/              # product detail
│  ├─ admin/             # charts, tables, modals, fields, stat cards
│  ├─ three/             # WebGL particle field
│  └─ ui/                # buttons, reveals, cards, magnetic/tilt primitives
├─ lib/                  # data (seed catalogue), types, utils
└─ store/                # zustand stores (cart, wishlist, auth)
```

## ✦ From Demo to Production

This build is fully functional with a typed in-memory data layer so it runs
with zero external services. The architecture is designed to swap in real
infrastructure without restructuring:

- **Database** — replace `src/lib/data.ts` reads with **Prisma** + **PostgreSQL**
  (the `src/lib/types.ts` interfaces map directly to models).
- **Auth** — replace `src/store/auth.ts` with **NextAuth** (JWT sessions,
  role-based access already modelled as `customer` / `admin`).
- **Payments** — wire the checkout's Stripe / PayPal panels to the real SDKs
  via Server Actions.
- **Media** — point image uploads (admin drag-and-drop) to **Cloudinary**.
- **Email** — connect the newsletter, commission, and contact forms to
  **Resend**.

Each integration point is isolated behind a store or the data module, so the
UI and design system remain untouched.

---

© Naïa Lemaire · Atelier Naïa, Arles · All works protected.
