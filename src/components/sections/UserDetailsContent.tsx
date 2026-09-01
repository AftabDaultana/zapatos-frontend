import type { User } from "../../types/user";

interface UserDetailsContentProps {
  user: User;
}

export default function UserDetailsContent({ user }: UserDetailsContentProps) {
  return (
    <>
      {/* Personal Information */}
      <div className="h-px w-full bg-neutral-950" />

      <div>
        <h2 className="px-4 text-2xl leading-7">Personal Information</h2>
      </div>

      <div className="h-px w-full bg-neutral-950" />

      <div className="flex flex-col gap-3 px-4">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phoneNumber}</p>
      </div>

      {/* Shipping Address */}
      <div className="h-px w-full bg-neutral-950" />

      <h2 className="px-4 text-2xl leading-7">Shipping Address</h2>

      <div className="h-px w-full bg-neutral-950" />

      <div className="flex flex-col gap-3 px-4">
        <p>Street: {user.shippingAddress.street}</p>
        <p>City: {user.shippingAddress.city}</p>
        <p>State: {user.shippingAddress.state}</p>
        <p>Country: {user.shippingAddress.country}</p>
        <p>Postal Code: {user.shippingAddress.postalCode}</p>
      </div>

      {/* Billing Address */}
      <div className="h-px w-full bg-neutral-950" />

      <h2 className="px-4 text-2xl leading-7">Billing Address</h2>

      <div className="h-px w-full bg-neutral-950" />

      <div className="flex flex-col gap-3 px-4">
        <p>Street: {user.billingAddress.street}</p>
        <p>City: {user.billingAddress.city}</p>
        <p>State: {user.billingAddress.state}</p>
        <p>Country: {user.billingAddress.country}</p>
        <p>Postal Code: {user.billingAddress.postalCode}</p>
      </div>
    </>
  );
}
