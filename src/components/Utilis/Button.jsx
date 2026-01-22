import React from "react";
const Button = ({ submitLabel, onClick ,disabled}) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className={`
        w-full py-3 rounded-lg font-semibold transition-all duration-200
        ${disabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 active:scale-[0.98] cursor-pointer"
            }
      `}
    >
        {submitLabel}
    </button>
)
export default Button;