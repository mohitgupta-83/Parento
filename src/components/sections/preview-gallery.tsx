"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

// Generate placeholder preview cards since we don't have actual images
const previewCards = [
  { id: 1, emoji: "🔤", title: "Alphabet Tracing A-Z", category: "Alphabet", bg: "#FFF7ED", color: "#FF8A00" },
  { id: 2, emoji: "🔢", title: "Count & Color 1-20", category: "Math", bg: "#F0FFF4", color: "#4CAF50" },
  { id: 3, emoji: "🎨", title: "Animal Coloring Pages", category: "Coloring", bg: "#EFF6FF", color: "#3B82F6" },
  { id: 4, emoji: "✏️", title: "Line Tracing Practice", category: "Tracing", bg: "#FFF0F6", color: "#E91E63" },
  { id: 5, emoji: "📖", title: "Sight Words Level 1", category: "Reading", bg: "#F5F3FF", color: "#9C27B0" },
  { id: 6, emoji: "📝", title: "Handwriting Practice", category: "Writing", bg: "#FFF7ED", color: "#FF5722" },
  { id: 7, emoji: "🔬", title: "My Body Parts", category: "Science", bg: "#F0FDFA", color: "#00BCD4" },
  { id: 8, emoji: "🧩", title: "Easy Mazes for Kids", category: "Puzzles", bg: "#FFFBEB", color: "#795548" },
  { id: 9, emoji: "🕉️", title: "Hindi Varnamala", category: "Hindi", bg: "#FEF2F2", color: "#F44336" },
  { id: 10, emoji: "🧠", title: "Pattern Recognition", category: "Brain Games", bg: "#ECFDF5", color: "#10B981" },
  { id: 11, emoji: "🔷", title: "Shape Identification", category: "Shapes", bg: "#EFF6FF", color: "#2196F3" },
  { id: 12, emoji: "🐾", title: "Animal Habitats", category: "Animals", bg: "#FFF7ED", color: "#FF9800" },
  { id: 13, emoji: "🗣️", title: "Phonics Blending", category: "Phonics", bg: "#FCE7F3", color: "#EC4899" },
  { id: 14, emoji: "✂️", title: "Cut & Paste Activity", category: "Craft", bg: "#F0FFF4", color: "#8BC34A" },
  { id: 15, emoji: "📚", title: "Word Building Fun", category: "Vocabulary", bg: "#F5F3FF", color: "#7C3AED" },
  { id: 16, emoji: "🎯", title: "Spot the Difference", category: "Activities", bg: "#FEF3C7", color: "#D97706" },
];

const categories = ["All", ...Array.from(new Set(previewCards.map((p) => p.category)))];

export function PreviewGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = selectedCategory === "All" ? previewCards : previewCards.filter((p) => p.category === selectedCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextSlide = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };
  const prevSlide = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  return (
    <section id="preview" className="section-padding gradient-cool">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Sneak Peek"
          title="Preview Our Worksheets"
          subtitle="Take a look at some of the beautifully designed worksheets your child will love."
        />

        {/* Category Filter */}
        <AnimatedSection variant="fade-up" delay={0.1}>
          <div className="flex overflow-x-auto no-scrollbar flex-nowrap md:flex-wrap gap-2 justify-start md:justify-center mb-10 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.slice(0, 10).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "gradient-cta text-white shadow-md"
                    : "bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#FF8A00] hover:text-[#FF8A00]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Masonry Grid */}
        <StaggerContainer className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4" staggerDelay={0.05}>
          {filtered.map((item, i) => {
            const heights = ["h-52", "h-64", "h-72", "h-56", "h-60"];
            const h = heights[i % heights.length];
            return (
              <StaggerItem key={item.id}>
                <motion.div
                  layout
                  className={`break-inside-avoid rounded-2xl ${h} overflow-hidden cursor-pointer group relative border border-white/50 shadow-sm`}
                  style={{ background: item.bg }}
                  onClick={() => openLightbox(i)}
                >
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {item.emoji}
                    </span>
                    <h4 className="font-bold text-sm" style={{ color: item.color }}>
                      {item.title}
                    </h4>
                    <span className="text-xs text-[#6B7280] mt-1 bg-white/60 rounded-full px-2 py-0.5">
                      {item.category}
                    </span>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3 shadow-lg">
                      <ZoomIn className="w-5 h-5 text-[#1A1A2E]" />
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lightbox-overlay flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: filtered[lightboxIndex].bg }}
            >
              <div className="h-80 md:h-96 flex flex-col items-center justify-center p-8">
                <span className="text-8xl mb-6">{filtered[lightboxIndex].emoji}</span>
                <h3 className="text-2xl font-bold" style={{ color: filtered[lightboxIndex].color }}>
                  {filtered[lightboxIndex].title}
                </h3>
                <span className="text-sm text-[#6B7280] mt-2 bg-white/60 rounded-full px-4 py-1">
                  {filtered[lightboxIndex].category}
                </span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-6 py-4 text-center">
                <p className="text-sm text-[#6B7280]">
                  {lightboxIndex + 1} of {filtered.length} previews
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
