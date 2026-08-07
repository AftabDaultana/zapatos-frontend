import { UserRound, LogOut, UserCircle } from "lucide-react";
import Button from "./Button";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function UserMenu() {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  return (
    <div>{currentUser ? <div>Logged In</div> : <div>Logged Out</div>}</div>
  );
}
