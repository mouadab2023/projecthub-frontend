import axiosInstance from "./api";
import type {ProjectBoard} from "../types/project";
import type {Column, ColumnDetails} from "../types/column";
import type {Task, TaskDetails} from "../types/task";
const  boardService = {
        getBoard:(projectId:number)=>axiosInstance.get<ProjectBoard>(`/projects/${projectId}/board`),
        addColumn:(projectId:number,column:ColumnDetails|Column)=>axiosInstance.post<Column>(`/projects/${projectId}/columns`,{name:column.name}),
        removeColumn:(projectId:number,column:ColumnDetails|Column)=>axiosInstance.delete(`/projects/${projectId}/columns/${column.id}`),
        changeColumnPosition:(projectId:number,columnId:number,newPosition:number)=> axiosInstance.patch(`/projects/${projectId}/columns/${columnId}/position`,{newPosition:newPosition}),
        addTask:(projectId:number,columnId:number,task:Task)=>axiosInstance.post<Task>(`/projects/${projectId}/columns/${columnId}/tasks`,task),
        getTaskDetails:(projectId:number,columnId:number,taskId:number)=>axiosInstance.get<TaskDetails>(`/projects/${projectId}/columns/${columnId}/tasks/${taskId}`),
        removeTask:(projectId:number,columnId:number,taskId:number)=>axiosInstance.delete(`/projects/${projectId}/columns/${columnId}/tasks/${taskId}`),
        moveTask:(projectId:number,columnId:number,taskId:number,moveTaskDto:any)=>axiosInstance.patch<Task>(`/projects/${projectId}/columns/${columnId}/tasks/${taskId}/move`,moveTaskDto),
}
export default boardService;