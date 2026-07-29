import HeaderActions from "./HeaderActions";
import Logo from "../../shared/Logo";
import SearchBar from "./SearchBar";

function HeaderMain() {
  return (
    <div className="flex items-center gap-10 px-8 py-3">
      <Logo variant="dark" className="h-[73.26px] w-46.75" />
      <div className="flex-1">
        <SearchBar />
      </div>
      <div className="shrink-0">
        <HeaderActions />
      </div>
    </div>
  );
}

export default HeaderMain;
