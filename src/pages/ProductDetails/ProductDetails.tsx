import ProductDetailsSection from "../../components/sections/ProductDetailsSection";
import FeaturedProducts from "../../components/sections/FeaturedProducts";
import BrandSection from "../../components/sections/BrandSection";
import ProductReviewsSection from "../../components/sections/ProductReviewsSection";
import { useState } from "react";

export default function ProductDetails() {
  const isAdmin = window.location.pathname.startsWith("/admin/");
  const [productId, setProductId] = useState("");

  return (
    <main className="flex flex-col gap-16 px-6 py-10">
      <ProductDetailsSection onProductLoaded={setProductId} />

      {!isAdmin && productId && (
        <>
          <ProductReviewsSection productId={productId} />
          <FeaturedProducts />
          <BrandSection />
        </>
      )}
    </main>
  );
}
