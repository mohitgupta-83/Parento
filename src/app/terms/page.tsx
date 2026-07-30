import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { siteConfig } from "@/config/site";
import { FileText, ShieldCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions — Parento",
  description: "Read the Terms & Conditions governing the use of Parento's website and digital product purchases.",
};

export default function TermsConditionsPage() {
  return (
    <CheckoutProvider>
      <Header />

      <main className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 text-[#1A1A2E]">
          {/* Header */}
          <div className="border-b border-gray-100 pb-6 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EFF6FF] px-4 py-1.5 text-xs font-semibold text-[#3B82F6] mb-3">
              <FileText className="w-3.5 h-3.5" /> User Agreement
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E]">
              Terms & Conditions
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-sm sm:text-base text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing or using <strong>{siteConfig.brand.name}</strong> (&quot;Website&quot;) at <strong>{siteConfig.brand.url}</strong> or purchasing our digital products, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">2. Digital Product License & Use</h2>
              <p className="mb-2">
                Upon purchasing the <strong>{siteConfig.product.name}</strong>, you are granted a non-exclusive, non-transferable, personal license to download, print, and use the worksheets for personal, educational, classroom, tutoring, or homeschooling purposes.
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Permitted Use:</strong> Unlimited printing for your children, students, or tutoring classes.</li>
                <li><strong>Prohibited Use:</strong> You may NOT resell, redistribute, re-license, share digital ZIP/PDF files publicly, or claim ownership of the materials.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">3. Pricing & Payments</h2>
              <p>
                All prices are listed in Indian Rupees (INR ₹). Payment is a one-time charge for lifetime access to the purchased worksheet bundle. Payments are processed securely via <strong>Razorpay Payment Gateway</strong> using UPI, Credit/Debit cards, Net Banking, or Wallets.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">4. Intellectual Property</h2>
              <p>
                All content, illustrations, design elements, worksheet layouts, and branding trademarks on this website are the intellectual property of <strong>{siteConfig.brand.name}</strong> and are protected by applicable copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">5. Limitation of Liability</h2>
              <p>
                We strive to maintain maximum website uptime and accurate educational content. However, {siteConfig.brand.name} shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our products or website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">6. Governing Law & Jurisdiction</h2>
              <p>
                These Terms & Conditions shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">7. Contact Information</h2>
              <p className="mb-2">If you have any questions about these Terms & Conditions, please contact us:</p>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-sm text-[#1A1A2E]">
                <p><strong>Brand:</strong> {siteConfig.brand.name}</p>
                <p className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-[#FF8A00]" />
                  <strong>Email:</strong> {siteConfig.brand.email}
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </CheckoutProvider>
  );
}
