import AnnouncementBar from "./AnnouncementBar";
import HeaderMain from "./HeaderMain";
import NavigationMenu from "./NavigationMenu";

export default function DesktopHeader() {
  return (
    <header>
      <AnnouncementBar variant="desktop" />
      <HeaderMain />
      <NavigationMenu />
    </header>
  );
}
