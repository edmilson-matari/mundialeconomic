"use client";

import { useEffect, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Package,
  Check,
  AlertCircle,
  ShoppingCart,
  Loader2,
  ChevronLeft,
  Minus,
  Plus,
  Share2,
  MapPin,
  BadgeCheck,
  MessageCircle,
  Shield,
  RotateCcw,
  Zap,
} from "lucide-react";
import supabase from "../../supabase-client";
import type { ProductDetail } from "../Types/product";
import { useCart } from "../useCart";

export default function ProductDetail() {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [copied, setCopied] = useState(false);
  const { id } = useParams();
  const { addItem, items, updateQty } = useCart();
  const navigate = useNavigate();

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*, stores (*)")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (err: unknown) {
      console.error("Erro ao carregar produto:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const isInStock = product && product.stock > 0;
  const isLowStock = product && product.stock > 0 && product.stock <= 5;
  const hasDiscount =
    product && product.oldPrice && product.oldPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product!.oldPrice! - product!.price) / product!.oldPrice!) * 100,
      )
    : product?.badge?.type === "discount"
      ? product.badge.percent
      : null;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product?.productName,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    if (!product) return;
    const phone = product.stores.phone.replace(/\D/g, "");
    const message = `Olá! Tenho interesse no produto *"${product.productName}"* (Kz ${product.price.toFixed(2).replace(".", ",")}). Ainda está disponível?`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleAddToCart = () => {
    if (!product || !isInStock) return;
    setAddingToCart(true);
    setTimeout(() => {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        updateQty(product.id, existing.qty + qty);
      } else {
        addItem({
          id: product.id,
          productName: product.productName,
          price: product.price,
          image_url: product.image_url,
          storeId: product.stores.id,
          storeName: product.stores.name,
          storeLogo: product.stores.logo,
        });
        if (qty > 1) updateQty(product.id, qty);
      }
      setAddingToCart(false);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2500);
    }, 500);
  };

  const renderStars = (rating: number, size = "w-4 h-4") => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${size} ${
            i <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      <span className="ml-1.5 text-sm text-gray-500 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  );

  /* ── Loading skeleton ───────────────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-56 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="aspect-square bg-gray-200 rounded-2xl" />
            <div className="space-y-5">
              <div className="h-8 bg-gray-200 rounded-xl w-4/5" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-20 bg-gray-200 rounded-xl" />
              <div className="h-12 bg-gray-200 rounded-xl" />
              <div className="h-24 bg-gray-200 rounded-xl" />
              <div className="h-14 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Not found ──────────────────────────────────────────────── */
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4 px-4">
        <AlertCircle className="w-20 h-20 text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-800">
          Produto não encontrado
        </h2>
        <p className="text-gray-500 text-center">
          Verifique o link ou tente novamente mais tarde.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 text-orange-600 font-semibold hover:underline flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar
        </button>
      </div>
    );
  }

  /* ── Page ───────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 pb-28 lg:pb-10">
      {/* Sticky breadcrumb bar */}
      <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-1.5 text-sm text-gray-400 overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link to="/" className="hover:text-orange-600 transition shrink-0">
            Início
          </Link>
          <span>/</span>
          <Link
            to="/lojas"
            className="hover:text-orange-600 transition shrink-0"
          >
            Lojas
          </Link>
          <span>/</span>
          <Link
            to={`/lojas/${product.stores.id}`}
            className="hover:text-orange-600 transition shrink-0"
          >
            {product.stores.name}
          </Link>
          <span>/</span>
          <span className="text-gray-700 font-medium truncate max-w-[180px]">
            {product.productName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 transition mb-6 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* ── LEFT ── */}
          <div className="space-y-4">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100">
              <img
                src={product.image_url}
                alt={product.productName}
                className="w-full h-full object-contain p-4"
              />

              {/* Discount badge */}
              {discountPercent && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                  -{discountPercent}%
                </span>
              )}
              {!discountPercent && product.badge?.type === "new" && (
                <span className="absolute top-4 left-4 bg-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                  NOVO
                </span>
              )}
              {!discountPercent && product.badge?.type === "hot" && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                  HOT
                </span>
              )}

              {/* Out of stock overlay */}
              {!isInStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                  <span className="bg-red-600 text-white text-xl font-bold px-8 py-4 rounded-full shadow-lg">
                    ESGOTADO
                  </span>
                </div>
              )}

              {/* Share button */}
              <button
                onClick={handleShare}
                title={copied ? "Link copiado!" : "Partilhar"}
                className="absolute top-4 right-4 bg-white rounded-full p-2.5 shadow-md hover:shadow-lg transition flex items-center justify-center"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Share2 className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { icon: Shield, label: "Compra Segura" },
                  { icon: RotateCcw, label: "Devolução Fácil" },
                  { icon: Zap, label: "Entrega Rápida" },
                ] as const
              ).map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 bg-white rounded-xl py-3 px-2 border border-gray-100 text-center shadow-sm"
                >
                  <Icon className="w-5 h-5 text-orange-500" />
                  <span className="text-xs text-gray-500 font-medium leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="flex flex-col gap-5">
            {/* Name + rating */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                {product.productName}
              </h1>
              <div className="mt-2">{renderStars(product.rating)}</div>
            </div>

            {/* Price block */}
            <div className="bg-orange-50 rounded-2xl px-5 py-4 border border-orange-100">
              <div className="flex items-end gap-3 flex-wrap">
                <span className="text-4xl font-extrabold text-orange-600 tracking-tight">
                  Kz {product.price.toFixed(2).replace(".", ",")}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-gray-400 line-through mb-0.5">
                    Kz {product.oldPrice!.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>
              {discountPercent && hasDiscount && (
                <p className="text-green-600 font-semibold text-sm mt-1 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Poupa Kz{" "}
                  {(product.oldPrice! - product.price)
                    .toFixed(2)
                    .replace(".", ",")}{" "}
                  ({discountPercent}% de desconto)
                </p>
              )}
            </div>

            {/* Stock chip */}
            <div
              className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full w-fit border ${
                !isInStock
                  ? "bg-red-50 text-red-600 border-red-200"
                  : isLowStock
                    ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                    : "bg-green-50 text-green-700 border-green-200"
              }`}
            >
              {!isInStock ? (
                <>
                  <AlertCircle className="w-4 h-4" /> Produto indisponível
                </>
              ) : isLowStock ? (
                <>
                  <AlertCircle className="w-4 h-4" /> Restam apenas{" "}
                  {product.stock} unidades!
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" /> Em stock ({product.stock}{" "}
                  unidades)
                </>
              )}
            </div>

            {/* Store card */}
            <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm gap-3">
              <Link
                to={`/lojas/${product.stores.id}`}
                className="flex items-center gap-3 hover:opacity-80 transition min-w-0"
              >
                {product.stores.logo ? (
                  <img
                    src={product.stores.logo}
                    alt={product.stores.name}
                    className="w-12 h-12 rounded-xl object-contain bg-gray-50 p-1 border border-gray-100 flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="font-bold text-gray-900 text-sm truncate">
                      {product.stores.name}
                    </p>
                    {product.stores.isVerified && (
                      <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Vendido por esta loja
                  </p>
                  {product.stores.location && (
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">
                        {product.stores.location}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                {renderStars(product.stores.rating)}
                <span className="text-xs text-gray-400">
                  {product.stores.totalReviews} avaliações
                </span>
              </div>
            </div>

            {/* Quantity selector */}
            {isInStock && (
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm font-semibold text-gray-700">
                  Quantidade:
                </span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty === 1}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition text-gray-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900 text-base select-none">
                    {qty}
                  </span>
                  <button
                    onClick={() =>
                      setQty((q) => Math.min(product.stock, q + 1))
                    }
                    disabled={qty === product.stock}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition text-gray-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {qty > 1 && (
                  <span className="text-sm text-gray-500">
                    Total:{" "}
                    <strong className="text-gray-900">
                      Kz {(product.price * qty).toFixed(2).replace(".", ",")}
                    </strong>
                  </span>
                )}
              </div>
            )}

            {/* Desktop CTAs */}
            <div className="hidden lg:flex flex-col gap-3 mt-1">
              <button
                onClick={handleAddToCart}
                disabled={!isInStock || addingToCart}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-md active:scale-[0.98] ${
                  !isInStock
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : addedToCart
                      ? "bg-green-500 text-white"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
              >
                {addingToCart ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Adicionando...
                  </>
                ) : addedToCart ? (
                  <>
                    <Check className="w-5 h-5" /> Adicionado ao Carrinho!
                  </>
                ) : isInStock ? (
                  <>
                    <ShoppingCart className="w-5 h-5" /> Adicionar ao Carrinho
                  </>
                ) : (
                  "Indisponível"
                )}
              </button>

              {product.stores.phone && (
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 border-2 border-green-500 text-green-600 hover:bg-green-50 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  Perguntar via WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky mobile CTA bar ───────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 px-4 py-3 flex gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        {product.stores.phone && (
          <button
            onClick={handleWhatsApp}
            className="flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2 border-green-500 text-green-600 active:bg-green-50 transition"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </button>
        )}
        <button
          onClick={handleAddToCart}
          disabled={!isInStock || addingToCart}
          className={`flex-[2] py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow active:scale-[0.98] ${
            !isInStock
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : addedToCart
                ? "bg-green-500 text-white"
                : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          {addingToCart ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Adicionando...
            </>
          ) : addedToCart ? (
            <>
              <Check className="w-4 h-4" /> Adicionado!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Adicionar ao Carrinho
            </>
          )}
        </button>
      </div>
    </div>
  );
}
