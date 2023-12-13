import { ChangeEvent, FormEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "./userSlice";
import { RootState } from "../../store/store";

import SignLogo from "../ui/SignLogo";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type ValueTypes = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type ErrorsType = {
  userName: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
  usedEmail: boolean;
};

export default function Signup() {
  const [inputsValues, setInputsValues] = useState<ValueTypes>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [areInputsInvalid, setAreInputsInvalid] = useState<ErrorsType>({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
    usedEmail: false,
  });

  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputsValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setAreInputsInvalid((prev) => ({
      ...prev,
      [event.target.name]: false,
      usedEmail: false,
    }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const validName = inputsValues.userName.length > 2;
    const validPassword = inputsValues.password.length > 5;
    const validConfirm = inputsValues.password === inputsValues.confirmPassword;
    const validEmail = emailRegex.test(inputsValues.email);

    const usedEmail = users.find((user) => user.email === inputsValues.email);

    if (usedEmail) {
      setAreInputsInvalid((prev) => ({ ...prev, usedEmail: true }));
    }
    if (!validName) {
      setAreInputsInvalid((prev) => ({ ...prev, userName: true }));
    }
    if (!validPassword) {
      setAreInputsInvalid((prev) => ({ ...prev, password: true }));
    }
    if (!validConfirm) {
      setAreInputsInvalid((prev) => ({ ...prev, confirmPassword: true }));
    }
    if (!validEmail) {
      setAreInputsInvalid((prev) => ({ ...prev, email: true }));
    }
    if (
      !validName ||
      !validEmail ||
      !validPassword ||
      !validConfirm ||
      usedEmail
    )
      return;
    const data = {
      userId: crypto.randomUUID(),
      userName: inputsValues.userName,
      email: inputsValues.email,
      password: inputsValues.password,
      isLogin: true,
      isPremium: false,
      list: [],
      customTags: [],
    };
    dispatch(signup(data));
    navigate("/app/projects");
  }

  return (
    <div className="mx-4 mt-20 grid sm:mx-auto sm:w-[25rem] lg:w-[50rem] lg:grid-cols-2 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold text-slate-100">
          Sign Up
        </h2>
        <div className="flex w-full flex-col gap-0">
          <label
            htmlFor="userName"
            className="flex justify-between rounded-t-md border-none border-slate-600 bg-slate-100 px-4 py-1 text-sm sm:py-2  "
          >
            <span>Your name</span>
            {areInputsInvalid.userName && (
              <span className="text-red-500">Name is too short.</span>
            )}
          </label>
          <input
            value={inputsValues.userName}
            onChange={handleChange}
            id="userName"
            type="text"
            name="userName"
            required
            placeholder="Enter your name..."
            className={`rounded-b-md border-x-0 border-b-4 border-t-0  border-slate-600 px-4 py-2 focus:border-b-4 focus:border-b-slate-950 focus:outline-none  sm:text-lg ${
              !areInputsInvalid.userName ? "bg-slate-100" : "bg-red-300"
            }`}
          />
        </div>
        <div className="flex w-full flex-col gap-0">
          <label
            htmlFor="email"
            className="flex justify-between rounded-t-md border-none border-slate-600 bg-slate-100 px-4 py-1 text-sm sm:py-2  "
          >
            <span>Email</span>
            {areInputsInvalid.usedEmail && (
              <span className="text-red-500">This email already used.</span>
            )}
            {areInputsInvalid.email && (
              <span className="text-red-500">Invalid email address.</span>
            )}
          </label>
          <input
            value={inputsValues.email}
            onChange={handleChange}
            id="email"
            type="email"
            name="email"
            required
            placeholder="Enter your Email..."
            className={`rounded-b-md border-x-0 border-b-4 border-t-0  border-slate-600 px-4 py-2 focus:border-b-4 focus:border-b-slate-950 focus:outline-none  sm:text-lg ${
              !areInputsInvalid.email && !areInputsInvalid.usedEmail
                ? "bg-slate-100"
                : "bg-red-300"
            }`}
          />
        </div>
        <div className="flex w-full flex-col gap-0">
          <label
            htmlFor="password"
            className="flex justify-between rounded-t-md border-none border-slate-600 bg-slate-100 px-4 py-1 text-sm sm:py-2  "
          >
            <span>Password</span>
            {areInputsInvalid.password && (
              <span className="text-red-500">password is too short.</span>
            )}
          </label>
          <input
            value={inputsValues.password}
            onChange={handleChange}
            id="password"
            type="password"
            name="password"
            required
            placeholder="Enter your Password..."
            className={`rounded-b-md border-x-0 border-b-4 border-t-0  border-slate-600 px-4 py-2 focus:border-b-4 focus:border-b-slate-950 focus:outline-none  sm:text-lg ${
              !areInputsInvalid.password ? "bg-slate-100" : "bg-red-300"
            }`}
          />
        </div>
        <div className="flex w-full flex-col gap-0">
          <label
            htmlFor="confirmPassword"
            className="flex justify-between rounded-t-md border-none border-slate-600 bg-slate-100 px-4 py-2 text-sm  "
          >
            <span>Confirm password</span>
            {areInputsInvalid.confirmPassword && (
              <span className="text-red-500">Passwords are have to match.</span>
            )}
          </label>
          <input
            value={inputsValues.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm your Password..."
            className={`rounded-b-md border-x-0 border-b-4 border-t-0  border-slate-600 px-4 py-2 focus:border-b-4 focus:border-b-slate-950 focus:outline-none  sm:text-lg ${
              !areInputsInvalid.confirmPassword ? "bg-slate-100" : "bg-red-300"
            }`}
          />
        </div>
        <button className="text-bold rounded-md  bg-slate-100 px-4 py-4 text-lg font-semibold duration-200 hover:bg-slate-300">
          Sign up with email
        </button>
        <p className="text-center text-slate-100">
          Already signed up?
          <Link to="/login" className="ml-1 underline">
            Go to login
          </Link>
        </p>
      </form>
      <SignLogo />
    </div>
  );
}
