import {
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import useOutsideClick from "./useOutsideClick";
import { createPortal } from "react-dom";

type InitialType = {
  openId: string;
  position: null | { x: number; y: number };
  open: (openId: string) => void;
  close: () => void;
  onPosition: (pos: { x: number; y: number }) => void;
};
const initialState: InitialType = {
  openId: "",
  position: null,
  open: () => {},
  close: () => {},
  onPosition: () => {},
};

const MenuContext = createContext(initialState);

export default function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<null | { x: number; y: number }>(
    null,
  );

  const open = (id: string) => {
    setOpenId(id);
  };
  const close = () => {
    setOpenId("");
  };
  const onPosition = (pos: { x: number; y: number }) => {
    setPosition(pos);
  };

  useEffect(
    function () {
      function handleScroll() {
        if (openId) {
          close();
          document.removeEventListener("wheel", handleScroll);
        }
      }
      if (openId) document.addEventListener("wheel", handleScroll);
      return () => document.removeEventListener("wheel", handleScroll);
    },
    [openId],
  );

  return (
    <MenuContext.Provider value={{ open, close, openId, position, onPosition }}>
      {children}
    </MenuContext.Provider>
  );
}

function Menu({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

type OpenType = { id: string };
function Toggle({ id }: OpenType) {
  const { open, close, openId, onPosition } = useContext(MenuContext);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    const rect = (event.target as HTMLElement)
      .closest("button")!
      .getBoundingClientRect();

    const x = Math.round(window.innerWidth - rect.width - rect.x);
    const y = Math.round(rect.y + rect.height + 8);
    onPosition({ x, y });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className="h-8 w-8 translate-x-2 rounded-sm border-none bg-none p-[0.4rem] text-xl font-bold text-slate-100 duration-200 hover:bg-slate-400 "
    >
      <HiEllipsisVertical />
    </button>
  );
}

type ListType = { children: ReactNode; id: string };
function List({ children, id }: ListType) {
  const { openId, position, close } = useContext(MenuContext);
  const ref = useOutsideClick(close, false) as RefObject<HTMLUListElement>;
  if (openId !== id) return null;

  return createPortal(
    <ul
      key={id}
      ref={ref}
      className={`fixed z-20  rounded-md bg-slate-100 shadow-lg `}
      style={{
        right: `${position?.x}px`,
        top: `${position?.y}px`,
      }}
    >
      {children}
    </ul>,
    document.body,
  );
}

type ButtonType = {
  children: ReactNode;
  icon: JSX.Element;
  onClick?: () => void;
};
function Button({ children, icon, onClick }: ButtonType) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick && onClick();
    close();
  }

  return (
    <li className="rounded-md px-2 py-1 duration-200 hover:bg-slate-300">
      <button
        onClick={handleClick}
        className="flex items-center justify-center"
      >
        <span className="h-6 w-6 pt-1 text-slate-500 duration-200">{icon}</span>
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
