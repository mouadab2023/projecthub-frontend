import { Toaster } from "react-hot-toast";

const AppToaster =()=><Toaster
    position="bottom-center"
    toastOptions={{
        className:
            "px-4 py-3 rounded-xl " +
            "border border-gray-200 dark:border-gray-800 " +
            "bg-white dark:bg-gray-900/95 " +
            "text-gray-900 dark:text-gray-100 " +
            "shadow-lg",
    }}
/>
export default AppToaster;