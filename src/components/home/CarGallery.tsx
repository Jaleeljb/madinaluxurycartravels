"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function CarGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl2 border border-line bg-navy-900/5 text-ink-muted">
        <ImageIcon className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl2 border border-line bg-navy-900/5">
        <Image
          src={images[active]}
          alt={`${alt} — photo ${active + 1} of ${images.length}`}
          fill
          priority
          sizes="(min-width: 1024px) 46vw, 92vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1" role="tablist" aria-label="Car photos">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                active === i ? "border-gold-500" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image src={src} alt={`${alt} thumbnail ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
