import { Minus, Plus, X } from "lucide-react";
import Button from "../../ui/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { selectCartProducts } from "../../../app/selectors/cartSelectors";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../../app/slices/cartSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(selectCartProducts);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const cartSubtotal = cartProducts.reduce((total, cartItem) => {
    if (!cartItem.product) return total;
    return total + cartItem.product.discountedPrice * cartItem.quantity;
  }, 0);
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        onClick={handleClose}
      />
      <aside
        className={`relative z-10 h-full w-full sm:max-w-md flex flex-col bg-[#e7e7e7] transition-transform duration-300 ease-out ${isVisible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-neutral-300 px-6 py-5">
          <h2 className="text-xl font-medium text-neutral-950">Your Cart</h2>
          <Button
            type="button"
            onClick={handleClose}
            className="text-neutral-700"
          >
            <X size={24} />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {cartProducts.length === 0 ? (
            <p className="text-neutral-700">Your cart is empty.</p>
          ) : (
            cartProducts.map((cartItem) => {
              const product = cartItem.product;
              const quantity = cartItem.quantity;
              const color = cartItem.color;
              const size = cartItem.size;
              if (!product) return null;
              const cartItemSubtotal = product.discountedPrice * quantity;
              return (
                <div
                  key={product.id}
                  className="flex gap-4 items-center border-b border-neutral-300 py-4"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <h3 className="font-medium text-neutral-950">
                      {product.name}
                    </h3>
                    <div className="py-2">
                      <p className="text-sm text-neutral-500">Color: {color}</p>
                      <p className="text-sm text-neutral-500">Size: {size}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        onClick={() =>
                          dispatch(
                            decreaseQuantity({
                              productId: product.id,
                              color,
                              size,
                            }),
                          )
                        }
                        className="flex items-center justify-center w-8 h-8 text-neutral-950 border border-neutral-500"
                      >
                        <Minus size={18} />
                      </Button>
                      <span className="min-w-6 text-xl font-medium text-center text-neutral-950">
                        {quantity}
                      </span>
                      <Button
                        type="button"
                        onClick={() =>
                          dispatch(
                            increaseQuantity({
                              productId: product.id,
                              color,
                              size,
                            }),
                          )
                        }
                        className="flex items-center justify-center w-8 h-8 text-neutral-950 border border-neutral-500"
                      >
                        <Plus size={18} />
                      </Button>
                    </div>
                    <p className="text-sm font-medium text-neutral-950">
                      PKR {cartItemSubtotal.toLocaleString()}
                    </p>
                    <Button
                      type="button"
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            productId: product.id,
                            color,
                            size,
                          }),
                        )
                      }
                      className="self-start text-sm font-medium text-neutral-600 hover:text-neutral-950"
                    >
                      REMOVE
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {cartProducts.length > 0 && (
          <div className="mt-auto border-t border-neutral-300 p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-base font-medium text-neutral-950">
                Subtotal
              </span>
              <span className="text-lg fint-medium text-neutral-950">
                PKR {cartSubtotal.toLocaleString()}
              </span>
            </div>
            <Link
              to={"/checkout"}
              onClick={handleClose}
              className="block mt-3 w-full border border-neutral-950 px-6 py-4 text-sm font-medium text-neutral-950"
            >
              CHECKOUT
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
