import {useEffect, useState} from "react";
import type {ProjectBoard} from "../types/project";
import boardService from "../services/boardService";
import type {Column as ColumnType, ColumnDetails} from "../types/column";
import toast from "react-hot-toast";
import type {Task as TaskType} from "../types/task";
import type {TaskForm} from "../components/board/Board";
import type {DragEndEvent} from "@dnd-kit/core";
import {handleSortColumns} from "../components/dashboard/utils";
import {useNavigate} from "react-router-dom";
import item from "../components/board/item/Item";

const useBoard = (projectId:number) => {
    const [board, setBoard] = useState<ProjectBoard | null>(null);
    const [boardSnapshot, setBoardSnapshot] = useState<ProjectBoard | null>(null);
    const navigate =useNavigate()

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const result = await boardService.getBoard(projectId);
                setBoard(result.data);
            } catch (err:any) {
                if(err.status===404){
                    navigate("/404",{ replace: true });
                }
            }
        };
        fetchBoard();
    }, [projectId]);

    const addColumn = async (name: string) => {
        setBoardSnapshot(board);
        const tempId = Date.now();
        let newColumn: ColumnDetails = {
            id: tempId,
            name: name,
            position: (board?.columns[board.columns.length - 1]?.position ?? -1) + 1,
            tasks: []
        };
        setBoard(prevBoard => prevBoard ? {...prevBoard, columns: [...prevBoard.columns, newColumn]} : prevBoard);
        try {
            toast.loading("Loading...");
            const result = await boardService.addColumn(projectId, newColumn);
            toast.dismiss();
            toast.success("Column added successfully");
            const column: ColumnType = result.data;
            setBoard(prevState => {
                if (!prevState) return prevState;
                let updatedCols = prevState?.columns.map(c => {
                    if (c.id === tempId) {
                        return {...c, id: column.id, position: column.position};
                    }
                    return c;
                })?? [];
                return {...prevState, columns: updatedCols};
            });
        } catch (err) {
            setBoard(boardSnapshot);
            toast.dismiss();
            toast.error("Could not add column, try again later");
        }
    };
    const editColumn = async (id:number,name: string) => {
        setBoardSnapshot(board);
        const editedColumn = board?.columns.find(c => c.id === id);
        if (!editedColumn) return;
        const updateColumn={...editedColumn,name: name};
        setBoard(prevState =>{
            if (!prevState) return prevState;
            return {...prevState, columns:  prevState.columns.map(c => c.id === id ? updateColumn : c)};
        });
        toast.loading("Loading...")
        try {
            await boardService.editColumn(projectId,id,updateColumn);
            toast.dismiss();
            toast.success("Column updated successfully");
        }catch(err:any){
            setBoard(boardSnapshot);
            toast.dismiss();
            toast.error("Could not update the column, try again later");
        }
    }
    const removeColumn = async (column: ColumnDetails | ColumnType) => {
        setBoardSnapshot(board);
        setBoard(prevBoard => {
            if (!prevBoard) return prevBoard;
            return {
                ...prevBoard,
                columns: prevBoard.columns.filter(col => col.id !== column.id)
            };
        });
        try {
            toast.loading("Loading...");
            await boardService.removeColumn(projectId, column);
            toast.dismiss();
            toast.success("Column removed successfully");
        } catch (err) {
            setBoard(boardSnapshot);
            toast.dismiss();
            toast.error("Could not remove column, try again later");
        }
    };

    const addTask=async (task:TaskForm)=>{
        setBoardSnapshot(board);
        const tempId = Date.now();
        const columnIndex=board?.columns.findIndex(column=>column.id===task.columnId);
        if (columnIndex ===-1 || columnIndex===undefined) return;
        const {columnId, ...taskData} = task;
        const newTask = {
            id:tempId,
            position: board?.columns[columnIndex]?.tasks.length ?? 0,
            ...taskData,
            dueDate:taskData.dueDate,
        }
        setBoard(prevState => {
            if (!prevState) return prevState;
            return {
                ...prevState,
                columns: prevState.columns.map((col, index) => {
                    if (index === columnIndex) {
                        return { ...col, tasks: [...col.tasks, newTask] };
                    }
                    return col;
                })
            };
        });
        try{
            toast.loading("Loading...");
            const result = await boardService.addTask(projectId,columnId,newTask);
            toast.dismiss();
            toast.success("Task added successfully");
            const task:TaskType = result.data;
            setBoard(prevBoard => {
                if(!prevBoard) return prevBoard;
                return {
                    ...prevBoard,
                    columns: prevBoard.columns.map((col, index) => {
                        if (index === columnIndex) return { ...col, tasks: col.tasks.map((t)=> {
                                    return (t.id===tempId)? task:t
                                }
                            )};
                        return col;
                    })
                };
            })
        }
        catch(err) {
            setBoard(boardSnapshot);
            toast.dismiss();
            toast.error("Could not add task, try again later");
        }
    }
    const removeTask= async (columnId:number,taskId:number)=>{
        setBoardSnapshot(board);
        setBoard(prevState => {
            if (!prevState) return prevState;
            const columnIndex=prevState.columns.findIndex(column=>column.id===columnId);
            if (columnIndex === -1) return prevState;
            const taskIndex= prevState.columns[columnIndex]?.tasks.findIndex(task=>task.id===taskId);
            if (taskIndex === -1 || taskIndex===undefined) return prevState;
            return {
                ...prevState,
                columns: prevState.columns.map((col, index) => {
                    if (index === columnIndex) return { ...col, tasks: col.tasks.filter((_, i) => i !== taskIndex) };
                    return col;
                })
            }
        })
        try {
            toast.loading("Loading...");
            await boardService.removeTask(projectId,columnId,taskId);
            toast.dismiss();
            toast.success("Task removed successfully");
        }catch(err) {
            setBoard(boardSnapshot);
            toast.dismiss();
            toast.error("Could not remove task, try again later");
        }
    }

    const moveColumn = async (e: DragEndEvent, activeColumn: ColumnDetails) => {
        let newPosition = -1;
        let oldPosition = -1;
        setBoard(prevState => {
            oldPosition = prevState?.columns.findIndex(c => c.id === activeColumn.id) ?? -1;
            const updated = handleSortColumns(prevState, e) ?? prevState;
            newPosition = updated?.columns.findIndex(c => c.id === activeColumn.id) ?? -1;
            return updated;
        });

        if (newPosition !== -1 && oldPosition !== -1 && oldPosition !== newPosition) {
            try {
                toast.loading("Loading...");
                await boardService.changeColumnPosition(projectId, activeColumn.id, newPosition);
                toast.dismiss();
                toast.success("Column moved successfully");
            } catch (err) {
                setBoard(boardSnapshot);
                toast.dismiss();
                toast.error("Could not move the column, try again later");
            }
        }
    };
    const moveTask = async (oldColumnId:number|null, activeTask: TaskType) => {
        let column= board?.columns.find(column =>column.tasks.findIndex(task => task.id === activeTask.id)!==-1);
        let taskIndex= column?.tasks.findIndex(task => task.id === activeTask.id);
        if (column !== undefined && taskIndex !== undefined && taskIndex !== -1  && oldColumnId !== null &&
            (oldColumnId !== column.id || taskIndex !== activeTask.position )

        ) {
            try {
                toast.loading("Loading...");
                const res= await boardService.moveTask(projectId,oldColumnId,activeTask.id,{
                    targetColumnId:column.id,
                    newPosition:taskIndex,
                })
                toast.dismiss();
                toast.success("Task moved successfully");
                const task:TaskType = res.data;
                setBoard(prevState => {
                        if (!prevState) return prevState;
                        return {
                            ...prevState,
                            columns: prevState.columns.map((col, index) => {
                                if (index === column?.position) return { ...col, tasks: col.tasks.map((t)=> {
                                            return (t.id===task.id)?task:t
                                        }
                                    )};
                                return col;
                            })
                        }
                    }
                );
            }catch(err) {
                setBoard(boardSnapshot);
                toast.dismiss();
                toast.error("Could not move the task, try again later");
            }
        }
    }
    return {
        board,
        setBoard,
        addColumn,
        removeColumn,
        addTask,
        removeTask,
        moveColumn,
        moveTask,
        setBoardSnapshot,
        editColumn
    }
}
export default useBoard;