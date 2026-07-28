import logo from "../../../assets/Vector.svg";
import HeaderActions from "./HeaderActions";
import SearchBar from "./SearchBar";

function HeaderMain() {
  return (
    <div className="flex items-center gap-10 px-8 py-3">
      <img src={logo} alt="Zapatos" className="h-18.25 w-46.75" />
      <SearchBar />
      <HeaderActions />
    </div>
  );
}

export default HeaderMain;
