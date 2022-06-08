import React, { useContext } from "react";
import { Context } from "../context/Context";

export const Login = () => {
  const { input, setInput, functions, error, setError } = useContext(Context);
  const { functionLogin } = functions;

  const handleChange = (event) => {
    let itemChange = event.target;
    let { name, value } = itemChange;
    setInput({ ...input, [name]: value });
  };
  const handleLogin = (event) => {
    event.preventDefault();
    if (!input.username) {
      return setError({
        username: "Cannot be empty !",
      });
    }
    if (!input.password) {
      return setError({
        password: "Cannot be empty !",
      });
    }
    if (input.password.length < 5) {
      return setError({
        password: "Password must be more than 5 !",
      });
    }
    functionLogin();
  };
  return (
    <>
      <section className="pt-36 pb-32">
        <div className="container">
          <div className="w-full px-4">
            <div className="max-w-xl mx-auto text-center mb-16">
              <h2 className="font-bold text-dark text-3xl mb-4 sm:text-4xl lg:text-2xl">
                Login Page
              </h2>
            </div>
          </div>
          <form method="post" onSubmit={handleLogin}>
            <div className="w-80 lg:w-2/3 lg:mx-auto grid justify-items-center">
              <div className="w-80 px-4 mb-8 ">
                <p className="text-rose-600 italic text-center">
                  {" "}
                  {error.username}
                </p>
                <input
                  type="username"
                  id="username"
                  name="username"
                  value={input.username}
                  onChange={handleChange}
                  className="w-80 bg-slate-200 text-dark p-3 rounded-full focus:outline-sky-500 focus:ring-skay-500 focus:ring-1 focus:border-skay-500 text-center"
                  placeholder="Username"
                />
              </div>
              <div className="w-80 px-4 mb-8">
                <p className="text-rose-600 italic text-center">
                  {" "}
                  {error.password}
                </p>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  // maxLength="8"
                  minLength="1"
                  className="w-80 bg-slate-200 text-dark p-3 rounded-full focus:outline-sky-500 focus:ring-skay-500 focus:ring-1 focus:border-skay-500 text-center"
                  placeholder="Password"
                />
              </div>
              <div className="w-80 px-4 ml-9">
                <button className="text-base font-semibold text-white bg-blue-400 py-3 px-8 rounded-full w-full hover:opacity-80 hover:shadow-lg transition duration-500 text-center">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
