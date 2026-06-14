"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND } from "@/lib/data";

const COUNT_STEP = 1;

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Lock scroll during the reveal
    document.documentElement.classList.add("is-loading");

    let raf = 0;
    let current = 0;
    const start = performance.now();
    const duration = 1900;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      const target = Math.round(eased * 100);
      if (target > current) current = Math.min(target, current + COUNT_STEP * 3);
      setProgress(current);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          setDone(true);
          document.documentElement.classList.remove("is-loading");
        }, 420);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-deep-charcoal text-ivory"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 1, ease: [0.83, 0, 0.17, 1] },
          }}
        >
          {/* Brand mark */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 24, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.28em" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl tracking-luxe text-gold-shimmer sm:text-7xl"
            >
              {BRAND.name}
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-4 font-sans text-[0.6rem] uppercase tracking-luxe text-ivory/60"
            >
              {BRAND.signature} — Atelier
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-16 left-0 right-0 mx-auto flex w-[78%] max-w-md flex-col gap-3 sm:bottom-20">
            <div className="flex items-end justify-between font-sans text-[0.65rem] uppercase tracking-luxe-sm text-ivory/50">
              <span>Curating the collection</span>
              <motion.span
                key={progress}
                className="font-display text-2xl tracking-normal text-ivory"
              >
                {progress.toString().padStart(3, "0")}
              </motion.span>
            </div>
            <div className="h-px w-full overflow-hidden bg-ivory/15">
              <motion.div
                className="h-full bg-gold-gradient"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
