"use client";

import { motion, useReducedMotion } from "framer-motion";

type Variant = "fleet" | "how" | "about" | "footer" | "marquee";

const PRESETS: Record<
  Variant,
  {
    orbs: {
      className: string;
      size: number;
      animate: { x?: number[]; y?: number[]; scale?: number[] };
      duration: number;
      delay?: number;
    }[];
  }
> = {
  fleet: {
    orbs: [
      {
        className: "-top-24 -right-16 bg-black/[0.045]",
        size: 460,
        animate: { x: [0, -30, 0], y: [0, 24, 0], scale: [1, 1.06, 1] },
        duration: 16,
      },
      {
        className: "bottom-0 -left-24 bg-black/[0.035]",
        size: 380,
        animate: { x: [0, 26, 0], y: [0, -18, 0], scale: [1, 1.08, 1] },
        duration: 19,
        delay: 1.5,
      },
    ],
  },
  how: {
    orbs: [
      {
        className: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/[0.04]",
        size: 620,
        animate: { scale: [1, 1.1, 1], x: [0, 18, 0] },
        duration: 20,
      },
    ],
  },
  about: {
    orbs: [
      {
        className: "-bottom-24 -right-20 bg-black/[0.05]",
        size: 460,
        animate: { x: [0, -26, 0], y: [0, -22, 0], scale: [1, 1.08, 1] },
        duration: 16,
      },
      {
        className: "-top-16 -left-16 bg-black/[0.04]",
        size: 340,
        animate: { x: [0, 22, 0], y: [0, 18, 0], scale: [1, 1.06, 1] },
        duration: 14,
        delay: 0.8,
      },
      {
        className: "top-1/3 left-1/2 -translate-x-1/2 bg-black/[0.025]",
        size: 300,
        animate: { x: [0, 16, 0], y: [0, -14, 0], scale: [1, 1.1, 1] },
        duration: 12,
        delay: 1.6,
      },
    ],
  },
  footer: {
    orbs: [
      {
        className: "-top-32 -left-24 bg-white/[0.06]",
        size: 480,
        animate: { x: [0, 30, 0], y: [0, 22, 0], scale: [1, 1.08, 1] },
        duration: 18,
      },
      {
        className: "-bottom-24 -right-16 bg-white/[0.05]",
        size: 400,
        animate: { x: [0, -24, 0], y: [0, -18, 0], scale: [1, 1.06, 1] },
        duration: 21,
        delay: 1.2,
      },
    ],
  },
  marquee: {
    orbs: [
      {
        className: "top-1/2 left-1/3 -translate-y-1/2 bg-black/[0.035]",
        size: 340,
        animate: { x: [0, 24, 0], scale: [1, 1.06, 1] },
        duration: 14,
      },
    ],
  },
};

export default function AmbientBackground({ variant }: { variant: Variant }) {
  const prefersReducedMotion = useReducedMotion();
  const preset = PRESETS[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {preset.orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          style={{ width: orb.size, height: orb.size }}
          animate={prefersReducedMotion ? undefined : orb.animate}
          transition={{
            duration: orb.duration,
            delay: orb.delay ?? 0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
