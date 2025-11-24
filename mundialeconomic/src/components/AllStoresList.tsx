import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Star } from "lucide-react";
import supabase from "../supabase-client";
import type { StoreData } from "./Types/store";

interface Store {
  id: number;
  name: string;
  logo: string;
  banner: string;
  category: string;
  rating: number;
  totalProducts: number;
  badge?: "new" | "verified" | "top" | string;
}

export default function AllStoresList() {
  const [stores, setStores] = useState<StoreData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const storesPerPage = 12;

  useEffect(() => {
    const loadStores = async () => {
      setLoading(true);
      console.log("Tentando buscar lojas..."); // ← veja no console

      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .order("id", { ascending: false });
      if (error) {
        console.log("Error fetching stores: ", error);
      } else {
        setStores(data as StoreData[]);
      }
      setLoading(false);
    };
    loadStores();
  }, []);

  const filteredAndSorted = stores
    .filter(
      (store) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.totalProducts - a.totalProducts;
        case "newest":
          return b.id - a.id;
        case "rating":
          return b.rating - a.rating;
        case "products":
          return b.totalProducts - a.totalProducts;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const totalStores = filteredAndSorted.length;
  const totalPages = Math.ceil(totalStores / storesPerPage);
  const paginatedStores = filteredAndSorted.slice(
    (currentPage - 1) * storesPerPage,
    currentPage * storesPerPage
  );

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const getBadge = (badge?: "new" | "verified" | "top") => {
    if (!badge) return null;
    const map = {
      new: "bg-orange-500",
      verified: "bg-blue-600",
      top: "bg-purple-600",
    };
    const text =
      badge === "new" ? "NEW" : badge === "verified" ? "VERIFIED" : "TOP";
    return (
      <span
        className={`${map[badge]} text-white text-xs font-bold px-3 py-1 rounded-full`}
      >
        {text}
      </span>
    );
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">All Stores</h1>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stores or products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="px-6 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:border-orange-500"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
              <option value="products">Most Products</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
          <p className="text-gray-600 mt-4">{totalStores} stores found</p>
        </div>

        {/* 3 PER ROW GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedStores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={store.banner}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {store.badge && (
                  <div className="absolute top-4 left-4">
                    {getBadge(store.badge)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 -mt-12 relative">
                <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="w-28 h-28 rounded-full mx-auto -mt-20 border-4 border-white shadow-xl object-cover"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-900">
                    {store.name}
                  </h3>
                  <p className="text-orange-600 font-medium">
                    {store.category}
                  </p>

                  <div className="flex justify-center items-center gap-2 mt-3">
                    {renderStars(store.rating)}
                    <span className="text-gray-600">({store.rating})</span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {store.totalProducts} Productos
                  </p>

                  <button className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition">
                    Visit Store
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-lg font-medium transition ${
                  currentPage === i + 1
                    ? "bg-orange-600 text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
