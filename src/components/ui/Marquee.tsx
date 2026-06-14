"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  separator?: string;
}) {
  const content = (
    <div className="flex shrink-0 items-center gap-10 px-5">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span>{item}</span>
          <span className="text-gold">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={cn(
        "flex w-full overflow-hidden whitespace-nowrap",
        className,
      )}
    >
      <div className="flex animate-marquee">
        {content}
        {content}
      </div>
    </div>
  );
}
