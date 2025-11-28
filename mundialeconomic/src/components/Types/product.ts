import type { StoreData } from "./store";

export interface ProductDetail {
  id: number;
  productName: string;
  price: number;
  oldPrice?: number;
  badge?:
    | { type: "new"; text: "NEW" }
    | { type: "discount"; percent: number }
    | { type: "hot"; text: "HOT" };
  image_url: string;
  stock: number;
  status: "active" | "inactive";
  stores: StoreData;
  rating: number;
}
