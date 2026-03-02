import type { Task as TaskType } from "../../types/task";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from "@dnd-kit/utilities";
import ShowTaskModal from "./ShowTaskModal";
import {useState} from "react";

interface Props {
    projectId?: number;
    columnId?: number;
    task: TaskType;
    removeTask?:(columnId:number,taskId:number) => void
}
const Task = ({projectId,columnId,task,removeTask }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const isOverlay = !removeTask || projectId===undefined || columnId===undefined;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: 'task-' + task.id,
        data: {
            type: 'item',
            task,
            columnId
        }
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
        rounded-xl h-[72px]
        border-2 border-dashed
        border-indigo-300 dark:border-indigo-500/40
        bg-indigo-50/50 dark:bg-indigo-900/10
        transition-all duration-150
      "
            />
        );
    }

    return (
        <>
        <div
            onClick={() => setIsOpen(true)}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="
      group
      rounded-xl p-3
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      shadow-sm
      hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600
      hover:-translate-y-px
      cursor-grab active:cursor-grabbing
      transition-all duration-150 ease-out
    "
        >
            <h3 className="
      text-sm font-medium mb-1 truncate
      text-gray-800 dark:text-gray-100
    ">
                {task.title}
            </h3>
            <p className="
      text-xs leading-relaxed line-clamp-2
      text-gray-400 dark:text-gray-400
    ">
                {task.description}
            </p>
        </div>
            {
               !isOverlay  &&  <ShowTaskModal projectId={projectId} columnId={columnId} taskId={task.id} isOpen={isOpen} onClose={()=>setIsOpen(false)} removeTask={removeTask} />
            }
        </>
    );
}
export default Task;
