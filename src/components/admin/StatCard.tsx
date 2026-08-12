import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  tone?: "default" | "success" | "danger" | "gold";
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            tone === "success" && "bg-success/10 text-success",
            tone === "danger" && "bg-danger/10 text-danger",
            tone === "gold" && "bg-gold-500/15 text-gold-600",
            tone === "default" && "bg-navy-900/[0.06] text-navy-900"
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 text-3xl font-bold tabular text-navy-900">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{label}</p>
    </div>
  );
}
