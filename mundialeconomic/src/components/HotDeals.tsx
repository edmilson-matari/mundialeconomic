"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface HotDeal {
  id: number;
  productName: string;
  price: number;
  image: string;
  store: {
    name: string;
    logo: string;
    rating: number;
  };
}

export default function HotDeals() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const deals: HotDeal[] = [
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
        "https://images.unsplash.com/photo-1625772292130-c5af89e24ca5?w=800&h=1000&fit=crop",
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

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

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
              <div
                key={deal.id}
                className="flex-none w-full sm:w-80 md:w-72 lg:w-80" // Fixed width for consistency
              >
                <div className="bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 group">
                  {/* Product Image */}
                  <div className="relative bg-gray-50 rounded-t-xl p-10 flex items-center justify-center overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.productName}
                      className="max-h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Store Logo Overlay */}
                    <div className="absolute top-4 left-4">
                      <img
                        src={deal.store.logo}
                        alt={deal.store.name}
                        className="w-12 h-12 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs font-medium text-orange-600 truncate">
                      {deal.store.name}
                    </p>
                    <h3 className="font-semibold text-gray-800 mt-1 line-clamp-2">
                      {deal.productName}
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                      {renderStars(deal.store.rating)}
                      <span className="text-xs text-gray-500">
                        ({deal.store.rating})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl font-bold text-orange-600">
                        ${deal.price}
                      </span>
                      <span className="text-sm text-gray-500">Hot Deal</span>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-lg text-sm transition">
                        Add to Cart
                      </button>
                      <button className="px-4 border border-gray-300 hover:border-orange-600 text-gray-700 hover:text-orange-600 rounded-lg text-sm transition">
                        Visit Store
                      </button>
                    </div>
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
