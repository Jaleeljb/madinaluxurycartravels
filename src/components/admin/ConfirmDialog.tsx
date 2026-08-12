"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  loading = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className="w-full max-w-sm rounded-xl2 bg-white p-6 shadow-cardHover">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full p-1 text-ink-muted hover:bg-navy-900/5"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <h2 id="confirm-dialog-title" className="mt-4 font-display text-lg font-semibold text-navy-900">
          {title}
        </h2>
        <p className="mt-2 text-sm text-ink-soft">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="btn-outline" disabled={loading}>
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="btn bg-danger text-white hover:bg-danger/90"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
