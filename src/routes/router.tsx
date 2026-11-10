import Home from "../pages/Home/Home";
import Orders from "../pages/Order/Orders";
import Profile from "../pages/Profile/Profile";
import Contact from "../pages/Contact/Contact";
import Layout from "../components/layout/Layout";
import Checkout from "../pages/Checkout/Checkout";
import Wishlist from "../pages/Wishlist/Wishlist";
import AuthSuccess from "../pages/Auth/AuthSuccess";
import { createBrowserRouter } from "react-router-dom";
import OrderDetails from "../pages/Order/OrderDetails";
import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../pages/Admin/DashBoard/Dashboard";
import ListCarts from "../pages/Admin/ListCarts/ListCarts";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";
import AdminOrders from "../pages/Admin/AdminOrders/AdminOrders";
import ListProducts from "../pages/Admin/ListProducts/ListProduct";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ProductReviews from "../pages/ProductReviews/ProductReviews";
import AdminListBlogs from "../pages/Admin/AdminBlogs/AdminListBlogs";
import AdminProtectedRoute from "../components/auth/AdminProtectedRoute";
import CategoryProducts from "../pages/CategoryProducts/CategoryProducts";
import AdminCustomers from "../pages/Admin/AdminCustomers/AdminCustomers";
import AdminCategories from "../pages/Admin/AdminCategories/AdminCategories";
import AdminSubCategories from "../pages/Admin/AdminSubCategories/AdminSubCategories";
import ListProductReviews from "../pages/Admin/ListProductReviews/ListProductReviews";

const router = createBrowserRouter([
  {
    path: "/auth/success",
    element: <AuthSuccess />,
  },
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
    path: "/order/:id",
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
    path: "/my-reviews",
    element: (
      <Layout>
        <ProtectedRoutes>
          <ProductReviews />
        </ProtectedRoutes>
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
    path: "/blogs/:slug",
    element: (
      <Layout>
        <BlogDetails />
      </Layout>
    ),
  },
  {
    path: "/admin",
    element: <AdminProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "orders/:id",
            element: <OrderDetails />,
          },
          {
            path: "products",
            element: <ListProducts />,
          },
          {
            path: "product-reviews",
            element: <ListProductReviews />,
          },
          {
            path: "products/:slug",
            element: <ProductDetails />,
          },
          {
            path: "categories",
            element: <AdminCategories />,
          },
          {
            path: "subcategories",
            element: <AdminSubCategories />,
          },
          {
            path: "customers",
            element: <AdminCustomers />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "carts",
            element: <ListCarts />,
          },
          {
            path: "blogs",
            element: <AdminListBlogs />,
          },
        ],
      },
    ],
  },
]);

export default router;
