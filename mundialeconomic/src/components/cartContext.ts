import { createContext } from "react";

export interface CartItem {
  id: number;
  productName: string;
  price: number;
  image_url: string;
  storeId: number;
  storeName: string;
  storeLogo: string;
  qty: number;
}

export interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
