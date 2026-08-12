import { FileCode2 } from "lucide-react";
import { listCars } from "@/lib/db/queries";
import { CAR_CATEGORIES, CATEGORY_INFO } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  let counts: Record<string, number> = {};
  try {
    const cars = await listCars();
    counts = cars.reduce<Record<string, number>>((acc, car) => {
      acc[car.category] = (acc[car.category] ?? 0) + 1;
      return acc;
    }, {});
  } catch {
    // leave counts empty if the DB isn't reachable — the page still renders
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-900">Categories</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Madina Luxury Car Travels organizes its fleet into four fixed categories.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CAR_CATEGORIES.map((category) => {
          const info = CATEGORY_INFO[category];
          return (
            <div key={category} className="card p-5">
              <div className="flex items-start justify-between">
                <h2 className="font-display text-lg font-semibold text-navy-900">{category}</h2>
                <span className="rounded-full bg-navy-900/[0.06] px-3 py-1 text-xs font-semibold tabular text-navy-900">
                  {counts[category] ?? 0} car{(counts[category] ?? 0) === 1 ? "" : "s"}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink-soft">{info.description}</p>
              <p className="mt-3 font-mono text-xs text-gold-600">{info.priceRange}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-xl2 border border-line bg-white p-5 text-sm text-ink-soft">
        <FileCode2 className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" />
        <p>
          Category names are intentionally fixed across the site so filters, forms, and reports
          stay consistent. To edit a category&apos;s description, indicative price range, or cover
          image, update the <code className="rounded bg-navy-900/[0.06] px-1.5 py-0.5">CATEGORY_INFO</code>{" "}
          object in <code className="rounded bg-navy-900/[0.06] px-1.5 py-0.5">src/lib/config.ts</code>{" "}
          and redeploy.
        </p>
      </div>
    </div>
  );
}
