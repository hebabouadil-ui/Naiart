"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/data";
import { Marquee } from "@/components/ui/Marquee";

const groups = [
  {
    title: "Gallery",
    links: [
      { href: "/shop", label: "All Works" },
      { href: "/collections/abstract", label: "Abstract" },
      { href: "/collections/landscape", label: "Landscape" },
      { href: "/collections/portrait", label: "Portrait" },
      { href: "/commission", label: "Commissions" },
    ],
  },
  {
    title: "Atelier",
    links: [
      { href: "/about", label: "The Artist" },
      { href: "/journal", label: "Journal" },
      { href: "/contact", label: "Contact" },
      { href: "/account", label: "Collector Account" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: BRAND.social.instagram, label: "Instagram" },
      { href: BRAND.social.pinterest, label: "Pinterest" },
      { href: BRAND.social.behance, label: "Behance" },
      { href: BRAND.social.youtube, label: "YouTube" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative overflow-hidden bg-deep-charcoal text-ivory">
      <div className="border-y border-ivory/10 py-6">
        <Marquee
          items={[
            BRAND.tagline,
            "Original Paintings",
            "Arles · Provence",
            "Worldwide Shipping",
            "Certificate of Authenticity",
          ]}
          className="font-display text-3xl italic text-ivory/90 sm:text-5xl"
        />
      </div>

      <div className="container-luxe grid gap-14 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <h2 className="font-display text-5xl tracking-luxe-sm sm:text-6xl">
            {BRAND.name}
          </h2>
          <p className="mt-2 text-[0.6rem] uppercase tracking-luxe text-gold">
            {BRAND.signature}
          </p>
          <p className="mt-6 max-w-sm font-serif text-lg leading-relaxed text-ivory/70">
            {BRAND.address}
          </p>
          <a
            href={`mailto:${BRAND.email}`}
            className="link-underline mt-6 inline-block text-sm text-ivory/90"
          >
            {BRAND.email}
          </a>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="mb-6 text-[0.65rem] uppercase tracking-luxe text-gold">
              {g.title}
            </h3>
            <ul className="space-y-3">
              {g.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1 font-serif text-lg text-ivory/75 transition-colors hover:text-gold"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 -translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-luxe flex flex-col items-center justify-between gap-4 border-t border-ivory/10 py-8 text-[0.65rem] uppercase tracking-luxe-sm text-ivory/50 sm:flex-row">
        <span>
          © {new Date().getFullYear()} {BRAND.full}. All works protected.
        </span>
        <div className="flex items-center gap-6">
          <Link href="/admin" className="transition-colors hover:text-gold">
            Admin
          </Link>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Shipping</span>
        </div>
      </div>
    </footer>
  );
}
