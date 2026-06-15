"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  LayoutGrid,
  LogOut,
  Package,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "@/store/auth";
import { useWishlist } from "@/store/wishlist";
import { artworks, BRAND } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArtworkCard } from "@/components/ui/ArtworkCard";
import { StatusPill } from "@/components/admin/StatusPill";

const sampleOrders = [
  {
    id: "NAI-1042",
    date: "June 9, 2025",
    total: 8600,
    status: "shipped",
    items: ["The Quiet Hour"],
  },
  {
    id: "NAI-0988",
    date: "March 2, 2025",
    total: 12600,
    status: "completed",
    items: ["Gold Fracture"],
  },
];

const authPanel =
  "/art/1578321272176-b7bbc0679853.svg";

function AuthScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (mode === "in") {
      const res = login(email, password);
      if (!res.ok) setError(res.error ?? "Invalid credentials.");
    } else {
      if (!name || !email || password.length < 4) {
        setError("Please complete all fields (password 4+ characters).");
        return;
      }
      register(name, email, password);
    }
  }

  return (
    <div className="grid min-h-[100svh] lg:grid-cols-2">
      {/* visual panel */}
      <div className="relative hidden lg:block">
        <Image
          src={authPanel}
          alt="Atelier"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/90 via-deep-charcoal/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-14 text-ivory">
          <span className="eyebrow mb-4">{BRAND.signature}</span>
          <p className="max-w-md font-display text-4xl leading-tight">
            “To collect a painting is to keep a moment of light forever.”
          </p>
          <p className="mt-4 font-serif text-lg italic text-ivory/70">
            — {BRAND.full}
          </p>
        </div>
      </div>

      {/* form */}
      <div className="flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          <span className="eyebrow">Collector Account</span>
          <h1 className="mt-3 font-display text-4xl ink">
            {mode === "in" ? "Welcome back" : "Join the atelier"}
          </h1>
          <p className="mt-2 font-serif text-lg muted">
            {mode === "in"
              ? "Sign in to view your collection and orders."
              : "Create an account to begin your collection."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === "up" && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3.5 text-sm outline-none transition-colors focus:border-gold"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3.5 text-sm outline-none transition-colors focus:border-gold"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3.5 text-sm outline-none transition-colors focus:border-gold"
            />
            {error && (
              <p className="rounded-xl bg-rose-500/10 px-4 py-2.5 text-xs text-rose-600">
                {error}
              </p>
            )}
            <Button
              type="submit"
              variant="gold"
              size="lg"
              magnetic={false}
              className="w-full"
            >
              {mode === "in" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm muted">
            {mode === "in" ? "New to the atelier?" : "Already a collector?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "in" ? "up" : "in");
                setError(null);
              }}
              className="text-gold underline-offset-4 hover:underline"
            >
              {mode === "in" ? "Create an account" : "Sign in"}
            </button>
          </p>

          <div className="mt-8 rounded-xl border border-current/10 p-4 text-center text-xs muted">
            Administrator? Sign in with{" "}
            <span className="text-gold">admin@naiart.com / atelier</span> to reach
            the{" "}
            <Link href="/admin" className="text-gold hover:underline">
              Admin Dashboard
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

const tabs = [
  { key: "profile", label: "Profile", icon: UserIcon },
  { key: "orders", label: "Orders", icon: Package },
  { key: "wishlist", label: "Saved Works", icon: Heart },
] as const;

function Dashboard() {
  const { user, logout } = useAuth();
  const wishlist = useWishlist();
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("profile");
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  useEffect(() => {
    if (window.location.hash === "#wishlist") setTab("wishlist");
  }, []);

  const saved = wishlist.ids
    .map((id) => artworks.find((a) => a.id === id))
    .filter(Boolean);

  const initials = (user?.name ?? "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="container-luxe pb-28 pt-32 sm:pt-40">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">Collector Account</span>
          <h1 className="mt-3 font-display text-5xl ink">
            Hello, {user?.name?.split(" ")[0]}
          </h1>
        </div>
        {user?.role === "admin" && (
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-[0.65rem] uppercase tracking-luxe-sm text-ivory transition-colors hover:bg-gold hover:text-charcoal"
          >
            <LayoutGrid className="h-4 w-4" /> Admin Dashboard
          </Link>
        )}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[260px_1fr]">
        {/* sidebar */}
        <aside>
          <div className="mb-6 flex items-center gap-4 rounded-2xl surface p-5">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient font-display text-xl text-charcoal">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-lg ink">{user?.name}</p>
              <p className="truncate text-xs muted">{user?.email}</p>
            </div>
          </div>
          <nav className="space-y-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                    tab === t.key
                      ? "bg-charcoal text-ivory"
                      : "muted hover:bg-current/5"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                  {t.key === "wishlist" && saved.length > 0 && (
                    <span className="ml-auto text-xs text-gold">
                      {saved.length}
                    </span>
                  )}
                </button>
              );
            })}
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-rose-600 transition-colors hover:bg-rose-500/5"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </nav>
        </aside>

        {/* content */}
        <div id="wishlist">
          {tab === "profile" && (
            <div className="max-w-lg rounded-2xl border border-current/10 p-8">
              <h2 className="font-display text-2xl ink">Profile</h2>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-[0.65rem] uppercase tracking-luxe-sm muted">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[0.65rem] uppercase tracking-luxe-sm muted">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
                  />
                </div>
                <Button variant="primary" magnetic={false}>
                  Save Changes
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-3 rounded-xl bg-gold/5 p-4 text-sm muted">
                <ShieldCheck className="h-5 w-5 shrink-0 text-gold" />
                Your account is protected. In production, authentication is handled
                by NextAuth with encrypted JWT sessions.
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl ink">Order History</h2>
              {sampleOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-current/10 p-6"
                >
                  <div>
                    <p className="font-display text-lg ink">{o.id}</p>
                    <p className="text-xs muted">
                      {o.date} · {o.items.join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusPill status={o.status} />
                    <span className="font-serif text-lg ink">
                      {formatPrice(o.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "wishlist" && (
            <div>
              <h2 className="mb-6 font-display text-2xl ink">Saved Works</h2>
              {saved.length === 0 ? (
                <div className="rounded-2xl border border-current/10 p-12 text-center">
                  <Heart className="mx-auto mb-4 h-8 w-8 text-gold" />
                  <p className="font-serif text-xl italic muted">
                    You haven&apos;t saved any works yet.
                  </p>
                  <Link
                    href="/shop"
                    className="mt-4 inline-block text-sm text-gold hover:underline"
                  >
                    Explore the gallery →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
                  {saved.map(
                    (a, i) => a && <ArtworkCard key={a.id} artwork={a} index={i} />,
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const user = useAuth((s) => s.user);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="min-h-[100svh]" aria-hidden />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={user ? "dash" : "auth"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {user ? <Dashboard /> : <AuthScreen />}
      </motion.div>
    </AnimatePresence>
  );
}
