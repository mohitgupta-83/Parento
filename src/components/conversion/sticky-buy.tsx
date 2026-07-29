"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set a 24-hour countdown from when the user first visits
    const STORAGE_KEY = "parento_countdown_end";
    let endTime = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);

    if (!endTime || endTime < Date.now()) {
      endTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, endTime.toString());
    }

    const tick = () => {
      const diff = Math.max(0, endTime - Date.now());
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

function TimerDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm font-extrabold text-[#FF8A00] tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[8px] text-gray-400 font-medium uppercase leading-none mt-0.5">{label}</span>
    </div>
  );
}

import { useProductPrice } from "@/hooks/useProductPrice";

export function StickyBuyButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { openCheckout } = useCheckout();
  const { hours, minutes, seconds } = useCountdown();
  const { price, originalPrice } = useProductPrice("kids-worksheets");

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Mobile Sticky Bottom CTA with Countdown */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          >
            {/* Countdown strip */}
            <div className="bg-[#1A1A2E] px-4 py-1.5 flex items-center justify-center gap-1.5">
              <Clock className="w-3 h-3 text-[#FF8A00]" />
              <span className="text-[10px] font-bold text-white/80">Offer ends in</span>
              <div className="flex items-center gap-1">
                <TimerDigit value={hours} label="h" />
                <span className="text-xs text-[#FF8A00] font-bold">:</span>
                <TimerDigit value={minutes} label="m" />
                <span className="text-xs text-[#FF8A00] font-bold">:</span>
                <TimerDigit value={seconds} label="s" />
              </div>
            </div>

            {/* Price + Buy Now bar */}
            <div className="bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-[#1A1A2E]">
                      {siteConfig.product.currency}{price}
                    </span>
                    <span className="text-sm text-[#6B7280] line-through">
                      {siteConfig.product.currency}{originalPrice}
                    </span>
                    <span className="text-xs font-bold text-[#4CAF50] bg-[#F0FFF4] px-1.5 py-0.5 rounded">
                      {siteConfig.product.discount}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280]">One-time payment</p>
                </div>
                <Button size="md" onClick={openCheckout} icon={<ArrowRight className="w-4 h-4" />}>
                  Buy Now
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Desktop Sticky Side Button with Countdown */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50 hidden md:block"
          >
            <button
              onClick={openCheckout}
              className="bg-gradient-to-r from-[#FF8A00] to-[#FF5500] text-white pl-5 pr-6 py-4 rounded-2xl shadow-lg shadow-[#FF8A00]/25 hover:shadow-xl hover:brightness-110 transition-all duration-300 flex items-center gap-4 font-semibold cursor-pointer"
            >
              <div className="text-left">
                <div className="text-[10px] opacity-80 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </div>
                <div className="text-lg font-extrabold">{siteConfig.product.currency}{price}</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
