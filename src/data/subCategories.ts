import athleticShoes from "../assets/adfadf-1.png?format=webp";
import casualSneakers from "../assets/adfadf-1-1.png?format=webp";
import retro from "../assets/adfadf-1-2.png?format=webp";
import whites from "../assets/adfadf-1-3.png?format=webp";
import nike from "../assets/brands/nike.png?format=webp";
import adidas from "../assets/brands/adidas.png?format=webp";
import fila from "../assets/brands/fila.png?format=webp";
import brooks from "../assets/brands/brooks.png?format=webp";
import vans from "../assets/brands/vans.png?format=webp";
import salomon from "../assets/brands/salomon.png?format=webp";
import mizuna from "../assets/brands/mizuna.png?format=webp";

export interface SubCategory {
  _id?: string;
  categoryId: string;
  name: string;
  slug: string;
  image: string;
}

export const subCategories: SubCategory[] = [
  {
    _id: "1",
    categoryId: "1",
    name: "Athletic Shoes",
    slug: "athletic-shoes",
    image: athleticShoes,
  },
  {
    _id: "2",
    categoryId: "1",
    name: "Casual Sneakers",
    slug: "casual-sneakers",
    image: casualSneakers,
  },
  {
    _id: "3",
    categoryId: "1",
    name: "Retro",
    slug: "retro",
    image: retro,
  },
  {
    _id: "4",
    categoryId: "1",
    name: "White",
    slug: "white",
    image: whites,
  },
  {
    _id: "5",
    categoryId: "2",
    name: "Lifestyle",
    slug: "lifestyle",
    image: athleticShoes,
  },
  {
    _id: "6",
    categoryId: "2",
    name: "Running",
    slug: "running",
    image: athleticShoes,
  },
  {
    _id: "7",
    categoryId: "2",
    name: "Training",
    slug: "training",
    image: athleticShoes,
  },
  {
    _id: "8",
    categoryId: "2",
    name: "Fashion",
    slug: "fashion",
    image: athleticShoes,
  },
  {
    _id: "9",
    categoryId: "3",
    name: "School",
    slug: "school",
    image: athleticShoes,
  },
  {
    _id: "10",
    categoryId: "3",
    name: "Play",
    slug: "play",
    image: athleticShoes,
  },
  {
    _id: "11",
    categoryId: "3",
    name: "Sports",
    slug: "sports",
    image: athleticShoes,
  },
  {
    _id: "12",
    categoryId: "3",
    name: "Running",
    slug: "kids-running",
    image: athleticShoes,
  },
  {
    _id: "13",
    categoryId: "4",
    name: "Brooks",
    slug: "brooks",
    image: brooks,
  },
  {
    _id: "14",
    categoryId: "4",
    name: "Vans",
    slug: "vans",
    image: vans,
  },
  {
    _id: "15",
    categoryId: "4",
    name: "Fila",
    slug: "fila",
    image: fila,
  },
  {
    _id: "16",
    categoryId: "4",
    name: "Nike",
    slug: "nike",
    image: nike,
  },
  {
    _id: "17",
    categoryId: "4",
    name: "Mizuna",
    slug: "mizuna",
    image: mizuna,
  },
  {
    _id: "18",
    categoryId: "4",
    name: "Salomon",
    slug: "salomon",
    image: salomon,
  },
  {
    _id: "19",
    categoryId: "4",
    name: "Adidas",
    slug: "adidas",
    image: adidas,
  },
  {
    _id: "20",
    categoryId: "5",
    name: "Slides",
    slug: "slides",
    image: athleticShoes,
  },
  {
    _id: "21",
    categoryId: "5",
    name: "Flip Flops",
    slug: "flip-flops",
    image: athleticShoes,
  },
  {
    _id: "22",
    categoryId: "5",
    name: "Outdoor",
    slug: "outdoor",
    image: athleticShoes,
  },
  {
    _id: "23",
    categoryId: "5",
    name: "Comfort",
    slug: "comfort",
    image: athleticShoes,
  },
];
