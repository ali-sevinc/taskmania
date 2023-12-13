import { NavLink } from "react-router-dom";

import AddTagForm from "./AddTagForm";
import UserTags from "./UserTags";

export default function AppSidebar() {
  return (
    <aside className="hidden  w-52 border-r-4 border-r-slate-950 bg-slate-800 text-slate-100 lg:block">
      <nav className="pb-2">
        <ul className="flex flex-col px-4 pt-8 ">
          <li>
            <NavLink
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
      <UserTags />
    </aside>
  );
}
