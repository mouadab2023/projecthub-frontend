import axiosInstance from "./api";
import type {Project, ProjectBoard} from "../types/project";
import type {Column, ColumnDetails} from "../types/column";
import type {Task, TaskDetails} from "../types/task";
import type {Item} from "../types/item";
const  boardService = {
        getAllProjects:()=>axiosInstance.get<Project[]>(`/projects`),

        addProject:(name:string) => axiosInstance.post<Project>(`/projects`,{name:name}),
        removeProject:(projectId:number)=>axiosInstance.delete(`/projects/${projectId}`),

        getBoard:(projectId:number)=>axiosInstance.get<ProjectBoard>(`/projects/${projectId}/board`),

        addColumn:(projectId:number,column:ColumnDetails|Column)=>axiosInstance.post<Column>(`/projects/${projectId}/columns`,{name:column.name}),
        removeColumn:(projectId:number,column:ColumnDetails|Column)=>axiosInstance.delete(`/projects/${projectId}/columns/${column.id}`),
        changeColumnPosition:(projectId:number,columnId:number,newPosition:number)=> axiosInstance.patch(`/projects/${projectId}/columns/${columnId}/position`,{newPosition:newPosition}),
        editColumn:(projectId:number,columnId:number,column:ColumnDetails|Column)=>axiosInstance.put(`/projects/${projectId}/columns/${columnId}`,column as Column),

        addTask:(projectId:number,columnId:number,task:Task)=>axiosInstance.post<Task>(`/projects/${projectId}/columns/${columnId}/tasks`,task),
        removeTask:(projectId:number,columnId:number,taskId:number)=>axiosInstance.delete(`/projects/${projectId}/columns/${columnId}/tasks/${taskId}`),
        moveTask:(projectId:number,columnId:number,taskId:number,moveTaskDto:any)=>axiosInstance.patch<Task>(`/projects/${projectId}/columns/${columnId}/tasks/${taskId}/move`,moveTaskDto),
        getTaskDetails:(projectId:number,columnId:number,taskId:number)=>axiosInstance.get<TaskDetails>(`/projects/${projectId}/columns/${columnId}/tasks/${taskId}`),

        addItem:(projectId:number,columnId:number,taskId:number,item:Item)=>axiosInstance.post<Item>(`/projects/${projectId}/columns/${columnId}/tasks/${taskId}/items`,item),

}
export default boardService;