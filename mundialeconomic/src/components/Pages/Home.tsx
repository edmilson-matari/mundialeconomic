import ProductCarousel from "../ProductCarousel";
import HotDeals from "../HotDeals";
import TopProductsWithStoreContext from "../TopProductsWithStoreContext";

export default function Home() {
  return (
    <>
      <ProductCarousel />
      <HotDeals />
      <TopProductsWithStoreContext />
    </>
  );
}
