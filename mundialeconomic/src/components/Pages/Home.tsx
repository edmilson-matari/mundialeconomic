import ProductCarousel from "../ProductCarousel";
//import HotDeals from "../HotDeals";
import TopProductsWithStoreContext from "../TopProductsWithStoreContext";
import PromotionBanners from "../PromotionBanners";
import { useNavigation } from "react-router-dom";
import FallBack from "../Falback";

export default function Home() {
  const navigate = useNavigation();
  const isLoading = navigate.state === "loading";

  return (
    <>
      {isLoading && <FallBack />}
      <div>
        <ProductCarousel />
        {/*<HotDeals />*/}
        <PromotionBanners />
        <TopProductsWithStoreContext />
      </div>
    </>
  );
}
