import React from "react";
import {Link} from "react-router-dom";
import AvatarDropDown from "./components/AvatarDropDown";
import useAuth from "../../hooks/auth/useAuth";

const Header = () => {
    const { user,initialLoading } = useAuth()
    return (
        <header
            className="
    sticky top-0 z-50
    backdrop-blur-xl
    bg-white/95 dark:bg-gray-900/95
    border-b border-gray-200/30 dark:border-white/20
    shadow-xl shadow-black/5 dark:shadow-white/10
  "
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-3 items-center h-16">

                    {/* LEFT — Logo */}
                    <div className="flex items-center space-x-2 cursor-pointer group">
                        <div
                            className="
            w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500
            flex items-center justify-center text-white font-bold shadow-lg
            group-hover:scale-105 transition-transform duration-300
          "
                        >
                            P
                        </div>
                        <h1
                            className="
            text-xl font-extrabold tracking-wide
            bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
            dark:from-blue-400 dark:via-purple-400 dark:to-pink-400
            bg-clip-text text-transparent
          "
                        >
                            ProjectHub
                        </h1>
                    </div>

                    {/* CENTER — Navigation (toujours centrée) */}
                    <nav className="hidden md:flex justify-center space-x-12">
                        {["Dashboard", "Projects", "Profile"].map((item) => (
                            <a
                                key={item}
                                className="
              relative text-sm font-medium cursor-pointer
              text-gray-700 dark:text-gray-200
              hover:text-blue-600 dark:hover:text-pink-400
              transition-all duration-300 hover:scale-105
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
              after:bg-gradient-to-r after:from-blue-500 after:to-pink-500
              after:transition-all after:duration-300 hover:after:w-full
            "
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    <div className="flex justify-end min-w-[180px]">
                        {!initialLoading && <div className="flex items-center space-x-4">
                            {(!user) ? (
                                <Link to="/login">
                                    <button
                                        className="
                  relative px-4 py-2 rounded-full text-sm font-semibold
                  text-white
                  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                  shadow-md
                  hover:scale-105 transition-transform duration-300
                  focus:outline-none
                  flex items-center justify-center
                "
                                    >
                <span
                    className="absolute inset-0 rounded-full blur-md opacity-50
                    bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                ></span>
                                        <span className="relative">Login</span>
                                    </button>
                                </Link>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <AvatarDropDown size="w-11 h-11" />
                                </div>
                            )}
                        </div>
                        }
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;
