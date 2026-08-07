export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;

  profilePicture: string;

  role: "user" | "admin";

  isLoggedIn: boolean;

  billingAddress: Address;
  shippingAddress: Address;
}
