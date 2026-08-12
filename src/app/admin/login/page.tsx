"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/ui/Logo";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AdminLoginForm />
    </Suspense>
  );
}

function LoginFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-5 py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-paper/15 border-t-gold-400" />
    </div>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      toast.success("Welcome back.");
      const next = searchParams.get("next") || "/admin";
      router.push(next);
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo tone="light" />
        </div>

        <div className="rounded-xl2 border border-paper/10 bg-navy-900 p-7 shadow-cardHover sm:p-8">
          <h1 className="font-display text-xl font-semibold text-paper">Admin Sign In</h1>
          <p className="mt-1.5 text-sm text-paper/55">Owner access only.</p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-paper/70">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/40" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-paper/15 bg-navy-950 py-3 pl-10 pr-3 text-sm text-paper placeholder:text-paper/30 focus:border-gold-400"
                  placeholder="admin@yourbusiness.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-paper/70">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/40" />
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-paper/15 bg-navy-950 py-3 pl-10 pr-3 text-sm text-paper placeholder:text-paper/30 focus:border-gold-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn-primary mt-2 w-full">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-paper/35">
          Demo credentials are in .env.example — replace before going live.
        </p>
      </div>
    </div>
  );
}
