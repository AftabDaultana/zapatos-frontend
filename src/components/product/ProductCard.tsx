import type { Product } from "../../data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div>
      <img src={product.images[0]} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.price}</p>
      <p>{product.discountedPrice}</p>
    </div>
  );
}
