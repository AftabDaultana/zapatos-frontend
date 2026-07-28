import { Phone, Mail, Info, User, Heart, ShoppingCart } from "lucide-react";
import ActionItem from "./ActionItem";

function Divider() {
  return <div className="bg-neutral-900 h-6 w-px" />;
}

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <ActionItem icon={<Phone />} text="(804) 6623-9999" />
      <Divider />
      <ActionItem icon={<Mail />} text="supportoursmallbusiness@g.com" />
      <Divider />
      <ActionItem icon={<Info />} text="Info" dropDown />
      <Divider />
      <ActionItem icon={<User />} text="" dropDown />
      <Divider />
      <Heart size={24} className="text-neutral-900" />
      <Divider />
      <ShoppingCart size={24} className="text-neutral-900" />
    </div>
  );
}
