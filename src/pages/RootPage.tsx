import { Outlet, useNavigate } from "react-router-dom";
import Header from "../features/layout/Header";
import Footer from "../features/layout/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";

export default function RootPage() {
  const users = useSelector((state: RootState) => state.user.users);
  const navigate = useNavigate();
  useEffect(
    function () {
      const isLoggedId = users.find((user) => user.isLogin === true);
      // console.log("Re-Rendered");
      if (isLoggedId) {
        navigate("/app/projects");
      }
    },
    [users, navigate],
  );

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="overflow-y-scroll pb-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
