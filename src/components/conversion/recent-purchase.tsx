"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";

/* ── 15 hardcoded recent purchase notifications ────────────── */
const recentPurchases = [
  { name: "Priya S.", city: "Mumbai", timeAgo: "2 min ago", product: "Worksheet Bundle" },
  { name: "Amit K.", city: "Delhi", timeAgo: "4 min ago", product: "Worksheet Bundle" },
  { name: "Sneha R.", city: "Bangalore", timeAgo: "5 min ago", product: "Recipe Ebook" },
  { name: "Rahul P.", city: "Pune", timeAgo: "7 min ago", product: "Worksheet Bundle" },
  { name: "Kavita J.", city: "Jaipur", timeAgo: "8 min ago", product: "Recipe Ebook" },
  { name: "Meera K.", city: "Chennai", timeAgo: "11 min ago", product: "Worksheet Bundle" },
  { name: "Anita V.", city: "Hyderabad", timeAgo: "13 min ago", product: "Worksheet Bundle" },
  { name: "Deepak M.", city: "Kolkata", timeAgo: "15 min ago", product: "Recipe Ebook" },
  { name: "Riya S.", city: "Ahmedabad", timeAgo: "18 min ago", product: "Worksheet Bundle" },
  { name: "Sanjay T.", city: "Lucknow", timeAgo: "22 min ago", product: "Worksheet Bundle" },
  { name: "Neha G.", city: "Indore", timeAgo: "25 min ago", product: "Recipe Ebook" },
  { name: "Vikram D.", city: "Nagpur", timeAgo: "28 min ago", product: "Worksheet Bundle" },
  { name: "Pooja M.", city: "Surat", timeAgo: "32 min ago", product: "Recipe Ebook" },
  { name: "Rajesh K.", city: "Patna", timeAgo: "35 min ago", product: "Worksheet Bundle" },
  { name: "Anjali B.", city: "Bhopal", timeAgo: "38 min ago", product: "Worksheet Bundle" },
];

export function RecentPurchasePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const indexRef = useRef(0);
  const [current, setCurrent] = useState(recentPurchases[0]);

  useEffect(() => {
    const showNotification = () => {
      const entry = recentPurchases[indexRef.current % recentPurchases.length];
      setCurrent(entry);
      setIsVisible(true);
      indexRef.current += 1;

      // Auto-hide after 4 seconds
      setTimeout(() => setIsVisible(false), 4000);
    };

    // Show first notification after 8 seconds
    const initialTimeout = setTimeout(showNotification, 8000);

    // Then cycle every 12 seconds
    const interval = setInterval(showNotification, 12000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

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
              <p className="text-sm font-semibold text-[#1A1A2E] truncate">
                {current.name} from {current.city}
              </p>
              <p className="text-xs text-[#6B7280]">
                purchased {current.product} · {current.timeAgo}
              </p>
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
