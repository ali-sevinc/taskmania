import {
  useContext,
  createContext,
  ReactNode,
  useState,
  cloneElement,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface InitialType {
  openName: string;
  open: (openName: string) => void;
  close: () => void;
}
const initialState: InitialType = {
  openName: "",
  open: () => {},
  close: () => {},
};
const ModalContext = createContext(initialState);

export default function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState<string>("");

  const open = (openName: string) => setOpenName(openName);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenType {
  children: JSX.Element;
  openName: string;
}
function Open({ children, openName }: OpenType) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(openName) });
}

interface WindowType {
  children: JSX.Element;
  name: string;
}
function Window({ children, name }: WindowType) {
  const { close, openName } = useContext(ModalContext);
  if (name !== openName) return null;

  return createPortal(
    <AnimatePresence>
      <div>
        <div
          onClick={close}
          className="fixed left-0 top-0 z-20 min-h-screen w-full backdrop-blur-sm"
        />
        <motion.dialog
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="inset-0 z-30 w-full max-w-2xl rounded-xl bg-slate-50 pb-8  sm:w-3/4"
          open
        >
          {cloneElement(children, { onCloseModal: close })}
        </motion.dialog>
      </div>
    </AnimatePresence>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;
