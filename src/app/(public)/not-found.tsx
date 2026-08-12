import Link from "next/link";
import { CarFront } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-paper px-5 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900/[0.06] text-navy-900">
        <CarFront className="h-6 w-6" />
      </span>
      <h1 className="font-display text-2xl font-semibold text-navy-900">Page Not Found</h1>
      <p className="max-w-sm text-sm text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist, or this car may no longer be listed.
      </p>
      <Link href="/" className="btn-primary mt-2">
        Back to Home
      </Link>
    </div>
  );
}
