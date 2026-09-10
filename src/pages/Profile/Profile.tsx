import { useState } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import Button from "../../components/ui/Button";
import { useLogout } from "../../hooks/useLogout";
import { useAppSelector } from "../../hooks/reduxHooks";
import ChangePassword from "../../components/ui/Auth/ChangePassword";
import UserDetailsContent from "../../components/sections/UserDetailsContent";

export default function Profile() {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const handleLogout = useLogout();

  return (
    <div>
      {currentUser ? (
        <div className="flex flex-col px-12 py-6 gap-6">
          <div className="flex flex-col gap-2 md:flex-row px-6 justify-between items-center">
            <h1 className="text-3xl leading-8">Welcome, {currentUser.name}</h1>
            {currentUser.profilePicture ? (
              <>
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-full object-contain"
                  loading="lazy"
                />
              </>
            ) : (
              <User size={56} className="bg-gray-500 rounded-full p-2" />
            )}
          </div>

          <UserDetailsContent user={currentUser} />

          <div className="h-px w-full bg-neutral-950" />
          <h2 className="text-2xl leading-7 px-4">Account Actions</h2>
          <div className="h-px w-full bg-neutral-950" />
          <div className="flex flex-col lg:flex-row gap-3 px-4 lg:items-center">
            <Button
              type="button"
              variant="dark"
              onClick={() => setIsEditProfileOpen(true)}
              className="w-40 h-10"
            >
              Edit Profile
            </Button>
            <Button
              type="button"
              variant="dark"
              onClick={() => setIsChangePasswordOpen(true)}
              className="w-40 h-10"
            >
              Change Password
            </Button>
            {currentUser.role === "admin" ? (
              <Link
                to={"/admin/orders?mine=true"}
                onClick={() => window.scrollTo(0, 0)}
              >
                <Button type="button" variant="dark" className="w-40 h-10">
                  My Orders
                </Button>
              </Link>
            ) : (
              <Link to={"/orders"} onClick={() => window.scrollTo(0, 0)}>
                <Button type="button" variant="dark" className="w-40 h-10">
                  My Orders
                </Button>
              </Link>
            )}
            <Link to={"/"}>
              <Button
                type="button"
                variant="dark"
                onClick={() => {
                  handleLogout();
                  window.scrollTo(0, 0);
                }}
                className="w-40 h-10"
              >
                Log Out
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <p>No user is currently logged in</p>
      )}
      {isEditProfileOpen && (
        <EditProfile onClose={() => setIsEditProfileOpen(false)} />
      )}
      {isChangePasswordOpen && (
        <ChangePassword onClose={() => setIsChangePasswordOpen(false)} />
      )}
    </div>
  );
}
