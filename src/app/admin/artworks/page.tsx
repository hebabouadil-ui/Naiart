"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Archive,
  ArchiveRestore,
  Pencil,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { artworks as seed, collections } from "@/lib/data";
import { uploadImage } from "@/lib/upload-client";
import { formatPrice } from "@/lib/utils";
import type { Artwork, CollectionSlug } from "@/lib/types";
import { DataTable, PageHeader, type Column } from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/StatusPill";
import { Modal } from "@/components/admin/Modal";
import { Button } from "@/components/ui/Button";
import {
  FieldGroup,
  Input,
  Select,
  Textarea,
  Toggle,
} from "@/components/admin/Field";

interface AdminArtwork extends Artwork {
  archived?: boolean;
}

const blank = {
  title: "",
  description: "",
  price: 0,
  collection: "abstract" as CollectionSlug,
  medium: "",
  dimensions: "",
  stock: 1,
  featured: false,
};

export default function ArtworksAdmin() {
  const [items, setItems] = useState<AdminArtwork[]>(seed);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | CollectionSlug>("all");
  const [showArchived, setShowArchived] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminArtwork | null>(null);
  const [form, setForm] = useState(blank);
  const [files, setFiles] = useState<string[]>([]);
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Load the live catalogue (Postgres-backed when configured; seed otherwise).
  useEffect(() => {
    fetch("/api/artworks")
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok && Array.isArray(d.items) && d.items.length) setItems(d.items);
      })
      .catch(() => {});
  }, []);

  const rows = useMemo(
    () =>
      items.filter(
        (a) =>
          Boolean(a.archived) === showArchived &&
          (filter === "all" || a.collection === filter) &&
          (a.title.toLowerCase().includes(query.toLowerCase()) ||
            a.medium.toLowerCase().includes(query.toLowerCase())),
      ),
    [items, filter, query, showArchived],
  );

  function openNew() {
    setEditing(null);
    setForm(blank);
    setFiles([]);
    setOpen(true);
  }

  function openEdit(a: AdminArtwork) {
    setEditing(a);
    setForm({
      title: a.title,
      description: a.description,
      price: a.price,
      collection: a.collection,
      medium: a.medium,
      dimensions: a.dimensions,
      stock: a.stock,
      featured: a.featured,
    });
    setFiles(a.images);
    setOpen(true);
  }

  async function save() {
    if (!form.title || saving) return;
    setSaving(true);
    try {
      if (editing) {
        const images = files.length ? files : editing.images;
        // Persist to the database when the artwork has a server id.
        if (!editing.id.startsWith("aw-")) {
          const res = await fetch(`/api/artworks/${editing.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, images }),
          });
          if (res.ok) {
            const { item } = await res.json();
            setItems((prev) => prev.map((a) => (a.id === item.id ? item : a)));
            setOpen(false);
            return;
          }
        }
        setItems((prev) =>
          prev.map((a) =>
            a.id === editing.id ? { ...a, ...form, images } : a,
          ),
        );
      } else {
        const images = files.length ? files : seed[0].images;
        // Try to persist to the database first.
        const res = await fetch("/api/artworks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, images, story: form.description }),
        });
        if (res.ok) {
          const { item } = await res.json();
          setItems((prev) => [item, ...prev]);
          setOpen(false);
          return;
        }
        // Fallback (no database configured): add to the local list only.
        const id = `aw-${Date.now()}`;
        setItems((prev) => [
          {
            ...(blank as unknown as Artwork),
            ...form,
            id,
            slug: form.title.toLowerCase().replace(/\s+/g, "-"),
            year: new Date().getFullYear(),
            story: form.description,
            images,
            dominantColor: "#B8924A",
            colorName: "Amber",
            availability: "available",
            limited: false,
            newArrival: true,
            popularity: 50,
            createdAt: new Date().toISOString().slice(0, 10),
            orientation: "portrait",
          },
          ...prev,
        ]);
      }
      setOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function addFiles(list: FileList | null) {
    if (!list) return;
    setUploading(true);
    try {
      for (const f of Array.from(list)) {
        // Upload to Cloudinary when configured; else use a local preview URL.
        const url = (await uploadImage(f)) ?? URL.createObjectURL(f);
        setFiles((prev) => [...prev, url]);
      }
    } finally {
      setUploading(false);
    }
  }

  const columns: Column<AdminArtwork>[] = [
    {
      key: "work",
      header: "Work",
      render: (a) => (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md">
            <Image src={a.images[0]} alt={a.title} fill sizes="40px" className="object-cover" />
          </div>
          <div>
            <p className="font-medium text-charcoal">{a.title}</p>
            <p className="text-xs text-graphite/55">{a.medium}</p>
          </div>
        </div>
      ),
    },
    {
      key: "collection",
      header: "Collection",
      render: (a) => <span className="capitalize">{a.collection}</span>,
    },
    {
      key: "price",
      header: "Price",
      align: "right",
      render: (a) => formatPrice(a.price),
    },
    {
      key: "stock",
      header: "Stock",
      align: "center",
      render: (a) => a.stock,
    },
    {
      key: "status",
      header: "Status",
      render: (a) => <StatusPill status={a.archived ? "archived" : a.availability} />,
    },
    {
      key: "featured",
      header: "Featured",
      align: "center",
      render: (a) =>
        a.featured ? <span className="text-gold">★</span> : <span className="text-graphite/25">☆</span>,
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (a) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => openEdit(a)}
            className="rounded-lg p-2 text-graphite/70 transition-colors hover:bg-gold/10 hover:text-gold"
            aria-label="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              const next = !a.archived;
              setItems((prev) =>
                prev.map((x) =>
                  x.id === a.id ? { ...x, archived: next } : x,
                ),
              );
              if (!a.id.startsWith("aw-")) {
                void fetch(`/api/artworks/${a.id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ archived: next }),
                }).catch(() => {});
              }
            }}
            className="rounded-lg p-2 text-graphite/70 transition-colors hover:bg-charcoal/5 hover:text-charcoal"
            aria-label="Archive"
          >
            {a.archived ? (
              <ArchiveRestore className="h-4 w-4" />
            ) : (
              <Archive className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => {
              setItems((prev) => prev.filter((x) => x.id !== a.id));
              if (!a.id.startsWith("aw-")) {
                void fetch(`/api/artworks/${a.id}`, { method: "DELETE" }).catch(
                  () => {},
                );
              }
            }}
            className="rounded-lg p-2 text-graphite/70 transition-colors hover:bg-rose-500/10 hover:text-rose-600"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Artworks"
        subtitle="Curate the gallery — add, edit, archive, and feature original works."
        actions={
          <Button variant="gold" size="sm" magnetic={false} onClick={openNew}>
            <Plus className="h-4 w-4" /> Add Artwork
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search works…"
          className="w-full max-w-xs rounded-full border border-charcoal/10 bg-warm-white px-4 py-2.5 font-sans text-sm outline-none focus:border-gold sm:w-auto"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | CollectionSlug)}
          className="rounded-full border border-charcoal/10 bg-warm-white px-4 py-2.5 font-sans text-sm capitalize outline-none focus:border-gold"
        >
          <option value="all">All collections</option>
          {collections.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowArchived((s) => !s)}
          className={`rounded-full border px-4 py-2.5 font-grotesk text-[0.66rem] uppercase tracking-luxe-sm transition-colors ${
            showArchived
              ? "border-charcoal bg-charcoal text-ivory"
              : "border-charcoal/15 text-graphite/70 hover:border-gold hover:text-gold"
          }`}
        >
          {showArchived ? "Viewing Archive" : "View Archive"}
        </button>
        <span className="ml-auto font-grotesk text-[0.66rem] uppercase tracking-luxe-sm text-graphite/55">
          {rows.length} works
        </span>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(a) => a.id}
        empty="No works match your filters."
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Artwork" : "Add Artwork"}
        subtitle={editing ? editing.title : "Create a new original work"}
        size="lg"
        footer={
          <>
            <Button variant="ghost" size="sm" magnetic={false} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="gold"
              size="sm"
              magnetic={false}
              onClick={save}
              disabled={saving || uploading}
            >
              {saving
                ? "Saving…"
                : editing
                  ? "Save Changes"
                  : "Create Artwork"}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FieldGroup label="Title" className="sm:col-span-2">
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="The Quiet Hour"
            />
          </FieldGroup>
          <FieldGroup label="Description" className="sm:col-span-2">
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="A meditation on the moment before dawn…"
            />
          </FieldGroup>
          <FieldGroup label="Price (USD)">
            <Input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            />
          </FieldGroup>
          <FieldGroup label="Collection">
            <Select
              value={form.collection}
              onChange={(e) =>
                setForm({ ...form, collection: e.target.value as CollectionSlug })
              }
            >
              {collections.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </Select>
          </FieldGroup>
          <FieldGroup label="Medium">
            <Input
              value={form.medium}
              onChange={(e) => setForm({ ...form, medium: e.target.value })}
              placeholder="Oil & cold wax on linen"
            />
          </FieldGroup>
          <FieldGroup label="Dimensions">
            <Input
              value={form.dimensions}
              onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
              placeholder="120 × 150 cm"
            />
          </FieldGroup>
          <FieldGroup label="Stock">
            <Input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            />
          </FieldGroup>
          <div className="flex items-end pb-2">
            <Toggle
              checked={form.featured}
              onChange={(v) => setForm({ ...form, featured: v })}
              label="Featured on storefront"
            />
          </div>

          {/* drag & drop */}
          <div className="sm:col-span-2">
            <p className="mb-2 block font-grotesk text-[0.66rem] font-medium uppercase tracking-luxe-sm text-graphite/80">
              Images
            </p>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                addFiles(e.dataTransfer.files);
              }}
              onClick={() => fileRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
                drag
                  ? "border-gold bg-gold/5"
                  : "border-charcoal/15 hover:border-gold/60"
              }`}
            >
              <Upload className="h-6 w-6 text-gold" />
              <p className="font-sans text-sm text-charcoal">
                {uploading ? "Uploading…" : "Drag & drop, or click to upload"}
              </p>
              <p className="font-sans text-xs text-graphite/50">
                High-resolution JPG or PNG · stored on Cloudinary
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />
            </div>
            {files.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {files.map((f, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-16 overflow-hidden rounded-lg border border-charcoal/10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f} alt="" className="h-full w-full object-cover" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFiles((prev) => prev.filter((_, idx) => idx !== i));
                      }}
                      className="absolute right-1 top-1 rounded-full bg-charcoal/70 p-0.5 text-ivory"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
