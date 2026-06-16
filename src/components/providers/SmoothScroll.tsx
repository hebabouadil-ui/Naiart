"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    // Admin pages use their own fixed/sticky layout with data tables and
    // modals — Lenis intercepts wheel events and prevents those from
    // scrolling their overflow-y-auto containers, so skip it there.
    if (isAdmin) {
      lenisInstance?.destroy();
      lenisInstance = null;
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [isAdmin]);

  // Reset scroll position on route change (storefront only)
  useEffect(() => {
    if (!isAdmin) {
      lenisInstance?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
  }, [pathname, isAdmin]);

  return <>{children}</>;
}
