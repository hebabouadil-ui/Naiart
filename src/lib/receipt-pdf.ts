import { jsPDF } from "jspdf";
import { formatPrice } from "@/lib/utils";

export type ReceiptLine = {
  title: string;
  price: number;
  quantity: number;
  dimensions?: string;
  image?: string;
};

export type ReceiptOrder = {
  id: string;
  paymentRef?: string;
  date: string;
  name?: string;
  email?: string;
  shipping?: {
    line1?: string;
    line2?: string;
    city?: string;
    postal?: string;
    country?: string;
  };
  items: ReceiptLine[];
  subtotal: number;
  discount: number;
  promo?: string | null;
  shippingFee: number;
  total: number;
};

const BRAND = {
  name: "Naiart",
  full: "Rabia Nainia",
  email: "studio@naiart.com",
};

/** Palette (RGB) tuned to the site's luxury theme. */
const GOLD: [number, number, number] = [184, 146, 74];
const INK: [number, number, number] = [26, 24, 21];
const MUTED: [number, number, number] = [120, 112, 100];
const HAIR: [number, number, number] = [222, 216, 206];

/**
 * Loads a remote image and returns a square JPEG data URL plus its natural
 * aspect, so it can be drawn into the PDF without distortion. Resolves to null
 * if the image can't be fetched (CORS, 404, …) so the receipt still renders.
 */
function loadImage(
  src: string,
): Promise<{ data: string; ratio: number } | null> {
  return new Promise((resolve) => {
    if (!src || src.startsWith("blob:")) return resolve(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const w = (canvas.width = img.naturalWidth || 400);
        const h = (canvas.height = img.naturalHeight || 500);
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0, w, h);
        resolve({ data: canvas.toDataURL("image/jpeg", 0.82), ratio: w / h });
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function formatDate(iso: string) {
  return new Date(iso || Date.now()).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/**
 * Builds and downloads a professional, branded PDF receipt that embeds each
 * product's image. Returns once the file has been handed to the browser.
 */
export async function downloadReceiptPdf(order: ReceiptOrder) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentW = pageW - margin * 2;

  // Pre-load all product images in parallel.
  const images = await Promise.all(
    order.items.map((it) => (it.image ? loadImage(it.image) : Promise.resolve(null))),
  );

  // ── Header band ──────────────────────────────────────────────
  doc.setFillColor(...INK);
  doc.rect(0, 0, pageW, 42, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("times", "bold");
  doc.setFontSize(30);
  doc.text(BRAND.name, margin, 24);

  doc.setFont("times", "italic");
  doc.setFontSize(10);
  doc.setTextColor(...GOLD);
  doc.text("Original Artwork · Certificate of Acquisition", margin, 32);

  // Order block (right aligned)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(190, 184, 174);
  doc.text("RECEIPT", pageW - margin, 18, { align: "right" });
  doc.setFont("times", "bold");
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text(order.id, pageW - margin, 26, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(190, 184, 174);
  doc.text(formatDate(order.date), pageW - margin, 32, { align: "right" });

  // Gold rule under header
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.line(0, 42, pageW, 42);

  let y = 56;

  // ── Parties ──────────────────────────────────────────────────
  const colW = contentW / 2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...GOLD);
  doc.text("BILLED TO", margin, y);
  doc.text("SHIPPED TO", margin + colW, y);

  doc.setFont("times", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(...INK);
  doc.text(order.name || "Valued Collector", margin, y + 6);
  if (order.email) {
    doc.setTextColor(...MUTED);
    doc.text(order.email, margin, y + 11);
  }

  const ship = order.shipping;
  const shipLines = ship
    ? [
        ship.line1,
        ship.line2,
        [ship.postal, ship.city].filter(Boolean).join(" "),
        ship.country,
      ].filter(Boolean)
    : ["On file with your account"];
  doc.setTextColor(...MUTED);
  shipLines.forEach((line, i) => {
    doc.text(String(line), margin + colW, y + 6 + i * 5);
  });

  y += 11 + Math.max(0, shipLines.length - 1) * 5 + 12;

  // ── Line items header ────────────────────────────────────────
  doc.setDrawColor(...HAIR);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageW - margin, y);
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...GOLD);
  doc.text("ITEM", margin + 24, y);
  doc.text("AMOUNT", pageW - margin, y, { align: "right" });
  y += 5;
  doc.setDrawColor(...HAIR);
  doc.line(margin, y, pageW - margin, y);
  y += 6;

  // ── Line items ───────────────────────────────────────────────
  const thumb = 18; // mm
  order.items.forEach((it, i) => {
    const rowTop = y;
    const img = images[i];
    // thumbnail
    if (img) {
      try {
        doc.addImage(img.data, "JPEG", margin, rowTop, thumb, thumb);
      } catch {
        drawThumbPlaceholder(doc, margin, rowTop, thumb);
      }
    } else {
      drawThumbPlaceholder(doc, margin, rowTop, thumb);
    }

    const textX = margin + thumb + 6;
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...INK);
    doc.text(it.title, textX, rowTop + 5);

    doc.setFont("times", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    const meta = [it.dimensions, it.quantity > 1 ? `Quantity ${it.quantity}` : null]
      .filter(Boolean)
      .join("  ·  ");
    if (meta) doc.text(meta, textX, rowTop + 11);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...GOLD);
    doc.text("Hand-signed certificate of authenticity included", textX, rowTop + 16);

    doc.setFont("times", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...INK);
    doc.text(formatPrice(it.price * it.quantity), pageW - margin, rowTop + 5, {
      align: "right",
    });

    y = rowTop + thumb + 6;
    doc.setDrawColor(...HAIR);
    doc.setLineWidth(0.2);
    doc.line(margin, y - 3, pageW - margin, y - 3);
  });

  // ── Totals ───────────────────────────────────────────────────
  y += 2;
  const labelX = pageW - margin - 60;
  const valueX = pageW - margin;
  const totalRow = (label: string, value: string, gold = false) => {
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...(gold ? GOLD : MUTED));
    doc.text(label, labelX, y);
    doc.setTextColor(...(gold ? GOLD : INK));
    doc.text(value, valueX, y, { align: "right" });
    y += 6.5;
  };
  totalRow("Subtotal", formatPrice(order.subtotal));
  if (order.discount > 0) {
    totalRow(
      `Discount${order.promo ? ` (${order.promo})` : ""}`,
      `− ${formatPrice(order.discount)}`,
      true,
    );
  }
  totalRow("Shipping & Insurance", formatPrice(order.shippingFee));

  // grand total
  y += 1;
  doc.setDrawColor(...INK);
  doc.setLineWidth(0.4);
  doc.line(labelX, y - 2, valueX, y - 2);
  y += 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("TOTAL PAID", labelX, y);
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...INK);
  doc.text(formatPrice(order.total), valueX, y + 1, { align: "right" });

  // ── Footer ───────────────────────────────────────────────────
  const footY = doc.internal.pageSize.getHeight() - 26;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.line(margin, footY, pageW - margin, footY);

  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(...INK);
  doc.text(
    "Thank you for collecting an original work.",
    margin,
    footY + 7,
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  const refLine =
    order.paymentRef && order.paymentRef !== "demo"
      ? `Payment reference · ${order.paymentRef}`
      : "Demonstration order";
  doc.text(
    `${BRAND.full} · ${BRAND.email}   —   ${refLine}`,
    margin,
    footY + 13,
  );
  doc.text(
    "Each acquisition ships insured by white-glove courier with a signed certificate of authenticity.",
    margin,
    footY + 18,
  );

  doc.save(`Naiart-Receipt-${order.id}.pdf`);
}

/** A small gold gradient-ish placeholder used when an image can't be embedded. */
function drawThumbPlaceholder(
  doc: jsPDF,
  x: number,
  yTop: number,
  size: number,
) {
  doc.setFillColor(42, 39, 35);
  doc.rect(x, yTop, size, size, "F");
  doc.setFillColor(...GOLD);
  doc.circle(x + size / 2, yTop + size / 2, size / 6, "F");
}
