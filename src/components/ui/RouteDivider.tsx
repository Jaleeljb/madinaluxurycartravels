import { cn } from "@/lib/utils";

/** A thin dashed rule evoking a route line. Used to divide sections consistently. */
export function RouteDivider({ className, tone = "muted" }: { className?: string; tone?: "muted" | "gold" }) {
  return (
    <div
      role="presentation"
      className={cn(
        "h-px w-full bg-route-dashed bg-[length:18px_1px]",
        tone === "gold" ? "text-gold-500/70" : "text-navy-900/10",
        className
      )}
    />
  );
}

/** Price/price-point marker used along the QR & fleet sections — a small filled dot. */
export function RouteDot({ className }: { className?: string }) {
  return <span className={cn("inline-block h-1.5 w-1.5 rounded-full bg-gold-500", className)} />;
}
