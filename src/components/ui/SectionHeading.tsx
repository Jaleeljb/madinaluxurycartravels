import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", tone === "light" && "text-gold-300")}>
        <span className={cn("h-px w-8", tone === "light" ? "bg-gold-400" : "bg-gold-500")} />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 text-[1.9rem] font-semibold leading-tight sm:text-[2.3rem]",
          tone === "light" ? "text-paper" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-[15px] leading-relaxed sm:text-base", tone === "light" ? "text-paper/70" : "text-ink-soft")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
