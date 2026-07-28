import { Truck } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <header className="bg-neutral-900 flex gap-2 justify-center items-center h-10">
      <Truck className="text-neutral-100" />
      <p className="text-sm leading-6 text-neutral-100">
        Spend $150 or more and get{" "}
        <span className="underline">FREE SHIPPING</span> on your order!
      </p>
    </header>
  );
}
