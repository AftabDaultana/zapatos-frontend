import nike from "../assets/brands/nike.png";
import adidas from "../assets/brands/adidas.png";
import fila from "../assets/brands/fila.png";
import brooks from "../assets/brands/brooks.png";
import vans from "../assets/brands/vans.png";
import salomon from "../assets/brands/salomon.png";
import mizuna from "../assets/brands/mizuna.png";

interface Brand {
  id: number;
  name: string;
  logo: string;
  className: string;
}

export const brands: Brand[] = [
  { id: 1, name: "Brooks", logo: brooks, className: "h-6 w-[200.79px]" },
  { id: 2, name: "Vans", logo: vans, className: "h-[67.55px] w-30" },
  { id: 3, name: "Fila", logo: fila, className: "h-[40.59px] w-30" },
  { id: 4, name: "Nike", logo: nike, className: "h-[67.5px] w-30 " },
  { id: 5, name: "Mizuna", logo: mizuna, className: "h-30 w-30" },
  {
    id: 6,
    name: "Salomon",
    logo: salomon,
    className: "h-[74.93px] w-30",
  },
  { id: 7, name: "Adidas", logo: adidas, className: "h-[89.17px] w-30" },
];
