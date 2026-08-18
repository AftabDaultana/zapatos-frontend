import { Link } from "react-router-dom";
import { selectOrdersByUserId } from "../../app/selectors/orderSelectors";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function rders() {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const orders = useAppSelector((state) =>
    currentUser ? selectOrdersByUserId(state, currentUser.id) : undefined,
  );

  if (!currentUser) {
    return (
      <main className="px-6 py-18">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-2xl font-semibold text-neutral-950">
            Please login to view your orders
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-18">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-8 text-3xl font-extrabold text-center text-neutral-950">
          My Orders
        </h1>
        {orders!.length === 0 ? (
          <div className="border p-10 text-center">
            <h2 className="text-xl font-medium text-neutral-950">
              You haven't placed any orders yet.
            </h2>

            <p className="mt-2 text-neutral-600">
              Your orders will appear here after you complete a purchase.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders!.map((order) => (
              <div key={order.id} className="border p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-neutral-950">{order.id}</p>
                    <p className="mt-1 text-sm text-neutral-950">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Total</p>
                    <p className="font-medium text-neutral-950">
                      PKR {order.total.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Status</p>
                    <p className="font-medium text-neutral-950">
                      {order.status}
                    </p>
                  </div>
                  <Link
                    to={`/order/${order.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="border border-neutral-950 px-5 py-3 text-center text-sm font-medium text-neutral-950 transition hover:bg-neutral-950 hover:text-neutral-50"
                  >
                    View Order
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
