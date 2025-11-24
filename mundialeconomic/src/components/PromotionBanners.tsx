import { Percent } from "lucide-react";

export default function PromotionBanners() {
  const banners = [
    {
      title: "Items on SALE",
      subtitle: "Discounts up to 30%",
      cta: "SHOP NOW",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&blur=8",
      overlay: "from-black/80 via-black/60 to-transparent",
    },
    {
      title: "Combo Offers",
      subtitle: "Discounts up to 50%",
      cta: "SHOP NOW",
      image:
        "https://images.unsplash.com/photo-1606787620651-8c9f2d2c0e0f?w=1200&h=800&fit=crop&blur=8",
      overlay: "from-blue-700/80 via-blue-600/60 to-transparent",
    },
    {
      title: "Discount Coupons",
      subtitle: "Discounts up to 40%",
      cta: "SHOP NOW",
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457a80?w=1200&h=800&fit=crop&blur=8",
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
                <button className="mt-6 px-8 py-3 bg-white text-gray-900 font-bold rounded-full text-sm md:text-base shadow-lg hover:shadow-xl hover:scale-110 transition">
                  {banner.cta}
                </button>
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
