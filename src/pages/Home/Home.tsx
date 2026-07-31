import BlogSection from "../../components/blog/BlogSection";
import BrandSection from "../../components/brand/BrandSection";
import CategorySection from "../../components/category/CategorySection";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import HeroSection from "../../components/home/HeroSection";
import TrendingSection from "../../components/home/TrendingSection";

function Home() {
  return (
    <div className="flex flex-col pt-8 pb-16 gap-16">
      {/* <MegaMenu /> */}
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <TrendingSection />
      <BrandSection />
      <BlogSection />
    </div>
  );
}

export default Home;
