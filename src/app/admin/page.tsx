"use client";

import Image from "next/image";
import { DollarSign, Eye, ShoppingBag, TrendingUp } from "lucide-react";
import {
  artworks,
  monthlySales,
  orders,
  trafficData,
} from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { StatCard } from "@/components/admin/StatCard";
import { BarChart, LineChart } from "@/components/admin/Charts";
import { DataTable, PageHeader, type Column } from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/StatusPill";
import type { Order } from "@/lib/types";

export default function AdminOverview() {
  const totalRevenue = monthlySales.reduce((s, m) => s + m.revenue, 0);
  const totalOrders = monthlySales.reduce((s, m) => s + m.orders, 0);
  const visitors = trafficData.reduce((s, d) => s + d.visitors, 0) * 4;
  const avgOrder = Math.round(totalRevenue / totalOrders);

  const topArtworks = [...artworks]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);

  const recentOrders = orders.slice(0, 4);

  const orderColumns: Column<Order>[] = [
    {
      key: "id",
      header: "Order",
      render: (o) => <span className="font-medium text-charcoal">{o.id}</span>,
    },
    { key: "customer", header: "Customer", render: (o) => o.customer },
    {
      key: "total",
      header: "Total",
      align: "right",
      render: (o) => formatPrice(o.total),
    },
    {
      key: "status",
      header: "Status",
      align: "right",
      render: (o) => <StatusPill status={o.status} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle="A live pulse of the atelier — revenue, demand, and the works collectors love most."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Revenue"
          value={formatPrice(totalRevenue)}
          trend={18.4}
          icon={DollarSign}
          index={0}
        />
        <StatCard
          label="Orders"
          value={String(totalOrders)}
          trend={9.2}
          icon={ShoppingBag}
          index={1}
        />
        <StatCard
          label="Visitors"
          value={visitors.toLocaleString()}
          trend={24.1}
          icon={Eye}
          index={2}
        />
        <StatCard
          label="Avg. Order Value"
          value={formatPrice(avgOrder)}
          trend={-3.1}
          icon={TrendingUp}
          index={3}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-charcoal/8 bg-warm-white p-6 shadow-soft xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl text-charcoal">Monthly Sales</h2>
            <span className="font-grotesk text-[0.66rem] uppercase tracking-luxe-sm text-graphite/55">
              {new Date().getFullYear()}
            </span>
          </div>
          <BarChart
            data={monthlySales.map((m) => ({ label: m.month, value: m.revenue }))}
            formatValue={(n) => `$${Math.round(n / 1000)}k`}
          />
        </div>

        <div className="rounded-2xl border border-charcoal/8 bg-warm-white p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl text-charcoal">Weekly Traffic</h2>
            <span className="font-grotesk text-[0.66rem] uppercase tracking-luxe-sm text-graphite/55">
              Last 7 days
            </span>
          </div>
          <LineChart
            data={trafficData.map((d) => ({ label: d.day, value: d.visitors }))}
            formatValue={(n) => `${Math.round(n / 100) / 10}k`}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-charcoal/8 bg-warm-white p-6 shadow-soft">
          <h2 className="mb-5 font-display text-xl text-charcoal">Top Artwork</h2>
          <ul className="space-y-4">
            {topArtworks.map((a, i) => (
              <li key={a.id} className="flex items-center gap-4">
                <span className="w-4 font-grotesk text-sm text-graphite/40">
                  {i + 1}
                </span>
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={a.images[0]}
                    alt={a.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-sm font-medium text-charcoal">
                    {a.title}
                  </p>
                  <p className="font-sans text-xs text-graphite/55">
                    {formatPrice(a.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-charcoal/8">
                    <div
                      className="h-full rounded-full bg-gold-gradient"
                      style={{ width: `${a.popularity}%` }}
                    />
                  </div>
                  <span className="w-7 font-grotesk text-xs text-graphite/60">
                    {a.popularity}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl text-charcoal">Recent Orders</h2>
          </div>
          <DataTable
            columns={orderColumns}
            rows={recentOrders}
            rowKey={(o) => o.id}
          />
        </div>
      </div>
    </div>
  );
}
