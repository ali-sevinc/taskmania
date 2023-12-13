import Logo from "../ui/Logo";
import HamburgerLinks from "./HamburgerLinks";
import SpagetyLinks from "./SpagetyLinks";

export default function Header() {
  return (
    <header className="z-10 flex w-full grow-0 items-center justify-between bg-slate-950 px-6 py-6 lg:px-12">
      <Logo />
      <HamburgerLinks />
      <SpagetyLinks />
    </header>
  );
}
