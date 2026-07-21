"use client";

import dynamic from "next/dynamic";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { SocialProof } from "@/components/sections/social-proof";
import { Categories } from "@/components/sections/categories";

// Lazy-loaded sections for performance
const PreviewGallery = dynamic(() => import("@/components/sections/preview-gallery").then(m => ({ default: m.PreviewGallery })), {
  loading: () => <SectionSkeleton />,
});
const Audience = dynamic(() => import("@/components/sections/audience").then(m => ({ default: m.Audience })), {
  loading: () => <SectionSkeleton />,
});
const Benefits = dynamic(() => import("@/components/sections/benefits").then(m => ({ default: m.Benefits })), {
  loading: () => <SectionSkeleton />,
});
const Bonuses = dynamic(() => import("@/components/sections/bonuses").then(m => ({ default: m.Bonuses })), {
  loading: () => <SectionSkeleton />,
});
const Features = dynamic(() => import("@/components/sections/features").then(m => ({ default: m.Features })), {
  loading: () => <SectionSkeleton />,
});
const HowItWorks = dynamic(() => import("@/components/sections/how-it-works").then(m => ({ default: m.HowItWorks })), {
  loading: () => <SectionSkeleton />,
});
const FAQ = dynamic(() => import("@/components/sections/faq").then(m => ({ default: m.FAQ })), {
  loading: () => <SectionSkeleton />,
});
const Testimonials = dynamic(() => import("@/components/sections/testimonials").then(m => ({ default: m.Testimonials })), {
  loading: () => <SectionSkeleton />,
});
const Guarantee = dynamic(() => import("@/components/sections/guarantee").then(m => ({ default: m.Guarantee })), {
  loading: () => <SectionSkeleton />,
});
const FinalCTA = dynamic(() => import("@/components/sections/final-cta").then(m => ({ default: m.FinalCTA })), {
  loading: () => <SectionSkeleton />,
});
const Footer = dynamic(() => import("@/components/sections/footer").then(m => ({ default: m.Footer })), {
  loading: () => <SectionSkeleton />,
});

// Conversion components
const UrgencyBanner = dynamic(() => import("@/components/conversion/urgency-banner").then(m => ({ default: m.UrgencyBanner })));
const StickyBuyButton = dynamic(() => import("@/components/conversion/sticky-buy").then(m => ({ default: m.StickyBuyButton })));
const ExitIntentPopup = dynamic(() => import("@/components/conversion/exit-intent").then(m => ({ default: m.ExitIntentPopup })));
const RecentPurchasePopup = dynamic(() => import("@/components/conversion/recent-purchase").then(m => ({ default: m.RecentPurchasePopup })));
const FloatingWhatsApp = dynamic(() => import("@/components/conversion/floating-whatsapp").then(m => ({ default: m.FloatingWhatsApp })));

function SectionSkeleton() {
  return (
    <div className="py-20 flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-[#FF8A00]/20 border-t-[#FF8A00] rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  return (
    <CheckoutProvider>
      {/* Conversion Overlays */}
      <UrgencyBanner />
      <StickyBuyButton />
      <ExitIntentPopup />
      <RecentPurchasePopup />
      <FloatingWhatsApp />

      {/* Main Content */}
      <Header />

      <main>
        <Hero />
        <TrustBar />
        <SocialProof />
        <Categories />
        <PreviewGallery />
        <Audience />
        <Benefits />
        <Bonuses />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Guarantee />
        <FinalCTA />
      </main>

      <Footer />
    </CheckoutProvider>
  );
}
