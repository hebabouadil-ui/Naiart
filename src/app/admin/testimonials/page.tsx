"use client";

import { useState } from "react";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import { testimonials as seed } from "@/lib/data";
import type { Testimonial } from "@/lib/types";
import { PageHeader } from "@/components/admin/DataTable";
import { Modal } from "@/components/admin/Modal";
import { Button } from "@/components/ui/Button";
import { FieldGroup, Input, Textarea } from "@/components/admin/Field";
import { cn } from "@/lib/utils";

const blank = {
  quote: "",
  author: "",
  role: "",
  location: "",
  rating: 5,
};

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>(seed);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(blank);

  function openNew() {
    setEditing(null);
    setForm(blank);
    setOpen(true);
  }
  function openEdit(t: Testimonial) {
    setEditing(t);
    setForm({ ...t });
    setOpen(true);
  }
  function save() {
    if (!form.quote || !form.author) return;
    if (editing) {
      setItems((prev) =>
        prev.map((t) => (t.id === editing.id ? { ...t, ...form } : t)),
      );
    } else {
      setItems((prev) => [{ id: `t-${Date.now()}`, ...form }, ...prev]);
    }
    setOpen(false);
  }

  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle="The words of collectors who live with the work."
        actions={
          <Button variant="gold" size="sm" magnetic={false} onClick={openNew}>
            <Plus className="h-4 w-4" /> Add Testimonial
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((t) => (
          <div
            key={t.id}
            className="group relative flex flex-col rounded-2xl border border-charcoal/8 bg-warm-white p-6 shadow-soft"
          >
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="flex-1 font-serif text-lg italic leading-relaxed text-charcoal">
              “{t.quote}”
            </p>
            <div className="mt-5">
              <p className="font-display text-lg text-charcoal">{t.author}</p>
              <p className="font-grotesk text-[0.62rem] uppercase tracking-luxe-sm text-graphite/55">
                {t.role} · {t.location}
              </p>
            </div>
            <div className="absolute right-4 top-4 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => openEdit(t)}
                className="rounded-lg bg-warm-white p-2 text-graphite/70 shadow-soft hover:text-gold"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => setItems((prev) => prev.filter((x) => x.id !== t.id))}
                className="rounded-lg bg-warm-white p-2 text-graphite/70 shadow-soft hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Testimonial" : "Add Testimonial"}
        footer={
          <>
            <Button variant="ghost" size="sm" magnetic={false} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="gold" size="sm" magnetic={false} onClick={save}>
              Save
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <FieldGroup label="Quote">
            <Textarea
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
            />
          </FieldGroup>
          <div className="grid grid-cols-2 gap-5">
            <FieldGroup label="Author">
              <Input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
            </FieldGroup>
            <FieldGroup label="Role">
              <Input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </FieldGroup>
          </div>
          <FieldGroup label="Location">
            <Input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </FieldGroup>
          <div>
            <p className="mb-2 font-grotesk text-[0.66rem] font-medium uppercase tracking-luxe-sm text-graphite/80">
              Rating
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                >
                  <Star
                    className={cn(
                      "h-7 w-7 transition-colors",
                      n <= form.rating
                        ? "fill-gold text-gold"
                        : "text-charcoal/20",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
