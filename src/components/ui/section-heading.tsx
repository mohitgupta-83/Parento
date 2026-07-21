"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionBadgeProps {
  children: ReactNode;
  className?: string;
}

export function SectionBadge({ children, className }: SectionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[#FFF7ED] px-4 py-1.5 text-sm font-semibold text-[#FF8A00] border border-[#FFEDD5]",
        className
      )}
    >
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({ badge, title, subtitle, className, align = "center" }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", align === "center" && "text-center", className)}>
      {badge && (
        <SectionBadge>
          <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse" />
          {badge}
        </SectionBadge>
      )}
      <h2
        className={cn(
          "mt-4 text-3xl font-bold tracking-tight text-[#1A1A2E] md:text-4xl lg:text-5xl",
          "leading-[1.15]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-[#6B7280] max-w-2xl md:text-xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
