import { Outlet, useNavigation } from "react-router-dom";
import { Suspense } from "react";
import Footer from "../Footer";
import TopMenu from "../TopMenu";

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
    </>
  );
}
