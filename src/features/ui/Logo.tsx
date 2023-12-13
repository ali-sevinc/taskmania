import { Link } from "react-router-dom";
import { HiOutlineSortAscending } from "react-icons/hi";
export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      onClick={onClick}
      to="/"
      className="flex items-center text-xl text-slate-100 md:text-3xl lg:text-4xl"
    >
      <HiOutlineSortAscending />

      <h1 className="font-extrabold">Taskmania</h1>
    </Link>
  );
}
