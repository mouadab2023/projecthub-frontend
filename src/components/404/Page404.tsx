import React from "react";
import {useNavigate} from "react-router-dom";

const Page404 = () => {

    const navigate = useNavigate();

    return (
        <div className="
  min-h-screen flex items-center justify-center px-4 transition-colors
  bg-gradient-to-br from-gray-100 via-white to-gray-200
  dark:from-[#020617] dark:via-[#020617] dark:to-black
">

            {/* Glow */}
            <div
                className="absolute w-[500px] h-[500px] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-[140px] animate-pulse"></div>
            <div
                className="absolute w-[400px] h-[400px] bg-blue-400/30 dark:bg-blue-500/20 rounded-full blur-[140px] animate-pulse delay-200"></div>

            {/* Card */}
            <div className="
    relative z-10 backdrop-blur-xl rounded-2xl p-12 text-center shadow-2xl
    bg-white/70 dark:bg-white/5
    border border-gray-200 dark:border-white/10
    max-w-lg w-full
  ">

                {/* Big 404 */}
                <h1 className="
      text-8xl font-extrabold mb-4
      bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
      dark:from-blue-400 dark:via-purple-400 dark:to-pink-400
      bg-clip-text text-transparent
    ">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Page not found
                </h2>

                {/* Text */}
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Oops… the page you are looking for doesn’t exist or has been moved.
                </p>

                {/* Actions */}
                <div className="flex justify-center space-x-4">

                    <button
                        onClick={() => {
                            navigate("/")
                        }}
                        className="
                      px-6 py-3 rounded-lg font-semibold text-white
                      bg-gradient-to-r from-blue-500 to-purple-600
                      hover:opacity-90 active:scale-[0.97]
                      transition-all duration-200
                    "
                    >
                        Go Home
                    </button>

                    <button
                        onClick={() => {
                            navigate(-1)
                        }}
                        className="
          px-6 py-3 rounded-lg font-semibold
          text-gray-700 dark:text-gray-200
          bg-gray-200 dark:bg-gray-700
          hover:bg-gray-300 dark:hover:bg-gray-600
          active:scale-[0.97]
          transition-all duration-200
        "
                    >
                        Back
                    </button>

                </div>

            </div>

        </div>
    )
}
export default Page404