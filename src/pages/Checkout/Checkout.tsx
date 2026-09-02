import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import CountrySelect from "../../components/ui/CountrySelect";
import {
  selectCartProducts,
  selectCartSubTotal,
} from "../../app/selectors/cartSelectors";
import Button from "../../components/ui/Button";

import type { Order } from "../../types/order";
import { addOrder } from "../../app/slices/orderSlice";
import { clearCart, removeFromCart } from "../../app/slices/cartSlice";
import { useNavigate } from "react-router-dom";

interface CheckoutFormData {
  name: string;
  email: string;
  phoneNumber: string;

  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export default function Checkout() {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phoneNumber: "",

    billingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },

    shippingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkoutItems = useAppSelector(selectCartProducts);
  const subtotal = useAppSelector(selectCartSubTotal);

  useEffect(() => {
    if (!currentUser) return;

    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      phoneNumber: currentUser.phoneNumber,
      billingAddress: {
        street: currentUser.billingAddress.street,
        city: currentUser.billingAddress.city,
        state: currentUser.billingAddress.state,
        postalCode: currentUser.billingAddress.postalCode,
        country: currentUser.billingAddress.country,
      },
      shippingAddress: {
        street: currentUser.shippingAddress.street,
        city: currentUser.shippingAddress.city,
        state: currentUser.shippingAddress.state,
        postalCode: currentUser.shippingAddress.postalCode,
        country: currentUser.shippingAddress.country,
      },
    });
  }, [currentUser]);

  useEffect(() => {
    if (!sameAsBilling) return;
    setFormData((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.billingAddress,
      },
    }));
  }, [sameAsBilling, formData.billingAddress]);
  if (checkoutItems.length === 0) {
    return (
      <main className="px-6 py-10">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-2xl font-semibold text-neutral-950">
            Your cart is empty
          </h1>

          <p className="mt-2 text-neutral-600">
            Add some products to your cart before proceeding to checkout.
          </p>
        </div>
      </main>
    );
  }
  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-extrabold text-center text-neutral-950">
          CHECKOUT
        </h1>
        <div className="grid gap-10 lg:grid-cols-[1fr_35%]">
          <section>
            <h2 className="mb-6 text-xl font-medium text-neutral-950">
              Customer Information
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!formData.billingAddress.country) {
                  alert("Please select a billing country");
                  return;
                }
                if (!formData.shippingAddress.country) {
                  alert("Please select shipping country");
                  return;
                }

                if (checkoutItems.length === 0) {
                  alert("Your cart is empty");
                  return;
                }

                const order: Order = {
                  id: `ORD_${Date.now().toString()}`,
                  userId: currentUser?.id ?? null,
                  customer: {
                    name: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                  },
                  billingAddress: formData.billingAddress,
                  shippingAddress: formData.shippingAddress,

                  items: checkoutItems
                    .filter((item) => item.product)
                    .map(({ product, quantity, color, size }) => ({
                      productId: product!.id,
                      name: product!.name,
                      image: product!.images[0],
                      price: product!.price,
                      quantity,
                      color,
                      size,
                    })),
                  status: "pending",
                  subtotal,
                  shipping: 0,
                  total: subtotal,
                  createdAt: new Date().toISOString(),
                };
                dispatch(addOrder(order));
                dispatch(clearCart());
                alert("Order Placed Successfully");
                navigate("/");
                window.scrollTo(0, 0);
              }}
              className="border p-6"
            >
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-neutral-950"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                    className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-neutral-950"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                    className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
                    placeholder="Enter your Email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="mb-2 block text-sm font-medium text-neutral-950"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    required
                    className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div className="border-t border-neutral-200 pt-6 mt-6">
                <h3 className="mb-6 text-xl font-medium text-neutral-950">
                  Billing Address
                </h3>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <label
                      htmlFor="billingStreet"
                      className="mb-2 block text-sm font-medium text-neutral-950"
                    >
                      Street Address
                    </label>
                    <input
                      id="billingStreet"
                      type="text"
                      name="billingStreet"
                      value={formData.billingAddress.street}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          billingAddress: {
                            ...prev.billingAddress,
                            street: e.target.value,
                          },
                        }))
                      }
                      required
                      className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
                      placeholder="Enter your Street Address"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="billingStreet"
                      className="mb-2 block text-sm font-medium text-neutral-950"
                    >
                      City
                    </label>
                    <input
                      id="billingCity"
                      type="text"
                      name="billingCity"
                      value={formData.billingAddress.city}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          billingAddress: {
                            ...prev.billingAddress,
                            city: e.target.value,
                          },
                        }))
                      }
                      required
                      className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
                      placeholder="Enter your City name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="billingState"
                      className="mb-2 block text-sm font-medium text-neutral-950"
                    >
                      State
                    </label>
                    <input
                      id="billingState"
                      type="text"
                      name="billingState"
                      value={formData.billingAddress.state}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          billingAddress: {
                            ...prev.billingAddress,
                            state: e.target.value,
                          },
                        }))
                      }
                      required
                      className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
                      placeholder="Enter your State name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="billingPostalCode"
                      className="mb-2 block text-sm font-medium text-neutral-950"
                    >
                      Postal Code
                    </label>
                    <input
                      id="billingPostalCode"
                      type="text"
                      name="billingPostalCode"
                      value={formData.billingAddress.postalCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          billingAddress: {
                            ...prev.billingAddress,
                            postalCode: e.target.value,
                          },
                        }))
                      }
                      required
                      className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
                      placeholder="Enter your Postal Code"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="billingCountry"
                      className="mb-2 block text-sm font-medium text-neutral-950"
                    >
                      Country
                    </label>
                    <CountrySelect
                      value={formData.billingAddress.country}
                      onChange={(country) =>
                        setFormData((prev) => ({
                          ...prev,
                          billingAddress: {
                            ...prev.billingAddress,
                            country,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <label className="flex cursor-pointer items-center gap-3 border-t border-neutral-200 pt-6">
                <input
                  type="checkbox"
                  checked={sameAsBilling}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSameAsBilling(checked);
                    if (checked) {
                      setFormData((prev) => ({
                        ...prev,
                        shippingAddress: { ...prev.billingAddress },
                      }));
                    }
                  }}
                  className="h-4 w-4"
                />
                <span className="text-sm text-neutral-950">
                  Shipping Address is same as Billing Address
                </span>
              </label>
              <div className="border-t border-neutral-200 pt-6 mt-6">
                <h3 className="mb-6 text-xl font-medium text-neutral-950">
                  Shipping Address
                </h3>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <label
                      htmlFor="shippingStreet"
                      className="mb-2 block text-sm font-medium text-neutral-950"
                    >
                      Street Address
                    </label>
                    <input
                      id="shippingStreet"
                      type="text"
                      name="shippingStreet"
                      value={formData.shippingAddress.street}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            street: e.target.value,
                          },
                        }))
                      }
                      required
                      className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
                      placeholder="Enter your Street Address"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="shippingStreet"
                      className="mb-2 block text-sm font-medium text-neutral-950"
                    >
                      City
                    </label>
                    <input
                      id="shippingCity"
                      type="text"
                      name="shippingCity"
                      value={formData.shippingAddress.city}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            city: e.target.value,
                          },
                        }))
                      }
                      required
                      className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
                      placeholder="Enter your City name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="shippingState"
                      className="mb-2 block text-sm font-medium text-neutral-950"
                    >
                      State
                    </label>
                    <input
                      id="shippingState"
                      type="text"
                      name="shippingState"
                      value={formData.shippingAddress.state}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            state: e.target.value,
                          },
                        }))
                      }
                      required
                      className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
                      placeholder="Enter your State name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="shippingPostalCode"
                      className="mb-2 block text-sm font-medium text-neutral-950"
                    >
                      Postal Code
                    </label>
                    <input
                      id="shippingPostalCode"
                      type="text"
                      name="shippingPostalCode"
                      value={formData.shippingAddress.postalCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            postalCode: e.target.value,
                          },
                        }))
                      }
                      required
                      className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
                      placeholder="Enter your Postal Code"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="shippingCountry"
                      className="mb-2 block text-sm font-medium text-neutral-950"
                    >
                      Country
                    </label>
                    <CountrySelect
                      value={formData.shippingAddress.country}
                      onChange={(country) =>
                        setFormData((prev) => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            country,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                variant="dark"
                className="mt-8 w-full px-6 py-4 text-sm font-medium transition"
              >
                PLACE ORDER
              </Button>
            </form>
          </section>
          <aside>
            <h2 className="mb-6 text-xl font-medium text-neutral-950">
              Order Summary
            </h2>
            <div className="border p-6">
              <div className="space-y-6">
                {checkoutItems.map(({ product, quantity, size, color }) => {
                  if (!product) return null;

                  return (
                    <div key={product.id} className="flex gap-4 items-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-24 w-24 object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-neutral-950">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-500">
                          Color: {color}
                        </p>
                        <p className="text-sm text-neutral-500">Size: {size}</p>
                        <p className="mt-1 text-sm text-neutral-500">
                          Quantity: {quantity}
                        </p>

                        <p className="mt-2 font-medium text-neutral-950">
                          PKR {product.discountedPrice.toLocaleString()}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="none"
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              productId: product.id,
                              color,
                              size,
                            }),
                          )
                        }
                        className="text-sm font-medium text-neutral-600 hover:text-neutral-950"
                      >
                        REMOVE
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-6 border-t border-neutral-200 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-950">
                  Subtotal
                </span>

                <span className="text-sm font-medium text-neutral-950">
                  PKR {subtotal.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-neutral-600">Shipping</span>

              <span className="text-sm font-medium text-neutral-950">
                PKR 0.00
              </span>
            </div>
            <div className="mt-6 border-t border-neutral-200 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-neutral-950">
                  Total
                </span>

                <span className="text-lg font-semibold text-neutral-950">
                  PKR {subtotal.toLocaleString()}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
