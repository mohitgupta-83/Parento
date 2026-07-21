"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { RazorpayButton } from "./RazorpayButton";
import { X, ShieldCheck, Lock, User, Mail, Phone } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");

  const isFormValid = name.trim().length >= 2 && email.includes("@") && phone.trim().length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setFormError("Please fill in your Name, a valid Email, and 10-digit Mobile number.");
    } else {
      setFormError("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F3F4F6]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              aria-label="Close checkout modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-br from-[#FFF7ED] via-white to-[#F0FFF4] p-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#FF8A00] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Instant Download
                </span>
                <span className="text-xs font-semibold text-[#4CAF50] bg-[#F0FFF4] px-2.5 py-0.5 rounded-full">
                  90% OFF
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#1A1A2E]">
                {siteConfig.product.shortName}
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#FF8A00]">
                  ₹{siteConfig.product.price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{siteConfig.product.originalPrice}
                </span>
                <span className="text-xs text-gray-500 font-medium ml-auto">
                  One-Time Payment
                </span>
              </div>
            </div>

            {/* Form & Razorpay Trigger */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none text-sm text-[#1A1A2E] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address (For Delivery) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="ananya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none text-sm text-[#1A1A2E] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none text-sm text-[#1A1A2E] transition-all"
                    />
                  </div>
                </div>

                {formError && (
                  <p className="text-xs text-red-600 font-medium">{formError}</p>
                )}

                <div className="pt-2">
                  {isFormValid ? (
                    <RazorpayButton
                      customerName={name}
                      email={email}
                      phone={phone}
                      onSuccess={onClose}
                    />
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl gradient-cta text-white font-bold shadow-lg shadow-[#FF8A00]/20 hover:brightness-105 transition-all cursor-pointer text-base"
                    >
                      Proceed to Pay ₹{siteConfig.product.price}
                    </button>
                  )}
                </div>
              </form>

              {/* Security badges */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-gray-500 text-xs">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#4CAF50]" />
                  <span>30-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#3B82F6]" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
