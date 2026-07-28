import { Truck } from "lucide-react";
interface AnnouncmentBarProps {
  variant: "desktop" | "tablet" | "mobile";
}
export default function AnnouncementBar({
  variant = "desktop",
}: AnnouncmentBarProps) {
  return (
    <header
      className={
        variant === "desktop"
          ? " flex w-full gap-2 justify-center items-center h-10 bg-neutral-900"
          : "bg-neutral-100 flex w-full gap-2 justify-center items-center h-10"
      }
    >
      <Truck
        className={
          variant === "desktop" ? "text-neutral-100" : "text-neutral-900"
        }
      />
      <p
        className={
          variant === "desktop"
            ? "text-sm leading-6 text-neutral-100"
            : "text-sm leading-6 text-neutral-900"
        }
      >
        Spend $150 or more and get{" "}
        <span className="underline">FREE SHIPPING</span> on your order!
      </p>
    </header>
  );
}
