import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import { RootState } from "../../store/store";

export default function Task({ children }: { children: ReactNode }) {
  const style = useSelector((state: RootState) => state.app.style);

  const itemStyle =
    style === "list"
      ? "flex flex-col gap-3 max-w-3xl"
      : "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 max-w-5xl";

  return (
    <AnimatePresence mode="wait">
      <motion.ul className={` mx-auto  ${itemStyle}`}>{children}</motion.ul>
    </AnimatePresence>
  );
}
