import Link from "next/link";
import { Car, CheckCircle2, XCircle, Tag, Plus, Info } from "lucide-react";
import { getFleetStats, listCars } from "@/lib/db/queries";
import { StatCard } from "@/components/admin/StatCard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let stats = { total: 0, available: 0, unavailable: 0, onOffer: 0 };
  let hasDemoData = false;
  let dbError = false;

  try {
    const [fleetStats, cars] = await Promise.all([getFleetStats(), listCars()]);
    stats = fleetStats;
    hasDemoData = cars.some((c) => c.isDemo);
  } catch (err) {
    console.error("Dashboard failed to load stats:", err);
    dbError = true;
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-900">Dashboard</h1>
          <p className="mt-1 text-sm text-ink-muted">An overview of your fleet.</p>
        </div>
        <Link href="/admin/cars/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          Add New Car
        </Link>
      </div>

      {dbError && (
        <div className="mt-6 flex items-start gap-3 rounded-xl2 border border-danger/20 bg-danger/5 p-4 text-sm text-danger">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          Couldn&apos;t connect to the database. Confirm DATABASE_URL is set correctly, then refresh.
        </div>
      )}

      {hasDemoData && !dbError && (
        <div className="mt-6 flex items-start gap-3 rounded-xl2 border border-gold-500/25 bg-gold-500/10 p-4 text-sm text-navy-900">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
          <span>
            You&apos;re viewing sample demo vehicles. Replace them with your real fleet from{" "}
            <Link href="/admin/cars" className="font-semibold underline underline-offset-2">
              Manage Cars
            </Link>
            .
          </span>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Car} label="Total Cars" value={stats.total} />
        <StatCard icon={CheckCircle2} label="Available Cars" value={stats.available} tone="success" />
        <StatCard icon={XCircle} label="Unavailable Cars" value={stats.unavailable} tone="danger" />
        <StatCard icon={Tag} label="Cars on Offer" value={stats.onOffer} tone="gold" />
      </div>

      <div className="mt-8 card p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/cars/new" className="btn-outline">
            <Plus className="h-4 w-4" />
            Add a Car
          </Link>
          <Link href="/admin/cars" className="btn-outline">
            <Car className="h-4 w-4" />
            Manage Cars
          </Link>
          <Link href="/admin/settings" className="btn-outline">
            View Business Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
