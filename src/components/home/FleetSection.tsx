"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Car } from "@/lib/db/schema";
import { CarCard } from "@/components/home/CarCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CAR_CATEGORIES } from "@/lib/config";
import { FILTER_FLEET_EVENT } from "@/lib/fleet-filter";
import { cn } from "@/lib/utils";

const FILTERS = ["All", ...CAR_CATEGORIES] as const;
type SortOption = "default" | "price-asc" | "price-desc";

export function FleetSection({ cars }: { cars: Car[] }) {
  const [category, setCategory] = useState<(typeof FILTERS)[number]>("All");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  // The "Choose Your Perfect Ride" category cards dispatch this event so
  // their "Explore Cars" CTA can jump straight to a pre-filtered fleet,
  // without prop-drilling filter state through the whole page tree.
  useEffect(() => {
    function onFilterRequest(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      if (FILTERS.includes(detail as (typeof FILTERS)[number])) {
        setCategory(detail as (typeof FILTERS)[number]);
      }
    }
    window.addEventListener(FILTER_FLEET_EVENT, onFilterRequest);
    return () => window.removeEventListener(FILTER_FLEET_EVENT, onFilterRequest);
  }, []);

  const filtered = useMemo(() => {
    let result = cars;

    if (category !== "All") {
      result = result.filter((c) => c.category === category);
    }
    if (availableOnly) {
      result = result.filter((c) => c.available);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.model.toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.offerPrice - b.offerPrice);
    } else if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.offerPrice - a.offerPrice);
    }

    return result;
  }, [cars, category, availableOnly, query, sort]);

  return (
    <section id="fleet" className="bg-paper py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Our Fleet"
            title="Available Cars, Ready to Book"
            subtitle="Every vehicle below is kept up to date by our team — pricing and availability reflect what you'll be booking."
          />

          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by car or model"
              aria-label="Search cars by name or model"
              className="w-full rounded-full border border-line bg-white py-3 pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted focus:border-gold-500"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setCategory(f)}
                aria-pressed={category === f}
                className={cn(
                  "min-h-[40px] rounded-full border px-4 text-sm font-medium transition-colors",
                  category === f
                    ? "border-navy-900 bg-navy-900 text-paper"
                    : "border-line bg-white text-ink-soft hover:border-navy-900/30"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full border border-line bg-white px-4 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="h-4 w-4 accent-gold-500"
              />
              Available only
            </label>

            <div className="flex min-h-[40px] items-center gap-2 rounded-full border border-line bg-white px-4">
              <SlidersHorizontal className="h-4 w-4 text-ink-muted" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                aria-label="Sort by price"
                className="bg-transparent text-sm text-ink-soft focus:outline-none"
              >
                <option value="default">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-2 rounded-xl2 border border-dashed border-line bg-white py-16 text-center">
            {cars.length === 0 ? (
              <>
                <p className="font-display text-lg text-navy-900">Our fleet is being updated</p>
                <p className="max-w-sm text-sm text-ink-muted">
                  Please check back shortly, or contact us directly and we&apos;ll help you find a car.
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-lg text-navy-900">No cars match your filters</p>
                <p className="max-w-sm text-sm text-ink-muted">
                  Try a different category, clear the search, or turn off &ldquo;Available only&rdquo; to see the full fleet.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
