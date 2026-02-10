import React, {type ForwardRefExoticComponent, type ReactNode, type RefAttributes} from "react";
import type {LucideProps} from "lucide-react";

type Props = {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    children: ReactNode;
    danger?:boolean;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void;
}
const DropdownItem=({ icon:Icon, children, danger, onClick }:Props)=> {
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
export default DropdownItem;