import type {Task} from "./task";

export type Column = {
    id:number,
    name:string,
    position:number,
}
export type ColumnDetails = Column & {
    tasks:Task[]
}