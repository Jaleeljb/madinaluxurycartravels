import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function AvailabilityBadge({ available, className }: { available: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tabular",
        available ? "bg-success/10 text-success" : "bg-danger/10 text-danger",
        className
      )}
    >
      {available ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
      {available ? "Available" : "Currently Unavailable"}
    </span>
  );
}
