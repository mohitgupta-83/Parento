import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { siteConfig } from "@/config/site";
import { Truck, Download, Zap, Mail, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Digital Delivery Policy — Parento",
  description: "Read Parento's Shipping & Digital Delivery Policy. Learn how your 15,000+ printable kids worksheets are delivered instantly after payment.",
};

export default function ShippingPolicyPage() {
  return (
    <CheckoutProvider>
      <Header />

      <main className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 text-[#1A1A2E]">
          {/* Header */}
          <div className="border-b border-gray-100 pb-6 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EFF6FF] px-4 py-1.5 text-xs font-semibold text-[#3B82F6] mb-3">
              <Zap className="w-3.5 h-3.5" /> Instant Digital Delivery
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E]">
              Shipping & Digital Delivery Policy
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-sm sm:text-base text-gray-600 leading-relaxed">
            <section className="bg-[#FFF7ED] p-6 rounded-2xl border border-[#FFEDD5]">
              <h2 className="text-lg font-bold text-[#FF8A00] flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" /> 100% Digital Products — No Physical Shipping
              </h2>
              <p className="text-sm text-gray-700">
                All items sold on <strong>{siteConfig.brand.name}</strong> (including the {siteConfig.product.name}) are <strong>digital products</strong> provided in PDF and ZIP download formats. No physical goods or packages will be shipped to your physical address.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">1. Instant Delivery Timeline</h2>
              <p>
                Delivery of your digital worksheet bundle is <strong>instant</strong>. As soon as your payment of <strong>₹{siteConfig.product.price}</strong> is successfully processed via Razorpay:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>You are immediately redirected to the <strong>Thank You & Access Page</strong> containing a 1-click download button to save the full PDF bundle onto your device (phone, laptop, tablet).</li>
                <li>An automated confirmation email containing your permanent access download link is sent to the email address provided during checkout.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">2. Shipping Charges & Fees</h2>
              <p>
                Because all our products are delivered electronically via internet download, there are <strong>zero shipping charges</strong>, no handling fees, and no taxes added at checkout. The price displayed on our website is the final complete price.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">3. Delivery Troubleshooting</h2>
              <p className="mb-2">If you do not see your download link or confirmation email within 5 minutes of completing your purchase:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Check your email <strong>Spam / Junk / Promotions</strong> folders.</li>
                <li>Ensure you entered your email address correctly during checkout.</li>
                <li>Contact our dedicated customer support with your payment transaction ID or phone number.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">4. Customer Support Contact</h2>
              <p className="mb-2">If you experience any issues downloading or opening your files, please contact us for instant resolution:</p>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-sm text-[#1A1A2E]">
                <p><strong>Brand:</strong> {siteConfig.brand.name}</p>
                <p className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-[#FF8A00]" />
                  <strong>Email:</strong> {siteConfig.brand.email}
                </p>
                <p className="mt-1"><strong>WhatsApp Support:</strong> {siteConfig.brand.whatsapp}</p>
                <p className="mt-1 text-xs text-gray-500">Support Response Time: Under 2 hours during working hours (9:00 AM – 6:00 PM IST)</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </CheckoutProvider>
  );
}
