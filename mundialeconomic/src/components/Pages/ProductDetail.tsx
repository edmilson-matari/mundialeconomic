"use client";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Star,
  Package,
  Truck,
  Check,
  AlertCircle,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import supabase from "../../supabase-client";
import type { ProductDetail } from "../Types/product";

export default function ProductDetail() {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function fetchProduct() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products") // nome da sua tabela no Supabase
        .select("*, stores (*)")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (err: any) {
      console.error("Erro ao carregar produto:", err);
      alert("Produto não encontrado ou erro de conexão.");
    } finally {
      setLoading(false);
    }
  }

  const isInStock = product && product.stock > 0;
  const hasDiscount =
    product && product.oldPrice && product.oldPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product!.oldPrice! - product!.price) / product!.oldPrice!) * 100
      )
    : product?.badge?.type === "discount"
    ? product.badge.percent
    : null;

  const renderBadge = () => {
    if (!product?.badge) return null;

    if (product.badge.type === "new") {
      return (
        <span className="absolute top-4 left-4 z-10 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          NEW
        </span>
      );
    }
    if (product.badge.type === "hot" || discountPercent) {
      return (
        <span className="absolute top-4 left-4 z-10 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          {discountPercent ? `-${discountPercent}%` : "HOT"}
        </span>
      );
    }
    return null;
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Produto não encontrado
          </h2>
          <p className="text-gray-600 mt-2">
            Verifique o link ou tente novamente mais tarde.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Imagem */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-2xl">
              <img
                src={product.image_url || "/placeholder.jpg"}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
              {renderBadge()}
              {!isInStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="bg-red-600 text-white text-2xl font-bold px-10 py-5 rounded-full">
                    ESGOTADO
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Detalhes */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.productName}
              </h1>

              <div className="mb-6">{renderStars(product.rating)}</div>

              <div className="mb-8">
                <div className="flex items-end gap-4">
                  <span className="text-4xl font-bold text-indigo-600">
                    Kz {product.price.toFixed(2).replace(".", ",")}
                  </span>
                  {hasDiscount && (
                    <span className="text-2xl text-gray-500 line-through">
                      Kz {product.oldPrice!.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>
                {discountPercent && (
                  <p className="text-green-600 font-bold text-lg mt-2">
                    Economize Kz{" "}
                    {(product.oldPrice! - product.price)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                )}
              </div>

              {/* Loja */}
              <div className="flex items-center gap-5 py-6 border-y border-gray-200">
                <div className="flex items-center gap-4">
                  {product.stores.logo ? (
                    <img
                      src={product.stores.logo}
                      alt={product.stores.name}
                      className="w-14 h-14 rounded-lg object-contain bg-gray-100 p-2"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                  <Link to={`/lojas/${product.stores.id}`}>
                    <div>
                      <p className="text-sm text-gray-500">Vendido por</p>
                      <p className="font-bold text-gray-900">
                        {product.stores.name}
                      </p>
                    </div>
                  </Link>
                </div>

                {product && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck className="w-5 h-5" />
                    <span className="text-sm">{3434}</span>
                  </div>
                )}
              </div>

              {/* Estoque */}
              <div className="mt-6 flex items-center gap-3">
                {isInStock ? (
                  <>
                    <Check className="w-6 h-6 text-green-600" />
                    <span className="text-green-600 font-semibold">
                      {product.stock} unidades em estoque
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <span className="text-red-600 font-semibold">
                      Produto indisponível
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Botão Carrinho */}
            <div className="mt-10">
              <button
                onClick={() => {
                  setAddingToCart(true);
                  setTimeout(() => {
                    setAddingToCart(false);
                    alert("Adicionado ao carrinho com sucesso!");
                  }, 1000);
                }}
                disabled={!isInStock || addingToCart}
                className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
                  isInStock
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                } ${addingToCart ? "animate-pulse" : ""}`}
              >
                {addingToCart ? (
                  "Adicionando..."
                ) : isInStock ? (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Adicionar ao Carrinho
                  </>
                ) : (
                  "Indisponível"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
