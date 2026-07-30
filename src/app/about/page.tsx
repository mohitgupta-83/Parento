import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { siteConfig } from "@/config/site";
import { Heart, Sparkles, Target, Users, ShieldCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Parento",
  description: "Learn about Parento's mission to make early learning fun, screen-free, and affordable for children aged 2–10.",
};

export default function AboutPage() {
  return (
    <CheckoutProvider>
      <Header />

      <main className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 text-[#1A1A2E]">
            <div className="border-b border-gray-100 pb-6 mb-8 text-center sm:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF7ED] px-4 py-1.5 text-xs font-semibold text-[#FF8A00] mb-3 border border-[#FFEDD5]">
                <Heart className="w-3.5 h-3.5 text-[#E91E63] fill-current" /> Where Learning Begins
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E]">
                About {siteConfig.brand.name}
              </h1>
              <p className="mt-2 text-base text-gray-600">
                Empowering parents, teachers, and tutors with premium screen-free learning resources.
              </p>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-gray-600 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Our Mission</h2>
                <p>
                  At <strong>{siteConfig.brand.name}</strong>, we believe every child deserves access to high-quality, engaging, and joyful learning experiences. In today&apos;s digital age, children spend hours on smartphone and tablet screens. Our mission is to help parents turn excessive screen time into productive, hands-on paper learning time.
                </p>
              </section>

              <section className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="bg-[#FFF7ED] p-6 rounded-2xl border border-[#FFEDD5]">
                  <div className="w-10 h-10 rounded-xl bg-[#FF8A00] text-white flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-base mb-1">15,000+ Worksheets</h3>
                  <p className="text-xs text-gray-600">
                    Comprehensive practice sheets covering Alphabet, Math, Phonics, Tracing, Science, Hindi, Reading & Brain Games.
                  </p>
                </div>

                <div className="bg-[#F0FFF4] p-6 rounded-2xl border border-[#BBF7D0]">
                  <div className="w-10 h-10 rounded-xl bg-[#4CAF50] text-white flex items-center justify-center mb-3">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-base mb-1">Ages 2 to 10 Years</h3>
                  <p className="text-xs text-gray-600">
                    Age-appropriately structured materials for toddlers, preschoolers, kindergarteners, and primary school kids.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Who We Serve</h2>
                <p className="mb-3">
                  Our digital printable worksheet bundles are trusted by over <strong>12,500+ parents, mothers, teachers, tutors, and homeschooling families</strong> across India.
                </p>
                <ul className="list-disc pl-6 space-y-1.5">
                  <li><strong>Parents & Mothers:</strong> Looking for fun daily practice sheets to keep children engaged without gadgets.</li>
                  <li><strong>Teachers & Schools:</strong> Needing ready-to-print supplementary exercises for kindergarten and early primary classes.</li>
                  <li><strong>Tutors & Coaching Centers:</strong> Supplementing tuition sessions with high quality structured practice worksheets.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Commitment to Quality & Security</h2>
                <p>
                  We prioritize user trust and security. All transactions on our site are secured using 256-bit SSL encryption via Razorpay. We offer a 30-Day Money Back Guarantee to ensure every customer is 100% happy with their purchase.
                </p>
              </section>

              <section className="pt-4 border-t border-gray-100">
                <h3 className="font-bold text-[#1A1A2E] text-base mb-2">Get in Touch</h3>
                <p className="text-xs text-gray-500 mb-2">Have a question or feedback? We&apos;d love to hear from you!</p>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-sm text-[#1A1A2E]">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#FF8A00]" />
                    <strong>Email:</strong> {siteConfig.brand.email}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </CheckoutProvider>
  );
}
