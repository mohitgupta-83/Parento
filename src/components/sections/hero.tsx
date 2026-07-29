"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Star,
  ShieldCheck,
  Zap,
  Download,
  Users,
  ArrowRight,
} from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";
import { useProductPrice } from "@/hooks/useProductPrice";

export function Hero() {
  const { openCheckout } = useCheckout();
  const { price } = useProductPrice("kids-worksheets");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF7ED] via-white to-[#F0FFF4] pt-6 pb-14 lg:pt-14 lg:pb-24">
      {/* Background Shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF8A00]/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#4CAF50]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#3B82F6]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-[#FF8A00] shadow-md border border-[#FFEDD5] mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>{siteConfig.socialProof.totalDownloads} Downloads</span>
              <span className="flex items-center gap-0.5 text-[#F59E0B]">
                <Star className="w-3.5 h-3.5 fill-current" />
                {siteConfig.socialProof.rating}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[66px] font-extrabold tracking-tight text-[#1A1A2E] leading-[1.12]">
              <span className="block">Turn Screen Time</span>
              <span className="block mt-1">
                Into{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#FF8A00] to-[#FF5500] bg-clip-text text-transparent">
                    Learning Time
                  </span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                    className="absolute bottom-1 left-0 h-3 bg-[#FF8A00]/10 rounded-full -z-0"
                  />
                </span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-3 sm:mt-5 text-sm sm:text-lg lg:text-xl text-[#6B7280] leading-relaxed max-w-xl">
              {siteConfig.hero.subheadline}
            </p>

            {/* Mobile Product Visual Image Box (Visible ONLY on Mobile & Tablet, placed BEFORE CTA) */}
            <div className="w-full max-w-md my-5 lg:hidden">
              <div className="relative bg-white rounded-3xl shadow-xl p-3 border border-[#F3F4F6] overflow-hidden cursor-pointer" onClick={openCheckout}>
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/images/product/product-main.webp"
                    alt={siteConfig.product.name}
                    className="w-full h-auto object-cover rounded-2xl shadow-xs"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#FF8A00] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                    Instant PDF Bundle
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-[#4CAF50] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                    {siteConfig.product.discount}
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between px-2 pt-2 border-t border-[#F3F4F6] text-xs">
                  <div className="flex items-center gap-1">
                    <Download className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span className="font-bold text-[#1A1A2E]">15,000+</span> Worksheets
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#4CAF50]" />
                    <span className="font-bold text-[#1A1A2E]">{siteConfig.socialProof.happyParents}</span> Parents
                  </div>
                </div>
              </div>
            </div>

            {/* Primary CTA Button */}
            <div className="w-full sm:w-auto mt-2 sm:mt-6">
              <Button
                size="xl"
                onClick={openCheckout}
                pulse
                icon={<ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />}
                className="w-full sm:w-auto text-base sm:text-lg py-4 px-8 shadow-xl"
              >
                {siteConfig.hero.cta} — {siteConfig.product.currency}{price}
              </Button>
            </div>

            {/* Social Proof Mini */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-[#FF8A00] to-[#FF5500] flex items-center justify-center text-white text-[11px] font-bold shadow-xs"
                    >
                      {["P", "A", "R", "S"][i - 1]}
                    </div>
                  ))}
                </div>
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-[#1A1A2E]">{siteConfig.socialProof.happyParents}</span>
                  <span className="text-[#6B7280]"> happy parents</span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-3 text-xs text-[#6B7280] border-l border-gray-200 pl-4 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#4CAF50]" /> Money-Back Guarantee
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-[#3B82F6]" /> Instant PDF Download
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Side — Desktop Hero Visual (Visible ONLY on Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8A00]/20 to-[#3B82F6]/10 rounded-3xl blur-2xl scale-105" />

            {/* Main Card with Real Product Thumbnail */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-5 border border-[#F3F4F6] overflow-hidden group cursor-pointer" onClick={openCheckout}>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/images/product/product-main.webp"
                  alt={siteConfig.product.name}
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#FF8A00] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Instant PDF Bundle
                </div>
                <div className="absolute top-3 right-3 bg-[#4CAF50] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {siteConfig.product.discount}
                </div>
              </div>

              {/* Stats bar */}
              <div className="mt-4 flex items-center justify-between px-2 py-2 pt-3 border-t border-[#F3F4F6]">
                <div className="flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-[#FF8A00]" />
                  <span className="text-sm font-bold text-[#1A1A2E]">15,000+</span>
                  <span className="text-xs text-[#6B7280]">worksheets</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#4CAF50]" />
                  <span className="text-sm font-bold text-[#1A1A2E]">{siteConfig.socialProof.happyParents}</span>
                  <span className="text-xs text-[#6B7280]">parents</span>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            {siteConfig.hero.floatingCards.map((text, i) => {
              const positions = [
                "top-4 -left-12",
                "top-1/3 -right-10",
                "bottom-6 left-6",
                "bottom-12 -right-8",
              ];
              return (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.2 }}
                  className={`absolute ${positions[i % positions.length]} bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-white/60 flex items-center gap-2 pointer-events-none z-10`}
                >
                  <span className="text-xs font-bold text-[#1A1A2E] whitespace-nowrap">
                    {text}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
