import type { ProductDetail } from "./product";

export interface StoreData {
  id: number;
  owner: string;
  name: string;
  logo: string;
  banner: string;
  phone: string;
  category: string;
  rating: number;
  totalReviews: number;
  totalProducts: number;
  joined_date: string;
  location: string;
  description: string;
  isVerified: boolean;
  email: string;
  badge?: string;
  status: string;
  products: ProductDetail[];
}
