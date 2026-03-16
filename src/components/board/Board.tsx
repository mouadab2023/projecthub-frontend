import React, { useRef, useState} from 'react';
import type {Task as TaskType} from "../../types/task";
import Task from "./Task";
import type { ColumnDetails} from "../../types/column";
import {SortableContext} from "@dnd-kit/sortable";
import { handleSortTasks} from "../dashboard/utils";
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
import type {Priority} from "../../types/priority";
import useBoard from "../../hooks/useBoard";
import {Navigate, useParams} from "react-router-dom";
import BoardBar from "./BoardBar";
import Loading from "../ui/Loading";
import AddColumnButton from "./AddColumnButton";
import MembersBar from "./MembersBar";

export type TaskForm = {
    columnId:number
    title: string;
    description: string;
    dueDate: string;
    priority: Priority;
};

 const Board=()=> {
     const { id } = useParams();
     const projectId = parseInt(id ?? "");
     const [isMemberBarOpen,setMemberBarOpen]=useState(false);
     const {board,setBoard,addColumn,removeColumn,addTask,removeTask,moveColumn,moveTask,setBoardSnapshot,editColumn}=useBoard(projectId);
     const [activeColumn, setActiveColumn] = useState<ColumnDetails | null>(null);
     const [activeTask, setActiveTask] = useState<TaskType | null>(null);
     const [activeTaskColumnId, setActiveTaskColumnId] = useState<number | null>(null);
     const dragOverTimeout = useRef<number | null>(null);
     const sensors = useSensors(
         useSensor(PointerSensor, {
            activationConstraint: {distance: 3}
         }));

     if (isNaN(projectId)) {
         return <Navigate to="/404" replace />;
     }
    if (!board) return <Loading/>;

    function onDragStart(e: DragStartEvent) {
        if (e.active.data.current?.type === "column") {
            setActiveColumn(e.active.data.current?.column);
            setBoardSnapshot(board);
            return;
        }
        if (e.active.data.current?.type === "task") {
            setActiveTask(e.active.data.current?.task);
            setActiveTaskColumnId(e.active.data.current?.columnId);
            setBoardSnapshot(board);
            return;
        }
    }
    function onDragOver(e: DragOverEvent) {
        const isActiveTask = e.active.data.current?.type === "task";
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
        const isActiveTask = e.active.data.current?.type === "task";

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
    return (
        <>
            <BoardBar projectName={board.name} open={isMemberBarOpen} setOpen={setMemberBarOpen} />
            <MembersBar members={board.members} open={isMemberBarOpen} setOpen={setMemberBarOpen} />
            <DndContext sensors={sensors} onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
            <div className="flex gap-5 items-start h-full overflow-x-auto pb-6 px-6 pt-12">
                <SortableContext items={board?.columns.map(c => "column-" + c.id) ?? []}>
                    {board?.columns?.map((column) => (
                        <div key={"column-" + column.id} className="shrink-0 w-[300px] h-full">
                            <Column projectId={projectId} column={column}  removeColumn={removeColumn} addTask={addTask} removeTask={removeTask} editColumn={editColumn}/>
                        </div>
                    ))}
                    <AddColumnButton addColumn={addColumn}/>
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

        </>
    );
}
export default Board;