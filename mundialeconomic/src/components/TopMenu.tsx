"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  ChevronDown,
  User,
  Heart,
  LogIn,
  LogOut,
  UserPlus2,
} from "lucide-react";
import { categories } from "./Types/categories";
import supabase from "../supabase-client";
import mototaxi_img from "../default_img/mototaxi.png";
import type { StoreData } from "./Types/store";
import type { ProductDetail } from "./Types/product";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Início", to: "/" },
    { name: "Lojas", to: "/lojas" },
    { name: "Contacto", to: "/contacto" },
  ];

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
      }
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

  const handleSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const q = e.target.value;
    setQuery(q);

    if (!q.trim()) {
      setResults({ stores: [], products: [] });
      return;
    }

    const res = await searchAll(q);

    setResults({
      stores: res.stores ?? [],
      products: res.products ?? [],
    });
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-gray-300 text-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-11">
            {/* Mensagem de boas-vindas (esconde em mobile) */}
            <span className="hidden md:block text-gray-400">
              Bem-vindo à{" "}
              <span className="text-orange-400 font-medium">
                Mundial Económico
              </span>
            </span>

            {/* Links com ícones (visíveis em todas as telas) */}
            <div className="flex items-center gap-5 md:gap-7">
              {!loading && user ? (
                // USUÁRIO LOGADO → Apenas "Sair"
                <>
                  <Link
                    to="/conta"
                    className="flex items-center gap-2 hover:text-white transition group"
                  >
                    <User className="h-4 w-4 text-gray-400 group-hover:text-white" />
                    <span className="hidden sm:inline">Minha Conta</span>
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center gap-2 hover:text-white transition group"
                  >
                    <Heart className="h-4 w-4 text-gray-400 group-hover:text-white" />
                    <span className="hidden sm:inline">Desejos</span>
                  </Link>

                  <Link
                    to="/carrinho"
                    className="flex items-center gap-2 hover:text-white transition group relative"
                  >
                    <ShoppingCart className="h-4 w-4 text-gray-400 group-hover:text-white" />
                    <span className="hidden sm:inline">Carrinho</span>
                    <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-white hover:text-orange-400 transition font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Sair</span>
                  </button>
                </>
              ) : (
                // USUÁRIO NÃO LOGADO → Links normais
                <>
                  <Link
                    to="/login-usuario"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition"
                  >
                    <LogIn className="h-4 w-4 rotate-180" />
                    <span>Entrar</span>
                  </Link>
                  <Link
                    to="/registar"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition"
                  >
                    <UserPlus2 className="h-4 w-4" />
                    <span>Criar Conta</span>
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
            <Link to="/" className="flex items-center gap-3">
              <ShoppingCart className="h-10 w-10 text-orange-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Mundial Económico
                </h1>
                <p className="text-xs text-gray-500 -mt-1">
                  Comprar feito de maneira fácil
                </p>
              </div>
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-10">
              <div className="relative w-full">
                <select className="absolute left-0 top-0 h-full px-5 bg-gray-100 text-gray-700 rounded-l-lg border-r border-gray-300 text-sm z-10">
                  <option>Todas</option>
                  {categories.map((c) => (
                    <option key={c.value}>{c.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Pesquise produtos, lojas ou categorias..."
                  className="w-full pl-44 pr-14 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="absolute right-0 top-0 h-full w-14 bg-orange-600 hover:bg-orange-700 rounded-r-lg flex items-center justify-center">
                  <Search className="h-5 w-5 text-white" />
                </button>
              </div>
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
                to="/carrinho"
                className="flex items-center gap-3 bg-gray-800 text-white px-5 py-3 rounded-xl hover:bg-gray-900 transition"
              >
                <ShoppingCart className="h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs opacity-90">Meu Carrinho</div>
                  <div className="font-bold">0 itens</div>
                </div>
                <span className="bg-orange-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  0
                </span>
              </Link>
            </div>

            {/* Mobile Buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:+244923456789"
                className="border border-orange-500 rounded-full"
              >
                <img src={mototaxi_img} width={60} height={60} alt="mototaxi" />
              </a>
              <button onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? (
                  <X className="h-7 w-7" />
                ) : (
                  <Menu className="h-7 w-7" />
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
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Pesquisar..."
                className="w-full pl-4 pr-12 py-3.5 border rounded-lg focus:ring-2 focus:ring-orange-500"
              />

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

            {/* Mobile Cart */}
            <Link
              to="/carrinho"
              className="flex justify-between items-center bg-gray-800 text-white px-6 py-4 rounded-xl"
              onClick={() => setMobileOpen(false)}
            >
              <div className="flex items-center gap-4">
                <ShoppingCart className="h-7 w-7" />
                <span className="font-bold">Meu Carrinho</span>
              </div>
              <span className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
