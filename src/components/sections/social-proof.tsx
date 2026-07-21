"use client";

import { siteConfig } from "@/config/site";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { Star, Download, Users, Award } from "lucide-react";

export function SocialProof() {
  const stats = [
    {
      icon: <Download className="w-6 h-6" />,
      value: siteConfig.socialProof.totalDownloads,
      label: "Downloads",
      color: "#FF8A00",
      bg: "#FFF7ED",
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: siteConfig.socialProof.happyParents,
      label: "Happy Parents",
      color: "#4CAF50",
      bg: "#F0FFF4",
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: `${siteConfig.socialProof.rating}/5`,
      label: `${siteConfig.socialProof.totalReviews} Reviews`,
      color: "#F59E0B",
      bg: "#FFFBEB",
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: "15,000+",
      label: "Worksheets",
      color: "#3B82F6",
      bg: "#EFF6FF",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div
                className="relative rounded-2xl p-6 text-center card-hover border border-[#F3F4F6] overflow-hidden"
                style={{ background: stat.bg }}
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3"
                  style={{ background: `${stat.color}15`, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E]">{stat.value}</div>
                <div className="text-sm text-[#6B7280] font-medium mt-1">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
