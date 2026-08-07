import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import TabletHeader from "./TabletHeader";
import UserMenu from "../../ui/UserMenu";

export default function Header() {
  return (
    <>
      <div className="hidden xl:block">
        <DesktopHeader />
      </div>
      <div className="hidden xl:hidden md:block">
        <TabletHeader />
      </div>
      <div className="block md:hidden">
        <MobileHeader />
      </div>
      {/* <div>
        <UserMenu />
      </div> */}
    </>
  );
}
