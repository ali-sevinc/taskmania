import { Link } from "react-router-dom";

import landingLogo from "../../assets/images/landing.svg";

export default function Landing() {
  return (
    <>
      <div className="z-0 mx-auto mt-12 flex w-3/4 flex-col items-center gap-12 text-center text-slate-100 lg:w-1/2">
        <h2 className="text-5xl ">Organize your tasks and works.</h2>
        <p className="text-xl">
          Become focused and organized with Taskmania. The worlds top to-do list
          app
        </p>
        <Link
          to="signup"
          className="rounded-md bg-slate-100 px-4 py-2 font-semibold text-slate-800 duration-200 hover:bg-slate-300"
        >
          Start for free
        </Link>
      </div>
      <img src={landingLogo} className="relative -z-10 mx-auto mt-4 lg:mt-24" />
    </>
  );
}
