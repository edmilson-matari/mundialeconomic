// components/HotDeals.tsx
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HotDealCard from "../components/HotDealsCard";

const deals = [
  {
    id: 1,
    productName: "Leather Crossbody Bag",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
    store: {
      name: "Luxe Fashion Boutique",
      logo: "https://images.unsplash.com/photo-1607082349566-5079286ebb72?w=80&h=80&fit=crop",
      rating: 4.8,
    },
  },
  {
    id: 2,
    productName: "Wireless ANC Headphones",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=1000&fit=crop",
    store: {
      name: "TechTrend Electronics",
      logo: "https://images.unsplash.com/photo-1519389951296-1303fe2fd539?w=80&h=80&fit=crop",
      rating: 4.9,
    },
  },
  {
    id: 3,
    productName: "Minimalist White Sneakers",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
    store: {
      name: "Urban Sneakers Co.",
      logo: "https://images.unsplash.com/photo-1605406575497-940d57b521f7?w=80&h=80&fit=crop",
      rating: 4.7,
    },
  },
  {
    id: 4,
    productName: "Vitamin C Glow Serum",
    price: 59,
    image:
      "https://images-cdn.ubuy.co.in/68fb75366786fcc0770d7bff-professional-vitamin-c-face-serum-20.jpg",
    store: {
      name: "Glow Beauty Studio",
      logo: "https://images.unsplash.com/photo-1596462502278-ffb48ada4f7b?w=80&h=80&fit=crop",
      rating: 4.9,
    },
  },
  {
    id: 5,
    productName: "Summer Linen Dress",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
    store: {
      name: "Luxe Fashion Boutique",
      logo: "https://images.unsplash.com/photo-1607082349566-5079286ebb72?w=80&h=80&fit=crop",
      rating: 4.8,
    },
  },
  {
    id: 6,
    productName: "Smart Watch Pro",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=1000&fit=crop",
    store: {
      name: "TechTrend Electronics",
      logo: "https://images.unsplash.com/photo-1519389951296-1303fe2fd539?w=80&h=80&fit=crop",
      rating: 4.9,
    },
  },
];

export default function HotDeals() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              QUENTES
            </h2>
            <div className="w-20 h-1 bg-orange-500 mt-2"></div>
          </div>

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
          <div className="flex gap-6">
            {deals.map((deal) => (
              <HotDealCard
                key={deal.id}
                productName={deal.productName}
                price={deal.price}
                image={deal.image}
                store={deal.store}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
