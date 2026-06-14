"use client";

import { FileSpreadsheet, FileText, Sheet } from "lucide-react";
import {
  artworks,
  collections,
  monthlySales,
  trafficData,
} from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { BarChart, LineChart } from "@/components/admin/Charts";
import { PageHeader } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";

export default function AnalyticsAdmin() {
  // aggregate value per collection
  const byCollection = collections.map((c) => {
    const works = artworks.filter((a) => a.collection === c.slug);
    return {
      label: c.name,
      value: works.reduce((s, a) => s + a.price, 0),
      count: works.length,
    };
  });

  const funnel = [
    { label: "Visitors", value: 18420 },
    { label: "Viewed Artwork", value: 9240 },
    { label: "Added to Cart", value: 2160 },
    { label: "Checkout", value: 880 },
    { label: "Purchased", value: 612 },
  ];
  const funnelMax = funnel[0].value;

  function exportCSV() {
    const header = "Month,Revenue,Orders\n";
    const body = monthlySales
      .map((m) => `${m.month},${m.revenue},${m.orders}`)
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "naiart-sales.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        title="Analytics"
        subtitle="Performance, demand, and conversion across the gallery."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" magnetic={false} onClick={exportCSV}>
              <Sheet className="h-4 w-4" /> CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              magnetic={false}
              onClick={() => alert("Generating Excel export…")}
            >
              <FileSpreadsheet className="h-4 w-4" /> Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              magnetic={false}
              onClick={() => alert("Generating PDF report…")}
            >
              <FileText className="h-4 w-4" /> PDF
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-charcoal/8 bg-warm-white p-6 shadow-soft xl:col-span-2">
          <h2 className="mb-5 font-display text-xl text-charcoal">
            Revenue by Month
          </h2>
          <BarChart
            data={monthlySales.map((m) => ({ label: m.month, value: m.revenue }))}
            height={320}
            formatValue={(n) => `$${Math.round(n / 1000)}k`}
          />
        </div>
        <div className="rounded-2xl border border-charcoal/8 bg-warm-white p-6 shadow-soft">
          <h2 className="mb-5 font-display text-xl text-charcoal">
            Conversion Funnel
          </h2>
          <div className="space-y-4">
            {funnel.map((f) => (
              <div key={f.label}>
                <div className="mb-1.5 flex items-center justify-between font-sans text-sm">
                  <span className="text-charcoal">{f.label}</span>
                  <span className="text-graphite/55">
                    {f.value.toLocaleString()}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-charcoal/8">
                  <div
                    className="h-full rounded-full bg-gold-gradient"
                    style={{ width: `${(f.value / funnelMax) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-charcoal/8 bg-warm-white p-6 shadow-soft xl:col-span-2">
          <h2 className="mb-5 font-display text-xl text-charcoal">
            Weekly Traffic
          </h2>
          <LineChart
            data={trafficData.map((d) => ({ label: d.day, value: d.visitors }))}
            formatValue={(n) => `${Math.round(n / 100) / 10}k`}
          />
        </div>
        <div className="rounded-2xl border border-charcoal/8 bg-warm-white p-6 shadow-soft">
          <h2 className="mb-5 font-display text-xl text-charcoal">
            Value by Collection
          </h2>
          <ul className="space-y-4">
            {byCollection.map((c) => {
              const max = Math.max(...byCollection.map((x) => x.value)) || 1;
              return (
                <li key={c.label}>
                  <div className="mb-1.5 flex items-center justify-between font-sans text-sm">
                    <span className="text-charcoal">{c.label}</span>
                    <span className="text-graphite/55">
                      {formatPrice(c.value)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-charcoal/8">
                    <div
                      className="h-full rounded-full bg-gold-gradient"
                      style={{ width: `${(c.value / max) * 100}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
