import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

import AddTagForm from "./AddTagForm";
import UserTags from "./UserTags";

export default function ModalAppSidebar() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  function handleClose() {
    setShowSidebar(false);
  }

  useEffect(
    function () {
      if (!showSidebar) return;
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
    [showSidebar],
  );

  return (
    <div className="block lg:hidden">
      <button
        className="fixed left-1 text-xl text-slate-100 lg:hidden"
        onClick={() => setShowSidebar(true)}
      >
        <HiOutlineMenu />
      </button>

      {showSidebar && (
        <>
          <div
            onClick={handleClose}
            className="fixed left-0 top-0 z-20 h-full w-full  backdrop-blur-sm lg:hidden "
          />

          <aside className="fixed left-0 z-30 h-screen w-52 border-r-4 border-r-slate-900  bg-slate-800">
            <button
              onClick={handleClose}
              className="absolute right-1 top-1 text-slate-100"
            >
              <HiOutlineX />
            </button>
            <nav>
              <ul className="flex flex-col px-4 pt-8 text-slate-100">
                <li>
                  <NavLink
                    onClick={handleClose}
                    to="/app/projects"
                    className={({ isActive }) =>
                      (isActive ? "bg-slate-600" : "") +
                      " block h-full w-full rounded-sm px-2 py-2 hover:bg-slate-500"
                    }
                  >
                    All tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleClose}
                    to="/app/today"
                    className={({ isActive }) =>
                      (isActive ? "bg-slate-600" : "") +
                      " block h-full w-full rounded-sm px-2 py-2 hover:bg-slate-500"
                    }
                  >
                    Today
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleClose}
                    to="/app/upcoming"
                    className={({ isActive }) =>
                      (isActive ? "bg-slate-600" : "") +
                      " block h-full w-full rounded-sm px-2 py-2 hover:bg-slate-500"
                    }
                  >
                    Upcoming
                  </NavLink>
                </li>
              </ul>
            </nav>

            <AddTagForm />
            <UserTags onClose={handleClose} />
          </aside>
        </>
      )}
    </div>
  );
}
