"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Mobiliário",
    highlight: "Tchoamba Plásticos e Papel",
    description:
      "Versáteis, adequadas para áreas internas e externas — jardins, piscinas, restaurantes.",
    btnText: "Explorar Lojas",
    image:
      "https://images.tcdn.com.br/img/img_prod/836117/kit_mesa_e_cadeira_plastica_11262_1_c28da0b8a18e40dbfe94bbc4ce0f16b5.png",
    from: "#fff5f5",
    accent: "#e53e3e",
  },
  {
    title: "Automóveis",
    highlight: "Tchoamba Automóvel",
    description:
      "Se está à procura de um carro, este é o lugar ideal para o encontrar.",
    btnText: "Explorar Lojas",
    image:
      "https://ireland.apollo.olxcdn.com/v1/files/sgyifskb14di1-STDVTLPT/image;s=644x461",
    from: "#fffbeb",
    accent: "#d97706",
  },
  {
    title: "Imobiliária",
    highlight: "Tchoamba Imóveis",
    description:
      "A casa dos seus sonhos está aqui — encontre o imóvel perfeito.",
    btnText: "Explorar Lojas",
    image:
      "https://grupoboavida.co.ao/wp-content/uploads/2025/02/20240828_143037.webp",
    from: "#f0fdf4",
    accent: "#16a34a",
  },
];

export default function ProductCarousel() {
  const autoplay = Autoplay({
    delay: 5000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false },
    [autoplay],
  );

  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Pause autoplay when tab is hidden — saves CPU on mobile
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) autoplay.stop();
      else autoplay.play();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [autoplay]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const current = slides[selected];

  return (
    <section
      className="relative overflow-hidden transition-colors duration-700"
      style={{ background: current.from }}
    >
      <div className="embla" ref={emblaRef}>
        {/* will-change-transform tells the browser to promote this layer on GPU */}
        <div className="embla__container flex will-change-transform">
          {slides.map((slide, index) => (
            <div key={index} className="embla__slide flex-none w-full">
              <div className="min-h-[420px] sm:min-h-[520px] lg:min-h-[640px] flex items-center py-8 lg:py-0">
                <div className="max-w-7xl mx-auto px-5 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                  {/* Text */}
                  <div className="text-center lg:text-left space-y-4 order-2 lg:order-1">
                    <div>
                      <p
                        className="text-xs font-bold uppercase tracking-widest mb-2"
                        style={{ color: slide.accent }}
                      >
                        {slide.highlight}
                      </p>
                      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                        {slide.title}
                      </h2>
                    </div>
                    <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="pt-2">
                      <Link
                        to="/lojas"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                        style={{ backgroundColor: slide.accent }}
                      >
                        {slide.btnText}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="order-1 lg:order-2 flex justify-center items-center">
                    <img
                      src={slide.image}
                      alt={slide.highlight}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="max-w-[260px] sm:max-w-sm lg:max-w-full h-auto max-h-72 sm:max-h-80 lg:max-h-[420px] object-contain drop-shadow-2xl select-none"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows — hidden on mobile (swipe is native) */}
      <button
        onClick={scrollPrev}
        aria-label="Slide anterior"
        className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 lg:p-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-800" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Próximo slide"
        className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 lg:p-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-800" />
      </button>

      {/* Dot indicators — active dot is a wider pill in the accent colour */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            aria-label={`Ir para slide ${idx + 1}`}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: idx === selected ? "1.75rem" : "0.5rem",
              backgroundColor:
                idx === selected ? slide.accent : "rgba(156,163,175,0.6)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
