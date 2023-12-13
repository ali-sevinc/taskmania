import { useSelector } from "react-redux";
import NoTask from "./NoTask";
import { RootState } from "../../store/store";
import TaskItem from "./TaskItem";
import { compareDate } from "../../utils/helpers";
import PremiumTracker from "./PremiumTracker";
import Task from "./Task";
import DisplayMenu from "./DisplayMenu";
import Menus from "../ui/Menus";

export default function Today() {
  const users = useSelector((state: RootState) => state.user.users);

  const loggedUser = users.find((user) => user.isLogin);

  const compare = loggedUser?.list.filter(
    (item) => compareDate(item.date) === "today",
  );

  if (!compare?.length) return <NoTask />;
  return (
    <Menus>
      <div className="px-6 pt-12 lg:px-12 ">
        <DisplayMenu />
        <Task>
          {compare.map((task) => (
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
