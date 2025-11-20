"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HotDeals() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const deals = [
    {
      name: "Quilted Leather Handbag",
      price: "$89.00",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop&auto=format",
    },
    {
      name: "Elegant Evening Dress",
      price: "$149.00",
      image:
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop&auto=format",
    },
    {
      name: "Classic Leather Crossbody",
      price: "$179.00",
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&h=1000&fit=crop&auto=format",
    },
    {
      name: "Satin High Heels",
      price: "$99.00",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop&auto=format",
    },
    {
      name: "Designer Tote Bag",
      price: "$219.00",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop&auto=format",
    },
    {
      name: "Silk Cocktail Dress",
      price: "$189.00",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&auto=format",
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              HOT DEALS
            </h2>
            <div className="w-20 h-1 bg-orange-500 mt-2"></div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {deals.map((item, index) => (
              <div
                key={index}
                className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <div className="group cursor-pointer">
                  <div className="bg-white py-12 px-8 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-80 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="text-center mt-6">
                    <h3 className="text-gray-700 font-medium text-lg">
                      {item.name}
                    </h3>
                    <p className="text-orange-600 font-bold text-2xl mt-2">
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
