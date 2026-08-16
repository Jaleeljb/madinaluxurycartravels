export function LogoMark({
  size = 36,
  variant = "dark",
}: {
  size?: number;
  /** "dark" = black badge, white glyph (default, for light backgrounds).
   *  "light" = white badge, black glyph (for dark backgrounds, e.g. the footer). */
  variant?: "dark" | "light";
}) {
  const badge = variant === "dark" ? "#000000" : "#ffffff";
  const glyph = variant === "dark" ? "#ffffff" : "#000000";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="12" fill={badge} />
      {/* An "M" whose center stroke drops into a location pin — the mark
          reads as both a monogram and a destination, in one line. */}
      <path
        d="M12 32V15.5L24 26.5L36 15.5"
        stroke={glyph}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M36 15.5V32" stroke={glyph} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M24 26.5V35" stroke={glyph} strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="24" cy="38.5" r="2.6" fill={glyph} />
    </svg>
  );
}

export default function Logo({
  size = 34,
  wordmarkClassName = "font-display text-lg sm:text-xl tracking-tight font-extrabold",
  showWordmark = true,
  variant = "dark",
}: {
  size?: number;
  wordmarkClassName?: string;
  showWordmark?: boolean;
  variant?: "dark" | "light";
}) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="shrink-0">
        <LogoMark size={size} variant={variant} />
      </span>
      {showWordmark && (
        <span className={wordmarkClassName}>
          Madina <span className="gold-gradient-text">Travels</span>
        </span>
      )}
    </span>
  );
}
