import {createPortal} from "react-dom";
import type {TaskDetails} from "../../types/task";
import {useEffect, useState} from "react";
import boardService from "../../services/boardService";
import toast from "react-hot-toast";
import {priorityConfig} from "./CreateTaskModal";
import ItemsList from "./ItemsList";
import Item from "../../types/item";

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
    const [items,setItems]=useState<Item[]>([]);
    const [itemsSnapshot,setItemsSnapshot]=useState<Item[]>([]);


    useEffect(()=>{
        const fetchTaskDetails=async ()=>{
            if (!isOpen) return;
            try {
                const res= await boardService.getTaskDetails(projectId,columnId,taskId);
                setTaskDetails(res.data);
                setItems(res.data.items);
            }catch (err){
                toast.error("Could not get task details, try again later");
                console.log(err);
            }
        }
        fetchTaskDetails();
    }
    ,[isOpen])

    const addItem=async (name:string)=>{
        setItemsSnapshot(items);
        const tempId = Date.now();
        const item ={id:tempId,position:items?.length,name:name,isChecked:false};
        setItems(prevState => {
            return [...prevState,item];
        })
        try{
            toast.loading("Loading...");
            const res =await boardService.addItem(projectId,columnId,taskId,item);
            toast.dismiss();
            toast.success("Item added successfully");
            const itemRes=res.data;
            setItems(prevState => prevState.map((item:Item)=>item.id===tempId?itemRes:item))
        }catch(err){
            setItems(itemsSnapshot);
            toast.dismiss();
            toast.error("Could not add item, try again later");
        }
    }
 const setCheckItem=(id:number,checked:boolean)=>{
        const updatedItems=items.map(i=>{
            if (i.id===id) return {...i,isChecked:checked};
            return i;
        });
        setItems(updatedItems);
 }

    if (!isOpen) return null;


    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose} onPointerDown={(e) => e.stopPropagation()}>

            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <div
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                className="
            relative z-10
            w-full max-w-md mx-4
            bg-white dark:bg-gray-900
            rounded-2xl shadow-2xl
            border border-gray-200 dark:border-gray-800
            flex flex-col
            max-h-[85vh]
            overflow-hidden
        "
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {taskDetails?.title ?? "Loading..."}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-150"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                        <div className="flex flex-col gap-4 px-5 py-4 overflow-y-auto flex-1">

                            {/* Priority + Due date */}
                            <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${priorityConfig[taskDetails.priority].class}`}>
                            {taskDetails.priority}
                        </span>
                                <span className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
                            </svg>
                                    {taskDetails.dueDate?.toString()}
                        </span>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            Description
                        </span>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {taskDetails.description}
                                </p>
                            </div>

                            {/* Checklist */}
                            <ItemsList items={items} setItems={setItems}  addItem={addItem} setCheckItem={setCheckItem} />

                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-800">
                            <button
                                onClick={() => { removeTask(columnId, taskId); onClose(); }}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-150"
                            >
                                Delete
                            </button>
                            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-150">
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