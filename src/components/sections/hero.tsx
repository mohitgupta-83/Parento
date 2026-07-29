"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Star, Download, Users } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";

export function Hero() {
  const { openCheckout } = useCheckout();

  const scrollToPreview = () => {
    document.querySelector("#preview")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative gradient-hero overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF8A00]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4CAF50]/3 rounded-full blur-3xl" />
        {/* Floating shapes */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[20%] w-16 h-16 bg-[#FF8A00]/10 rounded-2xl hidden lg:block"
        />
        <motion.div
          animate={{ y: [15, -15, 15], rotate: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-[15%] w-12 h-12 bg-[#4CAF50]/10 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-60 left-[8%] w-10 h-10 bg-[#3B82F6]/10 rounded-xl hidden lg:block"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#FF8A00] shadow-md border border-[#FFEDD5] mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>{siteConfig.socialProof.totalDownloads} Downloads</span>
              <span className="flex items-center gap-0.5 text-[#F59E0B]">
                <Star className="w-3.5 h-3.5 fill-current" />
                {siteConfig.socialProof.rating}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-[#1A1A2E] sm:text-5xl lg:text-6xl xl:text-[68px] leading-[1.08]">
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
            <p className="mt-6 text-lg md:text-xl text-[#6B7280] leading-relaxed max-w-xl mx-auto lg:mx-0">
              {siteConfig.hero.subheadline}
            </p>

            {/* CTAs */}
            {/* CTA Button */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <Button size="lg" onClick={openCheckout} pulse icon={<ArrowRight className="w-5 h-5" />} className="w-full sm:w-auto text-base sm:text-lg">
                {siteConfig.hero.cta} — {siteConfig.product.currency}{siteConfig.product.price}
              </Button>
            </div>

            {/* Social Proof Mini */}
            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-[#FF8A00] to-[#FF5500] flex items-center justify-center text-white text-xs font-bold shadow-sm"
                    >
                      {["P", "A", "R", "S"][i - 1]}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-[#1A1A2E]">{siteConfig.socialProof.happyParents}</span>
                  <span className="text-[#6B7280]"> happy parents</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side — Hero Visual (Visible on Mobile & Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-8 lg:mt-0 w-full"
          >
            {/* Main Visual Card */}
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF8A00]/20 to-[#3B82F6]/10 rounded-3xl blur-2xl scale-105" />

              {/* Main Card with Real Product Thumbnail */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-4 border border-[#F3F4F6] overflow-hidden group cursor-pointer" onClick={openCheckout}>
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
              {siteConfig.hero.floatingCards.map((card, i) => {
                const positions = [
                  "top-4 -left-16",
                  "top-1/3 -right-14",
                  "bottom-1/3 -left-12",
                  "bottom-8 -right-16",
                ];
                return (
                  <motion.div
                    key={card}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.15 }}
                    className={`absolute ${positions[i]} float float-delay-${i} hidden xl:block`}
                  >
                    <div className="glass rounded-xl px-4 py-2.5 shadow-lg text-sm font-medium text-[#1A1A2E] whitespace-nowrap">
                      {card}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Mobile Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 lg:hidden"
        >
          <div className="relative bg-white rounded-2xl shadow-lg p-5 border border-[#F3F4F6] mx-auto max-w-md">
            <div className="grid grid-cols-3 gap-2">
              {[
                { emoji: "🔤", title: "Alphabet", bg: "#FFF7ED" },
                { emoji: "🔢", title: "Math", bg: "#F0FFF4" },
                { emoji: "🎨", title: "Coloring", bg: "#EFF6FF" },
                { emoji: "✏️", title: "Tracing", bg: "#FFF0F6" },
                { emoji: "📖", title: "Reading", bg: "#F5F3FF" },
                { emoji: "🧠", title: "Brain Games", bg: "#F0FDFA" },
              ].map((item) => (
                <div
                  key={item.title}
                  onClick={openCheckout}
                  className="rounded-xl p-3 text-center cursor-pointer"
                  style={{ background: item.bg }}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <p className="text-[10px] font-semibold mt-1 text-[#6B7280]">{item.title}</p>
                </div>
              ))}
            </div>
            {/* Floating badges on mobile */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {siteConfig.hero.floatingCards.map((card) => (
                <span
                  key={card}
                  className="text-xs bg-[#F9FAFB] rounded-full px-3 py-1.5 text-[#6B7280] font-medium border border-[#E5E7EB]"
                >
                  {card}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
          <path
            d="M0 40C240 80 480 90 720 70C960 50 1200 60 1440 80V100H0V40Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
