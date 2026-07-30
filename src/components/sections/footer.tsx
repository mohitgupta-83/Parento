"use client";

import { siteConfig } from "@/config/site";
import { Heart, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#F9FAFB] border-t border-[#E5E7EB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/logo.png"
                alt={siteConfig.brand.name}
                className="w-9 h-9 object-contain"
              />
              <span className="text-xl font-black text-[#1A1A2E] tracking-tight">{siteConfig.brand.name}</span>
            </div>
            <p className="text-sm text-[#6B7280] leading-relaxed max-w-xs">
              Making learning fun and accessible for every child. 15,000+ printable worksheets for ages 2–10.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[#1A1A2E] mb-4">Quick Links</h3>
            <div className="space-y-2.5">
              {siteConfig.footer.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-[#6B7280] hover:text-[#FF8A00] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[#1A1A2E] mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${siteConfig.brand.email}`}
                className="flex items-center gap-2.5 text-sm text-[#6B7280] hover:text-[#FF8A00] transition-colors"
              >
                <Mail className="w-4 h-4" />
                {siteConfig.brand.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280]">{siteConfig.footer.copyright}</p>
          <p className="text-sm text-[#6B7280] flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-[#E91E63] fill-current" /> for Indian parents
          </p>
        </div>
      </div>
    </footer>
  );
}
