import { X, User as UserICon } from "lucide-react";
import type { User } from "../../../types/user";
import UserDetailsContent from "../../../components/sections/UserDetailsContent";
import Button from "../../../components/ui/Button";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectOrders } from "../../../app/selectors/orderSelectors";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export default function UserDetailsModal({
  isOpen,
  onClose,
  user,
}: UserDetailsModalProps) {
  if (!isOpen || !user) return null;

  const orders = useAppSelector(selectOrders);

  const orderCount = orders.filter((order) => order.userId === user.id).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-details-title"
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <div>
            <h2
              id="user-details-title"
              className="text-xl font-semibold text-neutral-950"
            >
              User Details
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              View customer account information.
            </p>
          </div>

          <Button
            type="button"
            variant="none"
            onClick={onClose}
            aria-label="Close user details"
            className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex max-h-[75vh] flex-col gap-5 overflow-y-auto px-6 py-6">
          {/* User Summary */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-neutral-100">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-neutral-500">
                  <UserICon size={28} />
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-950">
                {user.name}
              </h3>

              <p className="text-sm text-neutral-500">{user.email}</p>

              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
                {user.role === "user" ? "Customer" : "Admin User"}
              </p>
            </div>
          </div>

          <p className="mt-1 text-sm text-neutral-500">
            Orders:{" "}
            <span className="font-medium text-neutral-950">{orderCount}</span>
          </p>

          <UserDetailsContent user={user} />
        </div>
      </div>
    </div>
  );
}
