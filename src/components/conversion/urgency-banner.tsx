"use client";

import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(siteConfig.urgency.enabled);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[60] gradient-cta text-white py-2.5 shadow-md"
    >
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-center gap-3">
        <div className="overflow-hidden flex-1 flex justify-center">
          <p className="text-sm font-semibold whitespace-nowrap text-center">
            {siteConfig.urgency.bannerText}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
