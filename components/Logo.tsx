import Image from "next/image";

// Source assets: components/Logo.tsx renders the real Madina Car Travels
// logo (an "M" monogram with a car silhouette worked into its base, next
// to the serif "MADINA CAR TRAVELS" wordmark). Files live in /public and
// come in dark-glyph (for light surfaces) and white-glyph (for dark
// surfaces, e.g. the black footer) pairs, each already trimmed tight.
const ICON_RATIO = 240 / 182; // logo-icon-*.png
const FULL_RATIO = 812 / 182; // logo-full-*.png

/** Icon-only mark (the "M" + car glyph, no wordmark) — used in tight
 *  spaces like the admin login/dashboard header. */
export function LogoMark({
  size = 36,
  variant = "dark",
}: {
  size?: number;
  /** "dark" = black glyph, for light backgrounds (default).
   *  "light" = white glyph, for dark backgrounds (e.g. the footer). */
  variant?: "dark" | "light";
}) {
  const src = variant === "dark" ? "/logo-icon-black.png" : "/logo-icon-white.png";
  const width = Math.round(size * ICON_RATIO);
  return (
    <Image
      src={src}
      alt="Madina Car Travels"
      width={width}
      height={size}
      className="shrink-0 object-contain"
      style={{ height: size, width: "auto" }}
      priority
    />
  );
}

/** Full logo lockup — the "M" + car mark, divider, and the "MADINA CAR
 *  TRAVELS" wordmark, all as one fixed piece of brand artwork. This is
 *  the primary logo used in the navbar and footer. */
export default function Logo({
  size = 34,
  showWordmark = true,
  variant = "dark",
  className = "",
}: {
  size?: number;
  /** When false, renders just the icon mark (e.g. a very tight mobile
   *  header) instead of the full icon + wordmark lockup. */
  showWordmark?: boolean;
  variant?: "dark" | "light";
  className?: string;
  /** Accepted for backwards compatibility with older call sites; the
   *  wordmark is now baked into the logo artwork itself so this has no
   *  effect. */
  wordmarkClassName?: string;
}) {
  if (!showWordmark) {
    return <LogoMark size={size} variant={variant} />;
  }

  const src = variant === "dark" ? "/logo-full-black.png" : "/logo-full-white.png";
  const width = Math.round(size * FULL_RATIO);

  return (
    <Image
      src={src}
      alt="Madina Car Travels"
      width={width}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      style={{ height: size, width: "auto" }}
      priority
    />
  );
}
