import heroShoe from "../assets/hero-shoe.svg";
import truckFast from "../assets/truck-fast.svg";
import box from "../assets/box.svg";
import shield from "../assets/shield-check.svg";
import info from "../assets/information.svg";

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  infoHeading: string;
  features: {
    text: string;
    icon: string;
  }[];
}

export const heroSlides: readonly HeroSlide[] = [
  {
    id: 1,
    title: "Zapatos",
    description:
      "Discover the latest drops, limited editions, and classic styles designed for every step of your journey",
    buttonText: "Explore New Arrivals",
    image: heroShoe,
    infoHeading: "Quality you can count on",
    features: [
      {
        text: "Shipping",
        icon: truckFast,
      },
      {
        text: "Returns",
        icon: box,
      },
      {
        text: "Warranty",
        icon: shield,
      },
      {
        text: "FAQ",
        icon: info,
      },
    ],
  },
  {
    id: 2,
    title: "Zapatos",
    description:
      "Discover the latest drops, limited editions, and classic styles designed for every step of your journey",
    buttonText: "Explore New Arrivals",
    image: heroShoe,
    infoHeading: "Quality you can count on",
    features: [
      {
        text: "Shipping",
        icon: truckFast,
      },
      {
        text: "Returns",
        icon: box,
      },
      {
        text: "Warranty",
        icon: shield,
      },
      {
        text: "FAQ",
        icon: info,
      },
    ],
  },
];
