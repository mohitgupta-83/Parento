"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/ui/animated-section";

export function HowItWorks() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Super Easy"
          title="How It Works"
          subtitle="Instant access to your 15,000+ printable worksheets in 3 simple steps."
        />

        {/* Process Flow Image Illustration */}
        <AnimatedSection variant="fade-up">
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gradient-to-br from-[#FFF7ED] via-white to-[#F0FFF4] p-3 sm:p-6 text-center">
            <img
              src="/images/product/process-flow.webp"
              alt="Worksheet Download & Print Process Flow"
              className="w-full h-auto object-contain rounded-2xl mx-auto max-h-[420px]"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
