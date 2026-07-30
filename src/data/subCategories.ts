import athleticShoes from "../assets/adfadf-1.png";
import casualSneakers from "../assets/adfadf-1-1.png";
import retro from "../assets/adfadf-1-2.png";
import whites from "../assets/adfadf-1-3.png";
import nike from "../assets/brands/nike.png";
import adidas from "../assets/brands/adidas.png";
import fila from "../assets/brands/fila.png";
import brooks from "../assets/brands/brooks.png";
import vans from "../assets/brands/vans.png";
import salomon from "../assets/brands/salomon.png";
import mizuna from "../assets/brands/mizuna.png";

export interface SubCategory {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  image: string;
}

export const SubCategories: SubCategory[] = [
  {
    id: 1,
    categoryId: 1,
    name: "Athletic Shoes",
    slug: "athletic-shoes",
    image: athleticShoes,
  },
  {
    id: 2,
    categoryId: 1,
    name: "Casual Sneakers",
    slug: "casual-sneakers",
    image: casualSneakers,
  },
  {
    id: 3,
    categoryId: 1,
    name: "Retro",
    slug: "retro",
    image: retro,
  },
  {
    id: 4,
    categoryId: 1,
    name: "White",
    slug: "white",
    image: whites,
  },
  {
    id: 5,
    categoryId: 2,
    name: "Lifestyle",
    slug: "lifestyle",
    image: athleticShoes,
  },
  {
    id: 6,
    categoryId: 2,
    name: "Running",
    slug: "running",
    image: athleticShoes,
  },
  {
    id: 7,
    categoryId: 2,
    name: "Training",
    slug: "training",
    image: athleticShoes,
  },
  {
    id: 8,
    categoryId: 2,
    name: "Fashion",
    slug: "fashion",
    image: athleticShoes,
  },
  {
    id: 9,
    categoryId: 3,
    name: "School",
    slug: "school",
    image: athleticShoes,
  },
  {
    id: 10,
    categoryId: 3,
    name: "Play",
    slug: "play",
    image: athleticShoes,
  },
  {
    id: 11,
    categoryId: 3,
    name: "Sports",
    slug: "sports",
    image: athleticShoes,
  },
  {
    id: 12,
    categoryId: 3,
    name: "Running",
    slug: "kids-running",
    image: athleticShoes,
  },
  {
    id: 13,
    categoryId: 4,
    name: "Brooks",
    slug: "brooks",
    image: brooks,
  },
  {
    id: 14,
    categoryId: 4,
    name: "Vans",
    slug: "vans",
    image: vans,
  },
  {
    id: 15,
    categoryId: 4,
    name: "Fila",
    slug: "fila",
    image: fila,
  },
  {
    id: 16,
    categoryId: 4,
    name: "Nike",
    slug: "nike",
    image: nike,
  },
  {
    id: 17,
    categoryId: 4,
    name: "Mizuna",
    slug: "mizuna",
    image: mizuna,
  },
  {
    id: 18,
    categoryId: 4,
    name: "Salomon",
    slug: "salomon",
    image: salomon,
  },
  {
    id: 19,
    categoryId: 4,
    name: "Adidas",
    slug: "adidas",
    image: adidas,
  },
  {
    id: 20,
    categoryId: 5,
    name: "Slides",
    slug: "slides",
    image: athleticShoes,
  },
  {
    id: 21,
    categoryId: 5,
    name: "Flip Flops",
    slug: "flip-flops",
    image: athleticShoes,
  },
  {
    id: 22,
    categoryId: 5,
    name: "Outdoor",
    slug: "outdoor",
    image: athleticShoes,
  },
  {
    id: 23,
    categoryId: 5,
    name: "Comfort",
    slug: "comfort",
    image: athleticShoes,
  },
];
