"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-deep-charcoal px-6 text-center text-ivory">
      <span className="eyebrow mb-6">An unexpected brushstroke</span>
      <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] font-medium leading-none">
        Something went amiss
      </h1>
      <p className="mt-5 max-w-md font-serif text-xl italic text-ivory/70">
        The atelier encountered an error. Please try again — your selection is
        safe.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button variant="gold" size="lg" onClick={reset}>
          Try Again
        </Button>
        <ButtonLink href="/" variant="outline" size="lg" className="text-ivory">
          Return Home
        </ButtonLink>
      </div>
    </div>
  );
}
