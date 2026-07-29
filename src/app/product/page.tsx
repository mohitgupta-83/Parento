"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CheckoutProvider, useCheckout } from "@/context/CheckoutContext";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Star,
  Lock,
  Award,
} from "lucide-react";

function ProductPageContent() {
  const { openCheckout } = useCheckout();

  return (
    <main className="min-h-screen bg-gray-50 pt-24 sm:pt-28 pb-16 sm:pb-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
        {/* Product Hero Section */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 lg:p-10 shadow-sm border border-gray-100 grid lg:grid-cols-2 gap-6 sm:gap-10 items-center">
          {/* Visual Preview */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#FFF7ED] via-[#F0FFF4] to-[#EFF6FF] rounded-3xl p-3 sm:p-6 border border-gray-100 text-center relative overflow-hidden group shadow-sm">
              <div className="relative overflow-hidden rounded-2xl mb-3">
                <img
                  src="/images/product/product-main.webp"
                  alt={siteConfig.product.name}
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 max-h-[380px] sm:max-h-none mx-auto"
                />
                <span className="bg-[#FF8A00] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full absolute top-3 left-3 shadow-md">
                  Instant PDF Bundle
                </span>
                <span className="bg-[#4CAF50] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full absolute top-3 right-3 shadow-md">
                  {siteConfig.product.discount}
                </span>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 gap-2 text-left pt-3 border-t border-gray-200/60">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF50] flex-shrink-0" /> Ages 2–10 Years
                </div>
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF50] flex-shrink-0" /> 19 Subject Categories
                </div>
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF50] flex-shrink-0" /> Print Unlimited Times
                </div>
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF50] flex-shrink-0" /> Free Bonus Bundle
                </div>
              </div>
            </div>
          </div>

          {/* Product Info & Pricing */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-600">
                  {siteConfig.socialProof.rating}/5 ({siteConfig.socialProof.totalReviews} Verified Parents)
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1A2E] leading-tight">
                {siteConfig.product.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                Designed by educational experts to make early learning fun, screen-free, and engaging for kids aged 2–10. Includes Alphabet, Math, Hindi, Phonics, Tracing, Science, Brain Games, and more!
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-[#FFF7ED] p-4 sm:p-5 rounded-2xl border border-[#FFEDD5]">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#FF8A00]">
                  ₹{siteConfig.product.price}
                </span>
                <span className="text-base sm:text-lg text-gray-400 line-through font-medium">
                  ₹{siteConfig.product.originalPrice}
                </span>
                <span className="bg-[#4CAF50] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full ml-auto">
                  Save 90% Today
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-2 font-medium">
                One-Time Payment • Lifetime Access • Instant PDF Download
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
                Get Instant Access — ₹{siteConfig.product.price}
              </Button>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 text-center text-[10px] sm:text-xs text-gray-600 font-medium">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#4CAF50]" />
                  <span>30-Day Guarantee</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Lock className="w-4 h-4 text-[#3B82F6]" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Award className="w-4 h-4 text-[#FF8A00]" />
                  <span>Razorpay Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Breakdown */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-12 shadow-sm border border-gray-100 space-y-6 sm:space-y-8 text-[#1A1A2E]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Product Specifications & Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gray-50 p-3.5 sm:p-4 rounded-2xl border border-gray-200">
                <span className="text-[10px] sm:text-xs text-gray-500 block font-medium">Product Name</span>
                <span className="font-bold text-xs sm:text-sm text-[#1A1A2E] truncate block">{siteConfig.product.name}</span>
              </div>
              <div className="bg-gray-50 p-3.5 sm:p-4 rounded-2xl border border-gray-200">
                <span className="text-[10px] sm:text-xs text-gray-500 block font-medium">Format</span>
                <span className="font-bold text-xs sm:text-sm text-[#1A1A2E]">Printable PDF & ZIP</span>
              </div>
              <div className="bg-gray-50 p-3.5 sm:p-4 rounded-2xl border border-gray-200">
                <span className="text-[10px] sm:text-xs text-gray-500 block font-medium">Target Age Group</span>
                <span className="font-bold text-xs sm:text-sm text-[#1A1A2E]">2 to 10 Years</span>
              </div>
              <div className="bg-gray-50 p-3.5 sm:p-4 rounded-2xl border border-gray-200">
                <span className="text-[10px] sm:text-xs text-gray-500 block font-medium">Delivery Method</span>
                <span className="font-bold text-xs sm:text-sm text-[#4CAF50]">Instant Download</span>
              </div>
              <div className="bg-gray-50 p-3.5 sm:p-4 rounded-2xl border border-gray-200">
                <span className="text-[10px] sm:text-xs text-gray-500 block font-medium">License</span>
                <span className="font-bold text-xs sm:text-sm text-[#1A1A2E]">Personal & Classroom</span>
              </div>
              <div className="bg-gray-50 p-3.5 sm:p-4 rounded-2xl border border-gray-200">
                <span className="text-[10px] sm:text-xs text-gray-500 block font-medium">Price</span>
                <span className="font-bold text-xs sm:text-sm text-[#FF8A00]">₹{siteConfig.product.price} (One-Time)</span>
              </div>
            </div>
          </div>

          {/* Included Subjects */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">19 Included Subject Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
              {siteConfig.categories.map((cat) => (
                <div key={cat.title} className="bg-gray-50 p-2.5 sm:p-3 rounded-xl border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <span className="text-lg sm:text-xl">{cat.icon}</span>
                  <span className="truncate">{cat.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProductPage() {
  return (
    <CheckoutProvider>
      <Header />
      <ProductPageContent />
      <Footer />
    </CheckoutProvider>
  );
}
