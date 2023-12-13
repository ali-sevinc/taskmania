import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Logo from "../ui/Logo";
export default function HamburgerLinks() {
  const [showMenu, setShowMenu] = useState(false);

  function handleClose() {
    setShowMenu(false);
  }

  useEffect(
    function () {
      if (!showMenu) return;
      function handleEscape(event: KeyboardEvent) {
        if (event.key === "Escape") {
          handleClose();
        }
      }
      window.addEventListener("keydown", handleEscape);
      return () => {
        window.removeEventListener("keydown", handleEscape);
      };
    },
    [showMenu],
  );

  return (
    <>
      {!showMenu && (
        <button
          className="text-2xl text-slate-100 lg:hidden"
          onClick={() => setShowMenu(true)}
        >
          <HiOutlineMenu />
        </button>
      )}

      <>
        {showMenu && (
          <div
            onClick={() => setShowMenu(false)}
            className="fixed left-0 top-0 z-20 h-full w-full  backdrop-blur-sm lg:hidden "
          />
        )}
        {showMenu && (
          <dialog
            open
            className=" fixed top-0 z-30 flex w-full flex-col items-center gap-5 bg-slate-950 px-2 py-8 text-sm text-slate-100 lg:hidden "
          >
            <Logo onClick={handleClose} />
            <Link to="/features" onClick={handleClose}>
              Features
            </Link>
            <Link to="/pricing" onClick={handleClose}>
              Pricing
            </Link>
            <div className="flex gap-4">
              <Link
                onClick={handleClose}
                to="/login"
                className="w-32 rounded-md bg-slate-100 px-4 py-2 text-center  text-slate-800 duration-200 hover:bg-slate-300 sm:w-44 sm:font-semibold"
              >
                Login
              </Link>
              <p className="text-2xl font-semibold"> | </p>
              <Link
                to="signup"
                className="w-32 rounded-md bg-slate-100 px-4 py-2 text-center text-slate-800 duration-200 hover:bg-slate-300 sm:w-44 sm:font-semibold"
                onClick={handleClose}
              >
                Start for free
              </Link>
            </div>
            <button
              onClick={handleClose}
              className="absolute right-1 top-1 text-2xl"
            >
              <HiOutlineX />
            </button>
          </dialog>
        )}
      </>
    </>
  );
}
