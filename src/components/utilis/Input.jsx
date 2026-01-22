import React from "react";

const Input = ({value, name, type, errorMessage, placeholder, onChange}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {name}
        </label>
        <input
            onChange={(e => onChange(e))}
            type={type}
            placeholder={placeholder}
            value={value}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white transition"
        />
        {errorMessage &&
            <p className="text-sm text-red-500 mt-1">
                {errorMessage}
            </p>
        }
    </div>
)
export default Input;