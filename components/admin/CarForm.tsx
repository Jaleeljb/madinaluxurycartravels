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
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof CarInput>(key: K, value: CarInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
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
        <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="input" placeholder="Toyota Camry" />
      </Field>
      <Field label="Category">
        <input required value={form.category} onChange={(e) => update("category", e.target.value)} className="input" placeholder="Executive Sedan" />
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
        <input required value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className="input" placeholder="919876543210" />
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
          className="w-4 h-4 accent-[#b8860b]"
        />
        Feature this car
      </label>

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
