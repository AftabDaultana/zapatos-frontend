export interface WishlistProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discountedPrice: number;
  images: string[];
  rating: number;
  ratingCount: number;
  quantity: number;
}

export interface WishlistItem {
  productId: WishlistProduct | string;
  name?: string;
}

export interface Wishlist {
  _id: string | null;
  userId: string;
  items: WishlistItem[];
}
