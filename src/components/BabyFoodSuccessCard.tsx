"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ShieldCheck,
  Download,
  Loader2,
  FileText,
  Gift,
  Mail,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const downloadFiles = [
  {
    name: "Healthy Bites for Little Tummies",
    filename: "healthy-bites-for-little-tummies.pdf",
    path: "/downloads/baby-food/healthy-bites-for-little-tummies.pdf",
    icon: "🍲",
    description: "Main recipe ebook with 100+ nutritious Indian recipes",
  },
  {
    name: "Toddler Foods (9-12 Months) Weight Gain",
    filename: "my-toddler-foods-9-12-weight-gain.pdf",
    path: "/downloads/baby-food/my-toddler-foods-9-12-weight-gain.pdf",
    icon: "👶",
    description: "Age-specific weight gain recipes for 9-12 month toddlers",
  },
  {
    name: "Food Recipes Collection",
    filename: "food-recipes.pdf",
    path: "/downloads/baby-food/food-recipes.pdf",
    icon: "📖",
    description: "Bonus 200+ additional recipe ideas & daily meal plan",
  },
];

interface BabyFoodSuccessCardProps {
  orderId: string;
  paymentId?: string;
}

export function BabyFoodSuccessCard({ orderId, paymentId }: BabyFoodSuccessCardProps) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (file: (typeof downloadFiles)[0]) => {
    setDownloading(file.filename);
    try {
      const response = await fetch(file.path);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-10 max-w-2xl mx-auto overflow-hidden"
    >
      {/* Top Accent Gradient */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#4CAF50] via-[#8BC34A] to-[#FF8A00]" />

      {/* Success Badge */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F0FFF4] text-[#4CAF50] mb-4 shadow-lg shadow-[#4CAF50]/20"
        >
          <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14" />
        </motion.div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1A2E]">
          Payment Successful! 🎉
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-600">
          Thank you for choosing {siteConfig.brand.name}. Your recipe ebook order is confirmed.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 font-medium">Product</span>
          <span className="text-[#1A1A2E] font-bold text-xs sm:text-sm text-right">Healthy Weight Gain Recipes</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 font-medium">Amount Paid</span>
          <span className="text-[#4CAF50] font-extrabold text-base">₹1</span>
        </div>
        {paymentId && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 font-medium">Payment ID</span>
            <span className="text-gray-700 font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">
              {paymentId}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
          <span className="text-gray-500 font-medium">Status</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4CAF50] bg-[#E8F5E9] px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" /> Order Verified & Complete
          </span>
        </div>
      </div>

      {/* Download Section — 3 PDF Buttons */}
      <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FFF] border border-[#FFEDD5]">
        <div className="flex items-center justify-center gap-2 text-[#FF8A00] font-bold text-sm mb-2">
          <Gift className="w-4 h-4" /> Your 3 Recipe Ebooks Are Ready!
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-[#1A1A2E] mb-5 text-center">
          Click Below to Download Your Files
        </h3>

        <div className="space-y-3">
          {downloadFiles.map((file) => (
            <button
              key={file.filename}
              onClick={() => handleDownload(file)}
              disabled={downloading === file.filename}
              className="w-full bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#4CAF50] rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 group cursor-pointer disabled:opacity-60"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F0FFF4] flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                {file.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-bold text-[#1A1A2E] group-hover:text-[#4CAF50]">
                  {file.name}
                </div>
                <div className="text-xs text-gray-500">{file.description}</div>
              </div>
              <div className="flex-shrink-0">
                {downloading === file.filename ? (
                  <Loader2 className="w-5 h-5 text-[#FF8A00] animate-spin" />
                ) : (
                  <Download className="w-5 h-5 text-[#4CAF50] group-hover:scale-110 transition-transform" />
                )}
              </div>
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-1.5 text-center">
          <span>🔒 Secure 256-bit encrypted download</span>
          <span>•</span>
          <span>Format: PDF</span>
        </p>
      </div>

      {/* Support */}
      <div className="text-center pt-5 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-3 font-medium">
          Need help with your order?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-600">
          <a
            href={`mailto:${siteConfig.brand.email}`}
            className="flex items-center gap-1.5 hover:text-[#FF8A00] transition-colors"
          >
            <Mail className="w-4 h-4" /> {siteConfig.brand.email}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
