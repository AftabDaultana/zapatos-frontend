import { ArrowRight, Heart, Star } from "lucide-react";
import type { Product } from "../../data/products";
import Button from "./Button";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { addToCart } from "../../app/slices/cartSlice";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export function RenderStars(rating: number) {
  return Array.from({ length: 5 }).map((_, index) => {
    const starValue = index + 1;

    if (rating >= starValue) {
      return (
        <Star
          key={index}
          size={16}
          className="fill-neutral-950 text-neutral-950"
        />
      );
    }

    if (rating >= starValue - 0.5) {
      return (
        <span key={index} className="relative inline-block w-4 h-4">
          <Star size={16} className="absolute text-neutral-950" />
          <span className="absolute left-0 right-0 w-1/2 overflow-hidden">
            <Star size={16} className="fill-neutral-950 text-neutral-950" />
          </span>
        </span>
      );
    }
    return <Star key={index} size={16} className="text-neutral-950" />;
  });
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  return (
    <Link
      onClick={() => window.scrollTo(0, 0)}
      to={`/products/${product.slug}`}
    >
      <div className="flex flex-col h-full">
        <div className="relative bg-[#d9d9d9] px-2.5 py-2.5">
          <img src={product.images[0]} alt={product.name} loading="lazy" />
          <div className="absolute top-2.5 left-2.5 bg-[#ececec] w-13.25 h-6 p-1 flex justify-center items-center">
            <p>Sale!</p>
          </div>
          <div className="absolute bottom-2.5 right-2.5 h-6 w-6 p-1 flex justify-center items-center">
            <Heart size={16} />
          </div>
        </div>
        <div className="flex flex-1 flex-col py-3 gap-3 items-start">
          <h6 className="h-14 text-lg leading-7 font-bold">{product.name}</h6>
          <div className="flex flex-col md:flex-row justify-start gap-2">
            <div className="flex">{RenderStars(product.rating)}</div>
            <span className="text-sm leading-3.5 font-medium items-center">
              {product.rating}{" "}
            </span>
            <span className="text-sm leading-3.5 font-light">{`(${product.ratingCount} Reviews)`}</span>
          </div>
          <div className="flex gap-1.25 items-center">
            <span className="line-through text-sm leading-4 font-normal text-[#888]">
              PKR {product.price.toLocaleString()}
            </span>
            <span>PKR {product.discountedPrice.toLocaleString()}</span>
          </div>
          <div className="flex flex-col md:flex-row items-start py-3 gap-2">
            <div className="flex gap-2">
              {product.images.slice(0, 3).map((Image, index) => {
                return (
                  <img
                    key={index}
                    src={Image}
                    alt={product.name}
                    className="h-10 p-1.5 object-cover"
                    loading="lazy"
                  />
                );
              })}
            </div>

            {product.images.length > 3 && (
              <span className="text-sm leading-3.5 font-medium text-[#888]">
                +{product.images.length - 3} Styles
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm leading-3.5 font-medium text-[#888]">
              Speacification:
            </span>
            <span className="text-sm text-neutral-950 leading-3.5 font-medium">
              {product.specifications.type}, {product.specifications.material}
            </span>
          </div>
        </div>
        <div className="xl:px-4 xl:py-3">
          <Button
            type="button"
            disabled={product.quantity === 0}
            onClick={() =>
              dispatch(
                addToCart({
                  productId: product.id,
                  color: product.specifications.color[0],
                  size: product.specifications.sizeRange[0],
                }),
              )
            }
            className="w-full border border-neutral-950 px-4 py-2 gap-1.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ADD TO CART <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </Link>
  );
}
