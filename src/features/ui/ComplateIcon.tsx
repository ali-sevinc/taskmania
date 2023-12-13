import { HiOutlineCheckCircle, HiOutlineMinusCircle } from "react-icons/hi";
export default function ComplateIcon({ isComplete }: { isComplete: boolean }) {
  return (
    <p className="p-1">
      {isComplete ? (
        <span className="text-2xl text-green-500">
          <HiOutlineCheckCircle />
        </span>
      ) : (
        <span className="text-2xl text-red-500">
          <HiOutlineMinusCircle />
        </span>
      )}
    </p>
  );
}
