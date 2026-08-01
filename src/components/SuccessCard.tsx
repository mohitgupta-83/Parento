"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { ProductDownload } from "./ProductDownload";
import { CheckCircle2, ShieldCheck, FileText, Gift, HelpCircle, Mail, MessageCircle } from "lucide-react";

import { useEffect } from "react";
import { trackMetaEvent } from "@/lib/pixel";

interface SuccessCardProps {
  orderId: string;
  paymentId?: string;
  hasAddon?: boolean;
}

export function SuccessCard({ orderId, paymentId, hasAddon = false }: SuccessCardProps) {
  useEffect(() => {
    trackMetaEvent("Purchase", {
      content_name: siteConfig.product.name,
      value: siteConfig.product.price,
      currency: "INR",
      order_id: orderId,
    });
  }, [orderId]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 max-w-2xl mx-auto overflow-hidden"
    >
      {/* Top Accent Gradient */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#4CAF50] via-[#8BC34A] to-[#FF8A00]" />

      {/* Success Animated Badge */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#F0FFF4] text-[#4CAF50] mb-4 shadow-lg shadow-[#4CAF50]/20"
        >
          <CheckCircle2 className="w-14 h-14" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E]">
          Payment Successful! 🎉
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Thank you for choosing {siteConfig.brand.name}. Your order has been confirmed.
        </p>
      </div>

      {/* Order Details Breakdown */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 font-medium">Product</span>
          <span className="text-[#1A1A2E] font-bold">{siteConfig.product.name}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 font-medium">Amount Paid</span>
          <span className="text-[#4CAF50] font-extrabold text-base">₹{siteConfig.product.price}</span>
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

      {/* Download Section */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FFF] border border-[#FFEDD5] text-center">
        <div className="flex items-center justify-center gap-2 text-[#FF8A00] font-bold text-sm mb-2">
          <Gift className="w-4 h-4" /> Includes 15,000+ Worksheets + Free Bonus Bundle
        </div>
        <h3 className="text-xl font-bold text-[#1A1A2E] mb-4">
          Click Below to Download Your Files Immediately
        </h3>

        <ProductDownload orderId={orderId} paymentId={paymentId} hasAddon={hasAddon} />
      </div>

      {/* Support / Help */}
      <div className="text-center pt-6 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-3 font-medium">
          Need help with your order or printing instructions?
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
