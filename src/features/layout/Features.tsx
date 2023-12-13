import mainImage from "../../assets/images/into_the-night.svg";
import natureImage from "../../assets/images/nature.svg";

export default function Features() {
  return (
    <div className="mt-12">
      <div className=" relative z-0 mx-auto mt-12 flex w-3/4 flex-col items-center gap-12 text-center text-slate-100 lg:w-1/2">
        <h2 className="text-3xl md:text-5xl ">Don't be overwhelmed.</h2>
        <p className="p-4 text-xl sm:absolute sm:right-0 sm:top-[12rem] sm:w-80 sm:rounded-md sm:bg-slate-100 sm:text-slate-900">
          Taskmania gives you the confidence that everything's organized and
          accounted for, so you can make progress on the things that are
          important to you.
        </p>
      </div>
      <img src={mainImage} className="-z-10 mx-auto my-12" />
      <div className="mx-auto grid w-3/4 grid-cols-1 items-center  gap-1 lg:grid-cols-2">
        <img src={natureImage} className="order-2 mx-auto lg:order-1" />
        <div className="order-1 text-center text-slate-100">
          <h2 className="pb-8 text-3xl md:text-5xl">
            Start each day feeling calm and in control
          </h2>
          <p className="text-xl">
            Get a clear overview of everything on your plate and never lose
            track of an important task.
          </p>
        </div>
      </div>
    </div>
  );
}
