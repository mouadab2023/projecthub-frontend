import React, {useState} from "react";
import type {Task as TaskType} from "../../../types/task";
import Task from "../task/Task"
import type {Column as ColumnType, ColumnDetails} from "../../../types/column";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import CreateTaskModal from "../task/CreateTaskModal";
import type {TaskForm} from "../Board";

type Props = {
    projectId?:number,
    column: ColumnDetails
    addTask?: (task: TaskForm) => void
    removeColumn?: (column: ColumnDetails | ColumnType) => void
    removeTask?: (columnId:number,taskId:number) => void
    editColumn?: (id: number,name:string) => void
}
const Column = ({projectId,column,addTask,removeColumn,removeTask,editColumn}: Props) => {
    const [isEditing, setEditing] = useState<boolean>(false);
    const [columnName, setColumnName] = useState(column.name);
    const [isModalOpen, setModalOpen] = useState(false);
    const isOverlay = projectId===undefined || !removeTask || !removeColumn || !addTask || !editColumn;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: 'column-' + column.id,
        data: {
            type: 'column',
            column
        }
    });
    const style = {
        transform: CSS.Transform.toString({
            x: transform?.x ?? 0,
            y: transform?.y ?? 0,
            scaleX: 1,
            scaleY: 1,
        }),
        transition,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
        w-full h-full min-h-[200px] rounded-2xl
        border-2 border-dashed
        border-indigo-300 dark:border-indigo-500/50
        bg-indigo-50/60 dark:bg-indigo-900/10
        transition-all duration-200
      "
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="
                      w-full h-full flex flex-col rounded-2xl
                      bg-gray-50 dark:bg-gray-900
                      border border-gray-200 dark:border-gray-800
                      shadow-sm dark:shadow-none
                      ring-1 ring-black/[0.04] dark:ring-white/[0.04]
                      overflow-hidden
                      transition-all duration-200
                      cursor-grab active:cursor-grabbing
                      group
                    "
        >
            {/* Header */}
            <div className="
                              flex items-center justify-between
                              px-4 py-3
                              border-b border-gray-200 dark:border-gray-800
                              bg-white dark:bg-gray-900
                            "
            >
                <div className="flex items-center gap-2 min-w-0">
                    <span className="shrink-0 w-2 h-2 rounded-full bg-indigo-400 dark:bg-indigo-500"/>
                    {
                        isEditing?(
                            <input
                            defaultValue={column.name}
                            onBlur={() => {
                                if (editColumn && columnName!==column.name && columnName.trim()!== "")
                                    editColumn(column.id, columnName);
                                setEditing(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter"){
                                    if (editColumn && columnName !== column.name && columnName.trim() !== "") {
                                        editColumn(column.id, columnName);
                                    }
                                    setEditing(false);
                                }
                                if (e.key === "Escape") setEditing(false);
                            }}
                            onChange={(e) => {
                                setColumnName(e.target.value);
                            }}
                            autoFocus
                            className="
                            text-sm font-semibold tracking-tight
                            text-gray-700 dark:text-gray-100
                            bg-transparent
                            border-b border-indigo-400 dark:border-indigo-500
                            outline-none
                            w-full
                            pb-0.5
                            "
                        />):(
                            <h2 onDoubleClick={()=>setEditing(true)} className="text-sm font-semibold tracking-tight truncate text-gray-700 dark:text-gray-100">
                                {column?.name || "Untitled"}
                            </h2>
                        )
                    }
                    <span className="shrink-0 text-xs text-gray-300 dark:text-gray-600 font-normal">
                        / {column?.tasks?.length ?? 0}
                    </span>
                </div>
                <button className="
                                    shrink-0 ml-2 p-1 rounded-lg
                                    text-gray-300 dark:text-gray-600
                                    hover:text-red-400 dark:hover:text-red-400
                                    hover:bg-red-50 dark:hover:bg-red-900/20
                                    transition-all duration-150
                                    opacity-0 group-hover:opacity-100
                                  "
                        onClick={() => removeColumn?.(column)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
                    </svg>
                </button>
            </div>

            {/* Task list */}
            <div className="
                              flex flex-col gap-2 p-3
                              flex-1 overflow-y-auto
                              min-h-[80px]
                              scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700
                            "
            >
                <SortableContext items={column.tasks.map(t => "task-" + t.id)}>
                    {column?.tasks?.map((task: TaskType) => (
                            <Task projectId={projectId} columnId ={column.id} key={task.id} task={task} removeTask={removeTask}/>
                    ))}
                </SortableContext>
            </div>

            {/* Footer */}
            <div className="px-3 pb-3 pt-1">
                <button onClick={() => setModalOpen(true)} className="
                                    w-full text-left text-sm font-medium
                                    text-gray-400 dark:text-gray-500
                                    hover:text-gray-700 dark:hover:text-gray-200
                                    hover:bg-gray-100 dark:hover:bg-gray-800
                                    rounded-lg px-3 py-2
                                    transition-all duration-150
                                  "
                >
                    + Add a task
                </button>
                {
                    !isOverlay &&   <CreateTaskModal
                        columnId={column.id}
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        onSubmit={(taskForm) => {
                            addTask?.(taskForm);
                        }}
                    />
                }
            </div>
        </div>
    );

}
export default Column;