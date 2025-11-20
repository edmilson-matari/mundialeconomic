("use client");
import { useState } from "react";
import {
  Menu,
  ShoppingCart,
  ChevronDown,
  Search,
  Phone,
  X,
  User,
  Heart,
  LogIn,
  Globe,
} from "lucide-react";

function TopUserBar() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Left Side: Language, Currency, Welcome */}
          <div className="flex items-center space-x-6">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center space-x-1 hover:text-white transition"
              >
                <Globe className="h-4 w-4" />
                <span>English</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${
                    languageOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {languageOpen && (
                <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-orange-50"
                  >
                    English
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-orange-50"
                  >
                    Español
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-orange-50"
                  >
                    Français
                  </a>
                </div>
              )}
            </div>

            <span className="hidden sm:inline">|</span>

            {/* Currency Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center space-x-1 hover:text-white transition"
              >
                <span>USD</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${
                    currencyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {currencyOpen && (
                <div className="absolute top-full left-0 mt-1 w-24 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-orange-50"
                  >
                    USD
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-orange-50"
                  >
                    EUR
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-orange-50"
                  >
                    GBP
                  </a>
                </div>
              )}
            </div>

            <span className="hidden sm:inline">|</span>

            {/* Welcome Message */}
            <span className="hidden md:inline">Welcome To Ecommerce</span>
          </div>

          {/* Right Side: User Actions */}
          <div className="flex items-center space-x-6 space-x-5">
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">My Account</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">My Wishlist</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Check Out</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Log In</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /*TopBar User*/
}

function EcommerceHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <TopUserBar />
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">E-Com Shop</h1>
                <p className="text-xs text-gray-500">Shopping Made Easy</p>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <select className="absolute left-0 top-0 h-full px-4 bg-gray-100 text-gray-700 text-sm rounded-l-lg border border-r-0 border-gray-300 focus:outline-none z-10">
                  <option>ALL CATEGORIES</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home & Garden</option>
                </select>
                <input
                  type="text"
                  placeholder="Search entire store here..."
                  className="w-full pl-48 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button className="absolute right-0 top-0 h-full px-6 bg-orange-600 hover:bg-orange-700 rounded-r-lg transition-colors">
                  <Search className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Desktop Call Button */}
            <div className="hidden sm:flex items-center">
              <a
                href="tel:+1123456789"
                className="flex items-center space-x-3 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Phone className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wider">
                    Call Us Free
                  </div>
                  <div className="font-semibold">+1 123 456 789</div>
                </div>
              </a>
            </div>

            {/* Mobile Buttons */}
            <div className="flex items-center space-x-3 sm:hidden">
              <a
                href="tel:+1123456789"
                className="p-3 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
              >
                <Phone className="h-6 w-6 text-white" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu & Search - Slides Down */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-4 px-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search entire store..."
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2">
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Optional: Mobile category links */}
              <div className="mt-4 space-y-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  All Categories
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Electronics
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Fashion
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
{
  /*E-commerce header end*/
}

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);

  const categories = ["Electronics", "Clothing", "Books", "Home & Garden"];
  const navItems = [
    "HOME",
    "ABOUT US",
    "MEN",
    "WOMEN",
    "ELECTRONICS",
    "CONTACT US",
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const incrementCart = () => {
    setCartCount(cartCount + 1);
  };

  const decrementCart = () => {
    if (cartCount > 0) {
      setCartCount(cartCount - 1);
    }
  };

  return (
    <>
      <EcommerceHeader />
      <nav className="bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          {/* Left Section: Categories Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 font-semibold hover:bg-orange-600 transition-colors"
            >
              <Menu size={20} />
              CATEGORIES
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-md w-48 z-50">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-3 hover:bg-orange-50 text-gray-700 font-medium transition-colors border-b last:border-b-0"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Center Section: Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-700 font-medium hover:text-orange-500 transition-colors text-sm"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right Section: Shopping Cart */}
          <div className="flex items-center gap-3 bg-gray-700 text-white px-4 py-2 rounded-md">
            <ShoppingCart size={20} />
            <span className="font-semibold">MY CART</span>
            <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">
              {cartCount}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-700 font-medium hover:text-orange-500 transition-colors text-sm"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
