import React, { useContext } from "react";
import DarkModeContext from "../contextAPI/darkMode/DarkModeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import cs from "classnames";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={cs("flex gap-10", !darkMode ? "" : "bg-white text-gray-900")}
    >
      <nav>
        <ul className="flex gap-8">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>

      <button onClick={() => setDarkMode(!darkMode)}>
        {!darkMode ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default Navbar;
