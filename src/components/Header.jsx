import React, {useContext} from "react";
import {ThemeContext} from "../providers/ThemeProvider";

const Header = () => {
    const {isDark, setIsDark} = useContext(ThemeContext);

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            ProjectHub
                        </h1>
                    </div>

                    {/* Navigation desktop */}
                    <nav className="hidden md:flex space-x-12">
                        <a
                            className="text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-pink-400 transition-colors duration-300 font-medium"
                        >
                            Dashboard
                        </a>
                        <a
                            className="text-gray-800 dark:text-gray-100 hover:text-yellow-500 dark:hover:text-purple-400 transition-colors duration-300 font-medium"
                        >
                            Projects
                        </a>
                        <a
                            className="text-gray-800 dark:text-gray-100 hover:text-green-500 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
                        >
                            Profile
                        </a>
                    </nav>

                    {/* Toggle Dark/Light */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 transform hover:scale-110 ${
                                isDark ? "bg-purple-500 text-yellow-300" : "bg-yellow-300 text-purple-700"
                            }`}
                        >
                            {isDark ? "🌙" : "☀️"}
                        </button>
                    </div>

                </div>
            </div>
        </header>
    );
}
export default Header;