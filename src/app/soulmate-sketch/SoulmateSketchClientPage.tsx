"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Star, Clock, Heart, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { FacebookPixel } from "@/lib/pixel";

/* -- Lazy load conversion overlays -------------------------------- */
const ExitIntentPopup = dynamic(() =>
  import("@/components/conversion/exit-intent").then((m) => ({ default: m.ExitIntentPopup }))
);
const RecentPurchasePopup = dynamic(() =>
  import("@/components/conversion/recent-purchase").then((m) => ({ default: m.RecentPurchasePopup }))
);

/* Brand — extracted from Nakshatra zodiac wheel logo:
   Deep amber-orange primary, saffron gold accent,
   dark maroon/burnt-brown background tones             */
const BRAND_GOLD = "#E87722";   // deep amber-orange
const BRAND_SAFFRON = "#F5A623"; // bright saffron gold
const BRAND_DARK = "#1A0600";   // deep maroon-black
const BRAND_MID = "#7A2800";    // dark burnt orange
const BRAND_RED = "#C04A00";    // deep crimson-orange

/* Product Data */
const product = {
  name: "Personalized Soulmate Sketch + Free Love Psychic Reading",
  price: 1,
  originalPrice: 1999,
  currency: "₹",
  thumbnail: "/images/soulmate-sketch/Thumbnail.png",
};

const whatYouGet = [
  { icon: "🎨", title: "Personalized Soulmate Portrait", desc: "A hand-crafted intuitive portrait of your destined soulmate, drawn from spiritual insight" },
  { icon: "❤️", title: "In-Depth Love Reading", desc: "Deep psychic reading about your romantic energy, emotional patterns and love potential" },
  { icon: "🌟", title: "Life Path & Relationship Insights", desc: "Understand your relationship destiny and emotional journey ahead" },
  { icon: "🔤", title: "Soulmate Initials (2 Letters)", desc: "Discover the potential initials of your future soulmate name" },
  { icon: "🧘", title: "Simple Spiritual Guidance & Remedies", desc: "Practical spiritual practices to attract love and open your heart chakra" },
  { icon: "📧", title: "Digital Delivery to Email", desc: "Complete report and portrait delivered directly to your inbox within 3-5 days" },
];

const trustPoints = [
  { icon: "✨", text: "10+ Years Experience" },
  { icon: "👥", text: "10,000+ Happy Clients" },
  { icon: "🌍", text: "Clients Worldwide" },
  { icon: "🔒", text: "100% Privacy Guaranteed" },
  { icon: "💌", text: "Digital Email Delivery" },
  { icon: "⭐", text: "4.9/5 Average Rating" },
];

const testimonials = [
  { name: "Navya Singh Chandel", avatar: "/avatars/astro-female-1.jpg", rating: 5, location: "Delhi",
    review: "I was honestly surprised! The sketch felt so real and emotional. It gave me goosebumps! Truly a magical experience. The reading was incredibly accurate too." },
  { name: "Sachin Gautam", avatar: "/avatars/astro-male-1.jpg", rating: 5, location: "Mumbai",
    review: "This soulmate sketch touched my heart. The process was smooth and the result felt meaningful and beautiful. Dr. Shalini insights were spot on!" },
  { name: "Vinod Kumar", avatar: "/avatars/astro-male-2.png", rating: 5, location: "Bengaluru",
    review: "Such a unique concept! The sketch quality is amazing and it feels full of positive energy. Totally worth it. I shared it with all my friends." },
  { name: "Shalini Parihar", avatar: "/avatars/astro-female-2.jpg", rating: 5, location: "Pune",
    review: "I did not expect much at first, but the detailing and concept blew my mind. It feels deeply personal and special. Will definitely recommend!" },
];

const faqs = [
  { q: "Delivery kitne time mein hogi?",
    a: "Aapka personalized Soulmate Sketch aur Love Reading Report tayaar hone mein 3-5 business days lagte hain. Yeh directly aapki email ID par bheja jayega. Agar koi delay ho toh hum aapko inform karenge." },
  { q: "Kya meri personal details safe rahengi?",
    a: "Bilkul! Aapki saari personal information — naam, date of birth, time of birth — completely private aur secure rakhi jaati hai. Hum kisi bhi third party ke saath aapka data share nahi karte. Aapki privacy hamari pehli priority hai." },
  { q: "Kya yeh 100% accurate hoga?",
    a: "Yeh ek intuitive aur spiritual process hai jo 10+ saalon ke anubhav par based hai. Results deeply personal aur meaningful hote hain. Thousands of clients ne isse transformative experience bataya hai." },
  { q: "Payment ke baad kya karna hoga?",
    a: "Payment ke baad aapko confirmation email milegi. Usmein aapko apni details (Name, Date of Birth, Time of Birth, Gender) submit karne ka link milega. Dr. Shalini personally har report tayaar karti hain." },
];

const stickyBuyNames = [
  "Priya S. (Delhi)", "Rahul M. (Mumbai)", "Ananya K. (Pune)", "Deepa R. (Chennai)",
  "Vikram G. (Bengaluru)", "Sunita P. (Hyderabad)", "Neha J. (Ahmedabad)", "Arjun V. (Kolkata)",
  "Kavita N. (Jaipur)", "Rohan B. (Lucknow)", "Meera T. (Surat)", "Aditya H. (Indore)",
  "Pooja C. (Nagpur)", "Siddharth D. (Kochi)", "Divya L. (Chandigarh)",
];

/* ── AstroJi Checkout Context ──────────────────────────────────── */
interface AstroCheckoutCtx { isOpen: boolean; openCheckout: () => void; closeCheckout: () => void; }
const AstroCtx = createContext<AstroCheckoutCtx | undefined>(undefined);

function useAstroCheckout() {
  const ctx = useContext(AstroCtx);
  if (!ctx) throw new Error("useAstroCheckout must be used within AstroCheckoutProvider");
  return ctx;
}

/* ── AstroJi Checkout Modal ─────────────────────────────────────── */
function AstroCheckoutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [gender, setGender] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = name.trim().length >= 2 && email.includes("@") && phone.trim().length >= 10 && dob && gender;

  const handlePay = async () => {
    if (!isValid) { setFormError("Please fill all required fields: Name, Email, Mobile, Date of Birth, Gender."); return; }
    setFormError(""); setLoading(true);
    try {
      const orderRes = await fetch("/api/create-order", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, amount: product.price, productSlug: "soulmate-sketch" }),
      });
      const orderData = await orderRes.json();
      const rzp = new (window as any).Razorpay({
        key: orderData.key, amount: product.price * 100, currency: "INR",
        name: "AstroJi", description: product.name, order_id: orderData.orderId,
        prefill: { name, email, contact: phone },
        theme: { color: BRAND_GOLD },
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, name, email, phone, dob, tob, gender, productSlug: "soulmate-sketch", amount: product.price }),
          });
          const v = await verifyRes.json();
          if (v.success) window.location.href = "/soulmate-sketch/thank-you";
        },
      });
      rzp.open();
    } catch { setFormError("Payment failed. Please try again."); }
    finally { setLoading(false); }
  };

  const inp = `w-full px-4 py-3 rounded-xl border border-white/15 bg-white/8 text-white placeholder-white/40 focus:border-[#E87722] focus:ring-2 focus:ring-[#E87722]/20 outline-none text-sm transition-all`;
  const lbl = `block text-xs font-bold uppercase tracking-wider mb-1.5` ;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 30 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md z-10 my-auto rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: `linear-gradient(135deg, #1A0600 0%, #7A2800 60%, #1A0600 100%)`, border: `1px solid #E8772230` }}>
            {/* Modal Header */}
            <div className="relative p-6 border-b border-white/10" style={{ background: `linear-gradient(135deg, #C4500020, #E8772215)` }}>
              <button onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm">
                ✕
              </button>
              <div className="flex items-center gap-2 mb-2">
                <img src="/images/soulmate-sketch/astro-logo.png" alt="AstroJi" className="h-8 w-8 object-contain" />
                <span className="text-xs font-black tracking-wider" style={{ color: BRAND_GOLD }}>AstroJi</span>
              </div>
              <h3 className="text-lg font-extrabold text-white pr-10">Soulmate Sketch + Love Reading</h3>
              <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl font-black" style={{ color: BRAND_GOLD }}>₹{product.price}</span>
                <span className="text-sm text-white/35 line-through">₹{product.originalPrice}</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">SAVE 80%</span>
              </div>
            </div>
            {/* Form */}
            <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
              <p className="text-xs text-white/50 text-center">✨ Fill your details to receive your personalized reading</p>
              <div><label className={lbl} style={{ color: BRAND_GOLD }}>Full Name *</label>
                <input type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} className={inp} /></div>
              <div><label className={lbl} style={{ color: BRAND_GOLD }}>Mobile Number *</label>
                <input type="tel" placeholder="10-digit mobile" value={phone} onChange={e => setPhone(e.target.value)} className={inp} maxLength={10} /></div>
              <div><label className={lbl} style={{ color: BRAND_GOLD }}>Email Address *</label>
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className={inp} /></div>
              <div><label className={lbl} style={{ color: BRAND_GOLD }}>Date of Birth *</label>
                <input type="date" value={dob} onChange={e => setDob(e.target.value)} className={inp} /></div>
              <div><label className={lbl} style={{ color: BRAND_GOLD }}>Time of Birth (Optional)</label>
                <input type="time" value={tob} onChange={e => setTob(e.target.value)} className={inp} /></div>
              <div><label className={lbl} style={{ color: BRAND_GOLD }}>Gender *</label>
                <div className="flex gap-3">
                  {["Female", "Male", "Other"].map(g => (
                    <button key={g} onClick={() => setGender(g)} type="button"
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${gender === g ? "text-[#1A0600]" : "text-white/60 hover:border-[#E87722]/50"}`}
                      style={{ background: gender === g ? BRAND_GOLD : "rgba(255,255,255,0.07)", borderColor: gender === g ? BRAND_GOLD : "rgba(255,255,255,0.15)" }}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              {formError && <p className="text-xs text-rose-400 bg-rose-400/10 p-3 rounded-xl">{formError}</p>}
              <button onClick={handlePay} disabled={loading}
                className="w-full py-4 rounded-2xl font-extrabold text-base text-[#1A0600] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl disabled:opacity-70"
                style={{ background: `linear-gradient(135deg, #E87722, #F5A623)` }}>
                {loading ? "Processing..." : "🔮 Proceed to Secure Payment — ₹" + product.price}
              </button>
              <div className="flex items-center justify-center gap-3 text-xs text-white/35 flex-wrap">
                <span>🔒 Secure Payment</span><span>•</span><span>🔐 Privacy Protected</span><span>•</span><span>💌 Email Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ── AstroCheckoutProvider ──────────────────────────────────────── */
function AstroCheckoutProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AstroCtx.Provider value={{ isOpen, openCheckout: () => setIsOpen(true), closeCheckout: () => setIsOpen(false) }}>
      {children}
      <AstroCheckoutModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </AstroCtx.Provider>
  );
}

/* ── AstroJi Header ─────────────────────────────────────────────── */
function AstroHeader() {
  const { openCheckout } = useAstroCheckout();
  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-white/10"
      style={{ background: `linear-gradient(90deg, #1A0600 0%, #5A1E00 50%, #1A0600 100%)`, backdropFilter: "blur(16px)", borderBottomColor: "#E8772230" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Real zodiac wheel logo */}
          <img
            src="/images/soulmate-sketch/astro-logo.png"
            alt="AstroJi"
            className="h-10 w-10 object-contain rounded-full"
            style={{ filter: "drop-shadow(0 0 6px rgba(232,119,34,0.6))" }}
          />
          <div>
            <span className="text-xl font-black tracking-tight" style={{ color: "#E87722" }}>AstroJi</span>
            <div className="text-[10px] -mt-0.5" style={{ color: "#F5A62380" }}>Spiritual Love Guidance</div>
          </div>
        </div>
        <button onClick={openCheckout}
          className="px-4 py-2 rounded-xl text-xs font-black transition-all hover:scale-105 shadow-md"
          style={{ background: `linear-gradient(135deg, #E87722, #F5A623)`, color: "#1A0600" }}>
          🔮 Get My Reading
        </button>
      </div>
    </header>
  );
}

/* ── Sticky Bottom Bar ──────────────────────────────────────────── */
function StickyAstroBuyButton() {
  const { openCheckout } = useAstroCheckout();
  const [timeLeft, setTimeLeft] = useState({ minutes: 27, seconds: 36 });
  const [tickerIdx, setTickerIdx] = useState(0);

  useEffect(() => {
    const KEY = "parento_astro_timer_27m";
    const DURATION = (27 * 60 + 36) * 1000;
    let endTime = parseInt(localStorage.getItem(KEY) || "0", 10);
    if (!endTime || endTime < Date.now()) {
      endTime = Date.now() + DURATION;
      localStorage.setItem(KEY, endTime.toString());
    }
    const tick = () => {
      const diff = Math.max(0, endTime - Date.now());
      if (diff === 0) {
        const newEnd = Date.now() + DURATION;
        localStorage.setItem(KEY, newEnd.toString());
        setTimeLeft({ minutes: 27, seconds: 36 });
      } else {
        setTimeLeft({ minutes: Math.floor(diff / 60000), seconds: Math.floor((diff % 60000) / 1000) });
      }
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTickerIdx(p => (p + 1) % stickyBuyNames.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}
        className="fixed bottom-0 left-0 right-0 z-40 border-t-2"
        style={{ background: "#1A0600", borderTopColor: "#E87722" }}>
        <div className="px-4 py-1.5 flex items-center justify-between" style={{ background: "#120200" }}>
          <div className="flex items-center gap-1.5 text-xs font-bold text-white/60">
            <Clock className="w-3.5 h-3.5 animate-pulse" style={{ color: "#E87722" }} />
            <span>Limited Offer Ends In:</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-lg font-mono font-black text-sm border"
            style={{ background: "#7A2800", color: "#E87722", borderColor: "#E8772230" }}>
            <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
            <span>:</span>
            <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
          </div>
        </div>
        <div className="px-4 py-3 flex items-center justify-between gap-3 max-w-5xl mx-auto">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black" style={{ color: "#E87722" }}>₹{product.price}</span>
              <span className="text-xs text-white/30 line-through">₹{product.originalPrice}</span>
              <span className="text-[10px] font-bold text-emerald-400">80% OFF</span>
            </div>
            <div className="text-[10px] text-white/35 hidden sm:block">🛒 {stickyBuyNames[tickerIdx]} just ordered!</div>
          </div>
          <button onClick={openCheckout}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-sm text-[#1A0600] transition-all hover:scale-105 active:scale-95 shadow-lg"
            style={{ background: `linear-gradient(135deg, #E87722, #F5A623)` }}>
            🔮 Get My Soulmate Sketch
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Stars Background ───────────────────────────────────────────── */
function StarsBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(35)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`,
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 3}s`,
            opacity: Math.random() * 0.5 + 0.15,
          }} />
      ))}
    </div>
  );
}

/* ── Main Page Content ──────────────────────────────────────────── */
function SoulmatePageContent() {
  const { openCheckout } = useAstroCheckout();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen pt-16 pb-32" style={{ background: "#120200", color: "#fff" }}>

      {/* HERO */}
      <section className="relative pt-8 pb-14 overflow-hidden"
        style={{ background: `linear-gradient(180deg, #1A0600 0%, #120200 100%)` }}>
        <StarsBg />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex justify-center mb-5">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border"
              style={{ background: "#C4500018", borderColor: "#C4500035", color: "#E87722" }}>
              ⭐ 4.9/5 Rating &nbsp;•&nbsp; 10,000+ Happy Clients Worldwide
            </div>
          </div>
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center">
            {/* Left */}
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4 text-center lg:text-left">
                Get Your Personalized{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, #E87722, #F5A623)` }}>
                  Soulmate
                </span>
                {" "}❤️ Sketch
                <span className="block text-2xl sm:text-3xl lg:text-4xl mt-1 text-white/75">
                  + Free Love ❤️ Psychic Reading ❤️
                </span>
              </h1>
              <p className="text-sm sm:text-base text-white/55 leading-relaxed mb-6 text-center lg:text-left max-w-xl">
                ❤️ Discover who your soulmate might be. Receive a personalized spiritual portrait, in-depth love reading, 
                and life path insights — all prepared exclusively for you by Dr. Shalini Sharma, Spiritual Intuitive with 10+ years of experience.
              </p>
              {/* Mobile thumbnail */}
              <div className="lg:hidden mb-6 mx-auto max-w-xs">
                <div className="relative rounded-3xl overflow-hidden border-2 p-1 shadow-2xl"
                  style={{ borderColor: "#E8772235", background: `linear-gradient(135deg, #7A2800, #1A0600)` }}>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black z-10 text-[#1A0600]"
                    style={{ background: `linear-gradient(135deg, #E87722, #F5A623)` }}>SPECIAL OFFER</div>
                  <img src={product.thumbnail} alt="Soulmate Sketch" className="w-full max-h-[260px] object-contain rounded-2xl" />
                  <div className="p-3 text-center">
                    <span className="text-2xl font-black" style={{ color: "#E87722" }}>₹{product.price}</span>
                    <span className="text-sm text-white/35 line-through ml-2">₹{product.originalPrice}</span>
                  </div>
                </div>
              </div>
              {/* CTA */}
              <div className="flex flex-col items-center lg:items-start gap-3 mb-6">
                <button onClick={openCheckout}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-black text-[#1A0600] transition-all hover:scale-[1.03] active:scale-[0.97] shadow-2xl"
                  style={{ background: `linear-gradient(135deg, #E87722, #F5A623)`, boxShadow: "0 12px 40px rgba(201,168,76,0.4)" }}>
                  🔮 Reveal My Soulmate — ₹{product.price}
                </button>
                <p className="text-xs text-white/35">⚡ Digital Delivery to Email within 3–5 Days</p>
              </div>
              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {trustPoints.map((tp, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/10"
                    style={{ background: "#ffffff08" }}>
                    <span className="text-sm">{tp.icon}</span>
                    <span className="text-xs text-white/55 font-medium">{tp.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right – desktop */}
            <div className="hidden lg:flex lg:col-span-5 justify-center">
              <div className="relative rounded-3xl overflow-hidden border-2 p-2 shadow-2xl w-full"
                style={{ borderColor: "#E8772235", background: `linear-gradient(135deg, #7A2800, #1A0600)` }}>
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-black z-10 text-[#1A0600]"
                  style={{ background: `linear-gradient(135deg, #E87722, #F5A623)` }}>✨ SPECIAL OFFER</div>
                <img src={product.thumbnail} alt="Soulmate Sketch" className="w-full max-h-[390px] object-contain rounded-2xl" />
                <div className="p-4 text-center border-t border-white/10">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-black" style={{ color: "#E87722" }}>₹{product.price}</span>
                    <span className="text-base text-white/35 line-through">₹{product.originalPrice}</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">SAVE 80%</span>
                  </div>
                  <p className="text-xs text-white/30 mt-1">One-Time Payment • No Subscription</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST IMAGE GALLERY */}
      <section className="py-12" style={{ background: "#1A0500" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-7">
            <span className="px-3 py-1 rounded-full text-xs font-bold border"
              style={{ color: "#E87722", borderColor: "#E8772235", background: "#E8772212" }}>
              ✨ As Seen &amp; Trusted
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold mt-2 text-white">Why Thousands Trust AstroJi</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[1,2,3,4,5,6].map(n => (
              <div key={n} className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img src={`/images/soulmate-sketch/website page image for trust ${n}.png`}
                  alt={`Trust proof ${n}`} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-14" style={{ background: "#120200" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold border"
              style={{ color: "#E87722", borderColor: "#E8772235", background: "#E8772212" }}>🎁 Complete Package</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 text-white">What You Will Receive</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatYouGet.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl border border-white/10 hover:border-[#E87722]/35 transition-all"
                style={{ background: `linear-gradient(135deg, #7A280018, #C4500010)` }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-sm font-extrabold mb-1" style={{ color: "#E87722" }}>{item.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button onClick={openCheckout}
              className="px-10 py-4 rounded-2xl font-extrabold text-base text-[#1A0600] transition-all hover:scale-105 shadow-xl"
              style={{ background: `linear-gradient(135deg, #E87722, #F5A623)` }}>
              ❤️ Yes! I Want My Soulmate Sketch — ₹{product.price}
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT DR. SHALINI */}
      <section className="py-14" style={{ background: "#1A0500" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-3xl border border-white/10 p-8"
            style={{ background: `linear-gradient(135deg, #7A280028, #1A0600)` }}>
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl border-2"
                style={{ background: "#7A2800", borderColor: "#E8772245" }}>🌟</div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 border"
                style={{ color: "#E87722", borderColor: "#E8772235", background: "#E8772212" }}>About Me</div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-1">Dr. Shalini Sharma</h2>
              <p className="text-xs font-bold" style={{ color: "#E87722" }}>
                Spiritual Intuitive • Love Guidance Specialist • Portrait Artist
              </p>
            </div>
            <div className="space-y-3 text-sm text-white/55 leading-relaxed">
              <p>Hello, I am Dr. Shalini Sharma, a spiritual intuitive, love guidance specialist, and portrait artist with more than <strong className="text-white/85">10 years of experience</strong> helping people explore their relationship journeys.</p>
              <p>Using a blend of intuitive insight, spiritual practices, and artistic interpretation, I create personalized soulmate portraits and relationship readings tailored to each individual.</p>
              <p>Over the years, I have worked with <strong className="text-white/85">thousands of clients worldwide</strong>, helping them gain clarity about love, relationships, emotional growth, and future possibilities.</p>
              <p>Every portrait and reading is prepared with care, attention, and intention to provide a meaningful and personal experience. My mission is to help you gain deeper insight into your love life, discover new possibilities, and move forward with greater confidence, clarity, and self-awareness.</p>
              <p className="text-center pt-2 font-medium" style={{ color: "#E87722" }}>Thank you for allowing me to be part of your journey. ❤️</p>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-3">
              {["✔ Personalized Soulmate Portrait","✔ In-Depth Love Reading","✔ Life Path & Relationship Insights","✔ Potential Soulmate Initials (2 Letters)","✔ Simple Spiritual Guidance & Remedies","✔ Digital Delivery Direct to Your Email"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                  <span className="font-bold" style={{ color: "#E87722" }}>✔</span>
                  <span>{item.replace("✔ ", "")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER FEEDBACK IMAGES */}
      <section className="py-14" style={{ background: "#120200" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-bold border"
              style={{ color: "#E84393", borderColor: "#E8439335", background: "#E8439312" }}>
              💬 Real Customer Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 text-white">See What Our Clients Are Saying</h2>
            <p className="text-xs text-white/35 mt-2">Real screenshots of customer chat feedback</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { n: 1, ext: ".webp" },
              { n: 2, ext: ".jpg" },
              { n: 3, ext: ".jpg" },
              { n: 4, ext: ".jpg" },
            ].map(({ n, ext }) => (
              <motion.div key={n}
                initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: n * 0.1 }}
                className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img src={`/images/soulmate-sketch/Customer feedback image ${n}${ext}`}
                  alt={`Customer feedback ${n}`} className="w-full h-auto object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-14" style={{ background: "#1A0500" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold border"
              style={{ color: "#E87722", borderColor: "#E8772235", background: "#E8772212" }}>⭐ Testimonials</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 text-white">Loved by 10,000+ Happy Clients</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-white/10"
                style={{ background: `linear-gradient(135deg, #7A280022, #1A0600)` }}>
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2"
                    style={{ borderColor: "#E8772245" }} />
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-white/35">{t.location}</div>
                  </div>
                  <div className="ml-auto flex" style={{ color: "#E87722" }}>
                    {[...Array(t.rating)].map((_, si) => <Star key={si} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                </div>
                <p className="text-xs text-white/55 leading-relaxed">{t.review}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14" style={{ background: "#120200" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold border"
              style={{ color: "#E87722", borderColor: "#E8772235", background: "#E8772212" }}>❓ FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-white/10 overflow-hidden"
                style={{ background: "#7A280018" }}>
                <button className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="text-sm font-bold text-white pr-4">{faq.q}</span>
                  <span className="text-lg flex-shrink-0" style={{ color: "#E87722" }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-white/45 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #1A0600, #7A2800, #1A0600)` }}>
        <StarsBg />
        <div className="relative mx-auto max-w-xl px-4">
          <div className="text-5xl mb-4">🔮</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Ready to Discover Your Soulmate?</h2>
          <p className="text-sm text-white/45 mb-8 leading-relaxed">
            Take the next step toward discovering the connection your heart has been waiting for.
          </p>
          <div className="inline-block rounded-3xl border-2 p-8 w-full"
            style={{ borderColor: "#E8772235", background: "#12020078" }}>
            <div className="flex items-baseline justify-center gap-3 mb-2">
              <span className="text-5xl font-black" style={{ color: "#E87722" }}>₹{product.price}</span>
              <span className="text-xl text-white/30 line-through">₹{product.originalPrice}</span>
            </div>
            <span className="text-xs font-bold text-emerald-400">✅ SAVE 80% — Limited Time Offer</span>
            <button onClick={openCheckout}
              className="mt-6 w-full py-4 rounded-2xl font-extrabold text-lg text-[#1A0600] transition-all hover:scale-[1.03] active:scale-[0.97] shadow-2xl"
              style={{ background: `linear-gradient(135deg, #E87722, #F5A623)`, boxShadow: "0 15px 50px rgba(201,168,76,0.35)" }}>
              ❤️ Get My Soulmate Sketch Now
            </button>
            <p className="text-xs text-white/25 mt-4">🔒 Secure Payment &nbsp;•&nbsp; 💌 Email Delivery &nbsp;•&nbsp; 🔐 100% Privacy Protected</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10 text-center" style={{ background: "#120200" }}>
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xl font-black" style={{ color: "#E87722" }}>AstroJi</span>
            <span className="text-white/30 text-sm">• Spiritual Love Guidance</span>
          </div>
          <p className="text-xs text-white/25 mb-4 max-w-lg mx-auto">
            This service is for spiritual and entertainment purposes only. Results are based on intuitive and artistic interpretation. Individual experiences may vary.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/30">
            <a href="/privacy" className="hover:text-white/55 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white/55 transition-colors">Terms of Service</a>
            <a href="/refund" className="hover:text-white/55 transition-colors">Refund Policy</a>
            <a href="/contact" className="hover:text-white/55 transition-colors">Contact Us</a>
          </div>
          <p className="text-[10px] text-white/18 mt-4">© 2025 AstroJi. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

/* ── Root Export ─────────────────────────────────────────────────── */
export default function SoulmateSketchClientPage() {
  return (
    <AstroCheckoutProvider>
      <FacebookPixel pixelId="995873696488301" productName={product.name} price={1} />
      <AstroHeader />
      <StickyAstroBuyButton />
      <SoulmatePageContent />
    </AstroCheckoutProvider>
  );
}


