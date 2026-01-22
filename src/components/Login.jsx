import React from "react";
const Login = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">

            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">

                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    Welcome Back 👋
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                    Sign in to continue to ProjectHub
                </p>

                <form className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white transition"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600"/>
                            <span>Remember me</span>
                        </label>

                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-200"
                    >
                        Sign In
                    </button>

                </form>

                <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don’t have an account?
                    <a  className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        Sign up
                    </a>
                </p>

            </div>

        </div>

    )
}
export default Login;