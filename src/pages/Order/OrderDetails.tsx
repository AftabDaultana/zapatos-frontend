import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectOrderById } from "../../app/selectors/orderSelectors";

export default function OrderDetails() {
  const { orderId } = useParams();
  const order = useAppSelector((state) =>
    orderId ? selectOrderById(state, orderId) : undefined,
  );

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
        <h1 className="mb-8 text-3xl font-extrabold text-center text-neutral-950">
          ORDER DETAILS
        </h1>

        <div className="border p-6">
          <div className="mb-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-sm text-neutral-500">Order ID</p>
                <p className="mt-1 font-medium text-neutral-950">{order.id}</p>
              </div>

              <div>
                <p className="text-sm text-neutral-500">Status</p>
                <p className="mt-1 font-medium capitalize text-neutral-950">
                  {order.status}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-500">Email</p>
                <p className="mt-1 font-medium text-neutral-950">
                  {order.customer.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-500">Phone</p>
                <p className="mt-1 font-medium text-neutral-950">
                  {order.customer.phoneNumber}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-neutral-500">Order Date</p>

              <p className="mt-1 font-medium text-neutral-950">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <h2 className="mb-6 text-xl font-medium text-neutral-950">Items</h2>

            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 object-contain rounded-full"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-950">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-2 font-medium text-neutral-950">
                      PKR {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-neutral-200 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Subtotal</span>

                <span className="font-medium text-neutral-950">
                  PKR {order.subtotal.toLocaleString()}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-neutral-600">Shipping</span>

                <span className="font-medium text-neutral-950">
                  PKR {order.shipping.toLocaleString()}
                </span>
              </div>

              <div className="mt-6 border-t border-neutral-200 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-neutral-950">
                    Total
                  </span>

                  <span className="text-lg font-semibold text-neutral-950">
                    PKR {order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8 grid gap-8 border-t border-neutral-200 pt-8 md:grid-cols-2">
              <section>
                <h2 className="mb-4 text-xl font-medium text-neutral-950">
                  Billing Address
                </h2>

                <div className="text-sm leading-6 text-neutral-600">
                  <p>{order.customer.name}</p>
                  <p>{order.billingAddress.street}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state}
                  </p>
                  <p>{order.billingAddress.postalCode}</p>
                  <p>{order.billingAddress.country}</p>
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-medium text-neutral-950">
                  Shipping Address
                </h2>

                <div className="text-sm leading-6 text-neutral-600">
                  <p>{order.customer.name}</p>
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
