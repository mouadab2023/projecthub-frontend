import type {ProjectBoard} from "../../types/project";
import {arrayMove} from "@dnd-kit/sortable";
import type {ColumnDetails} from "../../types/column";

export const handleSortColumns = (board:ProjectBoard|null,event:any)=>{
    if (!board) return board
    const {active, over} = event;
    if (!over) return board
    if (active.id === over.id) return board;
    const initialIndex = board.columns.findIndex(column => column.id === parseInt(active.id.split("-")[1], 10));
    const newIndex = board.columns.findIndex(column => column.id === parseInt(over.id.split("-")[1], 10));
    const newOrderColumns = arrayMove(board.columns, initialIndex, newIndex);
    const updatedBoard = {
        ...board,
        columns: newOrderColumns
    }
    return updatedBoard as ProjectBoard;
}
export const handleSortTasks = (board:ProjectBoard|null,event:any)=>{
    if (!board) return board
    const {active, over} = event;
    if (!over) return board
    const sourceColumnIndex = getColumnIndexByTaskId(board, parseInt(active.id.split("-")[1], 10))
    let destinationColumnIndex;
    if(over?.data.current?.type==="item"){
        let taskId=parseInt(over.id.split("-")[1], 10);
        destinationColumnIndex = getColumnIndexByTaskId(board,taskId)
    }
    if(over?.data.current?.type==="column"){
        let columnId =parseInt(over.id.split("-")[1], 10);
        destinationColumnIndex = board.columns.findIndex(column => column.id === columnId);
    }
    if (sourceColumnIndex===undefined || destinationColumnIndex===undefined) return board
    if (sourceColumnIndex === -1 || destinationColumnIndex === -1) return board
    let newColumns:ColumnDetails[];
    if (sourceColumnIndex === destinationColumnIndex) {
        const sourceColumn = board.columns[sourceColumnIndex]
        if (sourceColumn===undefined) return board
        const sourceTaskIndex =sourceColumn.tasks.findIndex(task => task.id === parseInt(active.id.split("-")[1], 10));
        const destinationTaskIndex = sourceColumn.tasks.findIndex(task => task.id === parseInt(over.id.split("-")[1], 10));
        if (sourceTaskIndex === -1 || destinationTaskIndex === -1) return board
        newColumns= shiftTasks([...board.columns],sourceColumnIndex,sourceTaskIndex,destinationTaskIndex);
    }else{
        newColumns= moveTaskBetweenColumn(active,over,[...board.columns],sourceColumnIndex,destinationColumnIndex);
    }
    return newColumns?{...board, columns: newColumns}:board;
}
const moveTaskBetweenColumn= (active:any ,over:any,columns:ColumnDetails[],sourceColumnIndex:number,destinationColumnIndex:number):ColumnDetails[] =>{
    if (sourceColumnIndex === destinationColumnIndex) return columns;
    const sourceColumn = columns[sourceColumnIndex];
    const destinationColumn =columns[destinationColumnIndex];
    if (sourceColumn===undefined || destinationColumn===undefined) return columns;
    const taskId= parseInt(active.id.split("-")[1], 10);
    const sourceTaskIndex = sourceColumn.tasks.findIndex(task => task.id ===taskId);
    if (sourceTaskIndex === -1) return columns
    const taskToMove = sourceColumn.tasks[sourceTaskIndex];
    if (!taskToMove) return columns
    const newSourceTasks = sourceColumn.tasks.filter(
        (_, index) => index !== sourceTaskIndex
    )
    let newDestinationTasks = [...destinationColumn.tasks]
    let updatedColumns:ColumnDetails[];
    if (over?.data.current?.type === "item") {
        console.log(over?.data)
        const overTaskId = parseInt(over.id.split("-")[1], 10);
        const destinationTaskIndex = destinationColumn.tasks.findIndex(task => task.id === overTaskId);
        const isBelow = active.rect.current.translated.top > over.rect.top + over.rect.height / 2;
        let insertIndex = isBelow ? destinationTaskIndex + 1 : destinationTaskIndex;
        newDestinationTasks.splice(insertIndex, 0, taskToMove)
    }
    if (over?.data.current?.type === "column") {
        newDestinationTasks.push(taskToMove);
    }
    updatedColumns = columns.map((column, index) => {
        if (index === sourceColumnIndex) {
            return {...column, tasks: newSourceTasks};
        }
        if (index === destinationColumnIndex) {
            return {...column, tasks: newDestinationTasks};
        }
        return column;
    });
    return updatedColumns as ColumnDetails[];
}
const shiftTasks=(columns:ColumnDetails[],columnIndex:number,sourceTaskIndex:number,destinationTaskIndex:number):ColumnDetails[] =>{
    if(sourceTaskIndex===undefined || destinationTaskIndex===undefined) return columns;
    if(sourceTaskIndex === destinationTaskIndex) return columns;
    if(sourceTaskIndex === -1 || destinationTaskIndex===-1) return columns;
    const columnsTasks = columns[columnIndex]?.tasks;
    if(!columnsTasks) return columns;
    const newTasksOrder = arrayMove(columnsTasks,sourceTaskIndex,destinationTaskIndex);
    return [
        ...columns.slice(0, columnIndex),
        {...columns[columnIndex], tasks: newTasksOrder},
        ...columns.slice((columnIndex) + 1),
    ] as ColumnDetails[];
}
const getColumnIndexByTaskId = (board: ProjectBoard, taskId: number): number => {
    return board.columns.findIndex((column) =>
        (column.tasks || []).some((task) => task.id === taskId)
    );
};



