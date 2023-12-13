import { FormEvent } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { upgratePremium } from "../user/userSlice";

import payOnline from "../../assets/images/pay_online.svg";
import Button from "../ui/Button";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(upgratePremium());
    navigate("/app/projects");
  }

  return (
    <div className="mx-2 mt-12 flex flex-col items-center gap-5 sm:mx-auto sm:w-3/4 ">
      <img className="w-96 " src={payOnline} alt="a credit card" />
      <form
        onSubmit={handleSubmit}
        className="flex h-52 w-full flex-col gap-2 rounded-2xl border-2 border-slate-950 bg-slate-100 p-4 sm:w-96  "
      >
        <div className="flex flex-col">
          <label htmlFor="name">Owner name</label>
          <input id="name" placeholder="Your name.." />
        </div>
        <div className="flex flex-col">
          <label htmlFor="number">Cart number</label>
          <input id="number" placeholder="1234-4567-7890-1112" />
        </div>
        <div className="mt-4 flex items-center justify-between text-end text-slate-100">
          <Button model="secondary" type="button" onClick={() => navigate(-1)}>
            &larr;Back
          </Button>
          <Button type="submit">Pay</Button>
        </div>
      </form>
    </div>
  );
}
