import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { lazy } from "react";
import type { LoaderFunctionArgs } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminDash from "./components/Pages/AdminDash";
import Login from "./components/Pages/Login";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { Loader2 } from "lucide-react";
const App = () => {
  const Shops = lazy(() => import("./components/Pages/Shops"));
  const Home = lazy(() => import("./components/Pages/Home"));
  const ShopsDetails = lazy(() => import("./components/Pages/ShopsDetail"));

  const requireAuth = async ({ request }: LoaderFunctionArgs) => {
    const logged = localStorage.getItem("admin-auth") === "true";
    if (!logged) {
      const params = new URLSearchParams();
      params.set("from", new URL(request.url).pathname);
      return redirect(`/login?${params.toString()}`);
    }
    return null;
  };

  // Layout protegido
  function ProtectedLayout() {
    const { isAdmin, loading } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
        </div>
      );
    }

    return isAdmin ? <AdminLayout /> : null;
  }
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <ProtectedLayout />,
      children: [{ path: "/admin/stores", element: <AdminDash /> }],
    },
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/lojas",
          element: <Shops />,
        },
        {
          path: "/shops-details",
          element: <ShopsDetails />,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    /*<BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/lojas" element={<Shops />} />
        </Route>
      </Routes>
    </BrowserRouter>*/
  );
};

export default App;
