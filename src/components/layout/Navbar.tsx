"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Moon, ShoppingBag, Sun, User, X } from "lucide-react";
import { useTheme } from "next-themes";
import { BRAND } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { Magnetic } from "@/components/ui/Magnetic";

const links = [
  { href: "/shop", label: "Gallery" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "The Artist" },
  { href: "/commission", label: "Commission" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const cart = useCart();
  const wishlist = useWishlist();
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;

  const count = mounted ? cart.count() : 0;
  const saved = mounted ? wishlist.ids.length : 0;

  // Detail routes render a dark full-bleed hero; while pinned at the top the
  // nav needs light text. Once scrolled, the glass bar restores normal ink.
  const darkHero =
    /^\/collections\/[^/]+$/.test(pathname) ||
    /^\/journal\/[^/]+$/.test(pathname);
  const onDark = darkHero && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[120] transition-all duration-700 ease-luxe",
          scrolled ? "py-3" : "py-6",
          onDark && "text-ivory",
        )}
      >
        <div
          className={cn(
            "transition-all duration-700 ease-luxe",
            scrolled && "glass-strong",
          )}
        >
          <nav className="container-luxe flex items-center justify-between">
            {/* Left: menu (mobile) + links (desktop) */}
            <div className="flex flex-1 items-center gap-8">
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                data-cursor="hover"
                className="flex items-center gap-2 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <ul className="hidden items-center gap-7 lg:flex">
                {links.slice(0, 3).map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={cn(
                        "link-underline font-sans text-[0.7rem] uppercase tracking-luxe-sm transition-colors hover:text-gold",
                        pathname.startsWith(l.href) && "text-gold",
                      )}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Center: logo */}
            <Link
              href="/"
              data-cursor="hover"
              className="flex flex-col items-center"
            >
              <span className="font-display text-2xl leading-none tracking-luxe-sm sm:text-3xl">
                {BRAND.name}
              </span>
              <span className="mt-0.5 text-[0.5rem] uppercase tracking-luxe text-gold">
                {BRAND.signature}
              </span>
            </Link>

            {/* Right: links + icons */}
            <div className="flex flex-1 items-center justify-end gap-5">
              <ul className="hidden items-center gap-7 lg:flex">
                {links.slice(3).map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={cn(
                        "link-underline font-sans text-[0.7rem] uppercase tracking-luxe-sm transition-colors hover:text-gold",
                        pathname.startsWith(l.href) && "text-gold",
                      )}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3">
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label="Toggle theme"
                    data-cursor="hover"
                    className="hidden h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-gold sm:flex"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-[1.05rem] w-[1.05rem]" />
                    ) : (
                      <Moon className="h-[1.05rem] w-[1.05rem]" />
                    )}
                  </button>
                )}
                <Link
                  href="/account"
                  aria-label="Account"
                  data-cursor="hover"
                  className="hidden h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-gold sm:flex"
                >
                  <User className="h-[1.05rem] w-[1.05rem]" />
                </Link>
                <Link
                  href="/account#wishlist"
                  aria-label="Wishlist"
                  data-cursor="hover"
                  className="relative hidden h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-gold sm:flex"
                >
                  <Heart className="h-[1.05rem] w-[1.05rem]" />
                  {saved > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[0.55rem] text-ivory">
                      {saved}
                    </span>
                  )}
                </Link>
                <Magnetic strength={0.25}>
                  <button
                    onClick={() => cart.open()}
                    aria-label="Open cart"
                    data-cursor="hover"
                    className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-gold"
                  >
                    <ShoppingBag className="h-[1.05rem] w-[1.05rem]" />
                    {count > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[0.55rem] text-ivory">
                        {count}
                      </span>
                    )}
                  </button>
                </Magnetic>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile / full menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[130] flex flex-col bg-deep-charcoal text-ivory"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
          >
            <div className="container-luxe flex items-center justify-between py-6">
              <span className="font-display text-2xl tracking-luxe-sm">
                {BRAND.name}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                data-cursor="hover"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="container-luxe flex flex-1 flex-col justify-center gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    className="block border-b border-ivory/10 py-4 font-display text-4xl transition-colors hover:text-gold sm:text-6xl"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="container-luxe flex items-center justify-between py-8 text-[0.7rem] uppercase tracking-luxe-sm text-ivory/60">
              <Link href="/account">Account</Link>
              <Link href="/admin">Admin</Link>
              <a href={BRAND.social.instagram}>Instagram</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
