"use client";

import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

export function Categories() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Comprehensive Collection"
          title="What You'll Get"
          subtitle="19 categories of worksheets covering every subject your child needs — from alphabets to brain games."
        />

        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          staggerDelay={0.05}
        >
          {siteConfig.categories.map((cat) => (
            <StaggerItem key={cat.title}>
              <div className="group relative bg-white rounded-2xl p-5 border border-[#F3F4F6] card-hover cursor-pointer overflow-hidden">
                {/* Hover gradient bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${cat.color}08, ${cat.color}15)` }}
                />
                <div className="relative">
                  <span className="text-3xl block mb-3">{cat.icon}</span>
                  <h3
                    className="font-bold text-[#1A1A2E] text-sm group-hover:text-opacity-100 transition-colors"
                    style={{ ["--hover-color" as string]: cat.color }}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                {/* Accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: cat.color }}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Total count callout */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-[#FFF7ED] rounded-full px-6 py-3 border border-[#FFEDD5]">
            <span className="text-2xl font-extrabold text-[#FF8A00]">{siteConfig.product.worksheetCount}</span>
            <span className="text-[#6B7280] font-medium">worksheets across all categories</span>
          </div>
        </div>
      </div>
    </section>
  );
}
