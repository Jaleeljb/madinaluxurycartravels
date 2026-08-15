"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { waLink, generalEnquiryMessage } from "@/lib/whatsapp";
import { useLanguage } from "./LanguageProvider";

const WHATSAPP_NUMBER = "919876543210";

export default function WhatsAppFloat() {
  const { t } = useLanguage();

  return (
    <motion.a
      href={waLink(WHATSAPP_NUMBER, generalEnquiryMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp.chatAria")}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-ink shadow-[0_8px_30px_rgba(37,211,102,0.35)]"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <MessageCircle size={26} strokeWidth={2} className="relative" />
    </motion.a>
  );
}
