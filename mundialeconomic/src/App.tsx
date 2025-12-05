import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminDash from "./components/Pages/AdminDash";
import Login from "./components/Pages/Login";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { Loader2 } from "lucide-react";
import ManagementPage from "./components/Pages/ManagementPage";
import ContactPage from "./components/Pages/ContactPage";
import UserLogin from "./components/Pages/UserLogin";
import CreateAccount from "./components/Pages/CreateAccount";
import ProductsManagement from "./components/Pages/ProductsManagement";
import Analytics from "./components/Pages/Analytics";
import ProductDetailPage from "./components/Pages/ProductDetail";
const App = () => {
  const Shops = lazy(() => import("./components/Pages/Shops"));
  const Home = lazy(() => import("./components/Pages/Home"));
  const ShopsDetails = lazy(() => import("./components/Pages/ShopsDetail"));

  // Layout protegido
  function ProtectedLayout() {
    const { isAdmin, loading } = useAuth();

    if (!isAdmin) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <h1>Not in Admin session</h1>
          {loading && (
            <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
          )}
        </div>
      );
    }

    return isAdmin ? <AdminLayout /> : null;
  }
  const router = createBrowserRouter([
    {
      path: "/login-usuario",
      element: <UserLogin />,
    },
    {
      path: "/registar",
      element: <CreateAccount />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <ProtectedLayout />,
      children: [
        {
          path: "/admin",
          element: <Analytics />,
        },
        { path: "/admin/stores", element: <AdminDash /> },
        { path: "/admin/users", element: <ManagementPage /> },
        { path: "/admin/productos", element: <ProductsManagement /> },
      ],
    },
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "lojas/:id",
          element: <ShopsDetails />,
        },
        {
          path: "/lojas",
          element: <Shops />,
        },
        {
          path: "/producto/:id",
          element: <ProductDetailPage />,
        },
        {
          path: "/contacto",
          element: <ContactPage />,
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
  );
};

export default App;
