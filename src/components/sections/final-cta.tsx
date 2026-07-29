"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ShieldCheck, Star, Zap } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";

import { useProductPrice } from "@/hooks/useProductPrice";

export function FinalCTA() {
  const { openCheckout } = useCheckout();
  const { price, originalPrice } = useProductPrice("kids-worksheets");

  return (
    <section id="buy" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#2D2145] to-[#1A1A2E]" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF8A00]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="scale-in">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[#FF8A00] border border-white/10 mb-6 backdrop-blur-sm"
            >
              <Zap className="w-4 h-4" />
              Limited Time Offer
            </motion.div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
              Give Your Child The
              <br />
              <span className="bg-gradient-to-r from-[#FF8A00] to-[#FFA940] bg-clip-text text-transparent">
                Gift of Learning
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
              15,000+ worksheets, lifetime access, and free bonuses — everything your child needs to excel.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF8A00]/30 to-[#FF5500]/20 rounded-3xl blur-xl" />

              <div className="relative glass-dark rounded-3xl p-8 md:p-10 border border-white/10">
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-2xl text-white/40 line-through font-medium">
                      {siteConfig.product.currency}{originalPrice}
                    </span>
                    <span className="bg-[#4CAF50] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {siteConfig.product.discount}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl text-white/60 font-medium">{siteConfig.product.currency}</span>
                    <span className="text-7xl font-extrabold text-white">{price}</span>
                  </div>
                  <p className="text-white/40 text-sm mt-2">One-time payment • Lifetime access</p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {[
                    "15,000+ Printable Worksheets",
                    "19 Subject Categories",
                    "Ages 2–10 Coverage",
                    "Free Bonus Bundle (₹1,146 value)",
                    "Instant Email Delivery",
                    "Lifetime Access & Updates",
                    "30-Day Money Back Guarantee",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#4CAF50]/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#4CAF50]" />
                      </div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  size="xl"
                  fullWidth
                  pulse
                  onClick={openCheckout}
                  icon={<ArrowRight className="w-6 h-6" />}
                  className="text-lg"
                >
                  {siteConfig.hero.cta}
                </Button>

                {/* Security */}
                <div className="flex items-center justify-center gap-2 mt-5 text-white/30">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs">Secured by Razorpay • 256-bit SSL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex items-center justify-center gap-4 text-white/40">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#1A1A2E] bg-gradient-to-br from-[#FF8A00] to-[#FF5500] flex items-center justify-center text-white text-xs font-bold"
                >
                  {["P", "S", "A", "R", "M"][i - 1]}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
                ))}
              </div>
              <span className="text-sm">Loved by {siteConfig.socialProof.happyParents} parents</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
