"use client";

import { siteConfig } from "@/config/site";
import { Gift, CheckCircle2 } from "lucide-react";

export function Bonuses() {
  return (
    <section className="py-10 bg-gradient-to-br from-[#FFF7ED] via-white to-[#F0FFF4] border-y border-gray-100 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Compact Header & Total Value Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF8A00] bg-[#FFF7ED] px-3 py-1 rounded-full border border-[#FFEDD5] mb-1">
              <Gift className="w-3.5 h-3.5 text-[#FF8A00]" /> 5 FREE Bonuses Included
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A2E]">
              Plus, Get These 5 Bonuses FREE
            </h2>
          </div>
          <div className="bg-[#4CAF50] text-white px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-2 shadow-sm whitespace-nowrap">
            <CheckCircle2 className="w-4 h-4" /> Total Value: ₹1,145 FREE Today
          </div>
        </div>

        {/* Compact 5-Bonus Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {siteConfig.bonuses.map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-col items-center text-center hover:border-[#FF8A00] transition-colors"
            >
              <span className="text-2xl mb-1">{b.icon}</span>
              <h4 className="font-bold text-[#1A1A2E] text-xs leading-tight mb-1">{b.title}</h4>
              <span className="text-[10px] text-gray-400 line-through mb-1">{b.value}</span>
              <span className="bg-[#F0FFF4] text-[#4CAF50] font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-[#BBF7D0]">
                FREE
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
