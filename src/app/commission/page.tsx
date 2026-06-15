"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MessageSquare, PenTool, Brush, Package, UploadCloud, X, Check } from "lucide-react";
import { BRAND } from "@/lib/data";
import { Reveal, TextReveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: MessageSquare,
    index: "01",
    title: "Enquiry",
    description:
      "You share your vision — the space, the feeling, the palette you are drawn to. We listen, and we reply personally to begin the conversation.",
  },
  {
    icon: PenTool,
    index: "02",
    title: "Concept",
    description:
      "Rabia develops charcoal studies and a colour direction. Together we refine the composition until it feels inevitable.",
  },
  {
    icon: Brush,
    index: "03",
    title: "Painting",
    description:
      "The work is built over weeks of layered oil and cold wax in the Arles atelier. You receive progress images at each meaningful stage.",
  },
  {
    icon: Package,
    index: "04",
    title: "Delivery",
    description:
      "Varnished, signed, and accompanied by a certificate of authenticity, your painting is museum-packed and delivered worldwide, fully insured.",
  },
];

const sizes = [
  "Small — up to 80 × 100 cm",
  "Medium — up to 120 × 150 cm",
  "Large — up to 160 × 200 cm",
  "Monumental — 200 cm and beyond",
  "Unsure — advise me",
];

const budgets = [
  "$5,000 – $8,000",
  "$8,000 – $12,000",
  "$12,000 – $18,000",
  "$18,000 – $25,000",
  "$25,000+",
];

type Preview = { name: string; url: string };

export default function CommissionPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
    size: "",
    budget: "",
    deadline: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const set = (field: string, v: string) =>
    setForm((prev) => ({ ...prev, [field]: v }));

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files).map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setPreviews((prev) => [...prev, ...next]);
  };

  const removePreview = (i: number) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[i].url);
      return prev.filter((_, idx) => idx !== i);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const required = ["name", "email", "description", "size", "budget"];
    const nextErrors: Record<string, boolean> = {};
    required.forEach((f) => {
      if (!form[f as keyof typeof form].trim()) nextErrors[f] = true;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <main className="grain flex min-h-screen items-center justify-center pt-32 sm:pt-40">
        <div className="container-luxe flex flex-col items-center py-24 text-center">
          <Reveal>
            <span className="mb-10 flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient text-charcoal shadow-gold">
              <Check className="h-9 w-9" />
            </span>
          </Reveal>
          <TextReveal
            as="h1"
            text="Your enquiry has reached the atelier"
            className="max-w-3xl justify-center text-center font-display text-[clamp(2.2rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.02em] ink"
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed muted">
              Thank you, {form.name || "friend"}. Rabia has been notified and will
              respond personally — usually within two working days — to begin
              shaping your commission.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 text-[0.62rem] uppercase tracking-luxe-sm text-gold">
              A confirmation has been sent to the studio team
            </p>
          </Reveal>
        </div>
      </main>
    );
  }

  return (
    <main className="grain pt-32 sm:pt-40">
      {/* Intro */}
      <section className="container-luxe pb-20">
        <span className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-gold" /> Bespoke
        </span>
        <TextReveal
          as="h1"
          text="A painting made for you alone"
          className="max-w-4xl font-display text-[clamp(2.4rem,6vw,5.5rem)] font-medium leading-[1.0] tracking-[-0.02em] ink"
        />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl font-serif text-xl leading-relaxed muted">
            A commission is the most intimate way to own a work by {BRAND.full}.
            Conceived in dialogue with your space and your story, it becomes a
            singular object that exists nowhere else in the world — a
            conversation rendered in oil, cold wax, and light.
          </p>
        </Reveal>
      </section>

      {/* Process steps */}
      <section className="container-luxe pb-28">
        <StaggerGroup className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <StaggerItem key={step.index}>
              <div className="group">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-current/15 text-gold transition-colors duration-500 group-hover:border-gold">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-4xl text-current/10">
                    {step.index}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl ink">{step.title}</h3>
                <p className="mt-3 font-serif text-base leading-relaxed muted">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Form */}
      <section className="container-luxe pb-28 sm:pb-40">
        <Reveal>
          <div className="surface relative overflow-hidden rounded-sm p-8 sm:p-14">
            <div className="mb-12 max-w-xl">
              <span className="eyebrow text-gold">Begin Your Commission</span>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] ink">
                Tell us what you imagine
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="grid gap-10 sm:grid-cols-2">
                <LabeledInput
                  label="Your name"
                  value={form.name}
                  onChange={(v) => set("name", v)}
                  error={errors.name}
                />
                <LabeledInput
                  label="Email address"
                  type="email"
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  error={errors.email}
                />
              </div>

              <LabeledInput
                label="Describe the work you envision"
                value={form.description}
                onChange={(v) => set("description", v)}
                error={errors.description}
                textarea
              />

              {/* Reference upload */}
              <div>
                <p className="mb-3 text-[0.6rem] uppercase tracking-luxe-sm muted">
                  Reference images <span className="text-current/40">(optional)</span>
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    addFiles(e.dataTransfer.files);
                  }}
                  className={cn(
                    "flex w-full flex-col items-center justify-center gap-3 rounded-sm border border-dashed px-6 py-12 text-center transition-colors duration-300",
                    dragging
                      ? "border-gold bg-gold-soft/30"
                      : "border-current/25 hover:border-gold",
                  )}
                >
                  <UploadCloud className="h-7 w-7 text-gold" />
                  <span className="font-serif text-lg ink">
                    Drag images here, or click to browse
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-luxe-sm muted">
                    Spaces, inspirations, palettes — JPG or PNG
                  </span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                />

                {previews.length > 0 && (
                  <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-5">
                    {previews.map((p, i) => (
                      <div
                        key={i}
                        className="group relative aspect-square overflow-hidden rounded-sm surface"
                      >
                        <Image
                          src={p.url}
                          alt={p.name}
                          fill
                          sizes="120px"
                          className="object-cover"
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={() => removePreview(i)}
                          aria-label={`Remove ${p.name}`}
                          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal/80 text-ivory opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selects + deadline */}
              <div className="grid gap-10 sm:grid-cols-3">
                <LabeledSelect
                  label="Preferred size"
                  value={form.size}
                  onChange={(v) => set("size", v)}
                  options={sizes}
                  error={errors.size}
                />
                <LabeledSelect
                  label="Budget range"
                  value={form.budget}
                  onChange={(v) => set("budget", v)}
                  options={budgets}
                  error={errors.budget}
                />
                <div>
                  <label className="mb-3 block text-[0.6rem] uppercase tracking-luxe-sm muted">
                    Desired by
                  </label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => set("deadline", e.target.value)}
                    className="w-full border-b border-current/20 bg-transparent pb-3 pt-1 font-serif text-lg ink outline-none transition-colors focus:border-gold"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="gold" size="lg">
                  Send Enquiry to the Atelier
                </Button>
              </div>
            </form>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  error = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  error?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full resize-none border-b bg-transparent pb-3 pt-7 font-serif text-lg ink outline-none transition-colors focus:border-gold",
            error ? "border-clay" : "border-current/20",
          )}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full border-b bg-transparent pb-3 pt-7 font-serif text-lg ink outline-none transition-colors focus:border-gold",
            error ? "border-clay" : "border-current/20",
          )}
        />
      )}
      <label
        className={cn(
          "pointer-events-none absolute left-0 origin-left font-sans uppercase tracking-luxe-sm transition-all duration-300 ease-luxe",
          active ? "top-0 text-[0.6rem] text-gold" : "top-7 text-[0.8rem] muted",
          error && !active && "text-clay",
        )}
      >
        {label}
        {error && <span className="ml-2 normal-case tracking-normal text-clay">required</span>}
      </label>
    </div>
  );
}

function LabeledSelect({
  label,
  value,
  onChange,
  options,
  error = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: boolean;
}) {
  return (
    <div>
      <label className="mb-3 block text-[0.6rem] uppercase tracking-luxe-sm muted">
        {label}
        {error && <span className="ml-2 normal-case tracking-normal text-clay">required</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full border-b bg-transparent pb-3 pt-1 font-serif text-lg outline-none transition-colors focus:border-gold",
          value ? "ink" : "muted",
          error ? "border-clay" : "border-current/20",
        )}
      >
        <option value="" className="bg-warm-white text-charcoal">
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-warm-white text-charcoal">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
