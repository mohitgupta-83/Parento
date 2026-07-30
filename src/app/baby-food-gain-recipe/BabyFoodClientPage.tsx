"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CheckoutProvider, useCheckout } from "@/context/CheckoutContext";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  CheckCircle2,
  ShieldCheck,
  Star,
  Lock,
  Award,
  BookOpen,
  Utensils,
  CalendarDays,
  Smartphone,
  Infinity,
  Users,
  Baby,
  ChefHat,
  Heart,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FacebookPixel } from "@/lib/pixel";

/* ── Conversion overlays (lazy) ────────────────────────────── */
const UrgencyBanner = dynamic(() => import("@/components/conversion/urgency-banner").then(m => ({ default: m.UrgencyBanner })));
const ExitIntentPopup = dynamic(() => import("@/components/conversion/exit-intent").then(m => ({ default: m.ExitIntentPopup })));
const RecentPurchasePopup = dynamic(() => import("@/components/conversion/recent-purchase").then(m => ({ default: m.RecentPurchasePopup })));

/* ── Product-specific data ─────────────────────────────────── */
const product = {
  name: "Healthy Weight Gain Recipes For Children (6 Months – 3 Years)",
  shortName: "Baby Food Recipe Ebook",
  price: 299,
  originalPrice: 499,
  discount: "90% OFF",
  currency: "₹",
  thumbnail: "/images/baby-food/thumbnail.png",
  previews: [
    "/images/baby-food/preview-1.jpg",
    "/images/baby-food/preview-2.jpg",
  ],
};

const highlights = [
  { icon: BookOpen, label: "Digital Ebook" },
  { icon: Utensils, label: "100+ Recipe Ideas" },
  { icon: ChefHat, label: "Free Bonus 200+ Recipes" },
  { icon: CalendarDays, label: "Daily Meal Plan" },
  { icon: Smartphone, label: "Mobile Friendly Format" },
  { icon: Infinity, label: "Lifetime Access" },
];

const includedRecipes = [
  { title: "Breakfast Recipes", desc: "Easy morning options packed with healthy fats & proteins", icon: "🥞" },
  { title: "Lunch & Dinner Ideas", desc: "Balanced Indian meals tailored for 6 months to 3 years", icon: "🍲" },
  { title: "Snack Recipes", desc: "Quick weight-gaining snacks between main meals", icon: "🍌" },
  { title: "Family-Friendly Options", desc: "Meals the whole family can enjoy together", icon: "👨‍👩‍👧" },
  { title: "Common Indian Kitchen Ingredients", desc: "Simple ingredients available anywhere", icon: "🧄" },
  { title: "Practical Meal Planning Tips", desc: "Step-by-step feeding strategies for fussy eaters", icon: "💡" },
];

const bonusBooks = [
  {
    title: "Healthy Bites for Little Tummies",
    badge: "EBOOK 1",
    desc: "100+ Nutritious Indian Recipes tailored for Toddlers (6M – 3Y)",
    price: "₹199",
    tag: "Included Free",
  },
  {
    title: "Toddler Foods (9-12 Months) Weight Gain",
    badge: "EBOOK 2",
    desc: "Age-specific high-nutrient feeding routines & calorie dense meals",
    price: "₹149",
    tag: "Included Free",
  },
  {
    title: "Food Recipes Collection + Daily Meal Plan",
    badge: "EBOOK 3",
    desc: "Bonus 200+ digital recipe guide with structured daily meal plans",
    price: "₹149",
    tag: "Included Free",
  },
];

const customerReviews = [
  {
    name: "Priya Sharma",
    avatar: "/avatars/female-1.jpg",
    rating: 5,
    location: "Mumbai",
    review: "My 14-month-old daughter was a very picky eater and losing weight. After trying these easy Indian recipes, she started eating with joy! Highly recommend for every Indian mom.",
  },
  {
    name: "Rajesh Kumar",
    avatar: "/avatars/male-1.jpg",
    rating: 5,
    location: "Delhi",
    review: "Very practical meal ideas using everyday kitchen items. The daily meal plan guide saved us so much confusion. Great value for ₹299!",
  },
  {
    name: "Anita Patel",
    avatar: "/avatars/female-2.jpg",
    rating: 5,
    location: "Ahmedabad",
    review: "The 3 ebooks included in the bundle are super useful. Healthy recipes, simple steps, and my 2-year-old loves the weight gain smoothies and khichdi variations.",
  },
  {
    name: "Neha Gupta",
    avatar: "/avatars/female-3.jpg",
    rating: 5,
    location: "Bengaluru",
    review: "Best investment for new parents. Instant PDF download on WhatsApp & email. Simple, quick recipes that actually work for Indian toddlers.",
  },
];

const stickyBuyNames = [
  "Sneha S. (Delhi)",
  "Pooja M. (Mumbai)",
  "Vikram K. (Bengaluru)",
  "Ananya R. (Hyderabad)",
  "Rohan G. (Pune)",
  "Meera P. (Ahmedabad)",
  "Kavita T. (Chennai)",
  "Siddharth V. (Kolkata)",
  "Divya N. (Jaipur)",
  "Arjun B. (Chandigarh)",
  "Sunita M. (Lucknow)",
  "Amit H. (Indore)",
  "Bhavna S. (Surat)",
  "Karan D. (Nagpur)",
  "Tarun K. (Kochi)",
];

/* ── Sticky Bottom Buy Button with Timer ─────────────────── */
function StickyBabyFoodBuyButton({ price }: { price: number }) {
  const { openCheckout } = useCheckout();
  const [timeLeft, setTimeLeft] = useState({ minutes: 12, seconds: 45 });
  const [purchaserIndex, setPurchaserIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return { minutes: 14, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const buyerTimer = setInterval(() => {
      setPurchaserIndex((prev) => (prev + 1) % stickyBuyNames.length);
    }, 8000);
    return () => clearInterval(buyerTimer);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl p-3 sm:p-4"
      >
        <div className="mx-auto max-w-5xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col">
              <span className="text-[11px] font-bold text-[#FF8A00] flex items-center gap-1">
                <Clock className="w-3 h-3 animate-pulse" /> Offer Ends In:{" "}
                <span className="font-mono bg-[#FFF7ED] px-1.5 py-0.5 rounded border border-[#FFEDD5]">
                  {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </span>
              <span className="text-xs text-gray-500 font-medium">
                🛒 {stickyBuyNames[purchaserIndex]} just bought!
              </span>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-[#FF8A00]">{product.currency}{price}</span>
              <span className="text-xs text-gray-400 line-through">{product.currency}{product.originalPrice}</span>
              <span className="text-[10px] font-extrabold text-[#4CAF50] bg-[#F0FFF4] px-2 py-0.5 rounded-full border border-green-200">
                {product.discount}
              </span>
            </div>
          </div>

          <Button
            size="lg"
            pulse
            onClick={openCheckout}
            icon={<ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />}
            className="text-xs sm:text-base py-2.5 sm:py-3 px-4 sm:px-6"
          >
            Get Instant Access — {product.currency}{price}
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Main Page Content ─────────────────────────────────────── */
function BabyFoodPageContent() {
  const { openCheckout } = useCheckout();
  const [price, setPrice] = useState(product.price);
  const [pixelId, setPixelId] = useState("");

  useEffect(() => {
    // Set browser tab title explicitly for client side page transitions
    document.title = "100+ Healthy Weight Gain Recipes For Children (6 Months – 3 Years) | Parento";

    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products)) {
          const item = data.products.find((p: any) => p.slug === "baby-food-gain-recipe");
          if (item) {
            setPrice(299);
            if (item.pixelId) setPixelId(item.pixelId);
          }
        }
      })
      .catch((err) => console.warn("Could not fetch baby food product settings:", err));
  }, []);

  return (
    <>
      <FacebookPixel pixelId={pixelId} productName={product.name} price={price} />

      {/* Conversion Overlays */}
      <UrgencyBanner />
      <ExitIntentPopup />
      <RecentPurchasePopup />

      {/* Sticky Bottom Buy Button */}
      <StickyBabyFoodBuyButton price={price} />

      <main className="min-h-screen bg-[#FAFAFA] pt-20 sm:pt-24 pb-24">
        {/* ── HERO SECTION ─────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[#FFF7ED] via-white to-[#F9FAFB] border-b border-gray-100 pb-12 pt-4">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center">
              
              {/* Left Column (Content) */}
              <div className="lg:col-span-7 flex flex-col order-1 lg:order-1">
                
                {/* 1. Rating & Download Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-[#F59E0B]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-700">
                    4.9/5 Rating (12,500+ Happy Parents)
                  </span>
                </div>

                {/* 2. Headline */}
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] leading-tight mb-3">
                  Healthy Weight Gain Recipes For Children{" "}
                  <span className="text-[#FF8A00] block mt-1">(6 Months – 3 Years)</span>
                </h1>

                {/* 3. Subheadline */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 font-normal">
                  100+ Nutritious Indian Recipes For Toddlers + 200+ Digital Recipe Guide with Daily Meal Plan. Simple ingredients commonly available in Indian kitchens!
                </p>

                {/* 4. PRODUCT BUNDLE IMAGE BOX ON MOBILE */}
                <div className="w-full mb-6 order-4 lg:hidden">
                  <div className="relative rounded-3xl bg-white p-4 shadow-xl border border-gray-100 overflow-hidden text-center">
                    <div className="absolute top-3 right-3 bg-[#FF8A00] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10">
                      3 EBOOKS BUNDLE
                    </div>
                    <img
                      src="/images/product/product-main.webp"
                      alt="Healthy Weight Gain Recipes Bundle"
                      className="w-full max-h-[300px] object-contain mx-auto rounded-2xl"
                    />
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <span className="text-2xl font-extrabold text-[#FF8A00]">{product.currency}{price}</span>
                      <span className="text-sm text-gray-400 line-through">{product.currency}{product.originalPrice}</span>
                      <span className="text-xs font-bold text-[#4CAF50] bg-[#F0FFF4] px-2 py-0.5 rounded-full">
                        {product.discount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5. Primary Purchase CTA Button */}
                <div className="mb-6 order-5 lg:order-5">
                  <Button
                    size="xl"
                    fullWidth
                    pulse
                    onClick={openCheckout}
                    icon={<ShoppingCart className="w-6 h-6" />}
                    className="py-4 sm:py-5 text-base sm:text-lg shadow-xl shadow-[#FF8A00]/25"
                  >
                    Get Instant Access — {product.currency}{price}
                  </Button>
                  <p className="text-center text-xs text-gray-500 mt-2 font-medium">
                    ⚡ Instant Digital Delivery to Email &amp; WhatsApp
                  </p>
                </div>

                {/* 6. Highlights grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6 order-6">
                  {highlights.map((h, i) => {
                    const IconComp = h.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100 shadow-2xs"
                      >
                        <IconComp className="w-4 h-4 text-[#FF8A00] flex-shrink-0" />
                        <span className="text-xs font-semibold text-gray-700">{h.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column (Product Image Desktop) */}
              <div className="hidden lg:block lg:col-span-5 order-2 lg:order-2">
                <div className="relative rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 text-center">
                  <div className="absolute top-4 right-4 bg-[#FF8A00] text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                    3 EBOOKS INCLUDED
                  </div>
                  <img
                    src="/images/product/product-main.webp"
                    alt="Healthy Weight Gain Recipes Bundle"
                    className="w-full max-h-[380px] object-contain mx-auto rounded-2xl"
                  />
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 font-medium">One-Time Payment</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-[#FF8A00]">{product.currency}{price}</span>
                        <span className="text-sm text-gray-400 line-through">{product.currency}{product.originalPrice}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#4CAF50] bg-[#F0FFF4] px-3 py-1 rounded-full border border-green-200">
                      SAVE 80% TODAY
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── WHAT YOU'LL GET SECTION ──────────────────────── */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center mb-8">
              <span className="bg-[#FFF7ED] text-[#FF8A00] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Inside This Ebook Guide
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] mt-2">
                What You&apos;ll Discover Inside
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {includedRecipes.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[#FFF7ED]/50 to-white border border-[#FFEDD5] hover:border-[#FF8A00]/50 transition-all duration-300 shadow-2xs"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h3 className="text-base font-bold text-[#1A1A2E] mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FREE BONUSES SECTION ─────────────────────────── */}
        <section className="py-12 bg-[#FFF7ED]/40 border-y border-[#FFEDD5]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center mb-8">
              <span className="bg-[#FF8A00] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                🎁 3 EBOOKS BUNDLE INCLUDED FREE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] mt-2">
                Plus, You Get All 3 Ebooks PDF Included Free
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {bonusBooks.map((bonus, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-extrabold text-[#FF8A00] bg-[#FFF7ED] px-2.5 py-0.5 rounded-full border border-[#FFEDD5]">
                        {bonus.badge}
                      </span>
                      <span className="text-xs font-bold text-[#4CAF50] bg-[#F0FFF4] px-2.5 py-0.5 rounded-full border border-green-200">
                        {bonus.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-[#1A1A2E] mb-2">{bonus.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">{bonus.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-400 line-through">Regular: {bonus.price}</span>
                    <span className="font-extrabold text-[#4CAF50]">FREE</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                size="lg"
                pulse
                onClick={openCheckout}
                icon={<ArrowRight className="w-5 h-5" />}
                className="py-3.5 px-8"
              >
                Claim All 3 Ebooks Now — {product.currency}{price}
              </Button>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS (IMAGE ONLY) ────────────────────── */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] mb-6">
              How It Works
            </h2>
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg bg-white p-2">
              <img
                src="/images/process-flow.webp"
                alt="How It Works Process Flow"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* ── REVIEWS & TESTIMONIALS ───────────────────────── */}
        <section className="py-12 bg-[#F9FAFB] border-t border-gray-200">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="bg-[#E8F5E9] text-[#4CAF50] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Real Parent Reviews
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] mt-2">
                Loved by 12,500+ Indian Parents
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {customerReviews.map((rev, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-2xs"
                    />
                    <div>
                      <div className="text-sm font-bold text-[#1A1A2E]">{rev.name}</div>
                      <div className="text-xs text-gray-400">{rev.location}</div>
                    </div>
                    <div className="ml-auto flex text-[#F59E0B]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">{rev.review}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL PURCHASE SECTION ──────────────────────── */}
        <div className="py-12 bg-white text-center">
          <div className="mx-auto max-w-xl px-4">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FFF7ED] to-[#F0FFF4] border-2 border-[#FF8A00] shadow-xl">
              <span className="bg-[#FF8A00] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Instant Digital Access
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] mt-3 mb-2">
                Get 3 Ebooks Bundle Today
              </h2>
              <p className="text-xs text-gray-600 mb-6 font-medium">
                Download all 3 PDF ebooks instantly on your phone, laptop or tablet.
              </p>

              <div className="flex items-baseline justify-center gap-2 mb-6">
                <span className="text-4xl font-extrabold text-[#FF8A00]">{product.currency}{price}</span>
                <span className="text-base text-gray-400 line-through">{product.currency}{product.originalPrice}</span>
                <span className="text-xs font-bold text-[#4CAF50] bg-[#F0FFF4] px-2.5 py-1 rounded-full border border-green-200">
                  {product.discount}
                </span>
              </div>

              <Button
                size="xl"
                fullWidth
                pulse
                onClick={openCheckout}
                icon={<ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />}
                className="text-base sm:text-lg py-3.5 sm:py-4"
              >
                Get Instant Access — {product.currency}{price}
              </Button>
            </div>
            <p className="text-[11px] text-gray-500 font-medium mt-4">
              ⚡ Instant Download • 🔒 Secure Payment • 💯 30-Day Money Back Guarantee
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-[11px] text-gray-400 max-w-2xl mx-auto pt-6 pb-8">
            This ebook is intended for informational and educational purposes only. Always consult your pediatrician before making changes to your child&apos;s diet.
          </p>
        </div>
      </main>
    </>
  );
}

export default function BabyFoodClientPage() {
  return (
    <CheckoutProvider>
      <Header />
      <BabyFoodPageContent />
      <Footer />
    </CheckoutProvider>
  );
}
