import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getCarById } from "@/lib/db/queries";
import { CarForm } from "@/components/admin/CarForm";

export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

export default async function EditCarPage({ params }: Props) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const car = await getCarById(id).catch(() => undefined);
  if (!car) notFound();

  return (
    <div>
      <Link
        href="/admin/cars"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-navy-900"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Cars
      </Link>

      <h1 className="mt-3 font-display text-2xl font-semibold text-navy-900">Edit {car.name}</h1>
      <p className="mt-1 text-sm text-ink-muted">Changes are reflected on the public site immediately.</p>

      <div className="mt-6 max-w-3xl">
        <CarForm car={car} />
      </div>
    </div>
  );
}
