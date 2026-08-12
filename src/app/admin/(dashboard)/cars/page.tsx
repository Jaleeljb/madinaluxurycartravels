import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CarForm } from "@/components/admin/CarForm";

export default function NewCarPage() {
  return (
    <div>
      <Link
        href="/admin/cars"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-navy-900"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Cars
      </Link>

      <h1 className="mt-3 font-display text-2xl font-semibold text-navy-900">Add New Car</h1>
      <p className="mt-1 text-sm text-ink-muted">This car appears publicly as soon as you save it.</p>

      <div className="mt-6 max-w-3xl">
        <CarForm />
      </div>
    </div>
  );
}
