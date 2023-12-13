import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../store/store";

export default function PremiumTracker() {
  const users = useSelector((state: RootState) => state.user.users);
  const selectedUser = users.find((user) => user.isLogin);
  if (selectedUser?.isPremium) return null;
  return (
    <div className="mx-auto mt-4 flex max-w-sm flex-col gap-2 rounded-xl bg-slate-100 px-4 py-2 text-right">
      <p className="text-center text-xl">Upgrate your profile to Premium.</p>
      <Link to="/app/payment" className="duration-100 hover:scale-[1.01]">
        Go to payment &rarr;
      </Link>
    </div>
  );
}
