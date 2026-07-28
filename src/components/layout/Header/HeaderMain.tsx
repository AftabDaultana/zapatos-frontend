import HeaderActions from "./HeaderActions";
import HeaderLogo from "./HeaderLogo";
import SearchBar from "./SearchBar";

function HeaderMain() {
  return (
    <div className="flex w-full items-center gap-10 px-8 py-3">
      <HeaderLogo varient="light" classname="h-[73.26px] w-46.75" />
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
