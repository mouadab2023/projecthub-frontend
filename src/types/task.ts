import type {Priority} from "./priority";
import type {Item} from "./item";

export type Task={
    id:number,
    title:string,
    description:string,
    position:number,
    dueDate:string,
    priority:Priority,
}
export type TaskDetails = Task & {
    project:number,
    column:number,
    items:Item[],
    comments:Comment[]
}