import type {Item as ItemType} from "../../../types/item";
import {SortableContext} from "@dnd-kit/sortable";
import Item from "./Item";
import React, {useState} from "react";
import {createPortal} from "react-dom";
import {
    DndContext, type DragEndEvent,
    type DragOverEvent,
    DragOverlay,
    type DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {handleSortItems} from "../../dashboard/utils";
import boardService from "../../../services/boardService";

type Props = {
    items:ItemType[],
    addItem:(name:string)=>void,
    setItems:any,
    setCheckItem:(id:number,checked:boolean)=>void,
    setItemsSnapshot:(items:ItemType[]) => void,
    changeItemPosition:(e:DragEndEvent,activeItem:ItemType) => void,
}
const ItemsList=({items,setItems,addItem,setCheckItem,setItemsSnapshot,changeItemPosition}:Props)=>{
    const [isAddingItem,setIsAddingItem]=useState(false);
    const [itemName, setItemName]=useState("");
    const [activeItem, setActiveItem]=useState<ItemType| null>(null);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {distance: 3}
        }));

    function onDragStart(e: DragStartEvent) {
        if (e.active.data.current?.type === "item") {
            setActiveItem(e.active.data.current?.item);
            setItemsSnapshot(items);
            return;
        }
    }
    function onDragOver(e: DragOverEvent) {
        const isActiveItem = e.active.data.current?.type === "item";
        if (!isActiveItem) return;
    }
    async function onDragEnd(e: DragEndEvent) {
        const isActiveItem = e.active.data.current?.type === "item";
        if(isActiveItem && activeItem) {
            await changeItemPosition(e,activeItem);
        }
        setActiveItem(null);
    }
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
            Checklist
        </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
            {items.filter(i => i.isChecked).length}/{items.length}
        </span>
            </div>

            {/* Progress bar */}
            {items.length > 0 && (
                <div className="w-full h-1 rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                        className="h-1 rounded-full bg-indigo-500 transition-all duration-300"
                        style={{ width: `${(items.filter(i => i.isChecked).length / items.length) * 100}%` }}
                    />
                </div>
            )}

            <DndContext sensors={sensors} onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
            <ul className="flex flex-col gap-0.5 mt-1">
                <SortableContext items={items.map(i => "item-" + i.id)}>
                    {items.map(item => (
                        <Item item={item} setCheckItem={setCheckItem} />
                    ))}
                </SortableContext>
            </ul>
            {createPortal(
                <DragOverlay dropAnimation={{
                    duration: 180,
                    easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
                }}>
                    { activeItem && (
                        <div className="w-[300px] rotate-[1.5deg] scale-[1.02] opacity-95">
                            <Item item={activeItem} />
                        </div>
                    )}
                </DragOverlay>,
                document.body
            )}
            </DndContext>
            {/* Add item */}
            {isAddingItem ? (
                <div className="flex items-center gap-2 mt-1 px-2">
                    <input
                        onChange={(e) => setItemName(e.target.value)}
                        autoFocus
                        placeholder="Item name..."
                        className="
                    flex-1 text-sm
                    text-gray-700 dark:text-gray-200
                    placeholder-gray-400 dark:placeholder-gray-600
                    bg-transparent
                    border-b border-indigo-400 dark:border-indigo-500
                    outline-none pb-0.5
                "
                    />
                    <button className="
                text-xs font-medium px-2.5 py-1 rounded-lg
                text-white bg-indigo-500 hover:bg-indigo-600
                transition-all duration-150 shrink-0
            "
                    onClick={() =>{
                        addItem(itemName);
                        setIsAddingItem(false)}}>
                        Add
                    </button>
                    <button className="
                                        text-xs font-medium px-2.5 py-1 rounded-lg
                                        text-gray-400 dark:text-gray-500
                                        hover:bg-gray-100 dark:hover:bg-gray-800
                                        transition-all duration-150 shrink-0
                                    "
                            onClick={() => setIsAddingItem(false)}
                    >

                        Cancel
                    </button>
                </div>
            ) : (
                <button className="
            flex items-center gap-1.5
            text-xs font-medium px-2 py-1
            text-gray-400 dark:text-gray-500
            hover:text-indigo-500 dark:hover:text-indigo-400
            transition-all duration-150
        "
                onClick={() => setIsAddingItem(true)}>
                    <span className="text-sm leading-none">+</span>
                    Add item
                </button>
            )}
        </div>
)
}
export default ItemsList;