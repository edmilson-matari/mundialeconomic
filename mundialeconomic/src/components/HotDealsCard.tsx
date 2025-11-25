// components/HotDealCard.tsx
import { Star } from "lucide-react";

interface Store {
  name: string;
  logo: string;
  rating: number;
}

interface HotDealCardProps {
  productName: string;
  price: number;
  image: string;
  store: Store;
}

export default function HotDealCard({
  productName,
  price,
  image,
  store,
}: HotDealCardProps) {
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
    <div className="flex-none w-full sm:w-80 md:w-72 lg:w-80">
      <div className="bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 group">
        {/* Product Image */}
        <div className="relative bg-gray-50 rounded-t-xl p-10 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={productName}
            className="max-h-64 object-contain group-hover:scale-105 transition-transform duration-500"
          />
          {/* Store Logo Overlay */}
          <div className="absolute top-4 left-4">
            <img
              src={store.logo}
              alt={store.name}
              className="w-12 h-12 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-xs font-medium text-orange-600 truncate">
            {store.name}
          </p>
          <h3 className="font-semibold text-gray-800 mt-1 line-clamp-2">
            {productName}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            {renderStars(store.rating)}
            <span className="text-xs text-gray-500">({store.rating})</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold texted-orange-600">
              ${price}
            </span>
            <span className="text-sm text-gray-500">Hot Deal</span>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-lg text-sm transition">
              Adicionar ao Carrinho
            </button>
            <button className="px-4 border border-gray-300 hover:border-orange-600 text-gray-700 hover:text-orange-600 rounded-lg text-sm transition">
              Visitar Loja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
