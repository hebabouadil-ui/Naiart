"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const widths = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl" };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep-charcoal/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative flex max-h-[88vh] w-full flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-warm-white shadow-lift",
              widths[size],
            )}
          >
            <header className="flex items-start justify-between border-b border-charcoal/8 px-7 py-5">
              <div>
                <h2 className="font-display text-2xl text-charcoal">{title}</h2>
                {subtitle && (
                  <p className="mt-1 font-sans text-sm text-graphite/70">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-graphite transition-colors hover:bg-charcoal/5 hover:text-charcoal"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </header>
            <div
              data-lenis-prevent
              className="no-scrollbar flex-1 overflow-y-auto px-7 py-6"
            >
              {children}
            </div>
            {footer && (
              <footer className="flex items-center justify-end gap-3 border-t border-charcoal/8 bg-ivory/60 px-7 py-4">
                {footer}
              </footer>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** Right-side slide-over drawer, used for detail panels. */
export function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep-charcoal/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-charcoal/10 bg-warm-white shadow-lift"
          >
            <header className="flex items-center justify-between border-b border-charcoal/8 px-7 py-5">
              <h2 className="font-display text-2xl text-charcoal">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-graphite transition-colors hover:bg-charcoal/5 hover:text-charcoal"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </header>
            <div
              data-lenis-prevent
              className="no-scrollbar flex-1 overflow-y-auto px-7 py-6"
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
