"use client";

import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

export function Audience() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Perfect For"
          title="Who Is It For?"
          subtitle="Whether you're a parent, teacher, or tutor — Parento has something special for everyone."
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
          {siteConfig.audience.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group bg-white rounded-2xl p-6 border border-[#F3F4F6] card-hover text-center">
                <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <h3 className="font-bold text-[#1A1A2E] text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
