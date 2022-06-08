import jsCookie from "js-cookie";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import "../../assets/css/style.css";

export const Navbar = () => {
  const { toggle, setToggle, offset, setOffset, setTemp } = useContext(Context);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    let header = document.querySelector("header");
    setTemp(header.offsetTop);
    return () => window.removeEventListener("scroll", onScroll);
  }, [setTemp, setOffset]);
  return (
    <>
      <header
        className={
          offset > 0
            ? "bg-transparent navbar-fixed top-0 bg-white left-0 w-full flex items-center z-10"
            : "bg-transparent absolute top-0 bg-white left-0 w-full flex items-center z-10"
        }
      >
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="px-4">
              <Link to="/" className="font-bold text-2xl text-black block py-6">
                Cinta Coding
              </Link>
            </div>
            <div className="flex items-center px-4 text-primary">
              <button
                id="hamburger"
                name="hamburger"
                type="button"
                className={
                  toggle
                    ? "absolute block right-4 lg:hidden"
                    : "absolute block right-4 hamburger-active lg:hidden"
                }
                onClick={handleToggle}
              >
                <span className="hamburgerLine transition duration-300 ease-in-oute origin-top-left fill-current"></span>
                <span className="hamburgerLine transition duration-300 ease-in-oute"></span>
                <span className="hamburgerLine transition duration-300 ease-in-oute origin-bottom-left"></span>
              </button>
              <nav
                id="nav-menu"
                className={
                  toggle
                    ? "hidden absolut lg:block"
                    : "absolute py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none"
                }
              >
                {!jsCookie.get("username") && (
                  <Link
                    to="/login"
                    className="text-base font-semibold text-white bg-blue-400 px-8 py-3 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
                  >
                    Login
                  </Link>
                )}
                {jsCookie.get("username") && (
                  <Link to="#" className="text-2xl font-semibold text-dark">
                    Welcome,{" "}
                    <span className="text-2xl text-blue-400">
                      {jsCookie.get("username")}
                    </span>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
