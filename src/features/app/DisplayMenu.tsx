import { RootState } from "../../store/store";
import Modal from "../ui/Modal";
import NewTaskButton from "../ui/NewTaskButton";
import NewTask from "./NewTask";
import { list, grid } from "./uiSlice";
import { HiOutlineViewList, HiOutlineViewGrid } from "react-icons/hi";

import { useDispatch, useSelector } from "react-redux";

export default function DisplayMenu() {
  const style = useSelector((state: RootState) => state.app.style);
  const dispatch = useDispatch();

  return (
    <div className="mx-auto flex max-w-2xl items-center justify-between pb-4 text-center text-slate-100">
      <Modal>
        <Modal.Open openName="new">
          <NewTaskButton />
        </Modal.Open>
        <Modal.Window name="new">
          <NewTask />
        </Modal.Window>
      </Modal>

      <div className="hidden items-center justify-center  gap-1 text-sm lg:flex">
        <h3>Display</h3>
        <button
          className={`rounded-full p-1 text-lg duration-200 ${
            style === "list" ? "bg-slate-100 text-slate-600" : ""
          } hover:bg-slate-100 hover:text-slate-600`}
          onClick={() => dispatch(list())}
        >
          <HiOutlineViewList />
        </button>
        <button
          className={`rounded-full p-1 text-lg duration-200 ${
            style === "grid" ? "bg-slate-100 text-slate-600" : ""
          } hover:bg-slate-100 hover:text-slate-600`}
          onClick={() => dispatch(grid())}
        >
          <HiOutlineViewGrid />
        </button>
      </div>
    </div>
  );
}
