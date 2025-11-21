"use client";

import { ChevronRight } from "lucide-react";

export default function CategoriesWithBanner() {
  const categories = [
    { name: "Accessories", count: 3, icon: "red apple" },
    { name: "Electronics & Computer", count: 5, icon: "red apple" },
    { name: "Laptops & Desktops", count: 2, icon: "red apple" },
    { name: "Mobiles & Tablets", count: 8, icon: "red apple" },
    { name: "SmartPhone & Smart TV", count: 5, icon: "red apple" },
    { name: "Fashion & Clothing", count: 12, icon: "red apple" },
    { name: "Home & Garden", count: 7, icon: "red apple" },
    { name: "Sports & Outdoors", count: 4, icon: "red apple" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Products Categories
            </h3>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <a
                    href="#"
                    className="group flex items-center justify-between p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      {/* Red Apple Icon (you can replace with any icon) */}
                      <span className="text-red-600 text-xl">Apple</span>
                      <span className="text-gray-700 font-medium group-hover:text-orange-600">
                        {cat.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        ({cat.count})
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Promotional Banner */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden h-96 lg:h-full min-h-96">
              {/* Background Image */}
              <img
                src="https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=1200&h=800&fit=crop"
                alt="Drone Sale"
                className="w-full h-full object-cover"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent flex items-center">
                <div className="text-white pl-12 lg:pl-20 max-w-lg">
                  <p className="text-orange-400 text-2xl font-bold tracking-wider mb-2">
                    S A L E
                  </p>
                  <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                    Get UP To
                    <br />
                    <span className="text-orange-400">50% Off</span>
                  </h2>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-10 py-4 rounded-full transition transform hover:scale-105 shadow-lg">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
