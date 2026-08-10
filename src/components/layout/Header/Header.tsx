import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import TabletHeader from "./TabletHeader";

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
    </>
  );
}
