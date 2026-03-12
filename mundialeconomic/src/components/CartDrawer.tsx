import { useState, useEffect, useRef } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "./useCart";

const WHATSAPP_NUMBER = "244934951038";

export default function CartDrawer() {
  const { items, totalItems, totalPrice, removeItem, updateQty, clearCart } =
    useCart();
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const prevCount = useRef(totalItems);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleCheckout = () => {
    const lines = items
      .map((item) => `• ${item.productName} × ${item.qty}`)
      .join("\n");
    const message =
      `Olá! Gostaria de verificar se os seguintes produtos ainda estão disponíveis:\n\n` +
      lines +
      `\n\nTotal: Kz ${totalPrice.toFixed(2)}\n\nObrigado!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Animate button when item is added
  useEffect(() => {
    if (totalItems > prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 400);
      return () => clearTimeout(t);
    }
    prevCount.current = totalItems;
  }, [totalItems]);

  // Close on Escape or outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
    };
  }, []);

  if (totalItems === 0 && !open) return null;

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" />
      )}

      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={`fixed bottom-6 right-6 z-50 bg-black text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:bg-orange-600 transition-all duration-200 ${
            bump ? "scale-125" : "scale-100"
          }`}
        >
          <ShoppingCart className="w-7 h-7" />
          <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-xs font-bold rounded-full min-w-[1.4rem] h-[1.4rem] flex items-center justify-center px-1 shadow">
            {totalItems}
          </span>
        </button>
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Carrinho
              <span className="ml-2 text-base font-normal text-gray-500">
                ({totalItems} {totalItems === 1 ? "item" : "itens"})
              </span>
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
              <ShoppingCart className="w-16 h-16 opacity-30" />
              <p className="text-lg">O carrinho está vazio</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100"
              >
                {/* Image */}
                <img
                  src={item.image_url}
                  alt={item.productName}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-orange-600 font-medium flex items-center gap-1">
                    <img
                      src={item.storeLogo}
                      alt={item.storeName}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    {item.storeName}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 mt-0.5">
                    {item.productName}
                  </p>
                  <p className="text-base font-bold text-gray-900 mt-1">
                    Kz {(item.price * item.qty).toFixed(2)}
                  </p>
                  {item.qty > 1 && (
                    <p className="text-xs text-gray-400">
                      Kz {item.price.toFixed(2)} × {item.qty}
                    </p>
                  )}
                </div>

                {/* Qty controls */}
                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-1 py-0.5">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      disabled={item.qty === 1}
                      className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30 transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-bold text-gray-800">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-5 space-y-4 bg-white">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">
                Kz {totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Actions */}
            <button
              onClick={handleCheckout}
              className="w-full bg-black hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition text-lg flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.856L.057 23.882l6.198-1.625A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.802 9.802 0 0 1-5.003-1.371l-.359-.214-3.68.965.981-3.595-.234-.369A9.775 9.775 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
              Finalizar Compra via WhatsApp
            </button>
            <button
              onClick={clearCart}
              className="w-full text-sm text-gray-500 hover:text-red-500 transition"
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </div>
    </>
  );
}
