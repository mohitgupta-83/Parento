-- ============================================================
-- PARENTO - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to set up tables & initial seed
-- ============================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. Products Table ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price INTEGER NOT NULL, -- Price in INR
    thumbnail TEXT,
    preview_pdf TEXT,
    download_file TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. Orders Table ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    amount INTEGER NOT NULL, -- Amount paid in INR
    payment_id TEXT,
    order_id TEXT NOT NULL UNIQUE,
    signature TEXT,
    payment_status TEXT NOT NULL DEFAULT 'created', -- 'created' | 'paid' | 'failed'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. Row Level Security (RLS) ──────────────────────────────
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active products
CREATE POLICY "Allow public read access to active products"
ON public.products FOR SELECT
USING (active = true);

-- Allow service role full access (Server-Side Operations)
CREATE POLICY "Service role full access on products"
ON public.products FOR ALL
USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on orders"
ON public.orders FOR ALL
USING (auth.role() = 'service_role');

-- ── 4. Seed Initial Demo Product ─────────────────────────────
INSERT INTO public.products (
    title,
    slug,
    description,
    price,
    thumbnail,
    preview_pdf,
    download_file,
    active
)
VALUES (
    '15,000 Printable Kids Worksheets',
    'kids-worksheets',
    'Printable worksheet bundle for children aged 2–10 covering Alphabet, Math, Phonics, Tracing, Science & Brain Games.',
    1,
    '/previews/preview-1.webp',
    '/previews/sample.pdf',
    'kids-worksheet-bundle.pdf',
    true
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    price = EXCLUDED.price,
    description = EXCLUDED.description,
    download_file = EXCLUDED.download_file,
    updated_at = NOW();
