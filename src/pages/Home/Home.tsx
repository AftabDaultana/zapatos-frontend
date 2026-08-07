import BlogSection from "../../components/sections/BlogSection";
import BrandSection from "../../components/sections/BrandSection";
import CategorySection from "../../components/sections/CategorySection";
import FeaturedProducts from "../../components/sections/FeaturedProducts";
import HeroSection from "../../components/sections/HeroSection";
import TrendingSection from "../../components/sections/TrendingSection";

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
