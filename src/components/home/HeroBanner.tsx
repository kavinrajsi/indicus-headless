"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HomepageSlide } from "@/types/wordpress";

export default function HeroBanner({ slides }: { slides: HomepageSlide[] }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (!slides.length) {
    return (
      <section className="flex h-[60vh] items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold">Welcome to Indicus Paints</h1>
      </section>
    );
  }

  const slide = slides[current];

  return (
    <section className="relative h-[60vh] overflow-hidden md:h-[80vh]">
      {/* Desktop Image */}
      <Image
        src={slide.sliderImage.sourceUrl}
        alt={slide.sliderImage.altText || slide.sliderTitle || "Banner"}
        fill
        priority
        className="hidden object-cover md:block"
        sizes="100vw"
      />
      {/* Mobile Image */}
      <Image
        src={slide.mobileImage.sourceUrl}
        alt={slide.mobileImage.altText || slide.sliderTitle || "Banner"}
        fill
        priority
        className="object-cover md:hidden"
        sizes="100vw"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent">
        <div className="container mx-auto px-4 pb-12 lg:px-8">
          {slide.sliderTitle && (
            <h2 className="mb-4 max-w-lg text-3xl font-bold text-white md:text-5xl">
              {slide.sliderTitle}
            </h2>
          )}
          {slide.sliderButtonLink && (
            <Link
              href={slide.sliderButtonLink}
              className="inline-block rounded-full bg-teal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-dark"
            >
              Explore Now
            </Link>
          )}
        </div>
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === current ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
