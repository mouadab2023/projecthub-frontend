import {createPortal} from "react-dom";
import type {TaskDetails} from "../../types/task";
import {useEffect, useState} from "react";
import boardService from "../../services/boardService";
import toast from "react-hot-toast";
import {priorityConfig} from "./CreateTaskModal";

type Props={
    projectId:number,
    columnId:number,
    taskId:number,
    isOpen: boolean,
    onClose: () => void,
    removeTask:(columnId:number,taskId:number) => void
}
const ShowTaskModal=({projectId,columnId,taskId,isOpen,onClose,removeTask}:Props)=>{
    const [taskDetails, setTaskDetails] = useState<TaskDetails>();
    useEffect(()=>{
        const fetchTaskDetails=async ()=>{
            if (!isOpen) return;
            try {
                const res= await boardService.getTaskDetails(projectId,columnId,taskId);
                setTaskDetails(res.data);
            }catch (err){
                toast.error("Could not get task details, try again later");
                console.log(err);
            }
        }
        fetchTaskDetails();
    }
    ,[isOpen])

    if (!isOpen) return null;


    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}
             onPointerDown={(e) => e.stopPropagation()}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                className="
                relative z-10
                w-full max-w-lg mx-4
                bg-white dark:bg-gray-900
                rounded-2xl shadow-2xl
                border border-gray-200 dark:border-gray-800
                flex flex-col
                max-h-[90vh]
                overflow-hidden
            "
            >
                <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                            {taskDetails?.title ?? "Loading..."}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="
                        p-1.5 rounded-lg
                        text-gray-400 dark:text-gray-500
                        hover:text-gray-600 dark:hover:text-gray-300
                        hover:bg-gray-100 dark:hover:bg-gray-800
                        transition-all duration-150
                    "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                {/* Body */}
                {!taskDetails ? (
                    <div className="flex items-center justify-center p-10">
                        <span className="text-sm text-gray-400">Loading...</span>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-5 px-6 py-5 overflow-y-auto">
                            {/* Priority + Due date */}
                            <div className="flex items-center gap-3">
                            <span className={`
                                ${priorityConfig[taskDetails.priority].class}
                                text-xs font-medium px-2.5 py-1 rounded-full
                            `}>
                                {taskDetails.priority}
                            </span>
                                <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
                                </svg>
                                    {taskDetails.dueDate?.toString()}
                            </span>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-2">
                            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                                Description
                            </span>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {taskDetails.description}
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
                            <button className="
                                px-4 py-2 rounded-lg
                                text-sm font-medium
                                text-red-400 dark:text-red-400
                                hover:bg-red-50 dark:hover:bg-red-900/20
                                transition-all duration-150
                            "
                            onClick={()=>{
                                removeTask(columnId,taskId);
                                onClose();
                            }}>
                                Delete
                            </button>
                            <button className="
                            px-4 py-2 rounded-lg
                            text-sm font-medium text-white
                            bg-indigo-500 hover:bg-indigo-600
                            transition-all duration-150
                        ">
                                Edit
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
}
export default ShowTaskModal