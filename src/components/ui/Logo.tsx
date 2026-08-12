import { cn } from "@/lib/utils";

type LogoProps = {
  /** "full" = emblem + wordmark (default). "mark" = emblem only, for tight spaces. */
  variant?: "full" | "mark";
  /** "dark" = for light backgrounds (navy ink). "light" = for the dark hero/footer. */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Brand mark: a road-peak "M" silhouette inside a badge, topped with a
 * single wayfinding star and a dashed route line — the same dash motif
 * used as a section divider across the site, so the mark and the page
 * language read as one system.
 */
export function Logo({ variant = "full", tone = "dark", className }: LogoProps) {
  const isLight = tone === "light";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 64 64"
        className="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="16"
          fill={isLight ? "rgba(250,248,243,0.06)" : "#0B1220"}
          stroke={isLight ? "#D9AE4E" : "#C6972F"}
          strokeWidth="1.5"
        />
        <path
          d="M14 43 L23 24 L31 39 L39 21 L48 43"
          fill="none"
          stroke={isLight ? "#E8C165" : "#C6972F"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="39" cy="15.5" r="2.4" fill={isLight ? "#E8C165" : "#C6972F"} />
        <line
          x1="11"
          y1="49"
          x2="51"
          y2="49"
          stroke={isLight ? "#E8C165" : "#C6972F"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="0.5 6.5"
          opacity="0.85"
        />
      </svg>

      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[19px] font-semibold tracking-[0.06em] sm:text-[21px]",
              isLight ? "text-paper" : "text-navy-900"
            )}
          >
            MADINA
          </span>
          <span
            className={cn(
              "mt-1 font-mono text-[9px] font-medium uppercase tracking-widest2 sm:text-[10px]",
              isLight ? "text-gold-300" : "text-gold-600"
            )}
          >
            Luxury Car Travels
          </span>
        </span>
      )}
    </div>
  );
}
