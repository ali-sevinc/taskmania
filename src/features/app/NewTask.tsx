import { ChangeEvent, FormEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { addTask } from "../user/userSlice";
import { Task } from "../../utils/types";

import Button from "../ui/Button";
import PremiumTracker from "./PremiumTracker";

export default function NewTask({
  onCloseModal,
}: {
  onCloseModal?: () => void;
}) {
  const [inputsValues, setInputsValues] = useState({
    title: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
  });
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const users = useSelector((state: RootState) => state.user.users);
  const loggedUser = users.find((user) => user.isLogin);
  const isPremium = loggedUser?.isPremium;

  const dispatch = useDispatch();

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setInputsValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleRemoveTag(tag: string) {
    setTags((prev) => prev.filter((i) => i !== tag));
  }

  function handleTag() {
    if (!tag) return;
    if (tags.includes(tag)) return;
    setTags((prev) => [...prev, tag]);
    setTag("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const title = inputsValues.title;
    const date = inputsValues.date;
    const description = inputsValues.description;
    if (!title.length || !date || !description.length) return;
    const data: Task = {
      title,
      date,
      description,
      id: crypto.randomUUID(),
      isComplete: false,
      tags: tags,
    };
    dispatch(addTask(data));
    setInputsValues({
      title: "",
      date: new Date().toISOString().slice(0, 10),
      description: "",
    });
    setTags([]);
  }

  return (
    <div className="mx-auto mt-8  w-full max-w-2xl px-4 ">
      {!isPremium && loggedUser!.list.length > 4 ? (
        <PremiumTracker />
      ) : (
        <>
          <h2 className="my-4 text-center text-2xl text-slate-800">
            Add new task
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:gap-1">
              <div className="flex w-full flex-col gap-0">
                <label
                  htmlFor="title"
                  className="flex justify-between rounded-t-md border-none border-slate-600 bg-slate-100 px-4 py-2 text-sm  "
                >
                  Title
                </label>
                <input
                  value={inputsValues.title}
                  onChange={handleChange}
                  id="title"
                  type="text"
                  name="title"
                  required
                  placeholder="Title..."
                  className={`bg-slate-100" h-[50px]  rounded-b-md border-x-0  border-b-4 border-t-0 border-slate-300 px-4 py-2 text-lg focus:border-b-4  focus:border-b-slate-950 focus:outline-none `}
                />
              </div>
              <div className="flex  flex-col  gap-0 md:w-40">
                <label
                  htmlFor="date"
                  className="flex justify-between rounded-t-md border-none border-slate-600 bg-slate-100 px-4 py-2 text-sm  "
                >
                  Date
                </label>
                <input
                  value={inputsValues.date}
                  onChange={handleChange}
                  id="date"
                  min={new Date().toISOString().slice(0, 10)}
                  type="date"
                  name="date"
                  required
                  className={`bg-slate-100" h-[50px]  rounded-b-md border-x-0 border-b-4  border-t-0 border-slate-300 px-4 py-2 text-sm focus:border-b-4  focus:border-b-slate-950 focus:outline-none `}
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-0">
              <label
                htmlFor="description"
                className="flex justify-between rounded-t-md border-none border-slate-600 bg-slate-100 px-4 py-2 text-sm  "
              >
                Title
              </label>
              <textarea
                value={inputsValues.description}
                onChange={handleChange}
                id="description"
                name="description"
                rows={3}
                required
                placeholder="Description..."
                className={`bg-slate-100" rounded-b-md border-x-0 border-b-4  border-t-0 border-slate-300 px-4 py-2 text-lg focus:border-b-4  focus:border-b-slate-950 focus:outline-none `}
              />
            </div>
            <div className="flex gap-4 rounded-md bg-slate-100 px-4 py-2">
              <div className="flex items-center">
                <input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Add task tag."
                  className="w-32 px-2 py-1"
                />
                <button
                  type="button"
                  onClick={handleTag}
                  className="border-l bg-white px-2 py-1 hover:bg-slate-200"
                >
                  Add
                </button>
              </div>
              <ul className="flex flex-wrap gap-1">
                {tags.map((i) => (
                  <li
                    onClick={() => handleRemoveTag(i)}
                    key={i}
                    className="cursor-pointer rounded-sm border bg-slate-200 px-2 hover:bg-slate-400"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className=" mx-auto mt-4 flex w-3/4 justify-between text-xl text-slate-100">
              <Button model="secondary" type="button" onClick={onCloseModal}>
                &larr;Back
              </Button>
              <Button type="submit">+Add</Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
