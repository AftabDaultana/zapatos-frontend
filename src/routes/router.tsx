import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import CategoryProducts from "../pages/CategoryProducts/CategoryProducts";
import Profile from "../pages/Profile/Profile";
import Layout from "../components/layout/Layout";
import Checkout from "../pages/Checkout/Checkout";
import OrderDetails from "../pages/Order/OrderDetails";
import Orders from "../pages/Order/Orders";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Wishlist from "../pages/Wishlist/Wishlist";
import Contact from "../pages/Contact/Contact";
import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../pages/Admin/DashBoard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/category/:categorySlug",
    element: (
      <Layout>
        <CategoryProducts />
      </Layout>
    ),
  },
  {
    path: "/category/:categorySlug/:subCategorySlug",
    element: (
      <Layout>
        <CategoryProducts />
      </Layout>
    ),
  },
  {
    path: "/new-arrivals",
    element: (
      <Layout>
        <CategoryProducts />
      </Layout>
    ),
  },
  {
    path: "/featured",
    element: (
      <Layout>
        <CategoryProducts />
      </Layout>
    ),
  },
  {
    path: "/sustainable",
    element: (
      <Layout>
        <CategoryProducts />
      </Layout>
    ),
  },
  {
    path: "/high-tops",
    element: (
      <Layout>
        <CategoryProducts />
      </Layout>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Layout>
        <Checkout />
      </Layout>
    ),
  },
  {
    path: "/order/:orderId",
    element: (
      <Layout>
        <ProtectedRoutes>
          <OrderDetails />
        </ProtectedRoutes>
      </Layout>
    ),
  },
  {
    path: "/orders",
    element: (
      <Layout>
        <ProtectedRoutes>
          <Orders />
        </ProtectedRoutes>
      </Layout>
    ),
  },
  {
    path: "/products/:slug",
    element: (
      <Layout>
        <ProductDetails />
      </Layout>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <Layout>
        <Wishlist />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
