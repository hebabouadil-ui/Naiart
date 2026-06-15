"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = ImageProps & { fallbackColor?: string };

/** next/image wrapper that degrades to a tasteful gradient (using the
 *  artwork's dominant colour) instead of a broken-image icon when the
 *  remote source fails to load. Use only with `fill`. */
export function SafeImage({ fallbackColor, className, alt, ...rest }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("absolute inset-0", className)}
        style={{
          background: `radial-gradient(130% 120% at 28% 22%, ${
            fallbackColor ?? "#2A2723"
          } 0%, #1A1815 58%, #0E0D0B 100%)`,
        }}
      >
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_85%,rgba(184,146,74,0.22),transparent_70%)]" />
      </div>
    );
  }

  return (
    <Image
      {...rest}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
