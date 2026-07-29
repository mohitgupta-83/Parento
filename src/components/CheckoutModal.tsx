"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { RazorpayButton } from "./RazorpayButton";
import {
  X,
  ShieldCheck,
  Lock,
  User,
  Mail,
  Phone,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

import { trackMetaEvent } from "@/lib/pixel";
import { useProductPrice } from "@/hooks/useProductPrice";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const pathname = usePathname();
  const isBabyFoodPage = pathname?.includes("baby-food-gain-recipe");
  const productSlug = isBabyFoodPage ? "baby-food-gain-recipe" : "kids-worksheets";

  const productName = isBabyFoodPage
    ? "Healthy Weight Gain Recipes Ebook"
    : siteConfig.product.shortName;

  const productBadge = isBabyFoodPage
    ? "100+ Indian Toddler Recipes"
    : "15,000+ Printable Worksheets";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");
  const [draftId, setDraftId] = useState<string>("");

  const { price, originalPrice } = useProductPrice(productSlug);
  const [addOnSelected, setAddOnSelected] = useState<boolean>(false);
  const [showAddOnModal, setShowAddOnModal] = useState<boolean>(false);

  const totalPayable = price + (addOnSelected ? 99 : 0);

  // Initialize unique draftId when modal opens and track InitiateCheckout event
  useEffect(() => {
    if (isOpen) {
      if (!draftId) {
        setDraftId(`draft_${Date.now()}_${Math.random().toString(36).substring(7)}`);
      }
      trackMetaEvent("InitiateCheckout", {
        content_name: productName,
        value: totalPayable,
        currency: "INR",
      });
    }
  }, [isOpen, draftId, totalPayable, productName]);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-xs"
          />

          {/* Main Checkout Modal */}
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
                  {productBadge}
                </span>
              </div>

              {/* Product Title */}
              <h3 className="text-lg sm:text-xl font-extrabold text-[#1A1A2E] pr-6">
                {productName}
              </h3>

              {/* Price Display near Heading */}
              <div className="mt-2 flex items-baseline flex-wrap gap-2">
                <span className="text-2xl font-extrabold text-[#FF8A00]">
                  ₹{totalPayable}
                </span>
                {addOnSelected ? (
                  <span className="text-xs font-bold text-[#FF8A00] bg-[#FFF7ED] px-2 py-0.5 rounded-full border border-[#FFEDD5]">
                    (Base ₹{price} + ₹99 Add-On Ebook)
                  </span>
                ) : (
                  <span className="text-xs font-medium text-gray-500">
                    (Base Price: ₹{price})
                  </span>
                )}
                <span className="text-sm text-gray-400 line-through ml-auto">
                  ₹{originalPrice + (addOnSelected ? 499 : 0)}
                </span>
              </div>
            </div>

            {/* Form Body */}
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
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all select-none relative overflow-hidden ${
                    addOnSelected
                      ? "bg-gradient-to-r from-[#FFF7ED] to-[#F0FFF4] border-[#FF8A00] shadow-md ring-2 ring-[#FF8A00]/20"
                      : "bg-gray-50/80 border-gray-200 hover:border-[#FF8A00]/60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox Icon - Clicking directly toggles add to cart */}
                    <button
                      type="button"
                      onClick={() => setAddOnSelected(!addOnSelected)}
                      className="mt-0.5 p-1 flex-shrink-0 cursor-pointer focus:outline-none"
                    >
                      <input
                        type="checkbox"
                        checked={addOnSelected}
                        onChange={() => setAddOnSelected(!addOnSelected)}
                        className="w-5 h-5 text-[#FF8A00] accent-[#FF8A00] rounded cursor-pointer pointer-events-none"
                      />
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5 mb-1">
                        <span className="bg-[#FF8A00] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          🎁 ONE-TIME OFFER (+₹99)
                        </span>
                        <span className="text-[10px] text-gray-400 line-through">₹499</span>
                      </div>

                      {/* Clickable Product Details Area -> Opens Popup Details */}
                      <div
                        onClick={() => setShowAddOnModal(true)}
                        className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity"
                      >
                        <img
                          src="/images/product/babys-first-year-cover.png"
                          alt="Baby's First Year Simplified"
                          className="w-14 h-14 object-cover rounded-xl border border-gray-200 shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-extrabold text-[#1A1A2E] leading-tight flex items-center gap-1 group-hover:text-[#FF8A00] transition-colors">
                            <span>Baby&apos;s First Year Simplified</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#FF8A00] flex-shrink-0" />
                          </h4>
                          <p className="text-[11px] font-semibold text-[#FF8A00]">
                            by Dr. Arpit Gupta
                          </p>
                          <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-1">
                            Breastfeeding, sleep routines, growth milestones & 100+ parenting questions.
                          </p>
                          <span className="text-[10px] text-[#3B82F6] font-bold underline inline-flex items-center gap-0.5 mt-0.5">
                            Click to view details &amp; ebook index ↗
                          </span>
                        </div>
                      </div>

                      {/* Checkbox Action Button */}
                      <div
                        onClick={() => setAddOnSelected(!addOnSelected)}
                        className="mt-2 text-[11px] font-bold text-[#4CAF50] cursor-pointer hover:underline flex items-center gap-1"
                      >
                        {addOnSelected
                          ? "✓ Added to Order! Click to remove"
                          : "✓ Click checkbox to add this ebook to your order for only ₹99 (Save 80%)"}
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
                      productSlug={productSlug}
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

          {/* ── 📖 ADD-ON PRODUCT DETAILS POPUP PREVIEW ────────────── */}
          <AnimatePresence>
            {showAddOnModal && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowAddOnModal(false)}
                  className="fixed inset-0 bg-black/70 backdrop-blur-xs"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto border border-gray-100 max-h-[85vh] flex flex-col"
                >
                  {/* Popup Header */}
                  <div className="bg-gradient-to-r from-[#FFF7ED] via-white to-[#F0FFF4] p-5 border-b border-gray-100 relative flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FF8A00]/10 flex items-center justify-center text-[#FF8A00] font-bold text-xl">
                        👶
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold text-[#FF8A00] uppercase tracking-wider">
                          Ebook Preview &amp; Index
                        </span>
                        <h3 className="text-base font-extrabold text-[#1A1A2E]">
                          Baby&apos;s First Year Simplified
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowAddOnModal(false)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                      aria-label="Close ebook preview"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Popup Scrollable Body */}
                  <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
                    {/* Hero Cover Card */}
                    <div className="bg-gradient-to-br from-[#FFF7ED] to-[#F0FFF4] p-4 rounded-2xl border border-[#FFEDD5] flex items-center gap-4">
                      <img
                        src="/images/product/babys-first-year-cover.png"
                        alt="Baby's First Year Simplified"
                        className="w-20 h-24 object-cover rounded-xl shadow-md border border-white flex-shrink-0"
                      />
                      <div>
                        <div className="text-xs font-semibold text-[#FF8A00]">✨ Welcome to Parenthood ❤️</div>
                        <h4 className="text-base font-extrabold text-[#1A1A2E] mt-0.5">
                          Baby&apos;s First Year Simplified
                        </h4>
                        <p className="text-xs text-gray-500 font-medium">by Dr. Arpit Gupta</p>
                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-lg font-extrabold text-[#FF8A00]">₹99 Only</span>
                          <span className="text-xs text-gray-400 line-through">₹499</span>
                          <span className="text-[10px] font-bold text-[#4CAF50] bg-[#F0FFF4] px-2 py-0.5 rounded-full border border-green-200">
                            Save 80%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* About Description */}
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                        About This Ebook
                      </h5>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Becoming a parent is exciting, beautiful, and sometimes overwhelming. 
                        <strong> Baby&apos;s First Year Simplified</strong> is a practical and easy-to-understand guide designed to help new parents navigate their baby&apos;s first year with greater confidence.
                      </p>
                    </div>

                    {/* Inside Ebook Index List */}
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                        Inside This Ebook You&apos;ll Discover:
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100 font-medium">
                          <span>🍼</span> <span>Breastfeeding &amp; feeding guidance</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100 font-medium">
                          <span>😴</span> <span>Sleep &amp; daily routine tips</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100 font-medium">
                          <span>📈</span> <span>Baby growth &amp; milestones</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100 font-medium">
                          <span>💉</span> <span>Vaccination info explained</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100 font-medium">
                          <span>🏥</span> <span>Everyday baby care guidance</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100 font-medium">
                          <span>🥣</span> <span>Introducing solids (6+ months)</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100 font-medium">
                          <span>👶</span> <span>Newborn care essentials</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100 font-medium">
                          <span>🛒</span> <span>Baby shopping checklist</span>
                        </div>
                      </div>

                      <div className="mt-2.5 p-2.5 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] text-xs font-bold text-[#FF8A00] flex items-center gap-2">
                        <span>❓</span> <span>Answers to 100+ Common Parenting Questions</span>
                      </div>
                    </div>

                    {/* Format Badges */}
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-gray-600">
                      <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="block text-sm mb-0.5">📖</span> Instant Access
                      </div>
                      <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="block text-sm mb-0.5">📱</span> Mobile/Tablet/PC
                      </div>
                      <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="block text-sm mb-0.5">🔒</span> Lifetime Access
                      </div>
                    </div>
                  </div>

                  {/* Popup CTA Footer */}
                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex-shrink-0">
                    <button
                      onClick={() => {
                        setAddOnSelected(true);
                        setShowAddOnModal(false);
                      }}
                      className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF8A00] to-[#FF5500] hover:brightness-110 text-white font-extrabold text-sm shadow-lg shadow-[#FF8A00]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" /> YES! Add This Ebook To My Order — Only ₹99
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
