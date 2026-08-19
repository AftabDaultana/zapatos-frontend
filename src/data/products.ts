import productImage from "../assets/product-images/adfadf 1_1.png?format=webp";

export interface Product {
  id: number;
  name: string;
  slug: string;

  subCategoryId: number[];

  description: string;

  rating: number;
  ratingCount: number;

  price: number;
  discountedPrice: number;

  quantity: number;

  featured?: boolean;

  isNewArrival?: boolean;

  isSustainable?: boolean;

  isHighTop?: boolean;

  specifications: {
    type: string;
    gender: string;
    material: string;
    color: string[];
    sizeRange: string[];
    features: string[];
  };

  images: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Max Pulse",
    slug: "nike-air-max-pulse",
    subCategoryId: [1, 4, 16],
    description:
      "Nike Air Max Pulse delivers a modern running-inspired design with responsive cushioning, breathable construction, and everyday comfort.",
    rating: 5,
    ratingCount: 328,
    price: 18999,
    discountedPrice: 15999,
    quantity: 20,
    featured: true,
    isNewArrival: true,
    isSustainable: true,
    isHighTop: true,
    specifications: {
      type: "Athletic Shoes",
      gender: "Unisex",
      material: "Mesh upper with synthetic overlays",
      color: ["Black", "White"],
      sizeRange: ["6", "7", "8", "9", "10", "11"],
      features: [
        "Air cushioning technology",
        "Lightweight construction",
        "Durable outsole",
      ],
    },
    images: [
      productImage,
      productImage,
      productImage,
      productImage,
      productImage,
      productImage,
    ],
  },

  {
    id: 2,
    name: "Adidas Ultraboost Light",
    slug: "adidas-ultraboost-light",
    subCategoryId: [1, 4, 19],
    description:
      "Adidas Ultraboost Light provides exceptional energy return and comfort with a premium lightweight running design.",
    rating: 4.8,
    ratingCount: 512,
    price: 24999,
    featured: true,
    isNewArrival: true,
    discountedPrice: 21999,
    quantity: 0,
    specifications: {
      type: "Athletic Shoes",
      gender: "Unisex",
      material: "Primeknit upper",
      color: ["White"],
      sizeRange: ["6", "7", "8", "9", "10"],
      features: ["Boost cushioning", "Adaptive fit", "High energy return"],
    },
    images: [productImage, productImage, productImage],
  },

  {
    id: 3,
    name: "Puma Suede Classic",
    slug: "puma-suede-classic",
    subCategoryId: [2, 3],
    description:
      "A timeless casual sneaker featuring premium suede material and classic streetwear styling.",
    rating: 4.5,
    ratingCount: 196,
    price: 14999,
    discountedPrice: 12999,
    quantity: 20,
    featured: false,
    isHighTop: true,
    specifications: {
      type: "Casual Sneakers",
      gender: "Unisex",
      material: "Premium suede",
      color: ["Black"],
      sizeRange: ["6", "7", "8", "9", "10"],
      features: ["Classic silhouette", "Soft suede finish", "Rubber outsole"],
    },
    images: [productImage, productImage, productImage],
  },

  {
    id: 4,
    name: "Nike Revolution 7 Kids",
    slug: "nike-revolution-7-kids",
    subCategoryId: [1, 16],
    description:
      "Lightweight kids running shoes designed for active children with flexible cushioning and comfort.",
    rating: 4.6,
    ratingCount: 142,
    price: 9999,
    discountedPrice: 8499,
    quantity: 20,
    featured: true,
    isNewArrival: true,
    isSustainable: true,
    isHighTop: true,
    specifications: {
      type: "Athletic Shoes",
      gender: "Kids",
      material: "Mesh upper",
      color: ["Blue"],
      sizeRange: ["1", "2", "3", "4", "5"],
      features: ["Flexible sole", "Lightweight design", "Shock absorption"],
    },
    images: [productImage, productImage, productImage],
  },

  {
    id: 5,
    name: "New Balance 574 Classic",
    slug: "new-balance-574-classic",
    subCategoryId: [3],
    description:
      "Classic everyday sneakers combining retro styling with modern comfort.",
    rating: 4.6,
    ratingCount: 275,
    price: 16999,
    discountedPrice: 14499,
    quantity: 20,
    featured: false,
    isSustainable: true,
    isHighTop: true,
    specifications: {
      type: "Retro",
      gender: "Unisex",
      material: "Suede and mesh",
      color: ["Grey"],
      sizeRange: ["6", "7", "8", "9", "10"],
      features: ["ENCAP cushioning", "Retro design", "Daily comfort"],
    },
    images: [productImage, productImage, productImage],
  },

  {
    id: 6,
    name: "Nike Dunk Low Panda",
    slug: "nike-dunk-low-panda",
    subCategoryId: [2, 4, 16],
    description:
      "Iconic low-top sneaker with classic basketball heritage and versatile styling.",
    rating: 4.9,
    ratingCount: 840,
    price: 22999,
    discountedPrice: 19999,
    quantity: 20,
    featured: false,
    isNewArrival: true,
    isSustainable: true,
    isHighTop: true,
    specifications: {
      type: "Casual Sneakers",
      gender: "Unisex",
      material: "Leather upper",
      color: ["Black", "White"],
      sizeRange: ["6", "7", "8", "9", "10"],
      features: ["Classic design", "Padded collar", "Durable rubber sole"],
    },
    images: [productImage, productImage, productImage],
  },

  {
    id: 7,
    name: "Adidas Samba OG",
    slug: "adidas-samba-og",
    subCategoryId: [3, 4, 19],
    description:
      "A heritage sneaker inspired by football culture with a clean minimalist design.",
    rating: 4.8,
    ratingCount: 430,
    price: 19999,
    discountedPrice: 17999,
    quantity: 20,
    featured: true,
    isNewArrival: true,
    specifications: {
      type: "Retro",
      gender: "Unisex",
      material: "Leather",
      color: ["White", "Black"],
      sizeRange: ["6", "7", "8", "9"],
      features: ["Low profile design", "Classic stripes", "Comfortable fit"],
    },
    images: [productImage, productImage, productImage],
  },

  {
    id: 8,
    name: "Puma Future Rider",
    slug: "puma-future-rider",
    subCategoryId: [3],
    description:
      "Modern retro sneakers with lightweight cushioning and everyday versatility.",
    rating: 4.4,
    ratingCount: 180,
    price: 13999,
    discountedPrice: 11999,
    quantity: 20,
    featured: false,
    isSustainable: true,
    isHighTop: true,
    specifications: {
      type: "Retro",
      gender: "Unisex",
      material: "Synthetic and mesh",
      color: ["Blue"],
      sizeRange: ["6", "7", "8", "9"],
      features: ["Lightweight", "Retro styling", "Comfort sole"],
    },
    images: [productImage, productImage, productImage],
  },

  {
    id: 9,
    name: "Converse Chuck Taylor",
    slug: "converse-chuck-taylor",
    subCategoryId: [2],
    description: "Classic canvas sneakers with timeless street style.",
    rating: 4.7,
    ratingCount: 620,
    price: 11999,
    discountedPrice: 9999,
    quantity: 20,
    featured: true,
    isNewArrival: true,
    specifications: {
      type: "Casual Sneakers",
      gender: "Unisex",
      material: "Canvas",
      color: ["Black"],
      sizeRange: ["6", "7", "8", "9"],
      features: ["Classic silhouette", "Canvas upper", "Rubber toe cap"],
    },
    images: [productImage, productImage],
  },

  {
    id: 10,
    name: "Vans Old Skool",
    slug: "vans-old-skool",
    subCategoryId: [2, 3, 14],
    description:
      "Iconic skate shoes with signature side stripe and durable construction.",
    rating: 4.6,
    ratingCount: 390,
    price: 13999,
    discountedPrice: 12499,
    quantity: 20,
    featured: true,
    isNewArrival: true,
    isSustainable: true,
    specifications: {
      type: "Casual Sneakers",
      gender: "Unisex",
      material: "Canvas and suede",
      color: ["Black", "White"],
      sizeRange: ["6", "7", "8", "9"],
      features: [
        "Durable construction",
        "Skate-inspired design",
        "Comfort padding",
      ],
    },
    images: [productImage, productImage, productImage],
  },
  {
    id: 11,
    name: "Nike Air Force 1 Low",
    slug: "nike-air-force-1-low",
    subCategoryId: [2, 4, 16],
    description:
      "Nike Air Force 1 Low is an iconic lifestyle sneaker featuring a clean silhouette, durable construction, and legendary comfort suitable for everyday wear.",
    rating: 4.9,
    ratingCount: 920,
    price: 21999,
    discountedPrice: 18999,
    quantity: 20,
    featured: false,
    isSustainable: true,
    specifications: {
      type: "Lifestyle Shoes",
      gender: "Unisex",
      material: "Leather upper with rubber outsole",
      color: ["White"],
      sizeRange: ["6", "7", "8", "9", "10", "11"],
      features: [
        "Classic AF1 design",
        "Cushioned midsole",
        "Durable leather construction",
        "Everyday comfort",
      ],
    },
    images: [productImage, productImage, productImage],
  },

  {
    id: 12,
    name: "Adidas Gazelle Indoor",
    slug: "adidas-gazelle-indoor",
    subCategoryId: [2, 3, 19],
    description:
      "Adidas Gazelle Indoor combines vintage styling with modern comfort, featuring premium materials and a timeless low-profile design.",
    rating: 4.7,
    ratingCount: 360,
    price: 17999,
    discountedPrice: 15499,
    quantity: 20,
    featured: true,
    isNewArrival: true,
    isSustainable: true,
    isHighTop: true,
    specifications: {
      type: "Casual Shoes",
      gender: "Unisex",
      material: "Suede upper with leather details",
      color: ["Green", "White"],
      sizeRange: ["6", "7", "8", "9", "10"],
      features: [
        "Retro inspired design",
        "Premium suede finish",
        "Comfortable fit",
      ],
    },
    images: [
      productImage,
      productImage,
      productImage,
      productImage,
      productImage,
      productImage,
      productImage,
      productImage,
      productImage,
    ],
  },

  {
    id: 13,
    name: "ASICS Gel-Kayano 30",
    slug: "asics-gel-kayano-30",
    subCategoryId: [1],
    description:
      "ASICS Gel-Kayano 30 provides advanced stability and cushioning technology designed for long-distance runners.",
    rating: 4.8,
    ratingCount: 440,
    price: 23999,
    discountedPrice: 20999,
    quantity: 20,
    featured: false,
    isNewArrival: true,
    isHighTop: true,
    specifications: {
      type: "Running Shoes",
      gender: "Unisex",
      material: "Engineered mesh upper",
      color: ["Blue", "Black"],
      sizeRange: ["6", "7", "8", "9", "10"],
      features: [
        "Gel cushioning",
        "Stability support",
        "Breathable upper",
        "Long distance comfort",
      ],
    },
    images: [productImage, productImage, productImage],
  },

  {
    id: 14,
    name: "Jordan 1 Retro High",
    slug: "jordan-1-retro-high",
    subCategoryId: [3],
    description:
      "Jordan 1 Retro High delivers basketball heritage with premium leather construction and iconic streetwear appeal.",
    rating: 4.9,
    ratingCount: 760,
    price: 29999,
    discountedPrice: 26999,
    quantity: 20,
    featured: true,
    isNewArrival: true,
    isHighTop: true,
    specifications: {
      type: "Basketball Shoes",
      gender: "Unisex",
      material: "Premium leather",
      color: ["Red", "Black", "White"],
      sizeRange: ["6", "7", "8", "9", "10"],
      features: [
        "High-top ankle support",
        "Air cushioning",
        "Iconic Jordan design",
      ],
    },
    images: [productImage, productImage, productImage],
  },

  {
    id: 15,
    name: "Crocs Classic Clog",
    slug: "crocs-classic-clog",
    subCategoryId: [2],
    description:
      "Crocs Classic Clog offers lightweight comfort, water resistance, and a versatile design suitable for daily activities.",
    rating: 4.6,
    ratingCount: 520,
    price: 8999,
    discountedPrice: 7499,
    quantity: 20,
    featured: true,
    isNewArrival: true,
    specifications: {
      type: "Clogs",
      gender: "Unisex",
      material: "Croslite foam",
      color: ["Navy", "Blue"],
      sizeRange: ["6", "7", "8", "9", "10"],
      features: [
        "Lightweight",
        "Water resistant",
        "Easy cleaning",
        "Comfort fit",
      ],
    },
    images: [productImage, productImage, productImage],
  },

  {
    id: 16,
    name: "Nike Pegasus 41",
    slug: "nike-pegasus-41",
    subCategoryId: [1, 16],
    description:
      "Nike Pegasus 41 offers responsive cushioning and reliable everyday running performance.",
    rating: 4.7,
    ratingCount: 310,
    price: 19999,
    discountedPrice: 17499,
    quantity: 20,
    featured: true,
    isNewArrival: true,
    isHighTop: true,
    specifications: {
      type: "Running Shoes",
      gender: "Unisex",
      material: "Flyknit mesh upper",
      color: ["Grey", "White"],
      sizeRange: ["6", "7", "8", "9", "10"],
      features: ["Responsive cushioning", "Breathable design", "Daily trainer"],
    },
    images: [productImage, productImage, productImage],
  },

  {
    id: 17,
    name: "Adidas Superstar",
    slug: "adidas-superstar",
    subCategoryId: [2, 3, 19],
    description:
      "Adidas Superstar is a legendary sneaker featuring the signature shell toe and classic three-stripe design.",
    rating: 4.8,
    ratingCount: 680,
    price: 15999,
    discountedPrice: 13999,
    quantity: 20,
    featured: false,
    specifications: {
      type: "Lifestyle Shoes",
      gender: "Unisex",
      material: "Leather upper",
      color: ["White", "Black"],
      sizeRange: ["6", "7", "8", "9", "10"],
      features: [
        "Shell toe protection",
        "Classic Adidas design",
        "Durable outsole",
      ],
    },
    images: [productImage, productImage, productImage],
  },

  {
    id: 18,
    name: "Puma RS-X",
    slug: "puma-rs-x",
    subCategoryId: [2, 3],
    description:
      "Puma RS-X features bold styling, layered construction, and modern cushioning for everyday comfort.",
    rating: 4.5,
    ratingCount: 250,
    price: 16999,
    discountedPrice: 14999,
    quantity: 20,
    featured: true,
    isNewArrival: true,
    isHighTop: true,
    specifications: {
      type: "Lifestyle Sneakers",
      gender: "Unisex",
      material: "Mesh and synthetic leather",
      color: ["White", "Blue"],
      sizeRange: ["6", "7", "8", "9"],
      features: [
        "Chunky sneaker design",
        "Comfort cushioning",
        "Durable materials",
      ],
    },
    images: [productImage, productImage, productImage],
  },
  {
    id: 19,
    name: "Skechers Go Walk 7",
    slug: "skechers-go-walk-7",
    subCategoryId: [2],
    description:
      "Skechers Go Walk 7 is designed for maximum walking comfort with lightweight construction and responsive cushioning.",
    rating: 4.6,
    ratingCount: 340,
    price: 12999,
    discountedPrice: 10999,
    quantity: 20,
    featured: true,
    isNewArrival: true,
    isHighTop: true,
    specifications: {
      type: "Walking Shoes",
      gender: "Unisex",
      material: "Engineered mesh",
      color: ["Grey"],
      sizeRange: ["6", "7", "8", "9", "10"],
      features: ["Lightweight design", "Comfort insole", "Flexible outsole"],
    },
    images: [productImage, productImage, productImage],
  },
  {
    id: 20,
    name: "Timberland Classic Boat Shoe",
    slug: "timberland-classic-boat-shoe",
    subCategoryId: [2, 3],
    description:
      "Timberland Classic Boat Shoe offers premium craftsmanship, leather construction, and a timeless casual style.",
    rating: 4.5,
    ratingCount: 210,
    price: 18999,
    discountedPrice: 16499,
    quantity: 20,
    featured: false,
    isNewArrival: true,
    specifications: {
      type: "Casual Shoes",
      gender: "Men",
      material: "Premium leather",
      color: ["Brown"],
      sizeRange: ["7", "8", "9", "10", "11"],
      features: [
        "Premium leather upper",
        "Classic boat shoe design",
        "Durable grip outsole",
      ],
    },
    images: [productImage, productImage, productImage],
  },
];
