"use client";

import { motion } from "framer-motion";
import { MessageCircle, Users, Briefcase } from "lucide-react";
import type { Car } from "@/lib/types";
import { waLink, bookingMessage } from "@/lib/whatsapp";

export default function CarCard({ car, index }: { car: Car; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-card-border hover:border-gold/50 card-shadow transition-colors"
    >
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
        <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest bg-black/70 backdrop-blur px-2.5 py-1 rounded-full text-[#6EE7B7] border border-gold/30">
          {car.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold leading-tight">{car.name}</h3>
        </div>

        <p className="mt-2 text-sm text-ivory/60 leading-relaxed line-clamp-2">{car.description}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted font-mono">
          <span className="flex items-center gap-1.5">
            <Users size={13} /> {car.seats} seats
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase size={13} /> {car.bags} bags
          </span>
        </div>
      </div>

      {/* perforated ticket stub divider */}
      <div className="relative ticket-perforation mx-5" />

      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Per day</p>
          <p className="font-display text-2xl font-bold text-gold-light">
            {car.currency}{car.pricePerDay.toLocaleString("en-IN")}
          </p>
        </div>
        <a
          href={waLink(car.whatsapp, bookingMessage(car))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-ink text-sm font-medium px-4 py-2.5 hover:brightness-105 active:scale-[0.97] transition"
        >
          <MessageCircle size={16} />
          Book
        </a>
      </div>
    </motion.article>
  );
}
