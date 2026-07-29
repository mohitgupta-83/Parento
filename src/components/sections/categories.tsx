"use client";

import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sparkles } from "lucide-react";

export function Categories() {
  return (
    <section id="categories" className="py-10 bg-white border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="19 Subject Categories"
          title="What You'll Get"
          subtitle="Everything your child needs in one complete 15,000+ printable worksheet bundle."
        />

        {/* Compact 19-Subject Grid Badge Layout */}
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {siteConfig.categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-gray-50 hover:bg-[#FFF7ED] border border-gray-200/80 hover:border-[#FF8A00] rounded-2xl px-3.5 py-2 flex items-center gap-2 transition-all duration-300 shadow-2xs group cursor-default"
            >
              <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#1A1A2E] group-hover:text-[#FF8A00]">
                {cat.title}
              </span>
            </div>
          ))}
        </div>

        {/* Short Summary Bar */}
        <div className="mt-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#4CAF50] bg-[#F0FFF4] px-4 py-1.5 rounded-full border border-[#BBF7D0]">
            <Sparkles className="w-4 h-4 text-[#4CAF50]" /> Includes 15,000+ High-Resolution Printable PDFs for Ages 2–10
          </span>
        </div>
      </div>
    </section>
  );
}
