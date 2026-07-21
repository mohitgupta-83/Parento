"use client";

import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { Gift } from "lucide-react";

export function Bonuses() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8A00]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4CAF50]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="🎁 Free Bonuses"
          title="Plus, You Get These Bonuses FREE"
          subtitle="We're including these premium bonus materials at no extra cost when you order today."
        />

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.1}>
          {siteConfig.bonuses.map((bonus) => (
            <StaggerItem key={bonus.title}>
              <div className="group relative bg-gradient-to-br from-[#FFF7ED] to-white rounded-2xl p-6 border border-[#FFEDD5] card-hover overflow-hidden">
                {/* Free badge */}
                <div className="absolute top-4 right-4 bg-[#4CAF50] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  FREE
                </div>
                <span className="text-4xl block mb-4">{bonus.icon}</span>
                <h3 className="font-bold text-[#1A1A2E] text-lg mb-2">{bonus.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-3">{bonus.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#6B7280] line-through">{bonus.value}</span>
                  <span className="text-sm font-bold text-[#4CAF50]">FREE</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Total value callout */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-[#F0FFF4] rounded-2xl px-8 py-4 border border-[#BBF7D0]">
            <Gift className="w-6 h-6 text-[#4CAF50]" />
            <div className="text-left">
              <span className="text-sm text-[#6B7280] block">Total bonus value</span>
              <span className="text-xl font-extrabold text-[#4CAF50]">₹1,146 FREE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
