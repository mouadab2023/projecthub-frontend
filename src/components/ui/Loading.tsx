import React from "react";
type Props = {
    message?: string;
}
const Loading = ({message = "Loading ... "}:Props) => {
    return (
        <div className="
          min-h-screen flex items-center justify-center overflow-hidden transition-colors
          bg-gradient-to-br
          from-gray-100 via-white to-gray-200
          dark:from-[#0f172a] dark:via-[#020617] dark:to-black
        ">

            {/* Glow background */}
            <div className="
    absolute w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse
    bg-purple-400/40 dark:bg-purple-600/30
  "></div>

            <div className="
    absolute w-[400px] h-[400px] rounded-full blur-[120px] animate-pulse delay-200
    bg-blue-400/30 dark:bg-blue-500/20
  "></div>

            {/* Glass card */}
            <div className="
    relative z-10 backdrop-blur-xl rounded-2xl px-16 py-12 shadow-2xl flex flex-col items-center
    bg-white/70 border border-gray-200
    dark:bg-white/5 dark:border-white/10
  ">

                {/* Logo / Name */}
                <h1 className="
      text-4xl font-extrabold tracking-wide mb-6
      bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
      dark:from-blue-400 dark:via-purple-400 dark:to-pink-400
      bg-clip-text text-transparent
    ">
                    ProjectHub
                </h1>

                {/* Loader ring */}
                <div className="relative w-20 h-20 mb-6">
                    <div className="
        absolute inset-0 rounded-full border-4
        border-gray-300 dark:border-purple-500/30
      "></div>

                    <div className="
        absolute inset-0 rounded-full border-4 border-l-transparent animate-spin
        border-t-blue-500 border-r-purple-500 border-b-pink-500
        dark:border-t-blue-400 dark:border-r-purple-400 dark:border-b-pink-400
      "></div>
                </div>

                {/* Text */}
                <p className="
      text-sm tracking-wide uppercase animate-pulse
      text-gray-700 dark:text-gray-300
    ">
                    {message}
                </p>

            </div>

        </div>

    )
}
export default Loading