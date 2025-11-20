import React from "react";
import { ShoppingCart } from "lucide-react";

export default function EcommerceFooter() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      {/* Main Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand + Contact Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <ShoppingCart className="h-10 w-10 text-orange-500" />
                <div>
                  <h3 className="text-2xl font-bold text-white">E-Com Shop</h3>
                  <p className="text-sm text-gray-400">Shopping Made Easy</p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-white">ADDRESS:</p>
                  <p className="mt-1">
                    09 Ecommerceshop,
                    <br />
                    Design Street, Victoria, Australia
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-white">E-MAIL:</p>
                  <a
                    href="mailto:info@ecommerceshop.com"
                    className="hover:text-orange-400 transition"
                  >
                    info@ecommerceshop.com
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-white">PHONE:</p>
                  <a
                    href="tel:+0112345678"
                    className="hover:text-orange-400 transition"
                  >
                    +01 123 456 78
                  </a>
                </div>
              </div>
            </div>

            {/* My Account */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 uppercase tracking-wider">
                My Account
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    My Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Wishlist
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Shopping Cart
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Checkout
                  </a>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 uppercase tracking-wider">
                Information
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    About Our Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Top Seller
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Special Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Manufacturers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Secure Shopping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Delivery Information
                  </a>
                </li>
              </ul>
            </div>

            {/* Our Support */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 uppercase tracking-wider">
                Our Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Shipping & Taxes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Return Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Affiliates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Gift Vouchers
                  </a>
                </li>
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 uppercase tracking-wider">
                Our Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    International Shopping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Best Customer Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Easy Replacement
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2025 E-ComShop. All Rights Reserved
          </p>

          <div className="flex space-x-4">
            <img
              src="/payment/mastercard.svg"
              alt="Mastercard"
              className="h-8"
            />
            <img src="/payment/visa.svg" alt="Visa" className="h-8" />
            <img src="/payment/paypal.svg" alt="PayPal" className="h-8" />
            <img src="/payment/discover.svg" alt="Discover" className="h-8" />
            <img src="/payment/bank.svg" alt="Bank Transfer" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
}
