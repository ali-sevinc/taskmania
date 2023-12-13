import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      type="button"
      className="w-32 rounded-lg bg-slate-900 py-3 duration-200 hover:bg-slate-950 "
    >
      <HiArrowLeft />
    </button>
  );
}
