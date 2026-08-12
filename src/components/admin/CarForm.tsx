"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Plus, X, UploadCloud, Link as LinkIcon, ImageIcon } from "lucide-react";
import type { Car } from "@/lib/db/schema";
import { CAR_CATEGORIES, type CarCategory } from "@/lib/config";
import { cn } from "@/lib/utils";

type FieldErrors = Record<string, string>;

export function CarForm({ car }: { car?: Car }) {
  const router = useRouter();
  const isEdit = !!car;

  const [name, setName] = useState(car?.name ?? "");
  const [model, setModel] = useState(car?.model ?? "");
  const [category, setCategory] = useState<CarCategory>((car?.category as CarCategory) ?? "Sedan");
  const [description, setDescription] = useState(car?.description ?? "");
  const [specs, setSpecs] = useState<string[]>(car?.specifications ?? []);
  const [specInput, setSpecInput] = useState("");
  const [images, setImages] = useState<string[]>(car?.images ?? []);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [originalPrice, setOriginalPrice] = useState(car?.originalPrice?.toString() ?? "");
  const [offerPrice, setOfferPrice] = useState(car?.offerPrice?.toString() ?? "");
  const [available, setAvailable] = useState(car?.available ?? true);
  const [phoneNumber, setPhoneNumber] = useState(car?.phoneNumber ?? "");
  const [whatsappNumber, setWhatsappNumber] = useState(car?.whatsappNumber ?? "");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addSpec() {
    const value = specInput.trim();
    if (!value) return;
    setSpecs((prev) => [...prev, value]);
    setSpecInput("");
  }

  function removeSpec(index: number) {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  }

  function addImageUrl() {
    const value = imageUrlInput.trim();
    if (!value) return;
    try {
      new URL(value);
    } catch {
      toast.error("That doesn't look like a valid image URL.");
      return;
    }
    setImages((prev) => [...prev, value]);
    setImageUrlInput("");
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleFileUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `Upload failed for ${file.name}`);
        setImages((prev) => [...prev, data.url]);
      }
      toast.success("Image(s) uploaded.");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? `${err.message} — you can paste an image URL below instead.`
          : "Upload failed. You can paste an image URL below instead."
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    const payload = {
      name,
      model,
      category,
      description,
      specifications: specs,
      images,
      originalPrice: Number(originalPrice),
      offerPrice: Number(offerPrice),
      available,
      phoneNumber,
      whatsappNumber,
    };

    // Lightweight client-side pre-checks for fast feedback; the server
    // re-validates everything with the same rules regardless.
    const nextErrors: FieldErrors = {};
    if (!name.trim()) nextErrors.name = "Car name is required.";
    if (!model.trim()) nextErrors.model = "Model is required.";
    if (!originalPrice || Number(originalPrice) <= 0) nextErrors.originalPrice = "Enter a valid original price.";
    if (!offerPrice || Number(offerPrice) <= 0) nextErrors.offerPrice = "Enter a valid offer price.";
    if (Number(offerPrice) > Number(originalPrice)) {
      nextErrors.offerPrice = "Offer price cannot be higher than the original price.";
    }
    if (images.length === 0) nextErrors.images = "Add at least one image.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(isEdit ? `/api/cars/${car!.id}` : "/api/cars", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong. Please try again.");
        return;
      }

      toast.success(isEdit ? "Car updated." : "Car added to your fleet.");
      router.push("/admin/cars");
      router.refresh();
    } catch {
      toast.error("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Basic Details</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Car Name" error={errors.name} required>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Toyota Innova Crysta"
              className={inputClass(errors.name)}
            />
          </Field>
          <Field label="Model" error={errors.model} required>
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. Toyota · SUV"
              className={inputClass(errors.model)}
            />
          </Field>
          <Field label="Category" required>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CarCategory)}
              className={inputClass()}
            >
              {CAR_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Availability">
            <label className="flex min-h-[46px] cursor-pointer items-center gap-2.5 rounded-lg border border-line px-3.5">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="h-4 w-4 accent-gold-500"
              />
              <span className="text-sm text-ink-soft">{available ? "Available" : "Currently Unavailable"}</span>
            </label>
          </Field>
        </div>

        <Field label="Description" className="mt-5">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="A short, honest description of this vehicle..."
            className={inputClass()}
          />
        </Field>

        <Field label="Specifications" className="mt-5">
          <div className="flex flex-wrap gap-2">
            {specs.map((spec, i) => (
              <span
                key={`${spec}-${i}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-navy-900/5 px-3 py-1.5 text-xs font-medium text-navy-900"
              >
                {spec}
                <button type="button" onClick={() => removeSpec(i)} aria-label={`Remove ${spec}`}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="mt-2.5 flex gap-2">
            <input
              value={specInput}
              onChange={(e) => setSpecInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSpec();
                }
              }}
              placeholder="e.g. 5 seater — press Enter to add"
              className={inputClass()}
            />
            <button type="button" onClick={addSpec} className="btn-outline shrink-0">
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </Field>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Pricing</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Original Price (₹ / day)" error={errors.originalPrice} required>
            <input
              type="number"
              min={0}
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="e.g. 4500"
              className={inputClass(errors.originalPrice)}
            />
          </Field>
          <Field label="Offer Price (₹ / day)" error={errors.offerPrice} required>
            <input
              type="number"
              min={0}
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="e.g. 3999"
              className={inputClass(errors.offerPrice)}
            />
          </Field>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Images</h2>
        <p className="mt-1 text-sm text-ink-muted">Add at least one image. The first image is used as the cover photo.</p>

        {errors.images && <p className="mt-2 text-sm text-danger">{errors.images}</p>}

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.map((src, i) => (
              <div key={src + i} className="group relative aspect-square overflow-hidden rounded-lg border border-line">
                <Image src={src} alt={`Car image ${i + 1}`} fill sizes="150px" className="object-cover" />
                {i === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded bg-navy-950/85 px-1.5 py-0.5 text-[10px] font-semibold text-paper">
                    COVER
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  aria-label={`Remove image ${i + 1}`}
                  className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-navy-950/85 text-paper opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn-outline"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />

          <div className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <LinkIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addImageUrl();
                  }
                }}
                placeholder="Or paste an image URL"
                className={cn(inputClass(), "pl-10")}
              />
            </div>
            <button type="button" onClick={addImageUrl} className="btn-outline shrink-0">
              <ImageIcon className="h-4 w-4" />
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Booking Contact (Optional Overrides)</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Leave blank to use the business-wide phone and WhatsApp number configured in Settings.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Phone Number" error={errors.phoneNumber}>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+91 90000 00000"
              className={inputClass(errors.phoneNumber)}
            />
          </Field>
          <Field label="WhatsApp Number" error={errors.whatsappNumber}>
            <input
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="919000000000 (digits only)"
              className={inputClass(errors.whatsappNumber)}
            />
          </Field>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/cars")}
          className="btn-outline"
          disabled={submitting}
        >
          Cancel
        </button>
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Saving..." : isEdit ? "Save Changes" : "Add Car"}
        </button>
      </div>
    </form>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink focus:border-gold-500",
    error ? "border-danger" : "border-line"
  );
}

function Field({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-navy-900">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}
