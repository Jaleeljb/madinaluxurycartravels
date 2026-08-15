export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="12" fill="currentColor" />
      <path
        d="M13 33V16h4.2l6.8 9.6L30.8 16H35v17h-4.4V22.8l-6.6 9.3-6.6-9.3V33Z"
        fill="var(--paper)"
      />
    </svg>
  );
}

export default function Logo({
  size = 34,
  wordmarkClassName = "font-display text-lg sm:text-xl tracking-tight font-extrabold",
  showWordmark = true,
}: {
  size?: number;
  wordmarkClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="text-gold shrink-0">
        <LogoMark size={size} />
      </span>
      {showWordmark && (
        <span className={wordmarkClassName}>
          Madina <span className="gold-gradient-text">Travels</span>
        </span>
      )}
    </span>
  );
}
