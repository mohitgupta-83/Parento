"use client";

import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import {
  MonitorOff,
  Smile,
  CalendarCheck,
  Printer,
  MapPin,
  FolderOpen,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  MonitorOff: <MonitorOff className="w-7 h-7" />,
  Smile: <Smile className="w-7 h-7" />,
  CalendarCheck: <CalendarCheck className="w-7 h-7" />,
  Printer: <Printer className="w-7 h-7" />,
  MapPin: <MapPin className="w-7 h-7" />,
  FolderOpen: <FolderOpen className="w-7 h-7" />,
};

const colors = ["#FF8A00", "#4CAF50", "#3B82F6", "#E91E63", "#9C27B0", "#00BCD4"];
const bgs = ["#FFF7ED", "#F0FFF4", "#EFF6FF", "#FFF0F6", "#F5F3FF", "#F0FDFA"];

export function Benefits() {
  return (
    <section className="section-padding gradient-warm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Parents Love It"
          title="Benefits That Matter"
          subtitle="Every worksheet is designed with your child's growth in mind."
        />

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {siteConfig.benefits.map((benefit, i) => (
            <StaggerItem key={benefit.title}>
              <div className="group bg-white rounded-2xl p-7 border border-[#F3F4F6] card-hover">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: bgs[i], color: colors[i] }}
                >
                  {iconMap[benefit.icon]}
                </div>
                <h3 className="font-bold text-[#1A1A2E] text-lg mb-2">{benefit.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
