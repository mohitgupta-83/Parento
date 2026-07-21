import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Lock, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Parento",
  description: "Read Parento's Privacy Policy regarding data protection, customer privacy, and payment security.",
};

export default function PrivacyPolicyPage() {
  return (
    <CheckoutProvider>
      <Header />

      <main className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 text-[#1A1A2E]">
          {/* Header */}
          <div className="border-b border-gray-100 pb-6 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF7ED] px-4 py-1.5 text-xs font-semibold text-[#FF8A00] mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Legal & Policy
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E]">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-sm sm:text-base text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">1. Introduction</h2>
              <p>
                Welcome to <strong>{siteConfig.brand.name}</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We value your trust and are committed to protecting your personal information and privacy. This Privacy Policy outlines how we collect, use, store, and safeguard your data when you visit our website <strong>{siteConfig.brand.url}</strong> and purchase our digital worksheet products.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">2. Information We Collect</h2>
              <p className="mb-2">When you purchase digital products on our website, we collect minimal necessary information to process your order and deliver your digital files:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Personal Details:</strong> Full Name.</li>
                <li><strong>Contact Information:</strong> Email address (for digital product delivery and invoice) and Mobile/WhatsApp number (for order updates and support).</li>
                <li><strong>Transaction Data:</strong> Razorpay Payment ID, Order ID, transaction timestamp, and amount paid.</li>
              </ul>
              <p className="mt-3 text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200">
                🔒 <strong>Note on Payment Data:</strong> We do NOT store or collect your debit/credit card numbers, UPI PINs, CVV, or Net Banking credentials. All payment processing is securely handled by <strong>Razorpay Payment Gateway</strong> using 256-bit SSL encryption.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">3. How We Use Your Information</h2>
              <p className="mb-2">We use the collected information solely for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>To deliver instant download access links to your purchased digital worksheet files.</li>
                <li>To send transaction receipts, invoices, and thank-you confirmation emails.</li>
                <li>To provide customer support via WhatsApp or email regarding your purchase.</li>
                <li>To prevent fraudulent transactions and maintain order security.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">4. Data Sharing & Third Parties</h2>
              <p>
                We respect your privacy. We do <strong>NOT</strong> sell, rent, trade, or share your personal information with third parties for marketing or advertising purposes. Your information is only shared with secure infrastructure partners strictly required for order fulfillment (e.g., Razorpay Payment Gateway, Supabase database storage).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">5. Data Security</h2>
              <p>
                We implement strict industry-standard technical and organizational security measures to protect your data against unauthorized access, alteration, disclosure, or destruction. Our website uses HTTPS encryption and secure database access protocols.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">6. Contact Us</h2>
              <p className="mb-2">If you have any questions or concerns regarding this Privacy Policy, please contact our support team:</p>
              <div className="bg-[#FFF7ED] p-4 rounded-2xl border border-[#FFEDD5] text-sm text-[#1A1A2E]">
                <p><strong>Brand:</strong> {siteConfig.brand.name}</p>
                <p className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-[#FF8A00]" />
                  <strong>Email:</strong> {siteConfig.brand.email}
                </p>
                <p className="mt-1"><strong>WhatsApp:</strong> {siteConfig.brand.whatsapp}</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </CheckoutProvider>
  );
}
