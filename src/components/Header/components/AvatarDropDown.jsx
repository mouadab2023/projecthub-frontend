import { useEffect, useRef, useState } from "react";
import { User, Settings, LogOut } from "lucide-react";
import Avatar from "./Avatar";
import useAuth from "../../../hooks/auth/useAuth";
import useLogout from "../../../hooks/auth/useLogout";

export default function AvatarDropdown() {
    const {user} = useAuth();
    const {logout} = useLogout();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative inline-block">

            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full ring-2 ring-transparent transition focus:outline-none"
            >
                <Avatar avatarUrl={user?.avatarUrl} username={user?.firstName}  />
                <span className="hidden md:block min-w-[120px]">
                      {user ? (
                          <span className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                          {user.firstName} {user.lastName}
                        </span>
                      ) : (
                          <span className="block h-4 w-24 rounded bg-gray-300/60 dark:bg-gray-600/60 animate-pulse" />
                      )}
                </span>

            </button>

            <div
                className={`
    absolute left-1/2 -translate-x-1/2 mt-4 w-56
    rounded-2xl p-2 z-50
    shadow-2xl backdrop-blur-xl
    bg-gradient-to-br from-white/80 via-white/60 to-white/50
    dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/50
    border border-gray-200/30 dark:border-white/20
    text-gray-800 dark:text-gray-100
    transition-all duration-200 ease-out transform
    ${open
                    ? "opacity-100 scale-100 translate-y-0"
                    : "pointer-events-none opacity-0 scale-95 -translate-y-2"
                }
  `}
            >
                <DropdownItem icon={User}>Profile</DropdownItem>
                <DropdownItem icon={Settings}>Settings</DropdownItem>
                <Divider />
                <DropdownItem icon={LogOut} danger onClick={() => logout()}>
                    Logout
                </DropdownItem>
            </div>
        </div>
    );
}
function DropdownItem({ icon: Icon, children, danger, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`
        w-full flex items-center gap-3 px-4 py-2 rounded-xl
        text-sm font-medium text-left
        transition-all duration-150
        ${danger
                ? "text-red-500 hover:bg-red-500/20"
                : "hover:bg-gradient-to-r hover:from-purple-200/20 hover:via-pink-200/20 hover:to-blue-200/20 dark:hover:from-purple-700/20 dark:hover:via-pink-700/20 dark:hover:to-blue-700/20"}
        hover:scale-105
      `}
        >
            <Icon size={16} className="opacity-90" />
            {children}
        </button>
    );
}
function Divider() {
    return <div className="my-1 h-px bg-gray-200/30 dark:bg-white/20" />;
}
