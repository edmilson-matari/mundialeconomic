import { Percent } from "lucide-react";
import { Link } from "react-router-dom";

export default function PromotionBanners() {
  const banners = [
    {
      title: "Productos e Serviços em Promoção",
      subtitle: "Descontos até 30%",
      cta: "Comprar agora",
      image:
        "https://ogrowthmarketer.com.br/wp-content/uploads/2024/08/Preto-Lua-Blog-Banner-34.webp",
      overlay: "from-black/80 via-black/60 to-transparent",
    },
    {
      title: "Combo de Ofertas",
      subtitle: "Descontos de até 50%",
      cta: "Comprar agora",
      image:
        "https://viverbem.unimed.coop.br/wp-content/uploads/2015/01/alimentos-in-natura.jpg",
      overlay: "from-blue-700/80 via-blue-600/60 to-transparent",
    },
    {
      title: "Comece agora",
      subtitle: "Descontos em compra no site",
      cta: "Comprar agora",
      image:
        "https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia1025/industria-cosmeticos-atividade-lucrativa-atende-busca-beleza-saude-cpt.jpg",
      overlay: "from-teal-700/80 via-teal-600/60 to-transparent",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {banners.map((banner, index) => (
            <div
              key={index}
              className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${banner.image})` }}
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${banner.overlay}`}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl md:text-4xl font-bold drop-shadow-2xl">
                  {banner.title}
                </h3>
                <p className="mt-2 text-lg md:text-xl font-medium opacity-95 drop-shadow-lg">
                  {banner.subtitle}
                </p>
                <Link to={"/lojas"}>
                  <button className="mt-6 px-8 py-3 bg-white text-gray-900 font-bold rounded-full text-sm md:text-base shadow-lg hover:shadow-xl hover:scale-110 transition">
                    {banner.cta}
                  </button>
                </Link>
              </div>

              {/* Optional: Floating Discount Badge */}
              {index === 2 && (
                <div className="absolute top-6 right-6 bg-white text-teal-600 w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold shadow-2xl">
                  <Percent className="w-6 h-6" />
                  <span className="text-lg">40</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
