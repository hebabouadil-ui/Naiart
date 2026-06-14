"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { orders as seed } from "@/lib/data";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/types";
import { DataTable, PageHeader, type Column } from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/StatusPill";
import { Drawer } from "@/components/admin/Modal";

const NEXT: Record<Order["status"], Order["status"] | null> = {
  new: "paid",
  paid: "shipped",
  shipped: "completed",
  completed: null,
  refunded: null,
  cancelled: null,
};

const TABS = ["all", "new", "paid", "shipped", "completed"] as const;

export default function OrdersAdmin() {
  const [items, setItems] = useState<Order[]>(seed);
  const [tab, setTab] = useState<(typeof TABS)[number]>("all");
  const [selected, setSelected] = useState<Order | null>(null);

  const rows = useMemo(
    () => (tab === "all" ? items : items.filter((o) => o.status === tab)),
    [items, tab],
  );

  function update(id: string, status: Order["status"]) {
    setItems((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
  }

  const columns: Column<Order>[] = [
    {
      key: "id",
      header: "Order",
      render: (o) => <span className="font-medium text-charcoal">{o.id}</span>,
    },
    { key: "customer", header: "Customer", render: (o) => o.customer },
    { key: "date", header: "Date", render: (o) => formatDate(o.date) },
    {
      key: "items",
      header: "Items",
      align: "center",
      render: (o) => o.items.reduce((s, i) => s + i.quantity, 0),
    },
    {
      key: "total",
      header: "Total",
      align: "right",
      render: (o) => formatPrice(o.total),
    },
    {
      key: "status",
      header: "Status",
      render: (o) => <StatusPill status={o.status} />,
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (o) => {
        const next = NEXT[o.status];
        return (
          <div className="flex items-center justify-end gap-2">
            {next && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  update(o.id, next);
                }}
                className="rounded-full bg-charcoal px-3 py-1.5 font-grotesk text-[0.6rem] uppercase tracking-luxe-sm text-ivory transition-colors hover:bg-gold hover:text-charcoal"
              >
                Mark {next}
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected(o);
              }}
              className="rounded-lg p-1.5 text-graphite/60 hover:text-gold"
            >
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle="Track every acquisition from enquiry to white-glove delivery."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-5 py-2 font-grotesk text-[0.66rem] uppercase tracking-luxe-sm capitalize transition-colors ${
              tab === t
                ? "border-charcoal bg-charcoal text-ivory"
                : "border-charcoal/15 text-graphite/70 hover:border-gold hover:text-gold"
            }`}
          >
            {t}
            {t !== "all" && (
              <span className="ml-2 text-graphite/40">
                {items.filter((o) => o.status === t).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(o) => o.id}
        onRowClick={(o) => setSelected(o)}
        empty="No orders in this view."
      />

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.id ?? "Order"}
      >
        {selected && (
          <div className="space-y-6">
            <div>
              <StatusPill status={selected.status} />
              <p className="mt-4 font-display text-2xl text-charcoal">
                {selected.customer}
              </p>
              <a
                href={`mailto:${selected.email}`}
                className="font-sans text-sm text-gold hover:underline"
              >
                {selected.email}
              </a>
              <p className="mt-1 font-sans text-sm text-graphite/55">
                Placed {formatDate(selected.date)}
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-charcoal/8 p-5">
              {selected.items.map((it, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="font-sans text-sm text-charcoal">
                    {it.title} × {it.quantity}
                  </span>
                  <span className="font-sans text-sm text-graphite/70">
                    {formatPrice(it.price * it.quantity)}
                  </span>
                </div>
              ))}
              <div className="mt-3 flex items-center justify-between border-t border-charcoal/8 pt-3">
                <span className="font-display text-lg text-charcoal">Total</span>
                <span className="font-display text-lg text-charcoal">
                  {formatPrice(selected.total)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-grotesk text-[0.66rem] uppercase tracking-luxe-sm text-graphite/70">
                Actions
              </p>
              <div className="flex flex-wrap gap-2">
                {NEXT[selected.status] && (
                  <button
                    onClick={() => update(selected.id, NEXT[selected.status]!)}
                    className="rounded-full bg-charcoal px-4 py-2 font-grotesk text-[0.62rem] uppercase tracking-luxe-sm text-ivory hover:bg-gold hover:text-charcoal"
                  >
                    Advance to {NEXT[selected.status]}
                  </button>
                )}
                <button
                  onClick={() => update(selected.id, "refunded")}
                  className="rounded-full border border-amber-500/40 px-4 py-2 font-grotesk text-[0.62rem] uppercase tracking-luxe-sm text-amber-600 hover:bg-amber-500/10"
                >
                  Refund
                </button>
                <button
                  onClick={() => update(selected.id, "cancelled")}
                  className="rounded-full border border-rose-500/40 px-4 py-2 font-grotesk text-[0.62rem] uppercase tracking-luxe-sm text-rose-600 hover:bg-rose-500/10"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
