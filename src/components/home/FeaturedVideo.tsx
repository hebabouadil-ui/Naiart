"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const poster =
  "/art/1579783902614-a3fb3927b6a5.svg?v=3";

export function FeaturedVideo() {
  const [open, setOpen] = useState(false);

  return (
    <section className="container-luxe py-24 sm:py-36">
      <Reveal>
        <div className="relative aspect-video w-full overflow-hidden rounded-sm">
          <Image
            src={poster}
            alt="Inside the atelier"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 text-ivory">
            <span className="text-[0.65rem] uppercase tracking-luxe text-gold-light">
              Film · Inside the Atelier
            </span>
            <button
              onClick={() => setOpen(true)}
              data-cursor="hover"
              aria-label="Play film"
              className="group relative flex h-24 w-24 items-center justify-center rounded-full border border-ivory/40 backdrop-blur-sm transition-colors hover:bg-ivory hover:text-charcoal"
            >
              <span className="absolute inset-0 animate-ping rounded-full border border-ivory/20" />
              <Play className="h-7 w-7 translate-x-0.5 fill-current" />
            </button>
            <p className="max-w-md text-center font-display text-3xl sm:text-4xl">
              A year inside the Arles studio
            </p>
          </div>
        </div>
      </Reveal>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-deep-charcoal/95 p-6 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <button
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:text-gold"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-video w-full max-w-5xl overflow-hidden rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                title="Inside the atelier"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
