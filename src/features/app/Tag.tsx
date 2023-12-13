import { useSelector } from "react-redux";
import NoTask from "./NoTask";
import { RootState } from "../../store/store";
import TaskItem from "./TaskItem";
import PremiumTracker from "./PremiumTracker";
import { useParams } from "react-router-dom";
import DisplayMenu from "./DisplayMenu";
import Task from "./Task";
import Menus from "../ui/Menus";

export default function Tag() {
  const users = useSelector((state: RootState) => state.user.users);

  const params = useParams();

  const loggedUser = users.find((user) => user.isLogin);

  const compare = loggedUser?.list.filter((item) =>
    item.tags.includes(params.tag!),
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
