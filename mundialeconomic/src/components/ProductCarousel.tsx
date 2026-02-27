"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: true })],
  );

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const slides = [
    {
      title: "Mobiliário",
      highlight: "Tchoamba Plásticos e Papel",
      description:
        "Versáteis, adequadas para áreas internas e externas (jardins, piscinas, restaurantes",
      btnText: "Explorar Lojas",
      image:
        "https://images.tcdn.com.br/img/img_prod/836117/kit_mesa_e_cadeira_plastica_11262_1_c28da0b8a18e40dbfe94bbc4ce0f16b5.png",
      colors: ["#fc0808ff", "#e41212ff", "#ff0000ff"],
    },
    {
      title: "Automóveis",
      highlight: "Tchoamba Automóvel",
      description:
        "Se está a procura de um carro este é lugar ideal para o achar",
      btnText: "Explorar Lojas",
      image:
        "https://ireland.apollo.olxcdn.com/v1/files/sgyifskb14di1-STDVTLPT/image;s=644x461",
      colors: ["#2C1810", "#D4A574", "#8B4513"],
    },
    {
      title: "Imobiliária de Qualidade",
      highlight: "Tchoamba Imovéis",
      description: "A casa dos seus sonhos está aqui",
      btnText: "Explorar Lojas",
      image:
        "https://grupoboavida.co.ao/wp-content/uploads/2025/02/20240828_143037.webp",
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
                    <span className="text-5xl md:text-6xl font-bold text-gray-900">
                      {slide.title}
                    </span>
                    <br />
                    <span className="font-bold text-xl text-black">
                      {slide.highlight}
                    </span>
                    <p className="text-gray-600 text-lg max-w-lg mx-auto lg:mx-0">
                      {slide.description}
                    </p>

                    <Link to={"/lojas"}>
                      <button className="inline-flex items-center px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300">
                        {slide.btnText}
                      </button>
                    </Link>

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
