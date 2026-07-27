"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

// Real uploaded product preview images
const previewCards = [
  { id: 1, src: "/previews/preview-1.webp", title: "Alphabet Tracing A-Z", category: "Alphabet" },
  { id: 2, src: "/previews/preview-2.webp", title: "Count & Color 1-20", category: "Math" },
  { id: 3, src: "/previews/preview-3.webp", title: "Animal Coloring Pages", category: "Coloring" },
  { id: 4, src: "/previews/preview-4.webp", title: "Line Tracing Practice", category: "Tracing" },
  { id: 5, src: "/previews/preview-5.webp", title: "Sight Words & Reading", category: "Reading" },
  { id: 6, src: "/previews/preview-6.webp", title: "Handwriting Practice", category: "Writing" },
  { id: 7, src: "/previews/preview-7.webp", title: "Science & Nature Exploration", category: "Science" },
  { id: 8, src: "/previews/preview-8.webp", title: "Easy Mazes for Kids", category: "Puzzles" },
  { id: 9, src: "/previews/preview-9.webp", title: "Hindi Varnamala & Matras", category: "Hindi" },
  { id: 10, src: "/previews/preview-10.webp", title: "Pattern Recognition & Brain Games", category: "Brain Games" },
  { id: 11, src: "/previews/preview-11.webp", title: "Shapes & Geometry Learning", category: "Shapes" },
  { id: 12, src: "/previews/preview-12.webp", title: "Animal Habitats & Phonics", category: "Phonics" },
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
          subtitle="Take a look at some of the actual high-quality printable worksheets included in the bundle."
        />

        {/* Category Filter */}
        <AnimatedSection variant="fade-up" delay={0.1}>
          <div className="flex overflow-x-auto no-scrollbar flex-nowrap md:flex-wrap gap-2 justify-start md:justify-center mb-10 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.slice(0, 10).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
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
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" staggerDelay={0.05}>
          {filtered.map((item, i) => {
            return (
              <StaggerItem key={item.id}>
                <motion.div
                  layout
                  className="rounded-2xl overflow-hidden cursor-pointer group relative bg-white border border-gray-100 shadow-md card-hover"
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white rounded-full p-3 shadow-lg transform group-hover:scale-110 transition-transform">
                        <ZoomIn className="w-5 h-5 text-[#FF8A00]" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Category Badge */}
                  <div className="p-3.5 bg-white border-t border-gray-100">
                    <h4 className="font-bold text-[#1A1A2E] text-xs sm:text-sm truncate">
                      {item.title}
                    </h4>
                    <span className="inline-block text-[10px] font-semibold text-[#FF8A00] bg-[#FFF7ED] rounded-full px-2 py-0.5 mt-1 border border-[#FFEDD5]">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Lightbox Modal */}
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
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10 cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10 cursor-pointer"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10 cursor-pointer"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#FF8A00] bg-[#FFF7ED] px-3 py-1 rounded-full">
                  {filtered[lightboxIndex].category}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {lightboxIndex + 1} of {filtered.length}
                </span>
              </div>
              <div className="p-4 max-h-[75vh] overflow-y-auto flex items-center justify-center bg-gray-100">
                <img
                  src={filtered[lightboxIndex].src}
                  alt={filtered[lightboxIndex].title}
                  className="w-full h-auto max-h-[65vh] object-contain rounded-xl shadow-md"
                />
              </div>
              <div className="p-4 bg-white text-center border-t border-gray-100">
                <h3 className="text-base font-bold text-[#1A1A2E]">
                  {filtered[lightboxIndex].title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
