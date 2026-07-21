"use client";

import { siteConfig } from "@/config/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ShieldCheck, Lock, CreditCard, Check } from "lucide-react";

export function Guarantee() {
  return (
    <section className="section-padding gradient-cool">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="scale-in">
          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#F3F4F6] overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4CAF50]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative text-center">
              {/* Shield Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#F0FFF4] mb-6">
                <ShieldCheck className="w-10 h-10 text-[#4CAF50]" />
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] mb-4">
                {siteConfig.guarantee.title}
              </h2>
              <p className="text-lg text-[#6B7280] leading-relaxed max-w-xl mx-auto mb-8">
                {siteConfig.guarantee.description}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-3">
                {siteConfig.guarantee.badges.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 bg-[#F9FAFB] rounded-full px-4 py-2 border border-[#E5E7EB]"
                  >
                    <Check className="w-4 h-4 text-[#4CAF50]" />
                    <span className="text-sm font-medium text-[#1A1A2E]">{badge}</span>
                  </div>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="mt-8 pt-6 border-t border-[#F3F4F6]">
                <p className="text-xs text-[#6B7280] mb-3 uppercase tracking-wider font-medium">Secure Payment via</p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {siteConfig.paymentMethods.map((method) => (
                    <div
                      key={method}
                      className="flex items-center gap-1.5 bg-white rounded-lg px-3 py-2 border border-[#E5E7EB] shadow-sm"
                    >
                      <Lock className="w-3 h-3 text-[#6B7280]" />
                      <span className="text-xs font-medium text-[#6B7280]">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
