import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import PremiumTracker from "./PremiumTracker";
import DisplayMenu from "./DisplayMenu";
import TaskItem from "./TaskItem";
import Menus from "../ui/Menus";
import NoTask from "./NoTask";
import Task from "./Task";

export default function AllTasks() {
  const users = useSelector((state: RootState) => state.user.users);

  const loggedUser = users.find((user) => user.isLogin);

  if (!loggedUser?.list.length) return <NoTask />;

  return (
    <Menus>
      <div className="px-6 pt-12 lg:px-12">
        <DisplayMenu />
        <Task>
          {loggedUser.list.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Task>

        <div className="mt-32">
          <PremiumTracker />
        </div>
      </div>
    </Menus>
  );
}
<h2 className="text-center text-3xl text-slate-100">All to-do's</h2>;
