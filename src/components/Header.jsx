import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Header = () => {
    const { isDark, setIsDark } = useContext(ThemeContext);

    return (
        <header
            className="
        sticky top-0 z-50 backdrop-blur-xl transition-colors duration-500
        bg-white/70 dark:bg-gray-900/70
        border-b border-gray-200/50 dark:border-white/10
      "
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex items-center space-x-2 cursor-pointer group">
                        <div className="
              w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500
              flex items-center justify-center text-white font-bold shadow-lg
              group-hover:scale-105 transition
            ">
                            P
                        </div>
                        <h1 className="
              text-xl font-extrabold tracking-wide
              bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
              dark:from-blue-400 dark:via-purple-400 dark:to-pink-400
              bg-clip-text text-transparent
            ">
                            ProjectHub
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-12">

                        {["Dashboard", "Projects", "Profile"].map((item) => (
                            <a
                                key={item}
                                className="
                  relative text-sm font-medium cursor-pointer
                  text-gray-700 dark:text-gray-200
                  hover:text-blue-600 dark:hover:text-pink-400
                  transition-colors duration-300
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
                  after:bg-gradient-to-r after:from-blue-500 after:to-pink-500
                  after:transition-all after:duration-300 hover:after:w-full
                "
                            >
                                {item}
                            </a>
                        ))}

                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center space-x-4">

                        {/* Theme toggle */}
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="
                relative w-11 h-11 rounded-full flex items-center justify-center
                transition-all duration-500 hover:scale-110
                bg-gray-200 dark:bg-gray-800
                shadow-inner
              "
                        >
              <span
                  className={`
                  absolute inset-0 rounded-full blur-md opacity-60
                  ${isDark ? "bg-purple-500" : "bg-yellow-400"}
                `}
              ></span>

                            <span className="relative text-lg">
                {isDark ? "🌙" : "☀️"}
              </span>
                        </button>

                        {/* Avatar placeholder */}
                        <div className="
              w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600
              flex items-center justify-center text-white font-semibold shadow-md cursor-pointer
              hover:scale-105 transition
            ">
                            U
                        </div>

                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
