import { User } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import Button from "./Button";
import { logoutUser } from "../../app/slices/userSlice";

interface LoggedInCardProps {
  onLogOut: () => void;
}

export default function LoggedInCard({ onLogOut }: LoggedInCardProps) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  if (!currentUser) return null;

  return (
    <div className="flex flex-col gap-5 p-4 items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ">
          {currentUser.profilePicture ? (
            <img
              src={currentUser.profilePicture}
              alt={currentUser.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <User size={24} className="m-auto text-neutral-500" />
          )}
        </div>
        <div className="h-px w-full bg-neutral-700" />
        <div className="flex flex-col gap-1.5">
          <span className="block truncate text-lg font-medium text-neutral-700">
            {currentUser.name}
          </span>
          <div className="h-px w-full bg-neutral-700" />
          <span className="block truncate text-lg font-medium text-neutral-700">
            {currentUser.email}
          </span>
          <div className="h-px w-full bg-neutral-700" />
          <span className="block truncate text-lg font-medium text-neutral-700">
            {currentUser.phoneNumber}
          </span>
        </div>
        <div className="flex flex-col gap-2 h-px w-full bg-neutral-700" />
        <Button
          type="button"
          className="hover:border hover:border-neutral-950 hover:bg-transparent hover:text-neutral-950 bg-neutral-950 text-neutral-50 w-40 h-10"
        >
          View Profile
        </Button>
        <Button
          type="button"
          onClick={() => {
            dispatch(logoutUser());
            onLogOut();
          }}
          className="border border-neutral-950 text-neutral-950 hover:bg-neutral-950 hover:text-neutral-50 w-30 h-10"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
