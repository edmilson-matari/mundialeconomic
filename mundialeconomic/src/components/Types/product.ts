export interface Store {
  name: string;
  logo: string;
  rating: number;
}

export interface ProductDetail {
  id: number;
  productName: string;
  price: number;
  oldPrice?: number;
  badge?: { type: "new"; text: "NEW" } | { type: "discount"; percent: number };
  image: string;
  stock: number;
  status: "active" | "inactive";
}
