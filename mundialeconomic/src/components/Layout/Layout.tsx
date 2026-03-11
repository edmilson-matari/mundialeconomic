import { Outlet, useNavigation } from "react-router-dom";
import { Suspense } from "react";
import Footer from "../Footer";
import TopMenu from "../TopMenu";
import CartDrawer from "../CartDrawer";
import InstallBanner from "../InstallBanner";

export default function Layout() {
  const navigate = useNavigation();

  return (
    <>
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
