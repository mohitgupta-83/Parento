"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useExitIntent } from "@/hooks/use-animations";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Gift } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { openCheckout } = useCheckout();

  const handleExitIntent = useCallback(() => {
    if (siteConfig.exitIntent.enabled) {
      setIsOpen(true);
    }
  }, []);

  useExitIntent(handleExitIntent);

  const handleBuy = () => {
    setIsOpen(false);
    openCheckout();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F9FAFB] transition-colors z-10"
            >
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>

            {/* Header */}
            <div className="gradient-cta px-8 py-8 text-center text-white">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold mb-2">{siteConfig.exitIntent.headline}</h3>
              <p className="text-white/80 text-sm">{siteConfig.exitIntent.subheadline}</p>
            </div>

            {/* Body */}
            <div className="px-8 py-6 text-center">
              <div className="flex items-baseline justify-center gap-3 mb-4">
                <span className="text-3xl font-extrabold text-[#1A1A2E]">
                  {siteConfig.product.currency}{siteConfig.product.price}
                </span>
                <span className="text-lg text-[#6B7280] line-through">
                  {siteConfig.product.currency}{siteConfig.product.originalPrice}
                </span>
              </div>

              <Button
                size="lg"
                fullWidth
                onClick={handleBuy}
                icon={<ArrowRight className="w-5 h-5" />}
                className="mb-3"
              >
                {siteConfig.exitIntent.cta}
              </Button>

              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-[#6B7280] hover:text-[#1A1A2E] transition-colors cursor-pointer"
              >
                {siteConfig.exitIntent.dismiss}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
