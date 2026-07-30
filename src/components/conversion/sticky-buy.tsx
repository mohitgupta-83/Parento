"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ShoppingCart } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";
import { useProductPrice } from "@/hooks/useProductPrice";

function use27MinTimer() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 27, seconds: 36 });

  useEffect(() => {
    const STORAGE_KEY = "parento_timer_27m";
    let endTime = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    const DURATION_MS = (27 * 60 + 36) * 1000; // 27 mins 36 secs

    if (!endTime || endTime < Date.now()) {
      endTime = Date.now() + DURATION_MS;
      localStorage.setItem(STORAGE_KEY, endTime.toString());
    }

    const tick = () => {
      const diff = Math.max(0, endTime - Date.now());
      if (diff === 0) {
        // Reset timer if expired
        const newEnd = Date.now() + DURATION_MS;
        localStorage.setItem(STORAGE_KEY, newEnd.toString());
        setTimeLeft({ minutes: 27, seconds: 36 });
      } else {
        setTimeLeft({
          minutes: Math.floor(diff / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

export function StickyBuyButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { openCheckout } = useCheckout();
  const { minutes, seconds } = use27MinTimer();
  const { price, originalPrice } = useProductPrice("kids-worksheets");

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Mobile Sticky Bottom Bar (Full horizontal width with large timer) */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t-2 border-[#FF8A00] shadow-[0_-8px_30px_rgba(0,0,0,0.18)]"
          >
            {/* Top Timer Bar */}
            <div className="bg-[#1A1A2E] px-4 py-1.5 flex items-center justify-between">
              <span className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF8A00] animate-pulse" />
                <span>Special Offer Ends In:</span>
              </span>

              {/* Large Timer Badge */}
              <div className="flex items-center gap-1 bg-[#FFF7ED] text-[#FF8A00] px-2.5 py-0.5 rounded-lg border border-[#FFEDD5] font-mono font-black text-sm sm:text-base">
                <span>{String(minutes).padStart(2, "0")}m</span>
                <span>:</span>
                <span>{String(seconds).padStart(2, "0")}s</span>
              </div>
            </div>

            {/* Price + Full Width Action Button */}
            <div className="p-3 bg-white space-y-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#FF8A00]">
                    {siteConfig.product.currency}{price}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {siteConfig.product.currency}{originalPrice}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-[#4CAF50] bg-[#F0FFF4] px-2.5 py-0.5 rounded-full border border-green-200">
                  90% OFF • Instant Access
                </span>
              </div>

              <Button
                size="xl"
                fullWidth
                pulse
                onClick={openCheckout}
                icon={<ShoppingCart className="w-5 h-5" />}
                className="py-3.5 text-base font-extrabold shadow-lg shadow-[#FF8A00]/25"
              >
                Get Instant Access — {siteConfig.product.currency}{price}
              </Button>
            </div>
          </motion.div>

          {/* Desktop Sticky Side Button with Large Countdown */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50 hidden md:block"
          >
            <button
              onClick={openCheckout}
              className="bg-gradient-to-r from-[#FF8A00] to-[#FF5500] text-white pl-5 pr-6 py-4 rounded-2xl shadow-xl shadow-[#FF8A00]/30 hover:shadow-2xl hover:brightness-110 transition-all duration-300 flex items-center gap-4 font-semibold cursor-pointer border-2 border-white/20"
            >
              <div className="text-left">
                <div className="text-xs font-bold text-white/90 flex items-center gap-1.5 mb-0.5">
                  <Clock className="w-4 h-4 text-amber-200 animate-pulse" />
                  <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-sm font-extrabold">
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                  </span>
                </div>
                <div className="text-xl font-black">
                  {siteConfig.product.currency}{price}
                </div>
              </div>
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
