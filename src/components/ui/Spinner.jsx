const Spinner = ({ size = 64 }) => {
    return (
        <div
            className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-white dark:bg-gray-950
        transition-colors duration-300
      "
        >
            <div
                className="relative"
                style={{ width: size, height: size }}
            >
                {/* Glow */}
                <div
                    className="
            absolute inset-0 rounded-full
            bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500
            opacity-20 dark:opacity-30
            blur-xl animate-pulse
          "
                />

                {/* Spinner */}
                <div
                    className="
            relative w-full h-full rounded-full animate-spin
            border-4
            border-gray-200 dark:border-gray-800
            border-t-purple-500 dark:border-t-purple-400
          "
                />
            </div>
        </div>
    );
};

export default Spinner;
