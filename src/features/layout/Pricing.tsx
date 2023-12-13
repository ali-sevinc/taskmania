import { Link } from "react-router-dom";
import creditCart from "../../assets/images/credit_card_payments.svg";
export default function Pricing() {
  return (
    <div className="mx-auto mt-36 flex w-3/4 max-w-4xl flex-col items-center justify-center gap-8 lg:mt-56 lg:flex-row lg:gap-0">
      <div className="flex flex-col gap-6">
        <h2 className="order-2 text-3xl font-semibold text-slate-100 lg:order-1">
          Premium Taskmania Only $5.99.
        </h2>
        <p className="order-3 text-xl text-slate-100 lg:order-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
          exercitationem maiores laudantium corporis perspiciatis illo aperiam
          accusamus nisi eveniet, nulla, deserunt neque velit adipisci possimus,
          eaque molestiae vel omnis minima?
        </p>
        <div className="order-1 text-center lg:order-3 lg:text-start">
          <Link
            to="/signup"
            className="rounded-md bg-slate-100 px-4 py-2 font-semibold text-slate-800 duration-200 hover:bg-slate-300"
          >
            Start for free
          </Link>
        </div>
      </div>

      <img className="w-96" src={creditCart} />
    </div>
  );
}
