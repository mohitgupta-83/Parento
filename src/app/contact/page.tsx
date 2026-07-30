"use client";

import { useState } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Clock, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setIsSubmitted(true);
    }
  };

  return (
    <CheckoutProvider>
      <Header />

      <main className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Heading */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF7ED] px-4 py-1.5 text-xs font-semibold text-[#FF8A00] mb-3 border border-[#FFEDD5]">
              <Mail className="w-3.5 h-3.5" /> Support & Inquiries
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A1A2E]">
              Get in Touch with Us
            </h1>
            <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
              Have questions about our worksheet bundles, order status, or custom learning materials? We&apos;re here to help!
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Contact Details Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#1A1A2E] to-[#2D2145] text-white p-8 rounded-3xl shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Contact Information</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Reach out via email or WhatsApp. Our support team responds within 2 hours during business operating hours.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#FF8A00]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block font-medium">Customer Support Email</span>
                    <a href={`mailto:${siteConfig.brand.email}`} className="font-semibold hover:text-[#FF8A00] transition-colors">
                      {siteConfig.brand.email}
                    </a>
                  </div>
                </div>



                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#3B82F6]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block font-medium">Working Hours</span>
                    <p className="font-semibold">Mon – Sat: 9:00 AM – 6:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#E91E63]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block font-medium">Location</span>
                    <p className="font-semibold">India</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-white/40">
                🔒 Official Customer Support for {siteConfig.brand.name}
              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#F0FFF4] text-[#4CAF50] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A2E] mb-2">Message Sent! 🎉</h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    Thank you for reaching out. Our support team will get back to you at <strong>{email}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-1">Send Us a Message</h3>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="priya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we help you today?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none text-sm transition-all resize-none"
                    />
                  </div>

                  <Button size="lg" fullWidth type="submit" icon={<Send className="w-4 h-4" />}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </CheckoutProvider>
  );
}
