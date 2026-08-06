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
}

export const brands: Brand[] = [
  { id: 1, name: "Brooks", logo: brooks },
  { id: 2, name: "Vans", logo: vans },
  { id: 3, name: "Fila", logo: fila },
  { id: 4, name: "Nike", logo: nike },
  { id: 5, name: "Mizuna", logo: mizuna },
  { id: 6, name: "Salomon", logo: salomon },
  { id: 7, name: "Adidas", logo: adidas },
];
