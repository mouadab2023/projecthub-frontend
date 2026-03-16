import type {Column, ColumnDetails} from "./column";
import type {projectMember} from "./projectMember";

export type Project = {
    id:number,
    name:string,
    creationDate:string,

}
export type ProjectDetails = Project & {
    columns:Column[]
    members:projectMember[]
}
export type ProjectBoard = Project & {
    columns:ColumnDetails[]
    members:projectMember[]
}