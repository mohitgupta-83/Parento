"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { ShoppingBag, X } from "lucide-react";

export function RecentPurchasePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentName, setCurrentName] = useState("");

  const showNotification = useCallback(() => {
    const names = siteConfig.recentPurchase.names;
    const randomName = names[Math.floor(Math.random() * names.length)];
    setCurrentName(randomName);
    setIsVisible(true);

    // Auto-hide after 4 seconds
    setTimeout(() => setIsVisible(false), 4000);
  }, []);

  useEffect(() => {
    if (!siteConfig.recentPurchase.enabled) return;

    // Show first notification after 8 seconds
    const initialTimeout = setTimeout(showNotification, 8000);

    // Then show at configured intervals
    const interval = setInterval(showNotification, siteConfig.recentPurchase.intervalMs);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [showNotification]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 md:bottom-8 left-4 z-40 max-w-xs"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-[#F3F4F6] p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FFF4] flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-5 h-5 text-[#4CAF50]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1A2E] truncate">{currentName}</p>
              <p className="text-xs text-[#6B7280]">just purchased the worksheet bundle</p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 p-1 rounded-full hover:bg-[#F9FAFB] transition-colors"
            >
              <X className="w-3.5 h-3.5 text-[#6B7280]" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
