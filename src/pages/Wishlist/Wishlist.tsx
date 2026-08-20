import { selectWishlistProducts } from "../../app/selectors/wishlistSelectors";
import ProductGrid from "../../components/grids/ProductGrid";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function Wishlist() {
  const wishlistProducts = useAppSelector(selectWishlistProducts);

  return (
    <main className="px-4 py-8 md:px-6 xl:px-8">
      <div className="flex flex-col mx-auto w-full max-w-7xl gap-8">
        <h1 className="text-3xl font-bold text-neutral-950">Wishlist</h1>
        {wishlistProducts.length === 0 ? (
          <div className="flex min-h-80 items-center justify-center">
            <p className="text-lg text-neutral-700">No items in wishlist</p>
          </div>
        ) : (
          <ProductGrid products={wishlistProducts} />
        )}
      </div>
    </main>
  );
}
