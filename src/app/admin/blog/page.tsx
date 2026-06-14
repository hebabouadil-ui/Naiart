"use client";

import { useState } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Pencil,
  Plus,
  Quote,
  Trash2,
} from "lucide-react";
import { journal as seed } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type { JournalPost } from "@/lib/types";
import { DataTable, PageHeader, type Column } from "@/components/admin/DataTable";
import { Modal } from "@/components/admin/Modal";
import { Button } from "@/components/ui/Button";
import { FieldGroup, Input, Select, Textarea } from "@/components/admin/Field";

const categories: JournalPost["category"][] = [
  "Journal",
  "Tutorial",
  "Behind the Scenes",
  "Events",
];

const blank = {
  title: "",
  excerpt: "",
  category: "Journal" as JournalPost["category"],
  tags: "",
  body: "",
};

export default function BlogAdmin() {
  const [items, setItems] = useState<JournalPost[]>(seed);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<JournalPost | null>(null);
  const [form, setForm] = useState(blank);

  function openNew() {
    setEditing(null);
    setForm(blank);
    setOpen(true);
  }

  function openEdit(p: JournalPost) {
    setEditing(p);
    setForm({
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      tags: p.tags.join(", "),
      body: p.content.join("\n\n"),
    });
    setOpen(true);
  }

  function save() {
    if (!form.title) return;
    const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const content = form.body.split("\n\n").filter(Boolean);
    if (editing) {
      setItems((prev) =>
        prev.map((p) =>
          p.id === editing.id
            ? { ...p, ...form, tags, content }
            : p,
        ),
      );
    } else {
      setItems((prev) => [
        {
          id: `j-${Date.now()}`,
          slug: form.title.toLowerCase().replace(/\s+/g, "-"),
          title: form.title,
          excerpt: form.excerpt,
          category: form.category,
          cover: seed[0].cover,
          author: "Naïa Lemaire",
          readTime: Math.max(2, Math.round(content.join(" ").length / 900)),
          publishedAt: new Date().toISOString().slice(0, 10),
          content,
          tags,
        },
        ...prev,
      ]);
    }
    setOpen(false);
  }

  const columns: Column<JournalPost>[] = [
    {
      key: "title",
      header: "Article",
      render: (p) => (
        <div>
          <p className="font-medium text-charcoal">{p.title}</p>
          <p className="max-w-md truncate text-xs text-graphite/55">
            {p.excerpt}
          </p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (p) => (
        <span className="rounded-full bg-gold/10 px-3 py-1 font-grotesk text-[0.6rem] uppercase tracking-luxe-sm text-gold">
          {p.category}
        </span>
      ),
    },
    { key: "author", header: "Author", render: (p) => p.author },
    {
      key: "date",
      header: "Published",
      render: (p) => formatDate(p.publishedAt),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (p) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => openEdit(p)}
            className="rounded-lg p-2 text-graphite/70 hover:bg-gold/10 hover:text-gold"
            aria-label="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => setItems((prev) => prev.filter((x) => x.id !== p.id))}
            className="rounded-lg p-2 text-graphite/70 hover:bg-rose-500/10 hover:text-rose-600"
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
        title="Journal"
        subtitle="Write and curate the art journal — stories, tutorials, and studio notes."
        actions={
          <Button variant="gold" size="sm" magnetic={false} onClick={openNew}>
            <Plus className="h-4 w-4" /> New Article
          </Button>
        }
      />
      <DataTable columns={columns} rows={items} rowKey={(p) => p.id} />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Article" : "New Article"}
        size="lg"
        footer={
          <>
            <Button variant="ghost" size="sm" magnetic={false} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="gold" size="sm" magnetic={false} onClick={save}>
              {editing ? "Save" : "Publish"}
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <FieldGroup label="Title">
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </FieldGroup>
          <FieldGroup label="Excerpt">
            <Input
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
          </FieldGroup>
          <div className="grid grid-cols-2 gap-5">
            <FieldGroup label="Category">
              <Select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as JournalPost["category"],
                  })
                }
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </FieldGroup>
            <FieldGroup label="Tags (comma separated)">
              <Input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="Process, Materials, Studio"
              />
            </FieldGroup>
          </div>
          <div>
            <p className="mb-2 font-grotesk text-[0.66rem] font-medium uppercase tracking-luxe-sm text-graphite/80">
              Content
            </p>
            <div className="flex items-center gap-1 rounded-t-xl border border-b-0 border-charcoal/12 bg-ivory/60 px-3 py-2">
              {[Bold, Italic, Heading2, Quote].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="rounded-md p-1.5 text-graphite/70 hover:bg-charcoal/5 hover:text-charcoal"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <Textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className="min-h-[180px] rounded-t-none"
              placeholder="Separate paragraphs with a blank line…"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
