"use client";

import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import {
  Mail,
  Infinity,
  Smartphone,
  Laptop,
  Printer,
  Download,
  CreditCard,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Mail: <Mail className="w-6 h-6" />,
  Infinity: <Infinity className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Laptop: <Laptop className="w-6 h-6" />,
  Printer: <Printer className="w-6 h-6" />,
  Download: <Download className="w-6 h-6" />,
  CreditCard: <CreditCard className="w-6 h-6" />,
};

export function Features() {
  return (
    <section className="section-padding gradient-cool">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Everything Included"
          title="Features You'll Love"
          subtitle="Simple, hassle-free, and designed to give you the best experience."
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto" staggerDelay={0.06}>
          {siteConfig.features.map((feature, i) => (
            <StaggerItem key={feature.title}>
              <div className="group bg-white rounded-2xl p-6 border border-[#F3F4F6] card-hover text-center">
                <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#FF8A00] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#FF8A00] group-hover:text-white transition-all duration-300">
                  {iconMap[feature.icon]}
                </div>
                <h3 className="font-bold text-[#1A1A2E] text-sm mb-1.5">{feature.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{feature.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
