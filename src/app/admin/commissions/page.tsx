"use client";

import { useState } from "react";
import { Calendar, Mail, Ruler, Wallet } from "lucide-react";
import { commissionRequests as seed } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type { CommissionRequest } from "@/lib/types";
import { PageHeader } from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/StatusPill";

export default function CommissionsAdmin() {
  const [items, setItems] = useState<CommissionRequest[]>(seed);
  const [reply, setReply] = useState<Record<string, string>>({});

  function setStatus(id: string, status: CommissionRequest["status"]) {
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  }

  return (
    <div>
      <PageHeader
        title="Commission Requests"
        subtitle="Bespoke enquiries from collectors seeking a singular work."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {items.map((c) => (
          <div
            key={c.id}
            className="flex flex-col rounded-2xl border border-charcoal/8 bg-warm-white p-6 shadow-soft"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-xl text-charcoal">{c.name}</p>
                <a
                  href={`mailto:${c.email}`}
                  className="font-sans text-sm text-gold hover:underline"
                >
                  {c.email}
                </a>
              </div>
              <StatusPill status={c.status} />
            </div>

            <p className="mt-4 font-serif text-base leading-relaxed text-graphite">
              {c.description}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-ivory/70 px-2 py-3">
                <Ruler className="mx-auto mb-1 h-4 w-4 text-gold" />
                <p className="font-sans text-xs text-charcoal">{c.size}</p>
              </div>
              <div className="rounded-lg bg-ivory/70 px-2 py-3">
                <Wallet className="mx-auto mb-1 h-4 w-4 text-gold" />
                <p className="font-sans text-xs text-charcoal">{c.budget}</p>
              </div>
              <div className="rounded-lg bg-ivory/70 px-2 py-3">
                <Calendar className="mx-auto mb-1 h-4 w-4 text-gold" />
                <p className="font-sans text-xs text-charcoal">
                  {formatDate(c.deadline)}
                </p>
              </div>
            </div>

            <textarea
              value={reply[c.id] ?? ""}
              onChange={(e) => setReply({ ...reply, [c.id]: e.target.value })}
              placeholder="Write a reply to the collector…"
              className="mt-4 min-h-[70px] w-full rounded-xl border border-charcoal/12 bg-warm-white px-4 py-3 font-sans text-sm outline-none focus:border-gold"
            />

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setStatus(c.id, "accepted")}
                className="rounded-full bg-emerald-600 px-4 py-2 font-grotesk text-[0.6rem] uppercase tracking-luxe-sm text-white hover:bg-emerald-700"
              >
                Accept
              </button>
              <button
                onClick={() => setStatus(c.id, "in-progress")}
                className="rounded-full bg-sky-600 px-4 py-2 font-grotesk text-[0.6rem] uppercase tracking-luxe-sm text-white hover:bg-sky-700"
              >
                In Progress
              </button>
              <button
                onClick={() => setStatus(c.id, "rejected")}
                className="rounded-full border border-rose-500/40 px-4 py-2 font-grotesk text-[0.6rem] uppercase tracking-luxe-sm text-rose-600 hover:bg-rose-500/10"
              >
                Decline
              </button>
              <a
                href={`mailto:${c.email}?subject=Your%20commission%20enquiry&body=${encodeURIComponent(reply[c.id] ?? "")}`}
                className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 font-grotesk text-[0.6rem] uppercase tracking-luxe-sm text-ivory hover:bg-gold hover:text-charcoal"
              >
                <Mail className="h-3.5 w-3.5" /> Send
              </a>
            </div>

            <p className="mt-3 font-sans text-xs text-graphite/45">
              Received {formatDate(c.submittedAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
