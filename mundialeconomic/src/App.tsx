import TopMenu from "./components/TopMenu";
import ProductCarousel from "./components/ProductCarousel";
import HotDeals from "./components/HotDeals";
import Footer from "./components/Footer";
import TopCategories from "./components/TopCategories";
const App = () => {
  return (
    <div>
      <TopMenu />
      <ProductCarousel />
      <HotDeals />
      <TopCategories />
      <Footer />
    </div>
  );
};

export default App;
