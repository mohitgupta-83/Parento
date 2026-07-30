import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { siteConfig } from "@/config/site";
import { RotateCcw, CheckCircle2, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy — Parento",
  description: "Read Parento's 30-Day Satisfaction Money Back Guarantee and Refund Policy.",
};

export default function RefundPolicyPage() {
  return (
    <CheckoutProvider>
      <Header />

      <main className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 text-[#1A1A2E]">
          {/* Header */}
          <div className="border-b border-gray-100 pb-6 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F0FFF4] px-4 py-1.5 text-xs font-semibold text-[#4CAF50] mb-3">
              <RotateCcw className="w-3.5 h-3.5" /> 30-Day Money Back Guarantee
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E]">
              Refund & Cancellation Policy
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-sm sm:text-base text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">1. 30-Day Satisfaction Guarantee</h2>
              <p>
                At <strong>{siteConfig.brand.name}</strong>, we are committed to delivering exceptional quality educational materials for your child. We offer a <strong>30-Day Satisfaction Guarantee</strong> on the {siteConfig.product.name}. If you are not completely satisfied with your purchase for any reason, you are entitled to a full refund within 30 days from the date of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">2. Refund Request & Process</h2>
              <p className="mb-2">To request a refund, please follow these simple steps:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Send an email to <strong>{siteConfig.brand.email}</strong>.</li>
                <li>Include your <strong>Order ID</strong> or the <strong>Email Address</strong> used at checkout.</li>
                <li>Briefly let us know why you are unsatisfied (optional, for feedback purposes).</li>
              </ol>
              <p className="mt-3">
                Our support team will review your request and process your refund within <strong>24 to 48 hours</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">3. Refund Processing Timeline</h2>
              <p className="mb-2">
                Once processed, your refund will be credited back to your original payment method (UPI, Bank Account, Credit/Debit Card, or Wallet) via Razorpay:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#FF8A00] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#1A1A2E] text-sm">UPI & Wallets</h4>
                    <p className="text-xs text-gray-500 mt-1">Processed within <strong>24 - 48 hours</strong>.</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#1A1A2E] text-sm">Cards & Net Banking</h4>
                    <p className="text-xs text-gray-500 mt-1">Processed within <strong>5 - 7 business days</strong> as per bank guidelines.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">4. Order Cancellation Policy</h2>
              <p>
                Since our products are instant digital downloads (PDF files), orders are fulfilled immediately upon successful payment. Once an order is processed, instant cancellation before delivery is not applicable. However, you remain fully covered by our <strong>30-Day Money Back Guarantee</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">5. Contact Support</h2>
              <p className="mb-2">For any questions or assistance regarding refunds and cancellations, contact us:</p>
              <div className="bg-[#F0FFF4] p-4 rounded-2xl border border-[#BBF7D0] text-sm text-[#1A1A2E]">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#4CAF50]" />
                  <strong>Email:</strong> {siteConfig.brand.email}
                </p>
                <p className="mt-1 text-xs text-gray-500">Support Hours: Monday to Saturday, 9:00 AM – 6:00 PM IST</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </CheckoutProvider>
  );
}
