"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { artworks, collections } from "@/lib/data";
import type { Artwork, CollectionSlug } from "@/lib/types";
import { ArtworkCard } from "@/components/ui/ArtworkCard";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/* ---------------- filter config ---------------- */

type SortKey = "latest" | "popular" | "price-asc" | "price-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "latest", label: "Latest" },
  { key: "popular", label: "Most Popular" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
];

const CATEGORIES: { value: CollectionSlug | "all"; label: string }[] = [
  { value: "all", label: "All Works" },
  ...collections.map((c) => ({ value: c.slug, label: c.name })),
];

type PriceBucket = "all" | "under7" | "7to10" | "over10";
const PRICES: { value: PriceBucket; label: string }[] = [
  { value: "all", label: "Any Price" },
  { value: "under7", label: "Under $7,000" },
  { value: "7to10", label: "$7,000 – $10,000" },
  { value: "over10", label: "$10,000 & Above" },
];

type OrientationFilter = "all" | Artwork["orientation"];
const ORIENTATIONS: { value: OrientationFilter; label: string }[] = [
  { value: "all", label: "All Sizes" },
  { value: "portrait", label: "Portrait" },
  { value: "landscape", label: "Landscape" },
  { value: "square", label: "Square" },
];

type AvailabilityFilter = "all" | Artwork["availability"];
const AVAILABILITIES: { value: AvailabilityFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
];

const COLORS = Array.from(new Set(artworks.map((a) => a.colorName)));
const COLOR_SWATCH: Record<string, string> = {
  Amber: "#B8924A",
  Ivory: "#E7DECF",
  Gold: "#D8B872",
  Clay: "#8B6F47",
  Graphite: "#2A2723",
  Charcoal: "#1A1815",
  Sand: "#C9BBA0",
};

function priceMatches(price: number, bucket: PriceBucket) {
  if (bucket === "under7") return price < 7000;
  if (bucket === "7to10") return price >= 7000 && price <= 10000;
  if (bucket === "over10") return price > 10000;
  return true;
}

/* ---------------- small UI atoms ---------------- */

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-current/10 py-7 first:border-t-0 first:pt-0">
      <h3 className="eyebrow mb-5 text-[0.62rem]">{label}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function RadioRow({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      data-cursor="hover"
      onClick={onClick}
      className="group flex w-full items-center gap-3 py-1.5 text-left"
    >
      <span
        className={cn(
          "flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
          active
            ? "border-gold bg-gold"
            : "border-current/30 group-hover:border-gold",
        )}
      >
        {active && <span className="h-1.5 w-1.5 rounded-full bg-ivory" />}
      </span>
      <span
        className={cn(
          "flex-1 font-serif text-base transition-colors duration-300",
          active ? "ink" : "muted group-hover:text-gold",
        )}
      >
        {label}
      </span>
      {typeof count === "number" && (
        <span className="font-sans text-[0.62rem] tabular-nums muted">
          {count}
        </span>
      )}
    </button>
  );
}

function CheckRow({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      data-cursor="hover"
      onClick={onClick}
      className="group flex w-full items-center gap-3 py-1.5 text-left"
    >
      <span
        className={cn(
          "flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[3px] border transition-colors duration-300",
          active
            ? "border-gold bg-gold text-ivory"
            : "border-current/30 group-hover:border-gold",
        )}
      >
        {active && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
      </span>
      <span
        className={cn(
          "flex-1 font-serif text-base transition-colors duration-300",
          active ? "ink" : "muted group-hover:text-gold",
        )}
      >
        {label}
      </span>
    </button>
  );
}

/* ---------------- page ---------------- */

export default function ShopPage() {
  // Live catalogue: database-backed when configured, seed otherwise.
  const [catalogue, setCatalogue] = useState<Artwork[]>(artworks);
  useEffect(() => {
    fetch("/api/artworks")
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok && Array.isArray(d.items) && d.items.length)
          setCatalogue(d.items);
      })
      .catch(() => {});
  }, []);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CollectionSlug | "all">("all");
  const [price, setPrice] = useState<PriceBucket>("all");
  const [orientation, setOrientation] = useState<OrientationFilter>("all");
  const [availability, setAvailability] = useState<AvailabilityFilter>("all");
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("latest");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { all: catalogue.length };
    for (const c of collections)
      map[c.slug] = catalogue.filter((a) => a.collection === c.slug).length;
    return map;
  }, [catalogue]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = catalogue.filter((a) => {
      if (category !== "all" && a.collection !== category) return false;
      if (!priceMatches(a.price, price)) return false;
      if (orientation !== "all" && a.orientation !== orientation) return false;
      if (availability !== "all" && a.availability !== availability)
        return false;
      if (activeColors.length && !activeColors.includes(a.colorName))
        return false;
      if (q) {
        const haystack =
          `${a.title} ${a.medium} ${a.collection} ${a.colorName}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "latest":
        sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        break;
      case "popular":
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
    }
    return sorted;
  }, [catalogue, query, category, price, orientation, availability, activeColors, sort]);

  const toggleColor = (c: string) =>
    setActiveColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );

  const hasActiveFilters =
    category !== "all" ||
    price !== "all" ||
    orientation !== "all" ||
    availability !== "all" ||
    activeColors.length > 0 ||
    query.trim().length > 0;

  const clearAll = () => {
    setQuery("");
    setCategory("all");
    setPrice("all");
    setOrientation("all");
    setAvailability("all");
    setActiveColors([]);
  };

  /* active filter chips */
  const chips: { label: string; onRemove: () => void }[] = [];
  if (query.trim())
    chips.push({ label: `“${query.trim()}”`, onRemove: () => setQuery("") });
  if (category !== "all")
    chips.push({
      label: CATEGORIES.find((c) => c.value === category)!.label,
      onRemove: () => setCategory("all"),
    });
  if (price !== "all")
    chips.push({
      label: PRICES.find((p) => p.value === price)!.label,
      onRemove: () => setPrice("all"),
    });
  if (orientation !== "all")
    chips.push({
      label: ORIENTATIONS.find((o) => o.value === orientation)!.label,
      onRemove: () => setOrientation("all"),
    });
  if (availability !== "all")
    chips.push({
      label: AVAILABILITIES.find((a) => a.value === availability)!.label,
      onRemove: () => setAvailability("all"),
    });
  for (const c of activeColors)
    chips.push({ label: c, onRemove: () => toggleColor(c) });

  /* the sidebar body, reused on desktop + mobile drawer */
  const FilterBody = (
    <div className="flex flex-col">
      <FilterGroup label="Category">
        {CATEGORIES.map((c) => (
          <RadioRow
            key={c.value}
            active={category === c.value}
            label={c.label}
            count={categoryCounts[c.value]}
            onClick={() => setCategory(c.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Price">
        {PRICES.map((p) => (
          <RadioRow
            key={p.value}
            active={price === p.value}
            label={p.label}
            onClick={() => setPrice(p.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Format">
        {ORIENTATIONS.map((o) => (
          <RadioRow
            key={o.value}
            active={orientation === o.value}
            label={o.label}
            onClick={() => setOrientation(o.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Palette">
        <div className="flex flex-wrap gap-3 pt-1">
          {COLORS.map((c) => {
            const active = activeColors.includes(c);
            return (
              <button
                key={c}
                data-cursor="hover"
                onClick={() => toggleColor(c)}
                title={c}
                aria-label={c}
                aria-pressed={active}
                className="group flex flex-col items-center gap-1.5"
              >
                <span
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-current/15 transition-transform duration-300",
                    active
                      ? "scale-110 ring-2 ring-gold"
                      : "group-hover:scale-110",
                  )}
                  style={{ backgroundColor: COLOR_SWATCH[c] ?? "#ccc" }}
                >
                  {active && (
                    <Check
                      className="h-3.5 w-3.5 text-ivory mix-blend-difference"
                      strokeWidth={3}
                    />
                  )}
                </span>
                <span className="text-[0.55rem] uppercase tracking-luxe-sm muted">
                  {c}
                </span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup label="Availability">
        {AVAILABILITIES.map((a) => (
          <CheckRow
            key={a.value}
            active={availability === a.value}
            label={a.label}
            onClick={() =>
              setAvailability((cur) => (cur === a.value ? "all" : a.value))
            }
          />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <main className="container-luxe pt-32 pb-28 sm:pt-40">
      {/* header */}
      <header className="max-w-3xl">
        <Reveal>
          <span className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            The Collection
          </span>
        </Reveal>
        <TextReveal
          as="h1"
          text="The Gallery"
          className="font-display text-[clamp(2.6rem,7vw,6rem)] font-medium leading-[0.98] tracking-[-0.02em] ink"
        />
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-xl font-serif text-xl leading-relaxed muted">
            Original works on canvas and linen, each painted by hand in the Arles
            atelier and released directly to collectors with a signed certificate
            of authenticity.
          </p>
        </Reveal>
      </header>

      {/* search + sort + count bar */}
      <div className="mt-14 flex flex-col gap-5 border-b border-current/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, medium or palette…"
            className="w-full border-0 border-b border-current/15 bg-transparent py-3 pl-7 pr-8 font-serif text-lg ink placeholder:muted placeholder:font-serif focus:border-gold focus:outline-none focus:ring-0 transition-colors"
          />
          {query && (
            <button
              data-cursor="hover"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-0 top-1/2 -translate-y-1/2 muted transition-colors hover:text-gold"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-5 lg:justify-end">
          <span className="font-sans text-[0.7rem] uppercase tracking-luxe-sm muted">
            {results.length}{" "}
            {results.length === 1 ? "Work" : "Works"}
          </span>

          {/* mobile filter trigger */}
          <button
            data-cursor="hover"
            onClick={() => setMobileFilters(true)}
            className="flex items-center gap-2 rounded-full border border-current/20 px-4 py-2 font-sans text-[0.65rem] uppercase tracking-luxe-sm ink transition-colors hover:border-gold hover:text-gold lg:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
            {chips.length > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[0.55rem] text-ivory">
                {chips.length}
              </span>
            )}
          </button>

          {/* sort dropdown */}
          <div className="relative">
            <button
              data-cursor="hover"
              onClick={() => setSortOpen((o) => !o)}
              onBlur={() => setTimeout(() => setSortOpen(false), 120)}
              className="flex items-center gap-2 rounded-full border border-current/20 px-4 py-2 font-sans text-[0.65rem] uppercase tracking-luxe-sm ink transition-colors hover:border-gold"
            >
              <span className="muted">Sort:</span>
              {SORTS.find((s) => s.key === sort)!.label}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  sortOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="glass-strong absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-sm py-2 shadow-lift"
                >
                  {SORTS.map((s) => (
                    <li key={s.key}>
                      <button
                        data-cursor="hover"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSort(s.key);
                          setSortOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between px-5 py-2.5 text-left font-serif text-base transition-colors hover:text-gold",
                          sort === s.key ? "text-gold" : "ink",
                        )}
                      >
                        {s.label}
                        {sort === s.key && <Check className="h-3.5 w-3.5" />}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* active chips */}
      <AnimatePresence initial={false}>
        {chips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap items-center gap-2.5 pt-6">
              {chips.map((chip, i) => (
                <button
                  key={`${chip.label}-${i}`}
                  data-cursor="hover"
                  onClick={chip.onRemove}
                  className="group flex items-center gap-2 rounded-full border border-current/20 bg-transparent px-3.5 py-1.5 font-sans text-[0.62rem] uppercase tracking-luxe-sm ink transition-colors hover:border-gold hover:text-gold"
                >
                  {chip.label}
                  <X className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
              <button
                data-cursor="hover"
                onClick={clearAll}
                className="ml-1 font-sans text-[0.62rem] uppercase tracking-luxe-sm text-gold link-underline"
              >
                Clear all
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* layout: sidebar + grid */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
        {/* desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-32">{FilterBody}</div>
        </aside>

        {/* results */}
        <section>
          {results.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {results.map((artwork, i) => (
                  <motion.div
                    key={artwork.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                      delay: (i % 3) * 0.05,
                    }}
                  >
                    <ArtworkCard artwork={artwork} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
              <span className="font-display text-7xl text-gold/30">∅</span>
              <h2 className="mt-8 font-display text-3xl ink">
                No works match your selection
              </h2>
              <p className="mt-4 max-w-sm font-serif text-lg leading-relaxed muted">
                Adjust or clear your filters to explore the full collection — or
                commission a piece painted entirely for you.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* mobile filter drawer */}
      <AnimatePresence>
        {mobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilters(false)}
              className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 z-[61] max-h-[88vh] overflow-y-auto rounded-t-2xl surface px-6 pb-10 pt-6 no-scrollbar lg:hidden"
            >
              <div className="sticky top-0 z-10 -mx-6 mb-4 flex items-center justify-between border-b border-current/10 surface px-6 pb-4">
                <h2 className="font-display text-2xl ink">Refine</h2>
                <button
                  data-cursor="hover"
                  onClick={() => setMobileFilters(false)}
                  aria-label="Close filters"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-current/15 ink transition-colors hover:border-gold hover:text-gold"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {FilterBody}
              <div className="mt-8 flex gap-3">
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    magnetic={false}
                    onClick={clearAll}
                  >
                    Clear all
                  </Button>
                )}
                <Button
                  variant="primary"
                  size="sm"
                  magnetic={false}
                  className="flex-1"
                  onClick={() => setMobileFilters(false)}
                >
                  Show {results.length} Works
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
