import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
  onClick?: () => void;
  type: "button" | "submit";
  model?: "primary" | "secondary" | "danger";
}
export default function Button({
  children,
  onClick,
  type,
  model = "primary",
}: PropsType) {
  let buttonColors: string = "";
  if (model === "primary") buttonColors = "bg-slate-900 hover:bg-slate-950";
  if (model === "secondary")
    buttonColors = "bg-transparent hover:bg-slate-200 text-slate-800";
  if (model === "danger") buttonColors = "bg-red-500 hover:bg-red-600";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-32  rounded-lg py-3 duration-200 ${buttonColors}`}
    >
      {children}
    </button>
  );
}
