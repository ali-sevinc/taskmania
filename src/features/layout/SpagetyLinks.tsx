import { Link } from "react-router-dom";
export default function SpagetyLinks() {
  return (
    <div className="hidden items-center gap-5 text-xl text-slate-100 lg:flex ">
      <Link to="/features">Features</Link>
      <Link to="/pricing">Pricing</Link>
      <p className="text-2xl font-semibold"> | </p>
      <Link to="/login">Login</Link>
      <Link
        to="signup"
        className="rounded-md bg-slate-100 px-4 py-2 font-semibold text-slate-800 duration-200 hover:bg-slate-300"
      >
        Start for free
      </Link>
    </div>
  );
}
