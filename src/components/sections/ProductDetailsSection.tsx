import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectProducts } from "../../app/selectors/catalogSelectors";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import Button from "../ui/Button";
import { addToCart } from "../../app/slices/cartSlice";
import { selectWishlistProductIds } from "../../app/selectors/wishlistSelectors";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../app/slices/wishlistSlice";

export default function ProductDetailsSection() {
  const [selectedImage, setSelectedimage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const wishlistProductIds = useAppSelector(selectWishlistProductIds);
  const product = products.find((product) => product.slug === slug);
  if (!product) {
    return <Navigate to={"/"} replace />;
  }
  const isWishlisted = wishlistProductIds.includes(product.id);
  useEffect(() => {
    setSelectedColor(product.specifications.color[0] ?? "");
    setSelectedSize(product.specifications.sizeRange[0] ?? "");
  }, [product]);
  const handleNextImage = () =>
    setSelectedimage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );

  const handlePreviousImage = () =>
    setSelectedimage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        color: selectedColor,
        size: selectedSize,
      }),
    );

    setIsAdded(true);
    alert(`${product.name} is Added to cart`);

    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="relative overflow-hidden bg-neutral-100 border border-neutral-300 rounded-2xl">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-contain"
            />
            <Button
              type="button"
              aria-label="Previous Image"
              onClick={() => handlePreviousImage()}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 text-neutral-950"
            >
              <ChevronLeft size={36} />
            </Button>
            <Button
              type="button"
              aria-label="Next Image"
              onClick={() => handleNextImage()}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 text-neutral-950"
            >
              <ChevronRight size={36} />
            </Button>
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto justify-center">
            {product.images.map((image, index) => (
              <Button
                key={image}
                type="button"
                onClick={() => setSelectedimage(index)}
                className={`h-20 w-20 shrink-0 overflow-hidden border ${
                  selectedImage === index
                    ? "border-neutral-950"
                    : "border-neutral-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full not-only-of-type:object-cover"
                />
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-neutral-950">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex gap-px text-sm text-neutral-950">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </span>
            <span className="text-sm text-neutral-500">
              {product.ratingCount} reviews
            </span>
          </div>
          <div className="mt-5">
            <span className="text-2xl font-semibold text-neutral-950">
              PKR {product.discountedPrice.toLocaleString()}
            </span>
            {product.price > product.discountedPrice && (
              <span className="ml-3 text-lg text-neutral-400 line-through">
                PKR {product.price.toLocaleString()}
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            <span className="text-sm font-medium text-neutral-950">
              Availability:
            </span>
            {product.quantity > 0 ? (
              <span className="ml-2 text-sm text-neutral-600">In Stock</span>
            ) : (
              <span className="ml-2 text-sm text-neutral-600">
                Out of Stock
              </span>
            )}
          </div>
          <div className="mt-10">
            <p className="text-sm leading-7 text-neutral-600">
              {product.description}
            </p>
          </div>
          <div className="my-8 h-px w-[95%] bg-neutral-700" />
          <div className="mt-3 flex flex-wrap gap-3">
            {product.specifications.color.map((color) => (
              <button
                key={color}
                type="button"
                title={color}
                onClick={() => setSelectedColor(color)}
                className={`h-7 w-7 rounded-full border ${selectedColor === color ? "border-neutral-950 ring-2 ring-neutral-950 ring-offset-2" : "border-neutral-300"}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-sm font-medium font-neutral-950">
              Available Sizes
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.specifications.sizeRange.map((size) => (
                <Button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 text-sm ${selectedSize === size ? "border-neutral-950 bg-neutral-950 text-neutral-50" : "border-neutral-300 text-neutral-950"}`}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <h2 className="text-sm font-medium text-neutral-950">Material:</h2>
            <p className="text-sm text-neutral-600">
              {product.specifications.material}
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-sm font-medium text-neutral-950">Features</h2>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-neutral-600">
              {product.specifications.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex gap-3">
            <Button
              type="button"
              onClick={() => {
                if (isWishlisted) {
                  dispatch(removeFromWishlist(product.id));
                } else {
                  dispatch(addToWishlist(product.id));
                }
              }}
              className={`border border-neutral-950 px-1 py-1 ${
                isWishlisted
                  ? "bg-neutral-950 text-neutral-50"
                  : "text-neutral-950"
              }`}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart size={24} fill={isWishlisted ? "red" : "none"} />
            </Button>
            <Button
              type="button"
              disabled={product.quantity === 0}
              onClick={() => handleAddToCart()}
              className="border border-neutral-950 px-1 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAdded ? <Check size={24} /> : <ShoppingCart size={24} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
