import { useDispatch, useSelector } from "react-redux";

import { logout } from "../user/userSlice";
import { RootState } from "../../store/store";

export default function AppHeader() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state: RootState) => state.user.users).find(
    (user) => user.isLogin,
  );

  return (
    <header className="fixed left-0 top-0 z-10 flex h-20 w-full items-center justify-between bg-slate-950 px-4">
      <h2 className="text-slate-100">
        Welcome to Taskmania{" "}
        <span className="capitalize">{loggedUser?.userName || "User"}</span>
      </h2>
      <div className="flex gap-4  px-4  text-slate-800">
        <h2 className="rounded-full border-2 border-slate-800 bg-slate-100 px-[14px] py-[7px] text-2xl font-semibold uppercase">
          {loggedUser?.userName.charAt(0) || "u"}
        </h2>
        <button onClick={() => dispatch(logout())} className="text-slate-100">
          Logout
        </button>
      </div>
    </header>
  );
}
