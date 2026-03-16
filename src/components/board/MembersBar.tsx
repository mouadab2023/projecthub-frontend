import type {projectMember} from "../../types/projectMember";

const MembersBar=({members,open,setOpen}:{members:projectMember[],open:boolean,setOpen:(open:boolean)=>void},)=>{
    if(!open) return null;
    return(
        <div className="
    fixed right-4 z-20
    w-64
    bg-white/20 dark:bg-gray-900/20
    backdrop-blur-xl
    border border-gray-200/50 dark:border-gray-800/50
    rounded-2xl
    shadow-xl shadow-black/5 dark:shadow-none
    flex flex-col
    overflow-hidden
    top-[135px] bottom-6
">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            Members
        </span>
                <button
                    onClick={() => setOpen(false)}
                    className="
                p-1 rounded-lg
                text-gray-300 dark:text-gray-600
                hover:text-gray-500 dark:hover:text-gray-400
                hover:bg-gray-200/50 dark:hover:bg-gray-800
                transition-all duration-150
            "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            {/* List */}
            <div className="flex flex-col gap-0.5 px-2 flex-1 overflow-y-auto">
                {members.map((member, index) => (
                    <div key={index} className="
                flex items-center gap-3 px-2 py-2.5 rounded-xl
                hover:bg-gray-200/40 dark:hover:bg-gray-800/40
                transition-all duration-150
            ">
                        <div className={`
                    w-7 h-7 rounded-full shrink-0
                    flex items-center justify-center
                    text-[10px] font-bold
                    ${member.role === 'OWNER'
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                        }
                `}>
                            {member.username[0]?.toUpperCase()}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                    <span className={`text-xs font-medium truncate ${member.role === 'OWNER' ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-200'}`}>
                        {member.username}
                    </span>
                            <span className="text-[10px] text-gray-400 dark:text-gray-500 truncate">
                        {member.role === 'OWNER' ? 'Owner' : 'Member'}
                    </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="px-3 py-3">
                <button className="
            w-full flex items-center justify-center gap-1.5
            px-3 py-2 rounded-xl
            text-xs font-medium
            text-gray-400 dark:text-gray-500
            hover:text-indigo-500 dark:hover:text-indigo-400
            hover:bg-gray-200/50 dark:hover:bg-gray-800/50
            transition-all duration-150
        ">
                    <span className="text-sm leading-none">+</span>
                    Invite member
                </button>
            </div>
        </div>
    );
}
export default MembersBar;