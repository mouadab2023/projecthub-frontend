import {useTheme} from "../../hooks/theme/useTheme";

const FloatingThemeSwitch = () => {
    const { isDark, setIsDark } = useTheme();

    return (
        <div className="fixed bottom-16 right-16 z-50">
            <button
                onClick={() => setIsDark(!isDark)}
                className="
          relative w-12 h-12 rounded-full flex items-center justify-center
          transition-all duration-500 hover:scale-110
          bg-gray-200 dark:bg-gray-800
          shadow-lg
        "
            >
                {/* Glow */}
                <span
                    className={`
            absolute inset-0 rounded-full blur-md opacity-60
            ${isDark ? "bg-purple-500" : "bg-yellow-400"}
          `}
                ></span>

                {/* Icône */}
                <span className="relative text-lg">
          {isDark ? "🌙" : "☀️"}
        </span>
            </button>
        </div>
    );
};

export default FloatingThemeSwitch;
