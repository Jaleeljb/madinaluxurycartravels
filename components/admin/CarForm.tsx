"use client";

import { useState, FormEvent } from "react";
import type { Car, CarInput } from "@/lib/types";
import ImageDropzone from "./ImageDropzone";

const EMPTY: CarInput = {
  name: "",
  category: "",
  seats: 4,
  bags: 2,
  pricePerDay: 0,
  currency: "₹",
  image: "",
  whatsapp: "",
  description: "",
  featured: false,
  available: true,
  unavailableDates: [],
};

export default function CarForm({
  car,
  onSaved,
  onCancel,
}: {
  car?: Car;
  onSaved: () => void;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<CarInput>(car ? { ...car } : EMPTY);
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof CarInput>(key: K, value: CarInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addBlockedDate() {
    if (!newBlockedDate) return;
    setForm((f) =>
      f.unavailableDates.includes(newBlockedDate)
        ? f
        : { ...f, unavailableDates: [...f.unavailableDates, newBlockedDate].sort() }
    );
    setNewBlockedDate("");
  }

  function removeBlockedDate(date: string) {
    setForm((f) => ({ ...f, unavailableDates: f.unavailableDates.filter((d) => d !== date) }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.image) {
      setError("Please add a car photo.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(car ? `/api/cars/${car.id}` : "/api/cars", {
        method: car ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not save this car.");
        setSaving(false);
        return;
      }
      onSaved();
    } catch {
      setError("Network error. Please try again.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      <Field label="Car photo" full>
        <ImageDropzone value={form.image} onChange={(dataUrl) => update("image", dataUrl)} />
      </Field>

      <Field label="Car name">
        <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="input" placeholder="Toyota Innova Crysta" />
      </Field>
      <Field label="Category">
        <input required value={form.category} onChange={(e) => update("category", e.target.value)} className="input" placeholder="4 Seater" />
      </Field>
      <Field label="Seats">
        <input required type="number" min={1} value={form.seats} onChange={(e) => update("seats", Number(e.target.value))} className="input" />
      </Field>
      <Field label="Bags">
        <input required type="number" min={0} value={form.bags} onChange={(e) => update("bags", Number(e.target.value))} className="input" />
      </Field>
      <Field label="Price per day">
        <input required type="number" min={0} value={form.pricePerDay} onChange={(e) => update("pricePerDay", Number(e.target.value))} className="input" />
      </Field>
      <Field label="Currency">
        <input required value={form.currency} onChange={(e) => update("currency", e.target.value)} className="input" placeholder="₹" />
      </Field>
      <Field label="WhatsApp number (with country code)" full>
        <input required value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className="input" placeholder="916301353952" />
      </Field>
      <Field label="Description" full>
        <textarea
          required
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="input resize-none"
          placeholder="Short description shown on the car's card"
        />
      </Field>

      <label className="flex items-center gap-2.5 text-sm text-ivory/70 sm:col-span-2">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => update("featured", e.target.checked)}
          className="w-4 h-4 accent-black"
        />
        Feature this car
      </label>

      <label className="flex items-center gap-2.5 text-sm text-ivory/70 sm:col-span-2">
        <input
          type="checkbox"
          checked={form.available}
          onChange={(e) => update("available", e.target.checked)}
          className="w-4 h-4 accent-black"
        />
        Currently available for new bookings
      </label>

      <Field label="Blocked / already-booked dates" full>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={newBlockedDate}
            onChange={(e) => setNewBlockedDate(e.target.value)}
            min={new Date().toISOString().slice(0, 10)}
            className="input"
          />
          <button
            type="button"
            onClick={addBlockedDate}
            disabled={!newBlockedDate}
            className="shrink-0 rounded-full border border-card-border px-4 py-2 text-sm text-ivory/70 hover:border-gold/50 transition-colors disabled:opacity-40"
          >
            Add
          </button>
        </div>
        {form.unavailableDates.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {form.unavailableDates.map((date) => (
              <span
                key={date}
                className="inline-flex items-center gap-1.5 text-xs bg-charcoal border border-card-border rounded-full pl-3 pr-2 py-1.5"
              >
                {date}
                <button
                  type="button"
                  onClick={() => removeBlockedDate(date)}
                  aria-label={`Remove ${date}`}
                  className="grid place-items-center w-4 h-4 rounded-full text-muted hover:text-danger transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </Field>

      {error && <p className="sm:col-span-2 text-sm text-danger">{error}</p>}

      <div className="sm:col-span-2 flex items-center gap-3 mt-1">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-gold text-white font-medium px-6 py-2.5 hover:bg-gold-light transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : car ? "Save changes" : "Add car"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-card-border px-6 py-2.5 text-ivory/70 hover:border-gold/50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`text-sm text-ivory/70 flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      {label}
      {children}
    </label>
  );
}
