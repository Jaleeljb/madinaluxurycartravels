"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import { UploadCloud, X, ImageOff } from "lucide-react";
import { fileToCompressedDataUrl } from "@/lib/image";

export default function ImageDropzone({
  value,
  onChange,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("That image is larger than 10MB — please choose a smaller one.");
      return;
    }

    setProcessing(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      onChange(dataUrl);
    } catch {
      setError("Could not process that image. Try a different file.");
    } finally {
      setProcessing(false);
    }
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  }

  function onSelect(e: ChangeEvent<HTMLInputElement>) {
    handleFile(e.target.files?.[0]);
    e.target.value = "";
  }

  if (value) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-card-border group">
        <img src={value} alt="Car preview" className="w-full h-44 object-cover" />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-xs font-medium bg-white text-ink px-3 py-1.5 rounded-full"
          >
            Replace
          </button>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-medium bg-danger text-white px-3 py-1.5 rounded-full flex items-center gap-1"
          >
            <X size={12} /> Remove
          </button>
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onSelect} />
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`rounded-xl border-2 border-dashed px-4 py-8 flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition-colors ${
          dragging ? "border-gold bg-gold/5" : "border-card-border hover:border-gold/50"
        }`}
      >
        {processing ? (
          <p className="text-sm text-muted">Processing image…</p>
        ) : (
          <>
            <UploadCloud size={22} className="text-gold" />
            <p className="text-sm text-ivory/70">
              <span className="text-gold font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted">PNG or JPG, up to 10MB</p>
          </>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onSelect} />
      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-danger">
          <ImageOff size={13} /> {error}
        </p>
      )}
    </div>
  );
}
