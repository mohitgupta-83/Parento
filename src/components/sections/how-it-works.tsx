"use client";

import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import {
  ShoppingCart,
  Mail,
  Download,
  Printer,
  GraduationCap,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart className="w-6 h-6" />,
  Mail: <Mail className="w-6 h-6" />,
  Download: <Download className="w-6 h-6" />,
  Printer: <Printer className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
};

const colors = ["#FF8A00", "#4CAF50", "#3B82F6", "#9C27B0", "#E91E63"];

export function HowItWorks() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Super Easy"
          title="How It Works"
          subtitle="Get started in just 5 simple steps. It's that easy!"
        />

        {/* Process Flow Image Illustration */}
        <AnimatedSection variant="fade-up" className="mb-12">
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gradient-to-br from-[#FFF7ED] via-white to-[#F0FFF4] p-4 sm:p-6 text-center">
            <img
              src="/images/product/process-flow.webp"
              alt="Worksheet Download & Print Process Flow"
              className="w-full h-auto object-contain rounded-2xl mx-auto max-h-[380px]"
            />
          </div>
        </AnimatedSection>

        {/* Step Breakdown Cards */}
        <AnimatedSection variant="fade-up">
          <div className="relative max-w-4xl mx-auto">
            {/* Connection Line - Desktop */}
            <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#FF8A00] via-[#4CAF50] to-[#3B82F6] hidden md:block rounded-full" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
              {siteConfig.howItWorks.map((step, i) => (
                <div key={step.step} className="relative flex flex-col items-center text-center">
                  {/* Step Number Circle */}
                  <div
                    className="relative z-10 w-24 h-24 rounded-2xl flex flex-col items-center justify-center shadow-lg border-4 border-white mb-5"
                    style={{
                      background: `linear-gradient(135deg, ${colors[i]}15, ${colors[i]}25)`,
                      color: colors[i],
                    }}
                  >
                    <span className="text-2xl font-extrabold">{step.step}</span>
                    <div className="mt-0.5">{iconMap[step.icon]}</div>
                  </div>

                  {/* Mobile Arrow */}
                  {i < siteConfig.howItWorks.length - 1 && (
                    <div className="md:hidden text-[#E5E7EB] my-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                    </div>
                  )}

                  <h3 className="font-bold text-[#1A1A2E] text-base mb-1">{step.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed max-w-[160px]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
