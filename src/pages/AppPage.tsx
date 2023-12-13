import { Outlet, useNavigate } from "react-router-dom";
import AppHeader from "../features/app/AppHeader";
import AppSidebar from "../features/app/AppSidebar";
import ModalAppSidebar from "../features/app/ModalAppSidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../store/store";

export default function AppPage() {
  const users = useSelector((state: RootState) => state.user.users);
  const navigate = useNavigate();
  const isLoggedId = users.find((user) => user.isLogin === true);
  useEffect(
    function () {
      // console.log(isLoggedId);
      if (!isLoggedId) {
        navigate("/login");
      }
    },
    [navigate, isLoggedId],
  );
  if (!isLoggedId) return <p>Loading...</p>;
  return (
    <div className="min-h-screen lg:grid lg:grid-flow-row">
      <AppHeader />
      <div className="grid pt-20 lg:grid-cols-[auto_1fr] ">
        <AppSidebar />
        <ModalAppSidebar />

        <Outlet />
      </div>
    </div>
  );
}
