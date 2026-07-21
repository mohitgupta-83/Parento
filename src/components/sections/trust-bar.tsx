"use client";

import { siteConfig } from "@/config/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Zap, FileText, Infinity, ShieldCheck, Download } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Infinity: <Infinity className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Download: <Download className="w-5 h-5" />,
};

export function TrustBar() {
  return (
    <AnimatedSection variant="fade-up">
      <section className="py-6 bg-white border-y border-[#F3F4F6]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 md:gap-0 md:justify-between">
            {siteConfig.trustBar.map((item, i) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl"
              >
                <div className="text-[#FF8A00]">{iconMap[item.icon]}</div>
                <span className="text-sm font-semibold text-[#1A1A2E] whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
