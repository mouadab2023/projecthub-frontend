import React from "react";
const Button = ({ submitLabel, onClick }) => (
    <button
        onClick={onClick}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-200"
    >
        {submitLabel}
    </button>
)
export default Button;