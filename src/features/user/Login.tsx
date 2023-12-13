import { Link } from "react-router-dom";
import LoginLogo from "../ui/LoginLogo";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./userSlice";
import { RootState } from "../../store/store";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Login() {
  const [inputsValues, setInputsValues] = useState({
    email: "test@test.com",
    password: "test123",
  });
  const [areInputsInvalid, setAreInputsInvalid] = useState({
    email: false,
    password: false,
  });

  const [loginFailed, setLoginFailed] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputsValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setAreInputsInvalid((prev) => ({ ...prev, [event.target.name]: false }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const validPassword = inputsValues.password.length > 5;
    const validEmail = emailRegex.test(inputsValues.email);

    if (!validPassword) {
      setAreInputsInvalid((prev) => ({ ...prev, password: true }));
    }

    if (!validEmail) {
      setAreInputsInvalid((prev) => ({ ...prev, email: true }));
    }
    if (!validEmail || !validPassword) return;
    const data = {
      email: inputsValues.email,
      password: inputsValues.password,
    };
    const isFailed = users.find(
      (user) => user.email === data.email && user.password === data.password,
    );
    if (isFailed) {
      dispatch(login(data));
    } else {
      setLoginFailed(true);
    }
  }

  return (
    <div className="mx-4 mt-20 grid gap-4 sm:mx-auto sm:w-[25rem] lg:w-[50rem] lg:grid-cols-2 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold text-slate-100">
          Log in
        </h2>

        <div className="flex w-full flex-col gap-0">
          <label
            htmlFor="email"
            className="flex justify-between rounded-t-md border-none border-slate-600 bg-slate-100 px-4 py-2 text-sm  "
          >
            <span>Email</span>
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
            className={`rounded-b-md border-x-0 border-b-4 border-t-0  border-slate-600 px-4 py-2 text-lg focus:border-b-4 focus:border-b-slate-950  focus:outline-none ${
              !areInputsInvalid.email ? "bg-slate-100" : "bg-red-300"
            }`}
          />
        </div>
        <div className="flex w-full flex-col gap-0">
          <label
            htmlFor="password"
            className="flex justify-between rounded-t-md border-none border-slate-600 bg-slate-100 px-4 py-2 text-sm  "
          >
            <span>Password</span>
            {areInputsInvalid.email && (
              <span className="text-red-500">Password is too short.</span>
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
            className={`rounded-b-md border-x-0 border-b-4 border-t-0  border-slate-600 px-4 py-2 text-lg focus:border-b-4 focus:border-b-slate-950  focus:outline-none ${
              !areInputsInvalid.password ? "bg-slate-100" : "bg-red-300"
            }`}
          />
        </div>

        <button className="text-bold rounded-md  bg-slate-100 px-4 py-4 text-lg font-semibold duration-200 hover:bg-slate-300">
          Log in
        </button>
        <p className="text-center text-slate-100">
          Don't have an account?
          <Link to="/signup" className="ml-1 underline">
            Go to Sign up
          </Link>
        </p>
        <h3 className="text-center text-red-500">
          {loginFailed && "Invalid email or password"}
        </h3>
      </form>
      <LoginLogo />
    </div>
  );
}
