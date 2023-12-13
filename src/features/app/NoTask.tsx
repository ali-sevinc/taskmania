import noTask from "../../assets/images/taking_notes.svg";
import Modal from "../ui/Modal";
import NewTaskButton from "../ui/NewTaskButton";
import NewTask from "./NewTask";
import PremiumTracker from "./PremiumTracker";
export default function NoTask() {
  return (
    <div className=" mt-24 flex w-full flex-col items-center">
      <Modal>
        <Modal.Open openName="new">
          <NewTaskButton />
        </Modal.Open>
        <Modal.Window name="new">
          <NewTask />
        </Modal.Window>
      </Modal>

      <h3 className="py-8 text-xl font-bold text-slate-100">No task found</h3>
      <img src={noTask} className="mx-auto w-96 pb-4" />
      <PremiumTracker />
    </div>
  );
}
