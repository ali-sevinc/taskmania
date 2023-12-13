export default function NewTaskButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className=" mt-6  flex items-center gap-1 text-xl  font-semibold text-slate-100 duration-200 hover:text-slate-900  "
    >
      <span className="rounded-full text-3xl">+</span>
      <span>Add new task</span>
    </button>
  );
}
