"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { customers, orders } from "@/lib/data";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Customer } from "@/lib/types";
import { DataTable, PageHeader, type Column } from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/StatusPill";
import { Drawer } from "@/components/admin/Modal";

export default function CustomersAdmin() {
  const [selected, setSelected] = useState<Customer | null>(null);

  const columns: Column<Customer>[] = [
    {
      key: "name",
      header: "Collector",
      render: (c) => (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient font-grotesk text-xs font-semibold text-charcoal">
            {c.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
          </span>
          <span className="font-medium text-charcoal">{c.name}</span>
        </div>
      ),
    },
    { key: "email", header: "Email", render: (c) => c.email },
    { key: "location", header: "Location", render: (c) => c.location },
    {
      key: "joined",
      header: "Joined",
      render: (c) => formatDate(c.joinedAt),
    },
    { key: "orders", header: "Orders", align: "center", render: (c) => c.orders },
    {
      key: "spend",
      header: "Lifetime",
      align: "right",
      render: (c) => (
        <span className="font-medium text-charcoal">{formatPrice(c.spend)}</span>
      ),
    },
  ];

  const history = selected
    ? orders.filter((o) => o.email === selected.email)
    : [];

  return (
    <div>
      <PageHeader
        title="Customers"
        subtitle="Your collectors — relationships, history, and lifetime value."
      />
      <DataTable
        columns={columns}
        rows={customers}
        rowKey={(c) => c.id}
        onRowClick={(c) => setSelected(c)}
      />

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? "Collector"}
      >
        {selected && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-ivory/70 p-5 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient font-display text-xl text-charcoal">
                {selected.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </span>
              <p className="mt-3 font-display text-2xl text-charcoal">
                {selected.name}
              </p>
              <p className="font-sans text-sm text-graphite/55">
                {selected.location}
              </p>
              <a
                href={`mailto:${selected.email}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 font-grotesk text-[0.62rem] uppercase tracking-luxe-sm text-ivory hover:bg-gold hover:text-charcoal"
              >
                <Mail className="h-3.5 w-3.5" /> Contact
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-charcoal/8 p-4 text-center">
                <p className="font-display text-2xl text-charcoal">
                  {selected.orders}
                </p>
                <p className="font-grotesk text-[0.6rem] uppercase tracking-luxe-sm text-graphite/55">
                  Orders
                </p>
              </div>
              <div className="rounded-xl border border-charcoal/8 p-4 text-center">
                <p className="font-display text-2xl text-charcoal">
                  {formatPrice(selected.spend)}
                </p>
                <p className="font-grotesk text-[0.6rem] uppercase tracking-luxe-sm text-graphite/55">
                  Lifetime
                </p>
              </div>
            </div>

            <div>
              <p className="mb-3 font-grotesk text-[0.66rem] uppercase tracking-luxe-sm text-graphite/70">
                Order History
              </p>
              {history.length === 0 ? (
                <p className="font-sans text-sm text-graphite/50">
                  No recorded orders for this collector.
                </p>
              ) : (
                <div className="space-y-2">
                  {history.map((o) => (
                    <div
                      key={o.id}
                      className="flex items-center justify-between rounded-xl border border-charcoal/8 px-4 py-3"
                    >
                      <div>
                        <p className="font-sans text-sm font-medium text-charcoal">
                          {o.id}
                        </p>
                        <p className="font-sans text-xs text-graphite/55">
                          {formatDate(o.date)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusPill status={o.status} />
                        <span className="font-sans text-sm text-charcoal">
                          {formatPrice(o.total)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
