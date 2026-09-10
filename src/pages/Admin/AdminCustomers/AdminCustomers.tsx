import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import { useAppSelector } from "../../../hooks/reduxHooks";
import UserDetailsModal from "./UserProfileModal";
import type { User } from "../../../types/user";
import AlertModal from "../../../components/ui/AlertModal";
import {
  updateUserStatusAdmin,
  getAllUsersAdmin,
} from "../../../services/userServices";

export default function AdminCustomers() {
  const ITEMS_PER_PAGE = 10;

  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userStatusToUpdate, setUserStatusToUpdate] = useState<string | null>(
    null,
  );

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const response = await getAllUsersAdmin(currentPage, ITEMS_PER_PAGE);

      setUsers(response.data);
      setTotalUsers(response.pagination.totalUsers);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const orders = useAppSelector((state) => state.order.orders);

  const userStatusToUpdateData = users.find(
    (user) => user._id === userStatusToUpdate,
  );

  const startItem =
    totalUsers === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalUsers);
  const getOrderCount = (userId: string) => {
    return orders.filter((order) => order.userId === userId).length;
  };

  const handleUpdateUserStatus = (userId: string) => {
    const user = users.find((user) => user._id === userId);

    if (!user || user.role === "admin") return;

    setUserStatusToUpdate(userId);
  };

  const handleConfirmUpdateUserStatus = async () => {
    if (userStatusToUpdate === null) return;

    try {
      await updateUserStatusAdmin(userStatusToUpdate);
      setUserStatusToUpdate(null);

      await fetchUsers();
    } catch (error: any) {
      console.error(
        "Failed to deactivate user: ",
        error.response.data.message || error.message,
      );
    }
  };

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-950">CUSTOMERS</h1>

        <p className="mt-1 text-sm text-neutral-500">
          Manage your customers and users.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-neutral-300 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  ID
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Name
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Email
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Phone
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Role
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Orders
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Status
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-neutral-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-sm text-neutral-500"
                  >
                    Loading customers...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-neutral-300 last:border-b-0"
                  >
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {user._id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral-100">
                          {user.profilePicture ? (
                            <img
                              src={user.profilePicture}
                              alt={user.name}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <UserIcon
                              size={24}
                              className="mx-auto mt-2.5 text-neutral-500"
                            />
                          )}
                        </div>

                        <p className="text-sm font-medium text-neutral-950">
                          {user.name}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {user.phoneNumber || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {user.role === "user" ? "Customer" : "Admin User"}
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {getOrderCount(user._id!)}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {user.status === "active" ? (
                        <span className="font-medium text-green-600">
                          Active
                        </span>
                      ) : (
                        <span className="font-medium text-red-600">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-5 text-neutral-500">
                        <Button
                          type="button"
                          variant="none"
                          aria-label={`View ${user.name} details`}
                          onClick={() => {
                            setSelectedUser(user);
                            setIsUserDetailsModalOpen(true);
                          }}
                          className="transition hover:text-red-600"
                        >
                          <Eye size={20} />
                        </Button>

                        <Button
                          type="button"
                          variant="none"
                          aria-label={`Update Status ${user.name}`}
                          disabled={user.role === "admin"}
                          onClick={() => handleUpdateUserStatus(user._id!)}
                          className="transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-neutral-500"
                        >
                          <Pencil size={20} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-sm text-neutral-500"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalUsers > 0 && (
            <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-4">
              <p className="text-sm text-neutral-500">
                Showing{" "}
                <span className="font-medium text-neutral-950">
                  {startItem}
                </span>{" "}
                -{" "}
                <span className="font-medium text-neutral-950">{endItem}</span>{" "}
                of{" "}
                <span className="font-medium text-neutral-950">
                  {totalUsers}
                </span>
              </p>

              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="none"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </Button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <Button
                    key={page}
                    type="button"
                    variant="none"
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-[#16DBCC] text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  type="button"
                  variant="none"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                  }
                  className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
      <UserDetailsModal
        isOpen={isUserDetailsModalOpen}
        onClose={() => setIsUserDetailsModalOpen(false)}
        user={selectedUser}
      />
      <AlertModal
        isOpen={userStatusToUpdate !== null}
        type="confirmation"
        title="Update User Status"
        message={
          userStatusToUpdateData
            ? `Are you sure you want to update status of "${userStatusToUpdateData.name}"?`
            : ""
        }
        confirmText="Update Status"
        cancelText="Cancel"
        onConfirm={handleConfirmUpdateUserStatus}
        onClose={() => setUserStatusToUpdate(null)}
      />
    </main>
  );
}
