"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";

export function CartDrawer() {
  const cart = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const items = cart.items;
  const subtotal = cart.subtotal();
  const total = cart.total();

  return (
    <AnimatePresence>
      {cart.isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[140] bg-charcoal/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cart.close}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[141] flex h-full w-full max-w-md flex-col bg-warm-white text-charcoal shadow-lift dark:bg-deep-charcoal dark:text-ivory"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-current/10 px-7 py-6">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-4 w-4 text-gold" />
                <h2 className="font-display text-2xl">Your Selection</h2>
              </div>
              <button
                onClick={cart.close}
                aria-label="Close cart"
                data-cursor="hover"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-current/15 transition-colors hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-7 text-center">
                <p className="font-serif text-2xl italic muted">
                  Your selection is empty
                </p>
                <p className="max-w-xs text-sm muted">
                  Begin your collection — every work is an original.
                </p>
                <ButtonLink href="/shop" variant="primary" onClick={cart.close}>
                  Explore the Gallery
                </ButtonLink>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-6 overflow-y-auto px-7 py-6 no-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <Link
                        href={`/artwork/${item.slug}`}
                        onClick={cart.close}
                        className="relative h-28 w-24 shrink-0 overflow-hidden rounded-sm surface"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-display text-lg leading-tight">
                              {item.title}
                            </h3>
                            <button
                              onClick={() => cart.remove(item.id)}
                              aria-label="Remove"
                              className="text-current/40 transition-colors hover:text-gold"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="mt-1 font-serif text-sm italic muted">
                            {item.medium}
                          </p>
                          <p className="text-xs muted">{item.dimensions}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 rounded-full border border-current/15 px-3 py-1">
                            <button
                              onClick={() =>
                                cart.setQuantity(item.id, item.quantity - 1)
                              }
                              aria-label="Decrease"
                              className="transition-colors hover:text-gold"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-5 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                cart.setQuantity(item.id, item.quantity + 1)
                              }
                              aria-label="Increase"
                              className="transition-colors hover:text-gold"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-serif text-base">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-current/10 px-7 py-6">
                  {cart.promo && (
                    <div className="mb-3 flex items-center justify-between text-sm text-gold">
                      <span>Promo · {cart.promo.code}</span>
                      <span>−{Math.round(cart.promo.discount * 100)}%</span>
                    </div>
                  )}
                  <div className="mb-1 flex items-center justify-between text-sm muted">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-display text-xl">Total</span>
                    <span className="font-display text-xl">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <p className="mb-4 text-center text-[0.6rem] uppercase tracking-luxe-sm muted">
                    Shipping & insurance calculated at checkout
                  </p>
                  <div className="flex flex-col gap-3">
                    <ButtonLink
                      href="/checkout"
                      variant="gold"
                      size="lg"
                      className="w-full"
                      onClick={cart.close}
                    >
                      Proceed to Checkout
                    </ButtonLink>
                    <Button
                      variant="ghost"
                      size="sm"
                      magnetic={false}
                      onClick={cart.close}
                      className="w-full"
                    >
                      Continue Browsing
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
