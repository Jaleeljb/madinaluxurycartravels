"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, AlertCircle } from "lucide-react";
import { LogoMark } from "@/components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center bg-paper px-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-8">
          <span className="text-gold mb-4">
            <LogoMark size={44} />
          </span>
          <h1 className="font-display text-2xl font-semibold text-center">
            Madina Travels <span className="gold-gradient-text">Admin</span>
          </h1>
          <p className="text-sm text-ivory/50 mt-2 text-center">
            Sign in to manage the fleet
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-card-border bg-card p-7 flex flex-col gap-4 card-shadow"
        >
          <label className="text-sm text-ivory/70">
            Password
            <div className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-card-border bg-paper/70 px-3.5 py-3 focus-within:border-gold/60 transition-colors">
              <Lock size={16} className="text-muted" />
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent outline-none flex-1 text-sm text-ivory placeholder:text-muted"
              />
            </div>
          </label>

          {error && (
            <p className="flex items-center gap-2 text-sm text-danger">
              <AlertCircle size={14} /> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-gold text-white font-medium py-3 hover:bg-gold-light transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-center text-xs text-muted mt-6 font-mono">
          Default password: madina2026 — change via ADMIN_PASSWORD env var
        </p>
      </motion.div>
    </main>
  );
}
