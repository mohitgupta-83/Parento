// ============================================================
// PARENTO — Central Configuration File
// All content, pricing, reviews, features etc. are editable here.
// ============================================================

export const siteConfig = {
  brand: {
    name: "Parento",
    tagline: "Where Learning Begins",
    logo: "/logo.png",
    url: "https://parento.in",
    email: "hello@parento.in",
    whatsapp: "+919876543210",
    whatsappMessage: "Hi! I have a question about the Parento worksheet bundle.",
  },

  // ── Colors ──────────────────────────────────────────────────
  colors: {
    primary: "#FF8A00",
    secondary: "#4CAF50",
    accent: "#3B82F6",
    background: "#FFFFFF",
    text: "#1A1A2E",
    muted: "#6B7280",
    surface: "#F9FAFB",
  },

  // ── Product ─────────────────────────────────────────────────
  product: {
    name: "15,000+ Printable Kids Worksheets",
    shortName: "Parento Worksheet Bundle",
    price: 199,
    originalPrice: 1999,
    currency: "₹",
    discount: "90% OFF",
    worksheetCount: "15,000+",
    ageRange: "2–10",
    format: "PDF",
    delivery: "Instant Email Delivery",
  },

  // ── Hero ────────────────────────────────────────────────────
  hero: {
    headline: "Turn Screen Time Into Learning Time",
    subheadline:
      "15,000+ Printable Worksheets designed to make learning fun for children aged 2–10.",
    cta: "Get Instant Access",
    secondaryCta: "View Sample Worksheets",
    floatingCards: [
      "✓ Instant Download",
      "✓ Lifetime Access",
      "✓ Printable PDFs",
      "✓ Ages 2–10",
    ],
  },

  // ── Trust Bar ───────────────────────────────────────────────
  trustBar: [
    { icon: "Zap", label: "Instant Download" },
    { icon: "FileText", label: "Printable PDFs" },
    { icon: "Infinity", label: "Lifetime Access" },
    { icon: "ShieldCheck", label: "Secure Checkout" },
    { icon: "Download", label: "Digital Product" },
  ],

  // ── Social Proof ────────────────────────────────────────────
  socialProof: {
    totalDownloads: "47,000+",
    happyParents: "12,500+",
    rating: 4.9,
    totalReviews: 2847,
  },

  // ── Categories / What You'll Get ────────────────────────────
  categories: [
    { icon: "🔤", title: "Alphabet", description: "A-Z tracing, recognition & writing worksheets", color: "#FF8A00" },
    { icon: "🔢", title: "Math", description: "Counting, addition, subtraction & number sense", color: "#4CAF50" },
    { icon: "✏️", title: "Tracing", description: "Lines, curves, letters & shapes tracing sheets", color: "#3B82F6" },
    { icon: "🗣️", title: "Phonics", description: "Letter sounds, blends & phonemic awareness", color: "#E91E63" },
    { icon: "📖", title: "Reading", description: "Sight words, comprehension & reading readiness", color: "#9C27B0" },
    { icon: "📝", title: "Writing", description: "Handwriting, sentence building & creative writing", color: "#FF5722" },
    { icon: "🔬", title: "Science", description: "Nature, animals, weather & fun experiments", color: "#00BCD4" },
    { icon: "🎨", title: "Coloring", description: "Beautiful illustrations for creative coloring", color: "#FF9800" },
    { icon: "🧩", title: "Puzzles", description: "Crosswords, mazes, word searches & more", color: "#795548" },
    { icon: "🧠", title: "Logic", description: "Pattern recognition, sequences & critical thinking", color: "#607D8B" },
    { icon: "✂️", title: "Craft", description: "Cut & paste, origami guides & craft templates", color: "#8BC34A" },
    { icon: "🕉️", title: "Hindi", description: "Hindi varnamala, matras & Hindi writing practice", color: "#F44336" },
    { icon: "🇬🇧", title: "English", description: "Grammar, vocabulary & English language skills", color: "#2196F3" },
    { icon: "📚", title: "Vocabulary", description: "Word building, synonyms, antonyms & more", color: "#673AB7" },
    { icon: "🔷", title: "Shapes", description: "2D & 3D shapes, geometry & spatial awareness", color: "#009688" },
    { icon: "🐾", title: "Animals", description: "Animal facts, habitats & classification activities", color: "#CDDC39" },
    { icon: "📋", title: "Worksheets", description: "Comprehensive practice sheets across all subjects", color: "#FF6F00" },
    { icon: "🎯", title: "Activities", description: "Hands-on learning activities & games", color: "#E040FB" },
    { icon: "🧩", title: "Brain Games", description: "Sudoku, riddles, memory games & brain teasers", color: "#00E676" },
  ],

  // ── Preview Gallery ─────────────────────────────────────────
  previewImages: [
    { src: "/previews/preview-1.webp", alt: "Alphabet tracing worksheet", category: "Alphabet" },
    { src: "/previews/preview-2.webp", alt: "Math counting worksheet", category: "Math" },
    { src: "/previews/preview-3.webp", alt: "Coloring activity page", category: "Coloring" },
    { src: "/previews/preview-4.webp", alt: "Hindi varnamala worksheet", category: "Hindi" },
    { src: "/previews/preview-5.webp", alt: "Science exploration sheet", category: "Science" },
    { src: "/previews/preview-6.webp", alt: "Phonics practice worksheet", category: "Phonics" },
    { src: "/previews/preview-7.webp", alt: "Writing practice sheet", category: "Writing" },
    { src: "/previews/preview-8.webp", alt: "Puzzle activity page", category: "Puzzles" },
    { src: "/previews/preview-9.webp", alt: "Shapes learning worksheet", category: "Shapes" },
    { src: "/previews/preview-10.webp", alt: "Reading comprehension sheet", category: "Reading" },
    { src: "/previews/preview-11.webp", alt: "Brain games worksheet", category: "Brain Games" },
    { src: "/previews/preview-12.webp", alt: "Animal facts worksheet", category: "Animals" },
  ],

  // ── Who Is It For ───────────────────────────────────────────
  audience: [
    { icon: "👩‍👧", title: "Parents", description: "Give your child the gift of structured, screen-free learning at home." },
    { icon: "👩‍🏫", title: "Teachers", description: "Save hours of planning with ready-to-print classroom resources." },
    { icon: "📚", title: "Tutors", description: "Supplement your tutoring sessions with professional worksheets." },
    { icon: "🏫", title: "Schools", description: "Provide high-quality practice material for every student." },
    { icon: "👶", title: "Playgroups", description: "Engage toddlers with age-appropriate fun learning activities." },
    { icon: "🏠", title: "Homeschool", description: "Complete curriculum support for homeschooling families." },
    { icon: "🎓", title: "Kindergarten", description: "Perfect foundation-building worksheets for early learners." },
  ],

  // ── Benefits ────────────────────────────────────────────────
  benefits: [
    { icon: "MonitorOff", title: "Less Screen Time", description: "Replace device addiction with hands-on, paper-based learning activities." },
    { icon: "Smile", title: "Fun Learning", description: "Colorful, engaging worksheets that kids actually enjoy completing." },
    { icon: "CalendarCheck", title: "Daily Practice", description: "Build a consistent learning habit with fresh worksheets every day." },
    { icon: "Printer", title: "Print Unlimited Times", description: "Print as many copies as you need — forever. No limits, no extra cost." },
    { icon: "MapPin", title: "Learn Anywhere", description: "No internet needed. Print and learn at home, in the car, or on vacation." },
    { icon: "FolderOpen", title: "Organized by Age", description: "Worksheets sorted by age group so you always find the right level." },
  ],

  // ── Bonuses ─────────────────────────────────────────────────
  bonuses: [
    { icon: "🎨", title: "Coloring Bundle", description: "100+ beautiful coloring pages featuring animals, nature & fantasy", value: "₹299" },
    { icon: "🃏", title: "Flashcards", description: "200+ printable flashcards for letters, numbers, shapes & colors", value: "₹399" },
    { icon: "🎯", title: "Activity Sheets", description: "50+ engaging hands-on activity sheets for creative learning", value: "₹199" },
    { icon: "⭐", title: "Reward Charts", description: "Printable reward & behavior charts to motivate your child", value: "₹149" },
    { icon: "🏆", title: "Certificates", description: "Beautiful achievement certificates your child will treasure", value: "₹99" },
  ],

  // ── Features ────────────────────────────────────────────────
  features: [
    { icon: "Mail", title: "Instant Email Delivery", description: "Get your download link within seconds of purchase." },
    { icon: "Infinity", title: "Lifetime Access", description: "Access your worksheets forever. No subscription, no expiry." },
    { icon: "Smartphone", title: "Works on Mobile", description: "Download and organize worksheets right from your phone." },
    { icon: "Laptop", title: "Works on Laptop", description: "Download, view and print from any computer or laptop." },
    { icon: "Printer", title: "Print Unlimited", description: "Print every worksheet as many times as you need." },
    { icon: "Download", title: "Easy Download", description: "One-click download. No complicated setup required." },
    { icon: "CreditCard", title: "One Time Payment", description: "Pay once, own forever. No hidden fees or recurring charges." },
  ],

  // ── How It Works ────────────────────────────────────────────
  howItWorks: [
    { step: 1, title: "Purchase", description: "Complete your secure payment of just ₹199", icon: "ShoppingCart" },
    { step: 2, title: "Instant Email", description: "Receive your download link via email instantly", icon: "Mail" },
    { step: 3, title: "Download ZIP", description: "Download the complete worksheet bundle as a ZIP file", icon: "Download" },
    { step: 4, title: "Print", description: "Print the worksheets you need on any printer", icon: "Printer" },
    { step: 5, title: "Start Learning", description: "Your child starts learning and having fun!", icon: "GraduationCap" },
  ],

  // ── FAQ ─────────────────────────────────────────────────────
  faq: [
    {
      question: "What exactly will I receive after purchasing?",
      answer:
        "You'll receive an email with a download link to a ZIP file containing 15,000+ printable worksheets in PDF format, organized by subject and age group. You'll also get all the bonus materials included in your purchase.",
    },
    {
      question: "What age group are these worksheets designed for?",
      answer:
        "Our worksheets are designed for children aged 2 to 10 years. They are organized by age group and difficulty level, so you can easily find the right worksheets for your child's current stage.",
    },
    {
      question: "Can I print the worksheets multiple times?",
      answer:
        "Absolutely! Once you download the worksheets, you can print them as many times as you want. There are no limits on printing. Perfect for practice and revision!",
    },
    {
      question: "Is this a one-time payment or a subscription?",
      answer:
        "This is a one-time payment of just ₹199. There are no hidden charges, no recurring fees, and no subscription. Pay once, own it forever.",
    },
    {
      question: "How will I receive the worksheets?",
      answer:
        "Immediately after your payment is confirmed, you'll receive an email with a secure download link. You can download the entire bundle as a ZIP file and start printing right away.",
    },
    {
      question: "What subjects are covered in the worksheets?",
      answer:
        "The bundle covers Alphabet, Math, Tracing, Phonics, Reading, Writing, Science, Coloring, Puzzles, Logic, Craft, Hindi, English, Vocabulary, Shapes, Animals, Brain Games, and much more!",
    },
    {
      question: "Do I need any special software to open the worksheets?",
      answer:
        "No! All worksheets are in standard PDF format, which can be opened on any device — phone, tablet, laptop, or computer. You just need a PDF reader (most devices have one built-in).",
    },
    {
      question: "Can I use these worksheets for my classroom or tutoring?",
      answer:
        "Yes! Teachers and tutors are welcome to use these worksheets in their classrooms and tutoring sessions. They're perfect for supplementing your curriculum.",
    },
    {
      question: "What if I'm not satisfied with the worksheets?",
      answer:
        "We offer a 30-day satisfaction guarantee. If you're not happy with the worksheets for any reason, simply email us and we'll process a full refund. No questions asked.",
    },
    {
      question: "Is the payment process secure?",
      answer:
        "Absolutely! We use Razorpay, India's most trusted payment gateway. Your payment information is encrypted and secure. We support UPI, credit/debit cards, net banking, and wallets.",
    },
  ],

  // ── Testimonials ────────────────────────────────────────────
  testimonials: [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      avatar: "/avatars/avatar-1.webp",
      rating: 5,
      review:
        "My 4-year-old absolutely loves these worksheets! The tracing and coloring pages are her favorite. I've printed them multiple times and she never gets bored. Best ₹199 I've ever spent!",
    },
    {
      name: "Anita Verma",
      location: "Delhi",
      avatar: "/avatars/avatar-2.webp",
      rating: 5,
      review:
        "As a kindergarten teacher, I was spending hours creating worksheets. Parento saved me so much time! The quality is amazing and my students love them. Highly recommended!",
    },
    {
      name: "Rahul Patel",
      location: "Bangalore",
      avatar: "/avatars/avatar-3.webp",
      rating: 5,
      review:
        "Both my kids (3 and 7) use these worksheets daily. The age-wise organization is brilliant. Screen time has reduced drastically since we started using Parento worksheets.",
    },
    {
      name: "Deepa Nair",
      location: "Chennai",
      avatar: "/avatars/avatar-4.webp",
      rating: 5,
      review:
        "The Hindi worksheets are exceptional! Finding quality Hindi learning material online is so hard, but Parento has everything. My son's handwriting has improved significantly.",
    },
    {
      name: "Sneha Gupta",
      location: "Pune",
      avatar: "/avatars/avatar-5.webp",
      rating: 5,
      review:
        "I'm homeschooling my two children and these worksheets are a lifesaver. The variety is incredible — math, science, English, Hindi — everything in one bundle. Amazing value!",
    },
    {
      name: "Meera Krishnan",
      location: "Hyderabad",
      avatar: "/avatars/avatar-6.webp",
      rating: 4,
      review:
        "Great collection of worksheets! My daughter practices one worksheet every day and I can see real improvement in her reading and writing. The brain games are a hit too!",
    },
    {
      name: "Kavita Joshi",
      location: "Jaipur",
      avatar: "/avatars/avatar-7.webp",
      rating: 5,
      review:
        "Ordered last week and already printed over 100 worksheets. The quality is outstanding and the bonuses — flashcards and certificates — are such a nice touch. My kids feel so proud!",
    },
    {
      name: "Fatima Sheikh",
      location: "Ahmedabad",
      avatar: "/avatars/avatar-8.webp",
      rating: 5,
      review:
        "I run a small tuition center and these worksheets have become part of my daily teaching. Parents are impressed with the quality. Worth every rupee and more!",
    },
  ],

  // ── Guarantee ───────────────────────────────────────────────
  guarantee: {
    title: "30-Day Satisfaction Guarantee",
    description:
      "We're confident you and your child will love these worksheets. If for any reason you're not completely satisfied, email us within 30 days for a full refund. No questions asked. Zero risk.",
    badges: ["Secure Checkout", "Money Back Guarantee", "Digital Download", "Trusted by 12,500+ Parents"],
  },

  // ── Payment Methods ─────────────────────────────────────────
  paymentMethods: ["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallets"],

  // ── Urgency ─────────────────────────────────────────────────
  urgency: {
    enabled: true,
    bannerText: "🔥 Today's Special Offer — 90% OFF! Only ₹199 (Regular ₹1,999)",
    countdownEnabled: false,
    countdownHours: 24,
  },

  // ── Recently Purchased Popup ─────────────────────────────────
  recentPurchase: {
    enabled: true,
    names: [
      "Priya from Mumbai",
      "Amit from Delhi",
      "Sneha from Bangalore",
      "Rahul from Pune",
      "Kavita from Jaipur",
      "Meera from Chennai",
      "Anita from Hyderabad",
      "Deepak from Kolkata",
      "Riya from Ahmedabad",
      "Sanjay from Lucknow",
    ],
    intervalMs: 15000,
  },

  // ── Exit Intent Popup ───────────────────────────────────────
  exitIntent: {
    enabled: true,
    headline: "Wait! Don't miss this deal ✋",
    subheadline: "Get 15,000+ worksheets for just ₹199 before the price goes back to ₹1,999",
    cta: "Yes, I Want This Deal!",
    dismiss: "No thanks, I'll pass",
  },

  // ── Footer ──────────────────────────────────────────────────
  footer: {
    links: [
      { label: "About Us", href: "/about" },
      { label: "Product Page", href: "/product" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund Policy", href: "/refund" },
      { label: "Shipping & Delivery Policy", href: "/shipping" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Contact Us", href: "/contact" },
    ],
    copyright: `© ${new Date().getFullYear()} Parento. All rights reserved.`,
  },

  // ── SEO ─────────────────────────────────────────────────────
  seo: {
    title: "Parento — 15,000+ Printable Kids Worksheets for Ages 2–10 | Just ₹199",
    description:
      "Download 15,000+ printable worksheets for kids aged 2–10. Covers Alphabet, Math, Hindi, Science, Phonics & more. Instant delivery, lifetime access. Only ₹199!",
    keywords: [
      "printable worksheets for kids",
      "kids worksheets PDF",
      "preschool worksheets",
      "kindergarten worksheets India",
      "printable worksheets for toddlers",
      "Hindi worksheets for kids",
      "math worksheets for children",
      "learning worksheets ages 2-10",
    ],
    ogImage: "/og-image.webp",
  },

  // ── Razorpay ────────────────────────────────────────────────
  razorpay: {
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
    currency: "INR",
    name: "Parento",
    description: "15,000+ Printable Kids Worksheets Bundle",
    image: "/logo.svg",
    theme: {
      color: "#FF8A00",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
