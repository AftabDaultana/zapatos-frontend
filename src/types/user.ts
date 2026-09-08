export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
  profilePicture?: string;
  role: "user" | "admin";
  status: "active" | "inactive";
  billingAddress?: Address;
  shippingAddress?: Address;
}
