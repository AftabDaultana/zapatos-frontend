import ProductDetailsSection from "../../components/sections/ProductDetailsSection";
import FeaturedProducts from "../../components/sections/FeaturedProducts";
import BrandSection from "../../components/sections/BrandSection";

export default function ProductDetails() {
  return (
    <main className="flex flex-col gap-16 px-6 py-10">
      <ProductDetailsSection />
      <FeaturedProducts />
      <BrandSection />
    </main>
  );
}
