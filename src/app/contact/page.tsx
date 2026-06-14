"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Youtube,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { BRAND } from "@/lib/data";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "subject" | "message";

const socials = [
  { label: "Instagram", href: BRAND.social.instagram, icon: Instagram },
  { label: "Pinterest", href: BRAND.social.pinterest, icon: ArrowUpRight },
  { label: "Behance", href: BRAND.social.behance, icon: ArrowUpRight },
  { label: "YouTube", href: BRAND.social.youtube, icon: Youtube },
];

const hours = [
  { day: "Monday – Friday", time: "9:00 — 18:00" },
  { day: "Saturday", time: "By appointment" },
  { day: "Sunday", time: "Closed" },
];

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  textarea = false,
}: {
  id: Field;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          required
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="peer w-full resize-none border-b border-current/20 bg-transparent pb-3 pt-7 font-serif text-lg ink outline-none transition-colors focus:border-gold"
        />
      ) : (
        <input
          id={id}
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="peer w-full border-b border-current/20 bg-transparent pb-3 pt-7 font-serif text-lg ink outline-none transition-colors focus:border-gold"
        />
      )}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 origin-left font-sans uppercase tracking-luxe-sm transition-all duration-300 ease-luxe",
          active
            ? "top-0 text-[0.6rem] text-gold"
            : "top-7 text-[0.8rem] muted",
        )}
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (field: Field) => (v: string) =>
    setForm((prev) => ({ ...prev, [field]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="pt-32 sm:pt-40">
      <section className="container-luxe pb-16">
        <span className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-gold" /> Contact
        </span>
        <TextReveal
          as="h1"
          text="Let us begin a conversation"
          className="max-w-4xl font-display text-[clamp(2.4rem,6vw,5.5rem)] font-medium leading-[1.0] tracking-[-0.02em] ink"
        />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed muted">
            For acquisitions, commissions, exhibitions, or press — write to the
            atelier directly. Every enquiry is read and answered personally.
          </p>
        </Reveal>
      </section>

      <section className="container-luxe grid gap-16 pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 sm:pb-40">
        {/* Form */}
        <Reveal>
          <div className="surface relative overflow-hidden rounded-sm p-8 sm:p-12">
            {sent ? (
              <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                <span className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-charcoal">
                  <Check className="h-7 w-7" />
                </span>
                <h2 className="font-display text-3xl ink">
                  Your message is on its way
                </h2>
                <p className="mt-4 max-w-sm font-serif text-lg leading-relaxed muted">
                  Thank you, {form.name || "friend"}. Your note has reached the
                  atelier and will be answered personally, usually within two
                  working days.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-8 text-[0.7rem] uppercase tracking-luxe-sm text-gold link-underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-9">
                <div className="grid gap-9 sm:grid-cols-2">
                  <FloatingInput
                    id="name"
                    label="Your name"
                    value={form.name}
                    onChange={update("name")}
                  />
                  <FloatingInput
                    id="email"
                    label="Email address"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                  />
                </div>
                <FloatingInput
                  id="subject"
                  label="Subject"
                  value={form.subject}
                  onChange={update("subject")}
                />
                <FloatingInput
                  id="message"
                  label="Your message"
                  value={form.message}
                  onChange={update("message")}
                  textarea
                />
                <div className="pt-2">
                  <Button type="submit" variant="gold" size="lg">
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Reveal>

        {/* Studio details */}
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-10">
            <div className="space-y-7">
              <a
                href={`mailto:${BRAND.email}`}
                className="group flex items-start gap-4"
              >
                <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[0.6rem] uppercase tracking-luxe-sm muted">
                    Email
                  </p>
                  <p className="font-serif text-lg ink transition-colors group-hover:text-gold">
                    {BRAND.email}
                  </p>
                </div>
              </a>
              <a
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                className="group flex items-start gap-4"
              >
                <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[0.6rem] uppercase tracking-luxe-sm muted">
                    Telephone
                  </p>
                  <p className="font-serif text-lg ink transition-colors group-hover:text-gold">
                    {BRAND.phone}
                  </p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[0.6rem] uppercase tracking-luxe-sm muted">
                    Atelier
                  </p>
                  <p className="font-serif text-lg leading-relaxed ink">
                    {BRAND.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="mb-2 text-[0.6rem] uppercase tracking-luxe-sm muted">
                    Opening Hours
                  </p>
                  <ul className="space-y-1 font-serif text-lg ink">
                    {hours.map((h) => (
                      <li
                        key={h.day}
                        className="flex justify-between gap-8"
                      >
                        <span>{h.day}</span>
                        <span className="muted">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="border-t border-current/10 pt-8">
              <p className="mb-4 text-[0.6rem] uppercase tracking-luxe-sm muted">
                Follow the studio
              </p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 rounded-full border border-current/15 px-5 py-2.5 text-[0.65rem] uppercase tracking-luxe-sm ink transition-colors hover:border-gold hover:text-gold"
                  >
                    <s.icon className="h-3.5 w-3.5" />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-current/10">
              <iframe
                title="Atelier Naïa, Arles, France"
                src="https://www.google.com/maps?q=Arles,France&output=embed"
                className="h-full w-full grayscale transition-all duration-700 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
