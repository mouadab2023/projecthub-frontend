import React, {useState} from "react";
import { Eye, EyeOff } from "lucide-react";
import ErrorMessage from "./ErrorMessage";
type Props={
    value: string;
    name: string;
    type: "text" | "password" | "email";
    errorMessage?: string;
    placeholder: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = ({value, name, type, errorMessage, placeholder, onChange}:Props) => {
    const [isHidden, setIsHidden] = useState(true);
    const isPassword= type === "password"
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {name}
            </label>

            <div className="relative w-full">
                <input
                    type={isPassword && !isHidden ?"text":type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e)}
                    className="w-full px-4 py-2 pr-12 rounded-lg bg-gray-100 dark:bg-gray-700
                 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                 outline-none text-gray-900 dark:text-white transition"
                />

                {isPassword && (
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center
                    text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200
                    h-10 w-10 transition-colors duration-200"
                        onClick={() => setIsHidden(isHidden=>!isHidden)}

                    >
                        { isHidden ?
                            <Eye className="w-5 h-5 block transition-all duration-200"/>
                            :
                            <EyeOff className="w-5 h-5 block transition-all duration-200"/>
                        }
                    </button>)}

            </div>

            <ErrorMessage errorMessage={errorMessage} />

        </div>

    );
}

export default Input;
