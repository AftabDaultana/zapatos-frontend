import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectOrderById } from "../../app/selectors/orderSelectors";
import { updateOrderStatus } from "../../app/slices/orderSlice";
import type { Order } from "../../types/order";
import Button from "../../components/ui/Button";
import { ArrowLeft, Printer } from "lucide-react";

export default function OrderDetails() {
  const { orderId } = useParams();
  const order = useAppSelector((state) =>
    orderId ? selectOrderById(state, orderId) : undefined,
  );
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!order) {
    return (
      <main className="px-6 py-10">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-2xl font-semibold text-neutral-950">
            Order not found
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {currentUser?.role === "admin" && (
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="light"
              onClick={() => navigate("/admin")}
              className="flex gap-2 px-4 py-2 text-sm font-medium transition"
            >
              <ArrowLeft size={24} /> Back to Dashboard
            </Button>
            <Button
              type="button"
              variant="light"
              aria-label="Print invoice"
              title="Print invoice"
              className="px-4 py-2 text-sm font-medium transition"
            >
              <Printer size={24} />
            </Button>
          </div>
        )}
        <div className="mb-8 flex items-center justify-center">
          <div>
            <h1 className="text-2xl font-bold text-neutral-950 text-center">
              Order Details
            </h1>

            <p className="mt-2 text-base text-neutral-600 text-center">
              View information and items for order #{order.id}
            </p>
          </div>
        </div>

        <div className="border rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                  Order ID
                </p>

                <p className="mt-2 font-semibold text-neutral-950">
                  #{order.id}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                  Customer
                </p>

                <p className="mt-2 font-semibold text-neutral-950">
                  {order.customer.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                  Status
                </p>

                {currentUser?.role === "admin" ? (
                  <select
                    value={order.status}
                    onChange={(event) =>
                      dispatch(
                        updateOrderStatus({
                          orderId: order.id,
                          status: event.target.value as Order["status"],
                        }),
                      )
                    }
                    className="mt-2 border border-neutral-950 px-2 py-1 text-xs font-medium uppercase outline-none"
                  >
                    <option value="pending">PENDING</option>
                    <option value="processing">PROCESSING</option>
                    <option value="shipped">SHIPPED</option>
                    <option value="delivered">DELIVERED</option>
                    <option value="cancelled">CANCELLED</option>
                  </select>
                ) : (
                  <p className="mt-2 font-semibold uppercase text-neutral-950">
                    {order.status}
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                  Order Date
                </p>

                <p className="mt-2 font-semibold text-neutral-950">
                  {new Date(order.createdAt).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <h2 className="mb-6 text-xl font-medium text-neutral-950">Items</h2>

            <div className="overflow-x-auto">
              <table className="w-full min-w-175">
                <thead>
                  <tr className="border-b border-neutral-200 text-left">
                    <th className="px-4 py-4 text-xs font-medium uppercase tracking-wide text-neutral-600">
                      Product
                    </th>

                    <th className="px-4 py-4 text-xs font-medium uppercase tracking-wide text-neutral-600">
                      Color
                    </th>

                    <th className="px-4 py-4 text-xs font-medium uppercase tracking-wide text-neutral-600">
                      Size
                    </th>

                    <th className="px-4 py-4 text-xs font-medium uppercase tracking-wide text-neutral-600">
                      Quantity
                    </th>

                    <th className="px-4 py-4 text-xs font-medium uppercase tracking-wide text-neutral-600">
                      Price
                    </th>

                    <th className="px-4 py-4 text-xs font-medium uppercase tracking-wide text-neutral-600">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {order.items.map((item) => (
                    <tr
                      key={`${item.productId}-${item.color}-${item.size}`}
                      className="border-b border-neutral-100 last:border-b-0"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-xl object-contain"
                          />

                          <span className="font-medium text-neutral-950">
                            {item.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-neutral-600">
                        {item.color}
                      </td>

                      <td className="px-4 py-4 text-sm text-neutral-600">
                        {item.size}
                      </td>

                      <td className="px-4 py-4 text-sm text-neutral-600">
                        {item.quantity}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium text-neutral-950">
                        PKR {item.price.toLocaleString()}
                      </td>

                      <td className="px-4 py-4 text-sm font-semibold text-neutral-950">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 flex justify-end border-t border-neutral-200 pt-6">
              <div className="w-full max-w-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Subtotal</span>

                  <span className="font-medium text-neutral-950">
                    PKR {order.subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Shipping</span>

                  <span className="font-medium text-neutral-950">
                    PKR {order.shipping.toLocaleString()}
                  </span>
                </div>

                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-neutral-950">
                      Total
                    </span>

                    <span className="text-lg font-bold text-neutral-950">
                      PKR {order.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 grid gap-6 border-t border-neutral-200 pt-8 lg:grid-cols-3">
              {/* Customer */}
              <section className="rounded-xl border border-neutral-200 p-5">
                <h2 className="mb-5 text-lg font-semibold text-neutral-950">
                  Customer
                </h2>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                      Name
                    </p>

                    <p className="mt-1 font-medium text-neutral-950">
                      {order.customer.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-neutral-600">
                      {order.customer.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                      Phone
                    </p>

                    <p className="mt-1 text-neutral-600">
                      {order.customer.phoneNumber}
                    </p>
                  </div>
                </div>
              </section>

              {/* Billing Address */}
              <section className="rounded-xl border border-neutral-200 p-5">
                <h2 className="mb-5 text-lg font-semibold text-neutral-950">
                  Billing Address
                </h2>

                <div className="text-sm leading-6 text-neutral-600">
                  <p className="font-medium text-neutral-950">
                    {order.customer.name}
                  </p>

                  <p>{order.billingAddress.street}</p>

                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state}
                  </p>

                  <p>{order.billingAddress.postalCode}</p>

                  <p>{order.billingAddress.country}</p>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="rounded-xl border border-neutral-200 p-5">
                <h2 className="mb-5 text-lg font-semibold text-neutral-950">
                  Shipping Address
                </h2>

                <div className="text-sm leading-6 text-neutral-600">
                  <p className="font-medium text-neutral-950">
                    {order.customer.name}
                  </p>

                  <p>{order.shippingAddress.street}</p>

                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </p>

                  <p>{order.shippingAddress.postalCode}</p>

                  <p>{order.shippingAddress.country}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
