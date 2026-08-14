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
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeOpacity="0.55" />
      {/* minarets */}
      <path d="M10 34V19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M38 34V19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="16.5" r="2" fill="currentColor" />
      <circle cx="38" cy="16.5" r="2" fill="currentColor" />
      {/* dome */}
      <path
        d="M16 34V25c0-4.4 3.6-8 8-8s8 3.6 8 8v9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* finial + crescent */}
      <path d="M24 17V11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M25.6 11.2a2.3 2.3 0 1 1-2.2-3.7 3 3 0 1 0 2.2 3.7Z"
        fill="currentColor"
      />
      {/* base line */}
      <path d="M7 34h34" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* door */}
      <path
        d="M21.5 34v-4.5a2.5 2.5 0 0 1 5 0V34"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({
  size = 34,
  wordmarkClassName = "font-display text-lg sm:text-xl tracking-wide",
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
          Madina <span className="gold-gradient-text italic">Travels</span>
        </span>
      )}
    </span>
  );
}
