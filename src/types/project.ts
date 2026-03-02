import type {Column, ColumnDetails} from "./column";
import type {projectMember} from "./projectMember";

type Project = {
    id:number,
    name:string,
    creationDate:Date,

}
export type ProjectDetails = Project & {
    columns:Column[]
    members:projectMember[]
}
export type ProjectBoard = Project & {
    columns:ColumnDetails[]
    members:projectMember[]
}