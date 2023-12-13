import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { completeTask, removeTask } from "../user/userSlice";
import { RootState } from "../../store/store";

import ComplateIcon from "../ui/ComplateIcon";
import Button from "../ui/Button";
import { formatDate } from "../../utils/helpers";

export default function TaskDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const navigate = useNavigate();

  const loggedUser = users.find((user) => user.isLogin);
  const selectedTask = loggedUser?.list.find((i) => i.id === params.id);

  if (!selectedTask) return <h2>Taks not found.</h2>;

  const formattedDate = formatDate(selectedTask.date);
  const isCompleted = selectedTask?.isComplete;
  const tags = selectedTask.tags || [];

  return (
    <div>
      <div className="mx-4 mt-24 flex flex-col gap-4 rounded-xl bg-slate-100  pb-4 shadow-lg sm:mx-auto sm:w-3/4">
        <h2 className="rounded-t-xl bg-slate-300 py-2 text-center text-4xl text-slate-800">
          {selectedTask.title}
        </h2>

        <p className="px-12 text-xl">{selectedTask.description}</p>
        <time className="px-12 text-sm italic text-slate-600">
          {formattedDate}
        </time>
        <div className="flex gap-3 px-12 text-sm text-slate-600">
          <p>Tags:</p>
          {tags.length > 0 && (
            <ul className="flex gap-2 italic">
              {tags.map((t, i) => (
                <li key={i}>#{t}</li>
              ))}
            </ul>
          )}
          {tags.length === 0 && <p>No tags found.</p>}
        </div>

        <div className="flex justify-between px-12 sm:hidden ">
          <button className="text-lg duration-100 hover:scale-105">
            &larr;Back
          </button>
          {isCompleted ? (
            <ComplateIcon isComplete={isCompleted} />
          ) : (
            <button
              className="text-lg duration-100 hover:scale-105"
              onClick={() => dispatch(completeTask({ id: selectedTask.id }))}
            >
              Complete
            </button>
          )}
          <button className="text-lg duration-100 hover:scale-105">
            Delete
          </button>
          d
        </div>

        <div className="mt-8 hidden items-center  justify-between px-12 text-slate-100 sm:flex">
          <Button model="secondary" type="button" onClick={() => navigate(-1)}>
            &larr;Back
          </Button>
          {isCompleted ? (
            <ComplateIcon isComplete={isCompleted} />
          ) : (
            <Button
              type="button"
              onClick={() => dispatch(completeTask({ id: selectedTask.id }))}
            >
              Complete
            </Button>
          )}
          <Button
            type="button"
            model="danger"
            onClick={() => {
              dispatch(removeTask({ id: selectedTask.id }));
              navigate(-1);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
