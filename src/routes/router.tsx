import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import CategoryProducts from "../pages/CategoryProducts/CategoryProducts";
import Profile from "../pages/Profile/Profile";
import Layout from "../components/layout/Layout";

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
]);

export default router;
