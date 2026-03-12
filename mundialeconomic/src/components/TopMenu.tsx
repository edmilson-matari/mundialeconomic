"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  User,
  Heart,
  LogIn,
  LogOut,
  UserPlus2,
} from "lucide-react";
import { categories } from "./Types/categories";
import supabase from "../supabase-client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { StoreData } from "./Types/store";
import type { ProductDetail } from "./Types/product";
import thohambaLogo from "../default_img/tchohamba_logo.png";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Início", to: "/" },
    { name: "Lojas", to: "/lojas" },
    { name: "Contacto", to: "/contacto" },
  ];

  // Fecha resultados ao clicar fora ou pressionar Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowResults(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Verifica sessão ao carregar
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();

    // Escuta mudanças de autenticação em tempo real
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login-usuario");
  };

  const searchStores = async (query: string) => {
    return await supabase
      .from("stores")
      .select("*")
      .ilike("name", `%${query}%`);
  };

  const searchProducts = async (query: string) => {
    return await supabase
      .from("products")
      .select("*, stores(name, id)")
      .ilike("productName", `%${query}%`);
  };

  const searchAll = async (query: string) => {
    const [stores, products] = await Promise.all([
      searchStores(query),
      searchProducts(query),
    ]);

    return {
      stores: stores.data || [],
      products: products.data || [],
    };
  };

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<{
    stores: StoreData[];
    products: ProductDetail[];
  }>({
    stores: [],
    products: [],
  });

  const clearSearch = () => {
    setQuery("");
    setResults({ stores: [], products: [] });
    setShowResults(false);
  };

  const handleSearch = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const q = e.target.value;
    setQuery(q);

    if (!q.trim()) {
      setResults({ stores: [], products: [] });
      setShowResults(false);
      return;
    }

    const res = await searchAll(q);
    const newResults = {
      stores: res.stores ?? [],
      products: res.products ?? [],
    };
    setResults(newResults);
    setShowResults(
      newResults.stores.length > 0 || newResults.products.length > 0,
    );
  };

  return (
    <>
      {/* Top Bar — hidden on mobile */}
      <div className="hidden md:block bg-gray-900 text-gray-300 text-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-11">
            {/* Mensagem de boas-vindas */}
            <span className="text-gray-400">
              Bem-vindo à{" "}
              <span className="text-orange-400 font-medium">Tchohamba</span>
            </span>

            {/* Links de conta */}
            <div className="flex items-center gap-6">
              {!loading && user ? (
                <>
                  <Link
                    to="/conta"
                    className="flex items-center gap-1.5 hover:text-white transition group"
                  >
                    <User className="h-4 w-4 text-gray-400 group-hover:text-white" />
                    Minha Conta
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center gap-1.5 hover:text-white transition group"
                  >
                    <Heart className="h-4 w-4 text-gray-400 group-hover:text-white" />
                    Desejos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 hover:text-orange-400 transition"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login-usuario"
                    className="flex items-center gap-1.5 hover:text-white transition"
                  >
                    <LogIn className="h-4 w-4" />
                    Entrar
                  </Link>
                  <Link
                    to="/registar"
                    className="flex items-center gap-1.5 hover:text-white transition"
                  >
                    <UserPlus2 className="h-4 w-4" />
                    Criar Conta
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 min-w-0 shrink">
              <img
                src={thohambaLogo}
                alt="Logo da Tchohamba"
                className="w-9 h-9 lg:w-12 lg:h-12 object-contain flex-shrink-0"
              />
              <div className="min-w-0">
                <h1 className="text-base lg:text-2xl font-bold text-gray-900 leading-tight truncate">
                  Grupo Tchohamba
                </h1>
                <p className="hidden lg:block text-xs text-gray-500 -mt-0.5">
                  Comprar feito de maneira fácil
                </p>
              </div>
            </Link>

            {/* Desktop Search Bar */}
            <div
              ref={searchRef}
              className="hidden lg:flex flex-1 max-w-2xl mx-10 relative"
            >
              <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-400">
                <select className="px-4 py-3.5 bg-gray-100 text-gray-700 border-r border-gray-300 text-sm focus:outline-none shrink-0">
                  <option>Todas</option>
                  {categories.map((c) => (
                    <option key={c.value}>{c.name}</option>
                  ))}
                </select>
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    onFocus={() =>
                      (results.stores.length > 0 ||
                        results.products.length > 0) &&
                      setShowResults(true)
                    }
                    placeholder="Pesquise produtos, lojas ou categorias..."
                    className="w-full px-4 py-3.5 focus:outline-none"
                  />
                  {query && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button className="px-5 bg-black hover:bg-orange-600 flex items-center justify-center transition shrink-0">
                  <Search className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Desktop Results Dropdown */}
              {showResults &&
                (results.stores.length > 0 || results.products.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 max-h-[28rem] overflow-y-auto">
                    {results.stores.length > 0 && (
                      <div className="p-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2 mb-2">
                          Lojas
                        </h3>
                        {results.stores.map((store) => (
                          <Link
                            key={store.id}
                            to={`/lojas/${store.id}`}
                            onClick={() => {
                              clearSearch();
                              setMobileOpen(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 transition"
                          >
                            <img
                              src={store.logo}
                              alt={store.name}
                              className="w-9 h-9 rounded-full object-cover border border-gray-200 flex-shrink-0"
                            />
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">
                                {store.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {store.category}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {results.stores.length > 0 &&
                      results.products.length > 0 && (
                        <hr className="border-gray-100 mx-3" />
                      )}

                    {results.products.length > 0 && (
                      <div className="p-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2 mb-2">
                          Productos
                        </h3>
                        {results.products.map((product) => (
                          <Link
                            key={product.id}
                            to={`/producto/${product.id}`}
                            onClick={() => {
                              clearSearch();
                              setMobileOpen(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 transition"
                          >
                            <img
                              src={product.image_url}
                              alt={product.productName}
                              className="w-9 h-9 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-800 text-sm truncate">
                                {product.productName}
                              </p>
                              {product.stores?.name && (
                                <p className="text-xs text-gray-500">
                                  de{" "}
                                  <span className="font-medium">
                                    {product.stores.name}
                                  </span>
                                </p>
                              )}
                            </div>
                            <span className="ml-auto font-bold text-sm text-gray-900 flex-shrink-0">
                              Kz {product.price.toFixed(2)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
            </div>

            {/* Desktop Navigation + Cart */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Navigation */}
              <nav className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="text-gray-700 font-semibold text-base hover:text-orange-600 transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Cart */}
              <Link
                to="https://www.tchohamba.com/"
                className="flex items-center gap-3 bg-gray-800 text-white px-5 py-3 rounded-xl hover:bg-gray-900 transition"
              >
                {/* <ShoppingCart className="h-6 w-6" /> */}
                <div className="text-left">
                  <div className="text-xs opacity-90">Voltar Para Site</div>
                  {/*<div className="font-bold">0 itens</div>*/}
                </div>
                {/* <span className="bg-orange-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  0
                </span> */}
              </Link>
            </div>

            {/* Mobile Buttons */}
            <div className="flex items-center gap-1 lg:hidden flex-shrink-0">
              <a
                href="https://www.tchohamba.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-orange-600 border border-gray-200 hover:border-orange-400 rounded-lg px-3 py-2 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Site
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 border-t ${
            mobileOpen ? "max-h-screen py-6" : "max-h-0 py-0"
          }`}
        >
          <div className="px-4 space-y-5">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Pesquisar produtos ou lojas..."
                className="w-full pl-10 pr-10 py-3.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              <div className="mt-4 max-h-96 overflow-y-auto pr-2">
                {(results.stores.length > 0 || results.products.length > 0) && (
                  <div className="space-y-6">
                    {/* STORES */}
                    {results.stores.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">
                          Lojas
                        </h2>

                        <div className="space-y-2">
                          {results.stores.map((store) => (
                            <Link
                              key={store.id}
                              to={`/lojas/${store.id}`}
                              onClick={() => setMobileOpen(!mobileOpen)}
                            >
                              <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
                                <p className="font-medium text-gray-800">
                                  {store.name}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PRODUCTS */}
                    {results.products.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">
                          Productos
                        </h2>

                        <div className="space-y-2">
                          {results.products.map((product) => (
                            <Link
                              key={product.id}
                              to={`/producto/${product.id}`}
                              onClick={() => setMobileOpen(!mobileOpen)}
                            >
                              <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
                                <p className="font-medium text-gray-900">
                                  {product.productName}
                                </p>

                                {product.stores?.name && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    de{" "}
                                    <span className="font-semibold">
                                      {product.stores.name}
                                    </span>
                                  </p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Categories */}
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="w-full flex justify-between items-center bg-orange-600 text-white px-5 py-3.5 rounded-lg font-medium"
            >
              Categorias
              <ChevronDown
                className={`h-5 w-5 transition ${catOpen ? "rotate-180" : ""}`}
              />
            </button>
            {catOpen && (
              <div className="bg-gray-50 rounded-lg border">
                {categories.map((c) => (
                  <a
                    key={c.value}
                    href="#"
                    className="block px-5 py-3 hover:bg-orange-50 border-b last:border-0"
                  >
                    {c.name}
                  </a>
                ))}
              </div>
            )}

            {/* Mobile Nav Links */}
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="block px-5 py-3.5 text-lg font-medium text-gray-800 hover:bg-orange-50 rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth */}
            <div className="border-t pt-4">
              {!loading && user ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/conta"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-5 py-3.5 rounded-lg text-gray-700 hover:bg-orange-50 font-medium"
                  >
                    <User className="h-5 w-5 text-gray-400" />
                    Minha Conta
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-3 px-5 py-3.5 rounded-lg text-red-600 hover:bg-red-50 font-medium w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    Terminar Sessão
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login-usuario"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-800 text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-800 hover:text-white transition"
                  >
                    <LogIn className="h-4 w-4" />
                    Entrar
                  </Link>
                  <Link
                    to="/registar"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
                  >
                    <UserPlus2 className="h-4 w-4" />
                    Criar Conta
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
