"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#FAF8F3] px-5 text-center font-sans">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B3413A]/10 text-[#B3413A]">
          <AlertTriangle className="h-6 w-6" />
        </span>
        <h1 className="text-2xl font-semibold text-[#14181F]">Something went wrong</h1>
        <p className="max-w-sm text-sm text-[#767F91]">
          An unexpected error occurred. Please try again — if this keeps happening, check your
          server logs for details.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-2 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#C6972F] px-6 text-sm font-semibold text-[#0B1220]"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
