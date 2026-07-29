"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { RazorpayButton } from "./RazorpayButton";
import { X, ShieldCheck, Lock, User, Mail, Phone } from "lucide-react";

import { trackMetaEvent } from "@/lib/pixel";
import { useProductPrice } from "@/hooks/useProductPrice";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");
  const [draftId, setDraftId] = useState<string>("");
  const { price, originalPrice } = useProductPrice("kids-worksheets");

  const [addOnSelected, setAddOnSelected] = useState<boolean>(false);
  const totalPayable = price + (addOnSelected ? 99 : 0);

  // Initialize unique draftId when modal opens and track InitiateCheckout event
  useEffect(() => {
    if (isOpen) {
      if (!draftId) {
        setDraftId(`draft_${Date.now()}_${Math.random().toString(36).substring(7)}`);
      }
      trackMetaEvent("InitiateCheckout", {
        content_name: siteConfig.product.name,
        value: totalPayable,
        currency: "INR",
      });
    }
  }, [isOpen, draftId, totalPayable]);

  // Auto-save abandoned draft order to Supabase immediately as customer types in any field
  useEffect(() => {
    if (!draftId || (!name && !email && !phone)) return;

    const timer = setTimeout(() => {
      fetch("/api/save-draft-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          draftId,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          amount: totalPayable,
        }),
      }).catch((err) => console.warn("Draft auto-save error:", err));
    }, 600);

    return () => clearTimeout(timer);
  }, [name, email, phone, draftId, totalPayable]);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto border border-gray-100 max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FFF7ED] to-[#F0FFF4] p-5 sm:p-6 border-b border-gray-100 relative flex-shrink-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/80 transition-colors cursor-pointer text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#FF8A00] text-white text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Instant Download
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-[#4CAF50] bg-[#F0FFF4] px-2.5 py-0.5 rounded-full">
                  90% OFF
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#1A1A2E] pr-6">
                {siteConfig.product.shortName}
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#FF8A00]">
                  ₹{totalPayable}
                </span>
                {addOnSelected && (
                  <span className="text-xs font-bold text-[#FF8A00] bg-[#FFF7ED] px-2 py-0.5 rounded-full border border-[#FFEDD5]">
                    (Includes ₹99 Add-On Ebook)
                  </span>
                )}
                <span className="text-sm text-gray-400 line-through">
                  ₹{originalPrice + (addOnSelected ? 499 : 0)}
                </span>
                <span className="text-xs text-gray-500 font-medium ml-auto">
                  One-Time Payment
                </span>
              </div>
            </div>

            {/* Form & Razorpay Trigger */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
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
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none text-sm text-[#1A1A2E] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="ananya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none text-sm text-[#1A1A2E] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
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
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none text-sm text-[#1A1A2E] transition-all"
                    />
                  </div>
                </div>

                {/* 🎁 HIGH CONVERSION ORDER BUMP OFFER CARD */}
                <div
                  onClick={() => setAddOnSelected(!addOnSelected)}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer select-none relative overflow-hidden ${
                    addOnSelected
                      ? "bg-gradient-to-r from-[#FFF7ED] to-[#F0FFF4] border-[#FF8A00] shadow-md ring-2 ring-[#FF8A00]/20"
                      : "bg-gray-50/80 hover:bg-white border-gray-200 hover:border-[#FF8A00]/60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={addOnSelected}
                      onChange={(e) => setAddOnSelected(e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1 w-5 h-5 text-[#FF8A00] accent-[#FF8A00] rounded cursor-pointer flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="bg-[#FF8A00] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          🎁 ONE-TIME OFFER (+₹99)
                        </span>
                        <span className="text-[10px] text-gray-400 line-through">₹499</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <img
                          src="/images/product/babys-first-year-cover.png"
                          alt="Baby's First Year Simplified"
                          className="w-14 h-14 object-cover rounded-xl border border-gray-200 shadow-xs flex-shrink-0"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-extrabold text-[#1A1A2E] leading-tight">
                            Baby&apos;s First Year Simplified Ebook
                          </h4>
                          <p className="text-[11px] font-semibold text-[#FF8A00]">
                            by Dr. Arpit Gupta
                          </p>
                          <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2">
                            Complete guide for breastfeeding, sleep routines, growth milestones & 100+ parenting questions.
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 text-[11px] font-bold text-[#4CAF50] flex items-center gap-1">
                        ✓ YES! Add this ebook to my order for only ₹99 (Save 80%)
                      </div>
                    </div>
                  </div>
                </div>

                {formError && (
                  <p className="text-xs text-red-600 font-medium">{formError}</p>
                )}

                <div className="pt-1">
                  {isFormValid ? (
                    <RazorpayButton
                      customerName={name}
                      email={email}
                      phone={phone}
                      addOnSelected={addOnSelected}
                      onSuccess={onClose}
                    >
                      Proceed to Pay ₹{totalPayable}
                    </RazorpayButton>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl gradient-cta text-white font-bold shadow-lg shadow-[#FF8A00]/20 hover:brightness-105 transition-all cursor-pointer text-base"
                    >
                      Proceed to Pay ₹{totalPayable}
                    </button>
                  )}
                </div>
              </form>

              {/* Security badges */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-gray-500 text-[11px] sm:text-xs">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF50]" />
                  <span>30-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#3B82F6]" />
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
