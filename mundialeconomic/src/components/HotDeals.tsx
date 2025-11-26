// components/HotDeals.tsx
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HotDealCard from "../components/HotDealsCard";
import { useEffect, useState } from "react";
import supabase from "../supabase-client";
import type { ProductDetail } from "./Types/product";

export default function HotDeals() {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchHotDeals = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, stores (*)");
      if (error) {
        console.log("Falha carregando productos");
      } else {
        setProducts(data);
      }
    };
    fetchHotDeals();
    setLoading(false);
  }, []);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  if (loading || !products) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

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
            {products.map((prod) => (
              <HotDealCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
