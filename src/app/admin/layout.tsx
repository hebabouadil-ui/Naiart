"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquareQuote,
  Newspaper,
  Palette,
  Search,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "@/store/auth";
import { BRAND } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/artworks", label: "Artworks", icon: Palette },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/commissions", label: "Commissions", icon: ImageIcon },
  { href: "/admin/blog", label: "Journal", icon: Newspaper },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function LoginGate() {
  const login = useAuth((s) => s.login);
  const logout = useAuth((s) => s.logout);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = login(email, password);
    if (!res.ok) {
      setError(res.error ?? "Invalid credentials.");
      return;
    }
    // After login, verify role; if not admin, reject access.
    const user = useAuth.getState().user;
    if (!user || user.role !== "admin") {
      logout();
      setError("This area is restricted to administrators.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory-glow px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-charcoal/10 bg-warm-white shadow-lift"
      >
        <div className="bg-deep-charcoal px-9 py-8 text-center">
          <p className="eyebrow text-gold-light">{BRAND.name} Atelier</p>
          <h1 className="mt-3 font-display text-3xl text-ivory">Admin Access</h1>
          <p className="mt-2 font-sans text-sm text-ivory/55">
            Sign in to manage the studio.
          </p>
        </div>
        <form onSubmit={submit} className="space-y-5 px-9 py-8">
          <div>
            <label className="mb-2 block font-grotesk text-[0.66rem] font-medium uppercase tracking-luxe-sm text-graphite/80">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="admin@naiart.com"
              className="w-full rounded-xl border border-charcoal/12 bg-warm-white px-4 py-3 font-sans text-sm text-charcoal outline-none transition-colors placeholder:text-graphite/40 focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </div>
          <div>
            <label className="mb-2 block font-grotesk text-[0.66rem] font-medium uppercase tracking-luxe-sm text-graphite/80">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-charcoal/12 bg-warm-white px-4 py-3 font-sans text-sm text-charcoal outline-none transition-colors placeholder:text-graphite/40 focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </div>
          {error && (
            <p className="rounded-xl bg-rose-500/10 px-4 py-2.5 font-sans text-xs text-rose-600">
              {error}
            </p>
          )}
          <Button type="submit" variant="gold" magnetic={false} className="w-full">
            Sign In
          </Button>
          <p className="text-center font-sans text-xs text-graphite/50">
            Demo: admin@naiart.com / atelier
          </p>
        </form>
      </motion.div>
    </div>
  );
}

function Sidebar({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-deep-charcoal">
      <div className="border-b border-ivory/8 px-7 py-7">
        <Link href="/admin" onClick={onNavigate} className="block">
          <p className="font-display text-2xl text-ivory">{BRAND.name}</p>
          <p className="mt-1 font-grotesk text-[0.6rem] uppercase tracking-luxe-sm text-gold-light/80">
            Atelier · Admin
          </p>
        </Link>
      </div>
      <nav className="no-scrollbar flex-1 space-y-1 overflow-y-auto px-4 py-6">
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-4 py-3 font-grotesk text-[0.78rem] tracking-wide transition-colors",
                active
                  ? "bg-gold/15 text-gold-light"
                  : "text-ivory/55 hover:bg-ivory/5 hover:text-ivory",
              )}
            >
              {active && (
                <motion.span
                  layoutId="admin-active"
                  className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gold-light"
                />
              )}
              <Icon className="h-[1.05rem] w-[1.05rem] shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-ivory/8 px-7 py-5">
        <p className="font-sans text-[0.65rem] text-ivory/35">
          {BRAND.full} · Studio Arles
        </p>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="min-h-screen bg-ivory" aria-hidden />;
  }

  if (!user || user.role !== "admin") {
    return <LoginGate />;
  }

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        <Sidebar pathname={pathname} />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-deep-charcoal/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 left-0 w-64"
            >
              <Sidebar
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-charcoal/8 bg-warm-white/80 backdrop-blur-md">
          <div className="flex items-center gap-4 px-5 py-3.5 sm:px-8">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-graphite hover:bg-charcoal/5 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="relative hidden flex-1 max-w-md sm:block">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite/40" />
              <input
                type="search"
                placeholder="Search the atelier…"
                className="w-full rounded-full border border-charcoal/10 bg-ivory/70 py-2.5 pl-10 pr-4 font-sans text-sm text-charcoal outline-none transition-colors placeholder:text-graphite/40 focus:border-gold focus:ring-2 focus:ring-gold/15"
              />
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-4">
              <Link
                href="/"
                className="hidden font-grotesk text-[0.66rem] uppercase tracking-luxe-sm text-graphite/70 transition-colors hover:text-gold sm:block"
              >
                View Site
              </Link>
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="font-sans text-sm font-medium leading-tight text-charcoal">
                    {user.name}
                  </p>
                  <p className="font-sans text-[0.7rem] leading-tight text-graphite/55">
                    Administrator
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient font-grotesk text-xs font-semibold text-charcoal">
                  {initials(user.name)}
                </div>
              </div>
              <button
                onClick={logout}
                className="rounded-full p-2 text-graphite/70 transition-colors hover:bg-rose-500/10 hover:text-rose-600"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="h-[1.05rem] w-[1.05rem]" />
              </button>
            </div>
          </div>
        </header>

        <main className="px-5 py-7 sm:px-8 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
