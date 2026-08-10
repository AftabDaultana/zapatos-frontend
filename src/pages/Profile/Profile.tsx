import { User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Button from "../../components/ui/Button";
import { logoutUser } from "../../app/slices/userSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import EditProfile from "./EditProfile";

export default function Profile() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  return (
    <div>
      {currentUser ? (
        <div className="flex flex-col px-12 py-6 gap-6">
          <div className="flex px-6 justify-between items-center">
            <h1 className="text-3xl leading-8">Welcome, {currentUser.name}</h1>
            {currentUser.profilePicture ? (
              <>
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-full object-contain"
                />
              </>
            ) : (
              <User size={56} className="bg-gray-500 rounded-full p-2" />
            )}
          </div>

          <div className="h-px w-full bg-neutral-950" />
          <div>
            <h2 className="text-2xl leading-7 px-4">Personal Information</h2>
          </div>
          <div className="h-px w-full bg-neutral-950" />
          <div className="flex flex-col gap-3 px-4">
            <p>Name: {currentUser.name}</p>
            <p>Email: {currentUser.email}</p>
            <p>Phone: {currentUser.phoneNumber}</p>
          </div>
          <div className="h-px w-full bg-neutral-950" />
          <h2 className="text-2xl leading-7 px-4">Shipping Address</h2>
          <div className="h-px w-full bg-neutral-950" />
          <div className="flex flex-col gap-3 px-4">
            <p>Street: {currentUser.shippingAddress.street}</p>
            <p>City: {currentUser.shippingAddress.city}</p>
            <p>State: {currentUser.shippingAddress.state}</p>
            <p>Country: {currentUser.shippingAddress.country}</p>
            <p>Postal Code: {currentUser.shippingAddress.postalCode}</p>
          </div>
          <div className="h-px w-full bg-neutral-950" />
          <h2 className="text-2xl leading-7 px-4">Billing Address</h2>
          <div className="h-px w-full bg-neutral-950" />
          <div className="flex flex-col gap-3 px-4">
            <p>Street: {currentUser.billingAddress.street}</p>
            <p>City: {currentUser.billingAddress.city}</p>
            <p>State: {currentUser.billingAddress.state}</p>
            <p>Country: {currentUser.billingAddress.country}</p>
            <p>Postal Code: {currentUser.billingAddress.postalCode}</p>
          </div>
          <div className="h-px w-full bg-neutral-950" />
          <h2 className="text-2xl leading-7 px-4">Account Actions</h2>
          <div className="h-px w-full bg-neutral-950" />
          <div className="flex gap-3 px-4 items-center">
            <Button
              type="button"
              onClick={() => setIsEditProfileOpen(true)}
              className="w-25 h-10 bg-neutral-950 text-neutral-50 hover:border hover:border-neutral-950 hover:bg-transparent hover:text-neutral-950"
            >
              Edit Profile
            </Button>
            <Link to={"/"}>
              <Button
                type="button"
                onClick={() => dispatch(logoutUser())}
                className="w-25 h-10 bg-neutral-950 text-neutral-50 hover:border hover:border-neutral-950 hover:bg-transparent hover:text-neutral-950"
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
    </div>
  );
}
