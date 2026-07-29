"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CheckoutProvider, useCheckout } from "@/context/CheckoutContext";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  CheckCircle2,
  ShieldCheck,
  Star,
  Lock,
  Award,
  BookOpen,
  Utensils,
  CalendarDays,
  Smartphone,
  Infinity,
  Users,
  Baby,
  ChefHat,
  Heart,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Conversion overlays (lazy) ────────────────────────────── */
const UrgencyBanner = dynamic(() => import("@/components/conversion/urgency-banner").then(m => ({ default: m.UrgencyBanner })));
const ExitIntentPopup = dynamic(() => import("@/components/conversion/exit-intent").then(m => ({ default: m.ExitIntentPopup })));
const RecentPurchasePopup = dynamic(() => import("@/components/conversion/recent-purchase").then(m => ({ default: m.RecentPurchasePopup })));

/* ── Product-specific data ─────────────────────────────────── */
const product = {
  name: "Healthy Weight Gain Recipes For Children (6 Months – 3 Years)",
  shortName: "Baby Food Recipe Ebook",
  price: 1,
  originalPrice: 499,
  discount: "90% OFF",
  currency: "₹",
  thumbnail: "/images/baby-food/thumbnail.png",
  previews: [
    "/images/baby-food/preview-1.jpg",
    "/images/baby-food/preview-2.jpg",
  ],
};

const highlights = [
  { icon: BookOpen, label: "Digital Ebook" },
  { icon: Utensils, label: "100+ Recipe Ideas" },
  { icon: ChefHat, label: "Free Bonus 200+ Recipes" },
  { icon: CalendarDays, label: "Daily Meal Plan" },
  { icon: Smartphone, label: "Mobile Friendly Format" },
  { icon: Infinity, label: "Lifetime Access" },
];

const includedRecipes = [
  { icon: "🌅", title: "Breakfast Recipes" },
  { icon: "🍛", title: "Lunch & Dinner Ideas" },
  { icon: "🍪", title: "Snack Recipes" },
  { icon: "👨‍👩‍👧", title: "Family-Friendly Meals" },
  { icon: "🥕", title: "Simple Indian Ingredients" },
  { icon: "📋", title: "Meal Planning Tips" },
];

const whoIsFor = [
  { icon: Baby, text: "Parents of toddlers (6 months – 3 years)" },
  { icon: Utensils, text: "Families looking for new meal ideas" },
  { icon: Heart, text: "Parents exploring age-appropriate recipes" },
  { icon: Users, text: "Caregivers seeking easy-to-prepare options" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    avatar: "/avatars/female-1.jpg",
    review:
      "I was very worried about my 2-year-old daughter's weight gain. The recipes in this ebook are simple and easy to prepare. She enjoys eating them and I feel much more confident about her nutrition now.",
  },
  {
    name: "Ritu Agarwal",
    avatar: "/avatars/female-2.jpg",
    review:
      "Unlike random internet advice, this guide is practical and easy to follow. The meal ideas helped me improve my child's eating habits significantly.",
  },
  {
    name: "Neha Verma",
    avatar: "/avatars/female-3.png",
    review:
      "This ebook answered many questions I had about healthy weight gain. The recipes use ingredients already available at home and my son loves several of them.",
  },
  {
    name: "Anjali Mehta",
    avatar: "/avatars/female-4.jpg",
    review:
      "The recipes are nutritious, simple and perfect for busy parents. I especially liked the age-wise approach and feeding tips.",
  },
];

const specs = [
  { label: "Product Name", value: "Healthy Weight Gain Recipes" },
  { label: "Format", value: "Digital Ebook (PDF)" },
  { label: "Target Age", value: "6 Months – 3 Years" },
  { label: "Total Resources", value: "3 Files (4.24 MB)" },
  { label: "Delivery", value: "Instant Download", highlight: true },
  { label: "Price", value: `₹${product.price} (One-Time)`, orange: true },
];

/* ── Countdown hook ──────────────────────────────────────── */
function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const STORAGE_KEY = "parento_babyfood_countdown_end";
    let endTime = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);

    if (!endTime || endTime < Date.now()) {
      endTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, endTime.toString());
    }

    const tick = () => {
      const diff = Math.max(0, endTime - Date.now());
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

/* ── Sticky Bottom Buy Button (self-contained for this page) ─ */
function StickyBuyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const { openCheckout } = useCheckout();
  const { hours, minutes, seconds } = useCountdown();

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Mobile Sticky Bottom CTA with Countdown */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          >
            {/* Countdown strip */}
            <div className="bg-[#1A1A2E] px-4 py-1.5 flex items-center justify-center gap-1.5">
              <Clock className="w-3 h-3 text-[#FF8A00]" />
              <span className="text-[10px] font-bold text-white/80">Offer ends in</span>
              <span className="text-xs font-extrabold text-[#FF8A00] tabular-nums">
                {pad(hours)}:{pad(minutes)}:{pad(seconds)}
              </span>
            </div>

            {/* Price + Buy Now bar */}
            <div className="bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-[#1A1A2E]">
                      {product.currency}{product.price}
                    </span>
                    <span className="text-sm text-[#6B7280] line-through">
                      {product.currency}{product.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-[#4CAF50] bg-[#F0FFF4] px-1.5 py-0.5 rounded">
                      {product.discount}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280]">One-time payment</p>
                </div>
                <Button size="md" onClick={openCheckout} icon={<ArrowRight className="w-4 h-4" />}>
                  Buy Now
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Desktop Sticky Side Button with Countdown */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50 hidden md:block"
          >
            <button
              onClick={openCheckout}
              className="bg-gradient-to-r from-[#FF8A00] to-[#FF5500] text-white pl-5 pr-6 py-4 rounded-2xl shadow-lg shadow-[#FF8A00]/25 hover:shadow-xl hover:brightness-110 transition-all duration-300 flex items-center gap-4 font-semibold cursor-pointer"
            >
              <div className="text-left">
                <div className="text-[10px] opacity-80 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {pad(hours)}:{pad(minutes)}:{pad(seconds)}
                </div>
                <div className="text-lg font-extrabold">{product.currency}{product.price}</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Main Page Content ─────────────────────────────────────── */
function BabyFoodPageContent() {
  const { openCheckout } = useCheckout();

  return (
    <>
      {/* Conversion Overlays */}
      <UrgencyBanner />
      <StickyBuyBar />
      <ExitIntentPopup />
      <RecentPurchasePopup />

      <main className="min-h-screen bg-gray-50 pt-24 sm:pt-28 pb-20 sm:pb-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">

          {/* ── Hero Section ──────────────────────────────────── */}
          <div className="bg-white rounded-3xl p-4 sm:p-8 lg:p-10 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-10 items-center">

              {/* Mobile: Rating badge (shown first) */}
              <div className="lg:hidden flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#FF8A00] shadow-md border border-[#FFEDD5]">
                  <span className="flex items-center gap-0.5 text-[#F59E0B]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </span>
                  <span>4.8/5 — Trusted by Parents</span>
                </div>
              </div>

              {/* Mobile: Headline & subtitle (shown second) */}
              <div className="lg:hidden text-center">
                <h1 className="text-2xl font-extrabold text-[#1A1A2E] leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  100+ easy-to-make Indian recipes designed for children aged 6 months to 3 years. Includes free bonus 200+ recipe ideas & daily meal plan.
                </p>
              </div>

              {/* Product Thumbnail Image (Mobile: shown third, before CTA) */}
              <div className="relative">
                <div className="bg-gradient-to-br from-[#FFF7ED] via-[#FEF3C7] to-[#F0FFF4] rounded-3xl p-3 sm:p-6 border border-gray-100 text-center relative overflow-hidden group shadow-sm">
                  <div className="relative overflow-hidden rounded-2xl mb-3">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 mx-auto"
                    />
                    <span className="bg-[#FF8A00] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full absolute top-3 left-3 shadow-md">
                      Digital Ebook
                    </span>
                    <span className="bg-[#4CAF50] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full absolute top-3 right-3 shadow-md">
                      {product.discount}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-left pt-3 border-t border-gray-200/60">
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF50] flex-shrink-0" /> 100+ Recipes
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF50] flex-shrink-0" /> Ages 6M – 3Y
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF50] flex-shrink-0" /> Daily Meal Plan
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF50] flex-shrink-0" /> Free 200+ Bonus
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info & Pricing (Desktop: headline shown here) */}
              <div className="space-y-4 sm:space-y-5">
                <div className="hidden lg:block">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-600">
                      4.8/5 — Trusted by Parents
                    </span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-[#1A1A2E] leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-sm text-gray-600 mt-2.5 leading-relaxed">
                    100+ easy-to-make Indian recipes designed for children aged 6 months to 3 years. Includes free bonus 200+ recipe ideas & daily meal plan.
                  </p>
                </div>

                {/* Price Box */}
                <div className="bg-[#FFF7ED] p-4 sm:p-5 rounded-2xl border border-[#FFEDD5]">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#FF8A00]">
                      {product.currency}{product.price}
                    </span>
                    <span className="text-base sm:text-lg text-gray-400 line-through font-medium">
                      {product.currency}{product.originalPrice}
                    </span>
                    <span className="bg-[#4CAF50] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full ml-auto">
                      Save {product.discount}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-2 font-medium">
                    One-Time Payment • Lifetime Access • Instant Download
                  </p>
                </div>

                {/* CTA Button */}
                <div>
                  <Button
                    size="xl"
                    fullWidth
                    pulse
                    onClick={openCheckout}
                    icon={<ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />}
                    className="text-base sm:text-lg py-3.5 sm:py-4"
                  >
                    Get Instant Access — {product.currency}{product.price}
                  </Button>

                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 text-center text-[10px] sm:text-xs text-gray-600 font-medium">
                    <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-[#4CAF50]" />
                      <span>30-Day Guarantee</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Lock className="w-4 h-4 text-[#3B82F6]" />
                      <span>256-Bit SSL</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Award className="w-4 h-4 text-[#FF8A00]" />
                      <span>Razorpay Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── What You'll Get (compact badges) ─────────────── */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A2E] text-center mb-5">What You'll Get</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
              {highlights.map((h) => (
                <div key={h.label} className="bg-gray-50 hover:bg-[#FFF7ED] border border-gray-200/80 hover:border-[#FF8A00] rounded-2xl p-3.5 flex items-center gap-2.5 transition-all duration-300 group cursor-default">
                  <h.icon className="w-5 h-5 text-[#FF8A00] group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-[#1A1A2E] group-hover:text-[#FF8A00]">{h.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Inside This Ebook (recipe categories) ────────── */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A2E] text-center mb-5">Inside This Ebook</h2>
            <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2.5 sm:gap-3">
              {includedRecipes.map((r) => (
                <div key={r.title} className="bg-gray-50 hover:bg-[#F0FFF4] border border-gray-200/80 hover:border-[#4CAF50] rounded-2xl px-4 py-2.5 flex items-center gap-2 transition-all duration-300 group cursor-default">
                  <span className="text-xl group-hover:scale-110 transition-transform">{r.icon}</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1A1A2E] group-hover:text-[#4CAF50]">{r.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Preview Gallery ──────────────────────────────── */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A2E] text-center mb-5">Preview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {product.previews.map((src, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <img src={src} alt={`Preview ${i + 1}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Who Is This For? ─────────────────────────────── */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A2E] text-center mb-5">Who Is This For?</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
              {whoIsFor.map((w) => (
                <div key={w.text} className="bg-gray-50 rounded-2xl p-3.5 flex items-center gap-3 border border-gray-200/80">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF7ED] flex items-center justify-center flex-shrink-0">
                    <w.icon className="w-5 h-5 text-[#FF8A00]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">{w.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Testimonials ─────────────────────────────────── */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A2E] text-center mb-5">What Parents Are Saying</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-gray-50 rounded-2xl p-5 border border-gray-200/80 flex flex-col">
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-[#F59E0B] fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{t.review}</p>
                  <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#FF8A00] shadow-sm"
                    />
                    <span className="text-sm font-bold text-[#1A1A2E]">{t.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Product Specs ────────────────────────────────── */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A2E] text-center mb-5">Product Details</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
              {specs.map((s) => (
                <div key={s.label} className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
                  <span className="text-[10px] sm:text-xs text-gray-500 block font-medium">{s.label}</span>
                  <span className={`font-bold text-xs sm:text-sm block truncate ${s.orange ? "text-[#FF8A00]" : s.highlight ? "text-[#4CAF50]" : "text-[#1A1A2E]"}`}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Final CTA ────────────────────────────────────── */}
          <div className="bg-gradient-to-br from-[#FFF7ED] to-[#FEF3C7] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#FFEDD5] text-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A2E]">
              Give Your Child the Nutrition They Deserve
            </h2>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              100+ healthy, easy-to-make Indian recipes + free 200+ bonus recipes & daily meal plan. One-time payment, lifetime access.
            </p>
            <div className="max-w-md mx-auto">
              <Button
                size="xl"
                fullWidth
                pulse
                onClick={openCheckout}
                icon={<ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />}
                className="text-base sm:text-lg py-3.5 sm:py-4"
              >
                Get Instant Access — {product.currency}{product.price}
              </Button>
            </div>
            <p className="text-[11px] text-gray-500 font-medium">
              ⚡ Instant Download • 🔒 Secure Payment • 💯 30-Day Money Back Guarantee
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-[11px] text-gray-400 max-w-2xl mx-auto pb-8">
            This ebook is intended for informational and educational purposes only. Always consult your pediatrician before making changes to your child's diet.
          </p>
        </div>
      </main>
    </>
  );
}

export default function BabyFoodGainRecipePage() {
  return (
    <CheckoutProvider>
      <Header />
      <BabyFoodPageContent />
      <Footer />
    </CheckoutProvider>
  );
}
