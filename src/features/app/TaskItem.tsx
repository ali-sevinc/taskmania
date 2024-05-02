import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { completeTask, removeTask } from "../user/userSlice";

import { Task } from "../../utils/types";
import { formatDate, smallText } from "../../utils/helpers";

import ComplateIcon from "../ui/ComplateIcon";
import Menus from "../ui/Menus";
import { HiEye, HiTrash } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";

export default function TaskItem({ task }: { task: Task }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formattedDate = formatDate(task?.date);

  const animateStyle = {
    initial: {
      y: 20,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <AnimatePresence>
      <motion.li
        initial={animateStyle.initial}
        animate={animateStyle.animate}
        exit={animateStyle.initial}
        className={`relative flex border-b-4 pb-8 duration-200 ${
          task.isComplete ? "border-b-green-500" : ""
        }`}
      >
        <button
          className="absolute  left-0 top-4"
          onClick={
            !task.isComplete
              ? () => dispatch(completeTask({ id: task.id }))
              : () => {}
          }
        >
          <ComplateIcon isComplete={task.isComplete} />
        </button>
        <div className="block w-full py-2 pl-12 pr-8">
          <h3 className="text-2xl font-bold text-slate-100">{task.title}</h3>
          <time className="text-sm italic text-slate-300">{formattedDate}</time>
          <p className="text-slate-100">{smallText(task.description, 75)}</p>
          <p className="absolute bottom-3 text-xs text-slate-300">
            Tags:{" "}
            {task.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </p>
        </div>
        <Menus.Menu>
          <Menus.Toggle id={task.id} />
          <Menus.List id={task.id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/app/projects/${task.id}`)}
            >
              Details
            </Menus.Button>
            <Menus.Button
              icon={<HiTrash />}
              onClick={() => dispatch(removeTask({ id: task.id }))}
            >
              Delete
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </motion.li>
    </AnimatePresence>
  );
}
