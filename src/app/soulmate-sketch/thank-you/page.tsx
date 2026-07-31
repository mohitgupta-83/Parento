"use client";

import { Suspense, useEffect, use } from "react";
import { siteConfig } from "@/config/site";
import { trackMetaEvent, FacebookPixel } from "@/lib/pixel";

interface ThankYouPageProps {
  searchParams: Promise<{ order_id?: string; payment_id?: string }>;
}

function AstroThankYouContent({ searchParams }: ThankYouPageProps) {
  const params = use(searchParams);
  const orderId = params.order_id || "order_confirmed";

  useEffect(() => {
    trackMetaEvent("Purchase", {
      content_name: "Personalized Soulmate Sketch + Free Love Psychic Reading",
      value: 199,
      currency: "INR",
      order_id: orderId,
    });
  }, [orderId]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(135deg, #1A0600 0%, #5A1E00 50%, #120200 100%)" }}>
      <FacebookPixel pixelId="995873696488301" productName="Personalized Soulmate Sketch + Free Love Psychic Reading" price={199} />
      <div className="relative w-full max-w-xl text-center">
        {/* Twinkling stars background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(28)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.15,
                animationDelay: `${Math.random() * 3}s`,
              }} />
          ))}
        </div>

        <div className="relative rounded-3xl border-2 p-8 sm:p-10 shadow-2xl"
          style={{ background: "rgba(26,6,0,0.92)", borderColor: "#E8772235", backdropFilter: "blur(20px)" }}>

          {/* Success icon */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <img src="/images/soulmate-sketch/astro-logo.png" alt="AstroJi" className="h-12 w-12 object-contain"
              style={{ filter: "drop-shadow(0 0 8px rgba(232,119,34,0.7))" }} />
            <div className="text-5xl">✅</div>
          </div>

          {/* Main heading */}
          <h1 className="text-2xl sm:text-3xl font-black mb-1" style={{ color: "#E87722" }}>
            Payment Successful! 🎉
          </h1>
          <p className="text-base font-bold text-white mb-1">Thank You for Trusting AstroJi ❤️</p>

          {/* Contact email display */}
          <p className="text-xs text-[#F5A623] font-medium mb-3">
            Support Email: <a href={`mailto:${siteConfig.brand.email}`} className="underline hover:text-white font-bold">{siteConfig.brand.email}</a>
          </p>

          {/* Delivery promise box */}
          <div className="my-5 p-4 rounded-2xl border"
            style={{ background: "rgba(232,119,34,0.10)", borderColor: "#E8772240" }}>
            <div className="text-2xl mb-2">⏰</div>
            <p className="text-sm font-extrabold text-white leading-snug">
              Your Soulmate Sketch &amp; Love Reading Report<br />
              <span style={{ color: "#F5A623" }}>will be sent to your email</span>
              <span className="text-white"> within </span>
              <span className="text-2xl font-black" style={{ color: "#E87722" }}>3–4 Hours!</span>
            </p>
            <p className="text-xs text-white/50 mt-2">
              Dr. Shalini Sharma personally prepares every reading with care and intention.
            </p>
          </div>

          {/* Step-by-step what happens next */}
          <div className="space-y-3 mb-6 text-left">
            {[
              { icon: "🔮", title: "Reading in Progress", desc: "Dr. Shalini Sharma has received your details and is now preparing your personalized Soulmate Sketch." },
              { icon: "💌", title: "Delivered to Your Email", desc: "Your complete Soulmate Portrait + Love Psychic Reading Report will be emailed to your inbox within 3–4 hours." },
              { icon: "🔒", title: "100% Private & Secure", desc: "Your personal details (name, DOB, gender) are kept completely confidential. We never share your data." },
              { icon: "✉️", title: "Contact Support", desc: `If you have any questions, reach out anytime to ${siteConfig.brand.email}.` },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl"
                style={{ background: "rgba(232,119,34,0.07)", border: "1px solid rgba(232,119,34,0.18)" }}>
                <span className="text-lg mt-0.5 flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-xs font-extrabold mb-0.5" style={{ color: "#F5A623" }}>{item.title}</div>
                  <div className="text-xs text-white/55 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Order ID */}
          {orderId && orderId !== "order_confirmed" && (
            <p className="text-xs text-white/25 mb-4">Order Reference: {orderId}</p>
          )}

          {/* Back home button */}
          <a href="/soulmate-sketch"
            className="inline-block w-full py-3.5 rounded-2xl font-extrabold text-sm transition-all hover:scale-[1.02] mb-3"
            style={{ background: "linear-gradient(135deg, #E87722, #F5A623)", color: "#1A0600" }}>
            🔮 Explore More Readings
          </a>
          <a href="/"
            className="inline-block w-full py-3 rounded-2xl font-bold text-xs text-white/50 hover:text-white/80 transition-colors">
            ← Back to Home
          </a>

          {/* Brand footer */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <img src="/images/soulmate-sketch/astro-logo.png" alt="AstroJi" className="h-8 w-8 object-contain mx-auto mb-1" />
            <span className="text-base font-black" style={{ color: "#E87722" }}>AstroJi</span>
            <div className="text-[10px] text-white/30 mt-0.5">Spiritual Love Guidance • {siteConfig.brand.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AstroThankYouPage(props: ThankYouPageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "#0F0300" }}>
        <div className="w-10 h-10 border-4 rounded-full animate-spin"
          style={{ borderColor: "rgba(201,168,76,0.2)", borderTopColor: "#E87722" }} />
      </div>
    }>
      <AstroThankYouContent searchParams={props.searchParams} />
    </Suspense>
  );
}

