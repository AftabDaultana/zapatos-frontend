import BlogSection from "../../components/blog/BlogSection";
import BrandSection from "../../components/brand/BrandSection";
import CategorySection from "../../components/category/CategorySection";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import HeroSection from "../../components/home/HeroSection";
import TrendingSection from "../../components/home/TrendingSection";

function Home() {
  return (
    <>
      {/* <MegaMenu /> */}
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <TrendingSection />
      <BrandSection />
      <BlogSection />
    </>
  );
}

export default Home;
