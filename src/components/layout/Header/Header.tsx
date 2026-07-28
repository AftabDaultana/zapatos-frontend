import AnnouncementBar from "./AnnouncementBar";
import HeaderMain from "./HeaderMain";

export default function Header() {
  return (
    <>
      <AnnouncementBar />
      <HeaderMain />
      <header className="bg-primary-300 text-neutral-900 p-6">
        <h2 className="text-2xl foont-bold justify-center">Zapatos</h2>
      </header>
    </>
  );
}
