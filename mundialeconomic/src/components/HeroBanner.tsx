import { Link } from "react-router-dom";
import type { StoreData } from "./Types/store";
import { ArrowLeft, Store, MapPin, Clock, Shield } from "lucide-react";

interface StoreProps {
  store: StoreData;
}

const HeroBanner: React.FC<StoreProps> = ({ store }) => {
  return (
    <>
      {/* Hero Banner – Fully Responsive & Beautiful */}
      <div className="relative min-h-80 md:min-h-96 bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <img
          src={store.banner}
          alt={store.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

        {/* Back Button */}
        <Link
          to="/lojas"
          className="absolute top-4 left-4 z-20 bg-white/95 hover:bg-white text-gray-800 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full flex items-center gap-2.5 font-medium shadow-xl transition-all hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Voltar a lojas</span>
          <span className="sm:hidden">Voltar</span>
        </Link>

        {/* Store Info – Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 sm:gap-8">
              {/* Store Logo – Pops out over content */}
              <div className="relative -mt-20 sm:-mt-24 lg:-mt-28">
                <img
                  src={store.logo}
                  alt={store.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border-4 sm:border-8 border-white shadow-2xl object-cover ring-4 ring-white/20"
                />
                {store.isVerified && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 bg-white rounded-full shadow-lg p-1" />
                  </div>
                )}
              </div>

              {/* Store Details */}
              <div className="text-white flex-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
                  {store.name}
                </h1>

                <div className="mt-3 sm:mt-4 flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base lg:text-lg opacity-95">
                  <span className="flex items-center gap-2">
                    <Store className="w-5 h-5" />
                    {store.category}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {store.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Juntou-se em {store.joinedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear float */}
      <div className="clear-both" />
    </>
  );
};

export default HeroBanner;
