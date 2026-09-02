import { ArrowRight, Heart } from "lucide-react";
import type { Product } from "../../data/products";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addToCart } from "../../app/slices/cartSlice";
import { Link } from "react-router-dom";
import { selectWishlistProductIds } from "../../app/selectors/wishlistSelectors";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../app/slices/wishlistSlice";
import RatingStars from "./RatingStars";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const wishlistProductIds = useAppSelector(selectWishlistProductIds);
  const isWishlisted = wishlistProductIds.includes(product.id);

  const hadnleWishlistClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product.id));
    }
  };

  return (
    <Link
      onClick={() => window.scrollTo(0, 0)}
      to={`/products/${product.slug}`}
    >
      <div className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative overflow-hidden bg-[#d9d9d9] px-2.5 py-2.5">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute top-2.5 left-2.5 bg-[#ececec] w-13.25 h-6 p-1 flex justify-center items-center">
            <p>Sale!</p>
          </div>

          <div className="absolute bottom-2.5 right-2.5 h-6 w-6 p-1 flex justify-center items-center">
            <Button
              type="button"
              variant="none"
              aria-label={
                isWishlisted
                  ? `remove ${product.name} from wihslist`
                  : `add ${product.name} to wishlist`
              }
              onClick={hadnleWishlistClick}
              className="flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white"
            >
              <Heart
                size={16}
                className={`transition-transform duration-300 ${
                  isWishlisted
                    ? "fill-red-400 text-neutral-950"
                    : "text-neutral-950"
                }`}
              />
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col py-3 gap-3 items-start">
          <h6 className="h-14 text-lg leading-7 font-bold">{product.name}</h6>

          <div className="flex flex-col md:flex-row justify-start gap-2">
            <div className="flex">
              {<RatingStars rating={product.rating} />}
            </div>

            <span className="text-sm leading-3.5 font-medium items-center">
              {product.rating}{" "}
            </span>

            <span className="text-sm leading-3.5 font-light">
              {`(${product.ratingCount} Reviews)`}
            </span>
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
            variant="light"
            disabled={product.quantity === 0}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              dispatch(
                addToCart({
                  productId: product.id,
                  color: product.specifications.color[0],
                  size: product.specifications.sizeRange[0],
                }),
              );
            }}
            className="w-full px-4 py-2 gap-1.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ADD TO CART <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </Link>
  );
}
