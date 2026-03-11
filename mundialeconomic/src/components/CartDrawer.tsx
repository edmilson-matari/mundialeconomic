import { useState, useEffect, useRef } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "./useCart";

export default function CartDrawer() {
  const { items, totalItems, totalPrice, removeItem, updateQty, clearCart } =
    useCart();
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const prevCount = useRef(totalItems);
  const drawerRef = useRef<HTMLDivElement>(null);

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
            <button className="w-full bg-black hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition text-lg">
              Finalizar Compra
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
