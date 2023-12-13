import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeUserTag } from "../user/userSlice";

export default function TagItem({ tag }: { tag: string }) {
  const dispatch = useDispatch();
  return (
    <li className="flex justify-between px-4 text-slate-100">
      <Link to={`/app/tags/${tag}`}>#{tag}</Link>
      <button onClick={() => dispatch(removeUserTag({ tag }))}>x</button>
    </li>
  );
}
