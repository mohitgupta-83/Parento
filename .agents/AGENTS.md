# PARENTO — Project Layout & Design Guidelines

## 📱 Mobile Layout Rules (CRITICAL)

1. **Hero Section Mobile Order**:
   - **Step 1**: Rating & Download Badge (`47,000+ Downloads ★ 4.9`).
   - **Step 2**: Main Headline (`Turn Screen Time Into Learning Time`).
   - **Step 3**: Subheadline (`15,000+ Printable Worksheets...`).
   - **Step 4**: **PRODUCT BUNDLE IMAGE BOX (`product-main.webp`)** — ALWAYS positioned directly **ABOVE** the primary purchase CTA button on mobile devices.
   - **Step 5**: **Primary CTA Button** (`Get Instant Access — ₹1` or `₹199`).
   - **Step 6**: Social Proof (`12,500+ happy parents`) & Trust Badges.
   - **NEVER** hide the main product image on mobile (`hidden lg:block` MUST NOT be used on the product visual wrapper).

2. **Section Guidelines**:
   - **What You'll Get (`Categories`)**: Super short, compact 19-subject badge layout. Do NOT use long paragraphs or tall multi-row card grids.
   - **Plus, You Get These Bonuses FREE (`Bonuses`)**: Super short, compact 5-item grid showing icon, title, crossed price, and FREE badge.
   - **How It Works (`HowItWorks`)**: Displays ONLY the high-resolution process flow illustration image (`process-flow.webp`). Do NOT re-add the 1–5 text step cards.
   - **Reviews & Testimonials (`Testimonials`)**: Must use real reviewer profile photos from `public/avatars/` (`female-1.jpg`, `male-1.jpg`, etc.). Do NOT wrap review body text in double quotation marks (`""`).
   - **No Secondary Buttons**: Keep hero and section CTAs focused strictly on the primary purchase button.

3. **Backend & Order System**:
   - **Abandoned Checkouts**: Debounced live auto-save as user types in `CheckoutModal` via `/api/save-draft-order`, saving to Supabase `orders` table with status `abandoned`.
   - **Payment Verification**: `/api/verify-payment` upgrades status from `abandoned` to `paid` upon Razorpay signature verification.
   - **Supabase RLS**: `orders` table MUST maintain open RLS policy (`Allow public all on orders`) so order saving and admin queries never fail.
