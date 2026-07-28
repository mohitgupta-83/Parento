"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";

const navLinks = [
  { label: "Categories", href: "#categories" },
  { label: "Preview", href: "#preview" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { openCheckout } = useCheckout();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleBuy = () => {
    setIsMobileOpen(false);
    openCheckout();
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass shadow-md py-3"
            : "bg-white/80 backdrop-blur-md border-b border-gray-100 py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <img
              src="/logo.png"
              alt={siteConfig.brand.name}
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-xl sm:text-2xl font-black text-[#1A1A2E] tracking-tight">
              {siteConfig.brand.name}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-[15px] font-medium text-[#6B7280] hover:text-[#FF8A00] transition-colors cursor-pointer relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8A00] transition-all duration-300 group-hover:w-full rounded-full" />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm text-[#6B7280] mr-2">
              <span className="text-[#FF8A00] font-bold text-lg">{siteConfig.product.currency}{siteConfig.product.price}</span>
              <span className="line-through text-xs">{siteConfig.product.currency}{siteConfig.product.originalPrice}</span>
            </div>
            <Button size="sm" onClick={handleBuy} icon={<ShoppingCart className="w-4 h-4" />}>
              Buy Now
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-[#F9FAFB] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
            <motion.nav
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="relative mt-[64px] mx-4 rounded-2xl bg-white shadow-xl border border-[#E5E7EB] p-6 z-10"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left px-4 py-3 rounded-xl text-[#1A1A2E] font-medium hover:bg-[#FFF7ED] hover:text-[#FF8A00] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <hr className="my-2 border-[#E5E7EB]" />
                <Button size="lg" fullWidth onClick={handleBuy} icon={<ShoppingCart className="w-5 h-5" />}>
                  Buy Now — {siteConfig.product.currency}{siteConfig.product.price}
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
