import React, { useRef, useState} from 'react';
import type {Task as TaskType} from "../../types/task";
import Task from "./Task";
import type { ColumnDetails} from "../../types/column";
import {SortableContext} from "@dnd-kit/sortable";
import { handleSortTasks} from "./utils";
import Column from "./Column";
import {
    DndContext,
    type DragEndEvent,
    type DragOverEvent,
    DragOverlay,
    type DragStartEvent,
    useSensor,
    useSensors,
    PointerSensor
} from "@dnd-kit/core";
import {createPortal} from "react-dom";
import Spinner from "../ui/Spinner";
import ColumnButton from "./ColumnButton";
import type {Priority} from "../../types/priority";
import useBoard from "../../hooks/useBoard";

export type TaskForm = {
    columnId:number
    title: string;
    description: string;
    dueDate: string;
    priority: Priority;
};

export function Dashboard({projectId=1}) {
    const {board,setBoard,addColumn,removeColumn,addTask,removeTask,moveColumn,moveTask}=useBoard(projectId);
    const [activeColumn, setActiveColumn] = useState<ColumnDetails | null>(null);
    const [activeTask, setActiveTask] = useState<TaskType | null>();
    const [activeTaskColumnId, setActiveTaskColumnId] = useState<number | null>(null);
    const dragOverTimeout = useRef<number | null>(null);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {distance: 3}
        }));

    if (!board) return <Spinner/>;

    function onDragStart(e: DragStartEvent) {
        if (e.active.data.current?.type === "column") {
            setActiveColumn(e.active.data.current?.column);
            return;
        }
        if (e.active.data.current?.type === "item") {
            setActiveTask(e.active.data.current?.task);
            setActiveTaskColumnId(e.active.data.current?.columnId);
            return;
        }
    }
    function onDragOver(e: DragOverEvent) {
        const isActiveTask = e.active.data.current?.type === "item";
        if (!isActiveTask) return;

        if (dragOverTimeout.current) {
            cancelAnimationFrame(dragOverTimeout.current);
        }

        const active = e.active;
        const over = e.over;

        dragOverTimeout.current = requestAnimationFrame(() => {
            setBoard(prevState => handleSortTasks(prevState, {active, over}) ?? prevState);
        });
    }

    async function onDragEnd(e: DragEndEvent) {

        if (dragOverTimeout.current) {
            cancelAnimationFrame(dragOverTimeout.current);
            dragOverTimeout.current = null;
        }
        const isActiveColumn = e.active.data.current?.type === "column";
        const isActiveTask = e.active.data.current?.type === "item";

        if (isActiveColumn && activeColumn) {
            await moveColumn(e, activeColumn);
        }
        if(isActiveTask && activeTask) {
            await moveTask(activeTaskColumnId,activeTask);
        }
        setActiveColumn(null);
        setActiveTask(null);
        setActiveTaskColumnId(null);
    }

    console.log(board)
    return (
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
            <div className="flex gap-5 items-start h-full overflow-x-auto pb-6 px-6 pt-4">
                <SortableContext items={board?.columns.map(c => "column-" + c.id) ?? []}>
                    {board?.columns?.map((column) => (
                        <div key={"column-" + column.id} className="shrink-0 w-[300px] h-full">
                            <Column projectId={projectId} column={column}  removeColumn={removeColumn} addTask={addTask} removeTask={removeTask}/>
                        </div>
                    ))}
                    <ColumnButton addColumn={addColumn}/>
                </SortableContext>
            </div>
            {createPortal(
                <DragOverlay dropAnimation={{
                    duration: 180,
                    easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
                }}>
                    {activeColumn && (
                        <div className="w-[300px] rotate-[1.5deg] scale-[1.02] opacity-95">
                            <Column column={activeColumn}  />
                        </div>
                    )}
                    {activeTask && (
                        <div className="rotate-[1deg] scale-[1.02] opacity-95 drop-shadow-xl">
                            <Task task={activeTask} />
                        </div>
                    )}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
}