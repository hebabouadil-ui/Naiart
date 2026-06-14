"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"default" | "hover" | "view">(
    "default",
  );
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });
  const raf = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        const el = (e.target as HTMLElement)?.closest?.(
          "[data-cursor]",
        ) as HTMLElement | null;
        if (el) {
          const kind = el.dataset.cursor as "hover" | "view";
          setVariant(kind === "view" ? "view" : "hover");
          setLabel(el.dataset.cursorLabel ?? "");
        } else {
          setVariant("default");
          setLabel("");
        }
      });
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = variant === "view" ? 86 : variant === "hover" ? 56 : 12;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[160] hidden mix-blend-difference lg:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-ivory text-[0.55rem] font-medium uppercase tracking-luxe-sm text-charcoal"
        animate={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        {variant === "view" && <span>{label || "View"}</span>}
      </motion.div>
    </motion.div>
  );
}
