"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const slides = [
    {
      title: "FASHION FOR MEN",
      highlight: "MEN",
      description:
        "Timeless style and premium quality. Discover the collection that elevates your everyday look with sophistication and comfort.",
      btnText: "SHOP NOW",
      image:
        "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=1200&h=800&fit=crop",
      colors: ["#3B2A1E", "#8B6F47", "#000000"],
    },
    {
      title: "PREMIUM LEATHER",
      highlight: "CRAFTED",
      description:
        "Handcrafted bags and shoes made from the finest Italian leather. Built to last, designed to impress.",
      btnText: "EXPLORE COLLECTION",
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&h=800&fit=crop",
      colors: ["#2C1810", "#D4A574", "#8B4513"],
    },
    {
      title: "MODERN",
      highlight: "ELEGANCE",
      description:
        "Clean lines, perfect fit. The modern gentleman’s wardrobe essentials — from tailored coats to premium accessories.",
      btnText: "VIEW MORE",
      image:
        "https://images.unsplash.com/photo-1617114919298-1b12d3a1345f?w=1200&h=800&fit=crop",
      colors: ["#1a1a1a", "#434343", "#666666"],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <div key={index} className="embla__slide flex-none w-full">
              <div className="min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Text Content */}
                  <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                      {slide.title} <br />
                      <span className="text-orange-700">{slide.highlight}</span>
                    </h1>

                    <p className="text-gray-600 text-lg max-w-lg mx-auto lg:mx-0">
                      {slide.description}
                    </p>

                    <button className="inline-flex items-center px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300">
                      {slide.btnText}
                    </button>

                    {/* Color Dots */}
                  </div>

                  {/* Product Image */}
                  <div className="order-1 lg:order-2 flex justify-center">
                    <img
                      src={slide.image}
                      alt={slide.highlight}
                      className="max-w-full h-auto max-h-96 lg:max-h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            className="w-2 h-2 rounded-full bg-gray-400 hover:bg-orange-600 transition-all"
          />
        ))}
      </div>
    </section>
  );
}
