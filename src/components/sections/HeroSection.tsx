import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../../data/heroSlides";
import Button from "../ui/Button";
import { useState } from "react";

import type { PanInfo } from "motion/react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = heroSlides[currentSlide];

  function handleNextSlide() {
    setCurrentSlide((prev) => {
      return prev < heroSlides.length - 1 ? prev + 1 : 0;
    });
  }

  function handlePreviousSlide() {
    setCurrentSlide((prev) => {
      return prev > 0 ? prev - 1 : heroSlides.length - 1;
    });
  }

  function handleSwipe(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (info.offset.x < -50) {
      handleNextSlide();
    }

    if (info.offset.x > 50) {
      handlePreviousSlide();
    }
  }

  return (
    <>
      <section className="relative h-114.75 md:h-200 xl:h-225 xl:gap-2.5 xl:px-8 md:px-0 px-4 ">
        <span className="flex justify-center min-h-6 items-center text-center text-sm leading-6 md:hidden">
          Spend $150 or more and get FREE SHIPPING on your order!
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            className="relative h-full bg-[#e5e5e5]"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleSwipe}
          >
            <div className="relative flex flex-col w-full h-full px-4 py-8">
              <div className="isolate inset-0 flex items-center justify-center z-0">
                <h1 className="text-[78px] leading-20 md:text-[200px] md:leading-60 min-[1440px]:text-[410px] min-[1440px]:leading-75 tracking-[-5%] font-bold italic text-center">
                  {slide.title}
                </h1>
              </div>
              <div className="isolate z-20 pt-55 flex items-end justify-between px-4 gap-6">
                <div className="hidden xl:block xl:z-40 relative w-137 h-24 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={slide.id}
                      initial={{
                        opacity: 0,
                        x: -40,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -40,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: "easeInOut",
                      }}
                      className="w-137 text-2xl leading-8 font-semibold"
                    >
                      {slide.description}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.id}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      rotate: -8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      rotate: 8,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: "easeInOut",
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2  translate-y-[-35%] flex flex-col items-center"
                  >
                    {/* Image Start */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-70 md:w-160 xl:w-180 h-auto z-10 relative"
                      loading="eager"
                    />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 20,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15,
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2  md:translate-y-[500%] translate-y-[300%] flex flex-col items-center"
                  >
                    <Button className="z-20 gap-6 px-4 py-2 md:py-3 xl:p-4 text-lg leading-7 xl:text-2xl xl:leading-8 font-semibold bg-neutral-950 text-neutral-50 whitespace-nowrap">
                      {slide.buttonText}{" "}
                      <ArrowRight className="w-4 h-4 xl:w-6 xl:h-6" />
                    </Button>
                  </motion.div>
                </AnimatePresence>
                <div className="hidden xl:block xl:z-40 relative w-auto h-24">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id}
                      initial={{
                        opacity: 0,
                        x: 40,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 40,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: 0.1,
                        ease: "easeInOut",
                      }}
                      layout={false}
                      className="flex flex-col gap-6"
                    >
                      <span className="block w-full text-2xl text-right font-semibold text-neutral-700">
                        {slide.infoHeading}
                      </span>
                      <div className="flex items-center h-12 divide-x divide-neutral-950 border border-neutral-950">
                        {slide.features.map((feature) => {
                          return (
                            <div
                              key={feature.text}
                              className="flex items-center gap-2 px-4"
                            >
                              <img
                                src={feature.icon}
                                alt={feature.text}
                                className="w-6 h-6"
                                loading="eager"
                              />
                              <span className="text-sm leading-6 font-semibold whitespace-nowrap">
                                {feature.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-between">
          <button
            aria-label="Previous slide"
            type="button"
            onClick={handlePreviousSlide}
            className="absolute left-4 md:left-8 xl:left-12 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center text-white bg-[#767676] cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 md:w-12 md:h-12" />
          </button>
          <button
            aria-label="Next slide"
            type="button"
            onClick={handleNextSlide}
            className="absolute right-4 md:right-8 xl:right-12 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center text-white bg-[#767676] cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 md:w-12 md:h-12" />
          </button>
        </div>
      </section>
    </>
  );
}
