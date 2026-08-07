import TrendingDesktop from "../trendingBanners/TrendingDesktop";
import TrendingMobile from "../trendingBanners/TrendingMobile";
import TrendingTablet from "../trendingBanners/TrendingTablet";

export default function TrendingSection() {
  return (
    <div>
      <section className="flex flex-col px-4 md:px-6 xl:px-8">
        <div className="flex flex-col gap-12">
          <div className="items-center">
            <h4 className="text-3xl leading-9 text-neutral-950 font-bold text-center">
              TRENDING SNEAKER STYLE
            </h4>
          </div>
          <TrendingDesktop />
          <TrendingTablet />
          <TrendingMobile />
        </div>
      </section>
    </div>
  );
}
