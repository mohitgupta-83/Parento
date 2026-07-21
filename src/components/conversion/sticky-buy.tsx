"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";

export function StickyBuyButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { openCheckout } = useCheckout();

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
          {/* Mobile Sticky Bottom CTA */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          >
            <div className="glass border-t border-[#E5E7EB] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-[#1A1A2E]">
                      {siteConfig.product.currency}{siteConfig.product.price}
                    </span>
                    <span className="text-sm text-[#6B7280] line-through">
                      {siteConfig.product.currency}{siteConfig.product.originalPrice}
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

          {/* Desktop Sticky Side Button */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50 hidden md:block"
          >
            <button
              onClick={openCheckout}
              className="gradient-cta text-white px-6 py-4 rounded-2xl shadow-lg shadow-[#FF8A00]/25 hover:shadow-xl hover:shadow-[#FF8A00]/30 hover:brightness-110 transition-all duration-300 flex items-center gap-3 font-semibold pulse-glow cursor-pointer"
            >
              <div className="text-left">
                <div className="text-xs opacity-80">Only</div>
                <div className="text-lg font-extrabold">{siteConfig.product.currency}{siteConfig.product.price}</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
