export interface Category {
  _id?: string;
  name: string;
  slug: string;
}

export const categories: Category[] = [
  {
    _id: "1",
    name: "MEN",
    slug: "men",
  },
  {
    _id: "2",
    name: "WOMEN",
    slug: "women",
  },
  {
    _id: "3",
    name: "KIDS",
    slug: "kids",
  },
  {
    _id: "4",
    name: "BRANDS",
    slug: "brands",
  },
  {
    _id: "5",
    name: "SANDALS",
    slug: "sandals",
  },
];
