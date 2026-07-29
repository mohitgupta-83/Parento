"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialItem {
  name: string;
  location: string;
  avatar?: string;
  rating: number;
  review: string;
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const testimonials = siteConfig.testimonials as unknown as TestimonialItem[];

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section id="reviews" className="section-padding gradient-warm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Real Stories"
          title="What Parents Are Saying"
          subtitle="Join thousands of happy parents who trust Parento for their child's learning journey."
        />

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.slice(0, 6).map((t, i) => (
            <AnimatedSection key={i} variant="fade-up" delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 border border-[#F3F4F6] card-hover h-full flex flex-col shadow-sm">
                <Quote className="w-8 h-8 text-[#FF8A00]/20 mb-3" />
                <p className="text-[#6B7280] text-sm leading-relaxed flex-1">{t.review}</p>
                <div className="mt-5 pt-4 border-t border-[#F3F4F6] flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#FF8A00] flex-shrink-0 bg-gradient-to-br from-[#FF8A00] to-[#FF5500] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-bold">{t.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-[#1A1A2E] text-sm">{t.name}</div>
                    <div className="text-xs text-[#6B7280]">{t.location}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-white rounded-2xl p-6 border border-[#F3F4F6] shadow-sm">
                  <Quote className="w-8 h-8 text-[#FF8A00]/20 mb-3" />
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: testimonials[current].rating }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-[#F59E0B] fill-current" />
                    ))}
                  </div>
                  <p className="text-[#6B7280] leading-relaxed mb-5">
                    {testimonials[current].review}
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#F3F4F6]">
                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#FF8A00] flex-shrink-0 bg-gradient-to-br from-[#FF8A00] to-[#FF5500] flex items-center justify-center text-white font-bold text-sm">
                      {testimonials[current].avatar ? (
                        <img
                          src={testimonials[current].avatar}
                          alt={testimonials[current].name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold">{testimonials[current].name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1A2E] text-sm">{testimonials[current].name}</div>
                      <div className="text-xs text-[#6B7280]">{testimonials[current].location}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="p-2 rounded-full bg-white border border-[#E5E7EB] hover:border-[#FF8A00] transition-colors cursor-pointer">
              <ChevronLeft className="w-5 h-5 text-[#6B7280]" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-[#FF8A00]" : "bg-[#E5E7EB]"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-full bg-white border border-[#E5E7EB] hover:border-[#FF8A00] transition-colors cursor-pointer">
              <ChevronRight className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
