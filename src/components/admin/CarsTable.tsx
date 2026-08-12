"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { ImageIcon, Pencil, Plus, Search, Trash2 } from "lucide-react";
import type { Car } from "@/lib/db/schema";
import { formatINR } from "@/lib/utils";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { CAR_CATEGORIES } from "@/lib/config";

export function CarsTable({ initialCars }: { initialCars: Car[] }) {
  const [cars, setCars] = useState(initialCars);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [pendingToggleId, setPendingToggleId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    let result = cars;
    if (category !== "All") result = result.filter((c) => c.category === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q) || c.model.toLowerCase().includes(q));
    }
    return result;
  }, [cars, category, query]);

  async function toggleAvailability(car: Car) {
    setPendingToggleId(car.id);
    const nextAvailable = !car.available;
    try {
      const res = await fetch(`/api/cars/${car.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...car, available: nextAvailable }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update.");

      setCars((prev) => prev.map((c) => (c.id === car.id ? data.car : c)));
      toast.success(`${car.name} marked ${nextAvailable ? "available" : "unavailable"}.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't update availability.");
    } finally {
      setPendingToggleId(null);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/cars/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete.");

      setCars((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      toast.success(`${deleteTarget.name} deleted.`);
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't delete this car.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cars..."
            aria-label="Search cars"
            className="w-full rounded-full border border-line bg-white py-2.5 pl-10 pr-4 text-sm focus:border-gold-500"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
          className="rounded-full border border-line bg-white px-4 py-2.5 text-sm text-ink-soft focus:border-gold-500"
        >
          <option value="All">All Categories</option>
          {CAR_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-xl2 border border-dashed border-line bg-white py-16 text-center">
          <p className="font-display text-lg text-navy-900">
            {cars.length === 0 ? "No cars yet" : "No cars match your search"}
          </p>
          {cars.length === 0 && (
            <Link href="/admin/cars/new" className="btn-primary mt-2">
              <Plus className="h-4 w-4" />
              Add Your First Car
            </Link>
          )}
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {filtered.map((car) => (
            <div
              key={car.id}
              className="flex flex-col gap-4 rounded-xl2 border border-line bg-white p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg bg-navy-900/5 sm:h-16 sm:w-24">
                {car.images[0] ? (
                  <Image src={car.images[0]} alt={car.name} fill sizes="120px" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-ink-muted">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base font-semibold text-navy-900">{car.name}</p>
                <p className="truncate text-sm text-ink-muted">
                  {car.model} · {car.category}
                </p>
              </div>

              <div className="tabular text-sm">
                {car.offerPrice < car.originalPrice && (
                  <span className="mr-2 text-ink-muted line-through">{formatINR(car.originalPrice)}</span>
                )}
                <span className="font-semibold text-navy-900">{formatINR(car.offerPrice)}</span>
              </div>

              <label className="flex items-center gap-2 text-sm text-ink-soft">
                <button
                  type="button"
                  role="switch"
                  aria-checked={car.available}
                  disabled={pendingToggleId === car.id}
                  onClick={() => toggleAvailability(car)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-50 ${
                    car.available ? "bg-success" : "bg-navy-900/15"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      car.available ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                {car.available ? "Available" : "Unavailable"}
              </label>

              <div className="flex shrink-0 gap-2">
                <Link
                  href={`/admin/cars/${car.id}/edit`}
                  aria-label={`Edit ${car.name}`}
                  className="btn-outline min-h-[40px] w-10 justify-center px-0"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  aria-label={`Delete ${car.name}`}
                  onClick={() => setDeleteTarget(car)}
                  className="btn min-h-[40px] w-10 justify-center border border-danger/20 bg-danger/5 px-0 text-danger hover:bg-danger/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Delete ${deleteTarget?.name}?`}
        description="This will permanently remove the car from your fleet. This action can't be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
