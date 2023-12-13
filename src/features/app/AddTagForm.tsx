import { useState } from "react";
import { useDispatch } from "react-redux";
import { HiOutlinePlus } from "react-icons/hi";

import { addUserTag } from "../user/userSlice";

export default function AddTagForm() {
  const [tag, setTag] = useState<string>("");
  const dispatch = useDispatch();

  function handleAddTag() {
    if (!tag) return;
    dispatch(addUserTag({ tag }));
    setTag("");
  }

  return (
    <div className="border-t py-2">
      <div className="mx-auto flex w-52 items-center justify-center px-4">
        <input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Add new tag.."
          className=" w-32  rounded-l-sm bg-slate-100 p-1 text-slate-800  focus:outline-none"
        />
        <button
          onClick={handleAddTag}
          className=" mx-auto flex w-full items-center rounded-r-sm border-l  bg-slate-100 px-3  py-2  text-slate-800 duration-100 hover:bg-slate-300  "
        >
          <HiOutlinePlus />
        </button>
      </div>
    </div>
  );
}
