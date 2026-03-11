import { Outlet, useNavigation } from "react-router-dom";
import { Suspense } from "react";
import Footer from "../Footer";
import TopMenu from "../TopMenu";
import CartDrawer from "../CartDrawer";
import InstallBanner from "../InstallBanner";
import ScrollToTop from "../ScrollToTop";

export default function Layout() {
  const navigate = useNavigation();

  return (
    <>
      <ScrollToTop />
      <TopMenu />
      {navigate.state === "loading" && <div>Is loading</div>}
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
      <CartDrawer />
      <InstallBanner />
    </>
  );
}
