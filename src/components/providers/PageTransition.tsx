"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Mount-fade page transition.
 *
 * NOTE: we deliberately do NOT use `AnimatePresence mode="wait"` here. In the
 * Next.js App Router the old page is unmounted by the router itself, so an exit
 * animation plays on the *incoming* content and can leave it stuck/blank until
 * a manual reload. Keying a plain motion.div on the pathname re-mounts and
 * fades in each navigation — smooth, and never blank.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
