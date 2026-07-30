import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed! — Your Soulmate Sketch is Being Prepared | AstroJi",
  description: "Thank you for your order! Dr. Shalini Sharma will prepare your personalized Soulmate Sketch and Love Reading and deliver it to your email within 3-5 days.",
  robots: { index: false, follow: false },
};

interface ThankYouPageProps {
  searchParams: Promise<{ order_id?: string; payment_id?: string }>;
}

async function AstroThankYouContent({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const orderId = params.order_id || "order_confirmed";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: "linear-gradient(135deg, #1A0600 0%, #7A2800 50%, #0F0300 100%)" }}>
      <div className="relative w-full max-w-lg text-center">
        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }} />
          ))}
        </div>

        <div className="relative rounded-3xl border-2 p-8 sm:p-10 shadow-2xl"
          style={{ background: "rgba(13,5,25,0.85)", borderColor: "#E8772240", backdropFilter: "blur(20px)" }}>
          <div className="text-6xl mb-4">🔮</div>
          <h1 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: "#E87722" }}>
            Order Confirmed!
          </h1>
          <p className="text-sm text-white/70 mb-6 leading-relaxed">
            Thank you for your order. Dr. Shalini Sharma will personally prepare your <strong className="text-white/90">Personalized Soulmate Sketch</strong> and <strong className="text-white/90">Love Psychic Reading Report</strong> and deliver it to your email within <strong className="text-white/90">3–5 business days</strong>.
          </p>

          <div className="space-y-3 mb-8">
            {[
              { icon: "💌", text: "Your report will be delivered to your registered email" },
              { icon: "🔮", text: "Dr. Shalini personally reviews every reading with care" },
              { icon: "🔒", text: "Your personal details are kept 100% private and secure" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-left px-4 py-3 rounded-xl"
                style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.20)" }}>
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs text-white/65">{item.text}</span>
              </div>
            ))}
          </div>

          {orderId && orderId !== "order_confirmed" && (
            <p className="text-xs text-white/30 mb-4">Order ID: {orderId}</p>
          )}

          <a href="/"
            className="inline-block w-full py-3.5 rounded-2xl font-bold text-sm text-[#1A0600] transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #E87722, #F5A623)" }}>
            ← Back to Home
          </a>

          <div className="mt-6 text-center">
            <span className="text-xl font-black tracking-tight" style={{ color: "#E87722" }}>AstroJi</span>
            <div className="text-[10px] text-white/30 mt-1">Spiritual Love Guidance</div>
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

