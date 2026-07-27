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
  FileText,
  Printer,
  Infinity as InfinityIcon,
  Download,
  Users,
} from "lucide-react";

function ProductPageContent() {
  const { openCheckout } = useCheckout();

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Product Hero Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Visual Preview */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#FFF7ED] via-[#F0FFF4] to-[#EFF6FF] rounded-3xl p-8 border border-gray-100 text-center relative overflow-hidden">
              <span className="bg-[#FF8A00] text-white text-xs font-bold px-3 py-1 rounded-full absolute top-4 left-4">
                Instant PDF Download
              </span>
              <span className="bg-[#4CAF50] text-white text-xs font-bold px-3 py-1 rounded-full absolute top-4 right-4">
                {siteConfig.product.discount}
              </span>

              <div className="my-8">
                <span className="text-7xl sm:text-8xl block mb-4">📚</span>
                <h3 className="text-2xl font-extrabold text-[#1A1A2E]">
                  {siteConfig.product.worksheetCount} Printable Worksheets
                </h3>
                <p className="text-xs text-gray-500 mt-2 font-medium">
                  PDF Format • High Resolution • Ready to Print
                </p>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 gap-2 text-left pt-4 border-t border-gray-200/60">
                <div className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" /> Ages 2–10 Years
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" /> 19 Subject Categories
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" /> Print Unlimited Times
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" /> Free Bonus Bundle
                </div>
              </div>
            </div>
          </div>

          {/* Product Info & Pricing */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-600">
                  {siteConfig.socialProof.rating}/5 ({siteConfig.socialProof.totalReviews} Reviews)
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] leading-tight">
                {siteConfig.product.name}
              </h1>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Designed by educational experts to make early learning fun, screen-free, and engaging for kids aged 2–10. Includes Alphabet, Math, Hindi, Phonics, Tracing, Science, Brain Games, and more!
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-[#FFF7ED] p-5 rounded-2xl border border-[#FFEDD5]">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-[#FF8A00]">
                  ₹{siteConfig.product.price}
                </span>
                <span className="text-lg text-gray-400 line-through font-medium">
                  ₹{siteConfig.product.originalPrice}
                </span>
                <span className="bg-[#4CAF50] text-white text-xs font-bold px-2.5 py-1 rounded-full ml-auto">
                  Save 90% Today
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2 font-medium">
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
                icon={<ShoppingCart className="w-6 h-6" />}
                className="text-lg"
              >
                Get Instant Access — ₹{siteConfig.product.price}
              </Button>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#4CAF50]" /> 30-Day Guarantee
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-[#3B82F6]" /> Instant PDF Download
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Breakdown */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 space-y-8 text-[#1A1A2E]">
          <div>
            <h2 className="text-2xl font-bold mb-4">Product Specifications & Details</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <span className="text-xs text-gray-500 block font-medium">Product Name</span>
                <span className="font-bold text-sm text-[#1A1A2E]">{siteConfig.product.name}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <span className="text-xs text-gray-500 block font-medium">Format</span>
                <span className="font-bold text-sm text-[#1A1A2E]">Printable PDF & ZIP</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <span className="text-xs text-gray-500 block font-medium">Target Age Group</span>
                <span className="font-bold text-sm text-[#1A1A2E]">2 to 10 Years</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <span className="text-xs text-gray-500 block font-medium">Delivery Method</span>
                <span className="font-bold text-sm text-[#4CAF50]">Instant Download</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <span className="text-xs text-gray-500 block font-medium">License</span>
                <span className="font-bold text-sm text-[#1A1A2E]">Personal & Classroom Printing</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <span className="text-xs text-gray-500 block font-medium">Price</span>
                <span className="font-bold text-sm text-[#FF8A00]">₹{siteConfig.product.price} (One-Time)</span>
              </div>
            </div>
          </div>

          {/* Included Subjects */}
          <div>
            <h2 className="text-2xl font-bold mb-4">19 Included Subject Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {siteConfig.categories.map((cat) => (
                <div key={cat.title} className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <span className="text-xl">{cat.icon}</span>
                  <span>{cat.title}</span>
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
