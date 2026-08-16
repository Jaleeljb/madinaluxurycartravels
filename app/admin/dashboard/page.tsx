"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, LogOut, AlertTriangle, ExternalLink } from "lucide-react";
import type { Car } from "@/lib/types";
import CarForm from "@/components/admin/CarForm";
import { LogoMark } from "@/components/Logo";

export default function AdminDashboard() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  async function loadCars() {
    setLoading(true);
    setNotice("");
    try {
      const res = await fetch("/api/cars", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        setNotice(data.error || "Could not load the fleet.");
        setCars([]);
      } else {
        setCars(data);
      }
    } catch {
      setNotice("Network error while loading the fleet.");
      setCars([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCars();
  }, []);

  async function handleDelete(id: string) {
    setNotice("");
    const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setNotice(data.error || "Could not delete this car.");
    } else {
      setCars((prev) => prev.filter((c) => c.id !== id));
    }
    setDeletingId(null);
  }

  async function handleLogout() {
    await fetch("/api/login", { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-paper px-5 sm:px-8 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span>
              <LogoMark size={38} />
            </span>
            <div>
              <h1 className="font-display text-2xl font-semibold">Fleet dashboard</h1>
              <p className="text-xs text-muted font-mono">{cars.length} vehicles listed</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="flex items-center gap-1.5 text-sm text-ivory/60 hover:text-gold-light transition-colors">
              View site <ExternalLink size={13} />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-ivory/70 hover:text-danger transition-colors border border-card-border rounded-full px-4 py-2"
            >
              <LogOut size={14} /> Log out
            </button>
          </div>
        </div>

        {notice && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-danger/40 bg-danger/10 text-danger text-sm px-4 py-3">
            <AlertTriangle size={15} /> {notice}
          </div>
        )}

        <div className="mb-8">
          {!adding ? (
            <button
              onClick={() => setAdding(true)}
              className="flex items-center gap-2 rounded-full bg-gold text-white font-medium px-5 py-2.5 hover:bg-gold-light transition-colors"
            >
              <Plus size={16} /> Add a car
            </button>
          ) : (
            <div className="rounded-2xl border border-card-border bg-card p-6 card-shadow">
              <h2 className="font-display text-lg font-semibold mb-4">New car</h2>
              <CarForm
                onSaved={() => {
                  setAdding(false);
                  loadCars();
                }}
                onCancel={() => setAdding(false)}
              />
            </div>
          )}
        </div>

        {loading ? (
          <p className="text-sm text-muted font-mono">Loading fleet…</p>
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {cars.map((car) => (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-card-border bg-card overflow-hidden card-shadow"
                >
                  {editingId === car.id ? (
                    <div className="p-6">
                      <h3 className="font-display text-lg font-semibold mb-4">Edit {car.name}</h3>
                      <CarForm
                        car={car}
                        onSaved={() => {
                          setEditingId(null);
                          loadCars();
                        }}
                        onCancel={() => setEditingId(null)}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5">
                      <img src={car.image} alt={car.name} className="w-full sm:w-28 h-32 sm:h-20 object-cover rounded-xl border border-card-border" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display text-lg font-semibold">{car.name}</h3>
                          {car.featured && (
                            <span className="text-[10px] uppercase tracking-widest font-mono px-2 py-0.5 rounded-full bg-gold/15 text-gold-light border border-gold/30">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted font-mono mt-1">
                          {car.category} · {car.seats} seats · {car.bags} bags · {car.currency}{car.pricePerDay.toLocaleString("en-IN")}/day
                        </p>
                        <p className="text-xs text-muted mt-1">WhatsApp: {car.whatsapp}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingId(car.id)}
                          className="flex items-center gap-1.5 text-sm rounded-full border border-card-border px-4 py-2 hover:border-gold/50 hover:text-gold-light transition-colors"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        {deletingId === car.id ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDelete(car.id)}
                              className="text-sm rounded-full bg-danger text-white px-3.5 py-2"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeletingId(null)}
                              className="text-sm rounded-full border border-card-border px-3.5 py-2 text-ivory/70"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeletingId(car.id)}
                            className="flex items-center gap-1.5 text-sm rounded-full border border-card-border px-4 py-2 hover:border-danger/60 hover:text-danger transition-colors"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {cars.length === 0 && (
              <div className="rounded-2xl border border-dashed border-card-border py-16 text-center text-ivory/50 text-sm">
                No cars yet — add your first vehicle above.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
