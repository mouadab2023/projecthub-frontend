const BoardBar=({projectName,open,setOpen}:{projectName:string,open:boolean,setOpen:(open:boolean)=>void})=>{
    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            {/* Left */}
            <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {projectName}
        </span>
                <span className="text-gray-300 dark:text-gray-600 text-sm">/</span>
                <span className="text-sm text-gray-400 dark:text-gray-500">
            Board
        </span>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setOpen(true)}
                    className={`
            flex items-center gap-1.5
            px-3 py-1.5 rounded-lg
            text-xs font-medium
            transition-all duration-150
            ${open
                        ? 'opacity-0 pointer-events-none'
                        : 'opacity-100 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
        `}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    Members
                </button>
            </div>
        </div>
    )
}
export default BoardBar;