import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeUserTag } from "../user/userSlice";

export default function TagItem({
  tag,
  onClose,
}: {
  tag: string;
  onClose?: () => void;
}) {
  const dispatch = useDispatch();
  return (
    <li className="flex justify-between px-4 text-slate-100">
      <Link onClick={onClose} to={`/app/tags/${tag}`}>
        #{tag}
      </Link>
      <button
        className="hover:text-red-500"
        onClick={() => dispatch(removeUserTag({ tag }))}
      >
        x
      </button>
    </li>
  );
}
