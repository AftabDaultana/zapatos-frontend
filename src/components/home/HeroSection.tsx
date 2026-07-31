import { heroSlides } from "../../data/heroSlides";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const slide = heroSlides[0];
  return (
    <>
      {/* Main Frame Start */}
      <section className="h-225 gap-2.5 px-8 ">
        {/* Hero Section Start */}
        <div className="flex items-center min-h-225 bg-[#e5e5e5]">
          {/* Frame 1 Start*/}
          <div className="flex flex-col items-start justify bg-center w-full h-200 gap-[-160px] px-4 py-8">
            {/* Heading Start */}
            <div className="flex items-start justify-center w-full h-75 gap-4">
              <h1 className="text-[300px] leading-76 tracking-[-5%] font-bold italic ">
                {slide.title}
              </h1>
            </div>
            {/* Heading End */}
            {/* Div containing discription, image and features start */}
            <div className="flex items-start justify-between px-4">
              {/* description start */}
              <div className="flex gap-6 pt-75">
                <p className="w-137 h-24 text-2xl leading-8 font-semibold">
                  {slide.description}
                </p>
              </div>
              {/* description end */}
              {/* Image Start */}
              <div className="flex absolute left-1/2 top-1/2 -translate-x-1/2 gap-[-1000px]">
                <img src={slide.image} className="w-180 h-[665.96]" />
              </div>
              {/* Image End */}
              {/* Features Start */}
              <div></div>
              {/* Features End */}
              {/* Button Start */}
              {/* Button End */}
            </div>
            {/* Div containing discription, image and features end */}
            {/* Frame 1 End */}
            {/* Carousel Buttons Frame Start */}
            {/* Carousel Buttons Frame End */}
          </div>
        </div>
        {/* Hero Section End */}
        {/* carousel arrows */}
        <div className="flex items-center justify-between">
          <button>
            <ChevronLeft
              size={48}
              className="absolute top-1/2 text-white bg-[#767676]"
            />
          </button>
          <button>
            <ChevronRight
              size={48}
              className="absolute top-1/2 text-white bg-[#767676]"
            />
          </button>
        </div>
        {/* Carousel Arrows End */}
      </section>
      {/* Main Frame End */}
    </>
  );
}
