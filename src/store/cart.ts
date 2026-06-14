"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Artwork, CartItem } from "@/lib/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  promo: { code: string; discount: number } | null;
  add: (artwork: Artwork) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  count: () => number;
  subtotal: () => number;
  total: () => number;
}

const PROMOS: Record<string, number> = {
  ATELIER10: 0.1,
  COLLECTOR15: 0.15,
  WELCOME: 0.05,
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promo: null,
      add: (artwork) => {
        const existing = get().items.find((i) => i.id === artwork.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === artwork.id ? { ...i, quantity: i.quantity + 1 } : i,
            ),
            isOpen: true,
          });
          return;
        }
        const item: CartItem = {
          id: artwork.id,
          slug: artwork.slug,
          title: artwork.title,
          price: artwork.price,
          image: artwork.images[0],
          medium: artwork.medium,
          dimensions: artwork.dimensions,
          quantity: 1,
        };
        set({ items: [...get().items, item], isOpen: true });
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      setQuantity: (id, quantity) =>
        set({
          items: get()
            .items.map((i) =>
              i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i,
            ),
        }),
      clear: () => set({ items: [], promo: null }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
      applyPromo: (code) => {
        const key = code.trim().toUpperCase();
        if (PROMOS[key]) {
          set({ promo: { code: key, discount: PROMOS[key] } });
          return true;
        }
        return false;
      },
      removePromo: () => set({ promo: null }),
      count: () => get().items.reduce((n, i) => n + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((n, i) => n + i.price * i.quantity, 0),
      total: () => {
        const sub = get().subtotal();
        const promo = get().promo;
        return promo ? Math.round(sub * (1 - promo.discount)) : sub;
      },
    }),
    { name: "naiart-cart", partialize: (s) => ({ items: s.items, promo: s.promo }) },
  ),
);
