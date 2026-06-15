"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
  };

  return (
    <section className="relative overflow-hidden bg-deep-charcoal py-16 text-ivory sm:py-24">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(50% 60% at 50% 0%, rgba(184,146,74,0.28), transparent 70%)",
        }}
      />
      <div className="container-luxe relative flex flex-col items-center text-center">
        <span className="eyebrow mb-4">The Inner Circle</span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl font-display text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.04] text-ivory"
        >
          Be first to see new works
        </motion.h2>
        <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ivory/70">
          Join collectors worldwide to receive private previews, studio notes, and
          first access to new paintings before they reach the public gallery.
        </p>

        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-8 py-4 text-gold"
          >
            <Check className="h-5 w-5" />
            <span className="text-sm uppercase tracking-luxe-sm">
              Welcome to the atelier
            </span>
          </motion.div>
        ) : (
          <form
            onSubmit={submit}
            className="mt-10 flex w-full max-w-lg flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 rounded-full border border-ivory/20 bg-ivory/5 px-7 py-4 text-sm text-ivory placeholder:text-ivory/40 outline-none transition-colors focus:border-gold"
            />
            <Button type="submit" variant="gold" size="lg">
              Subscribe
            </Button>
          </form>
        )}
        <p className="mt-5 text-[0.6rem] uppercase tracking-luxe-sm text-ivory/40">
          No spam · Unsubscribe anytime · Resend-powered
        </p>
      </div>
    </section>
  );
}
