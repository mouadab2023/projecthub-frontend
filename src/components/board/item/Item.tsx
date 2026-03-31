import {useSortable} from "@dnd-kit/sortable";
import type {Item as TypeItem} from "../../../types/item";
import {CSS} from "@dnd-kit/utilities";
type Props = {item:TypeItem,
    setCheckItem?:(id:number,checked:boolean)=>void}


const Item =({item,setCheckItem}:Props)=>{
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: 'item-' + item.id,
        data: {
            type: 'item',
            item,
        }
    });
    const style = {
        transform: CSS.Transform.toString({
            x: transform?.x ?? 0,
            y: transform?.y ?? 0,
            scaleX: 1,
            scaleY: 1,
        }),
        transition,
    };
    if (isDragging) {
        return (
            <li
                ref={setNodeRef}
                style={style}
                className="
                h-8 rounded-lg
                border-2 border-dashed
                border-indigo-300 dark:border-indigo-500/40
                bg-indigo-50/50 dark:bg-indigo-900/10
            "
            />
        )
    }
    return (
        <li  ref={setNodeRef}
             style={style}
             {...attributes}
             {...listeners}
             key={item.id} className="
                                    flex items-center gap-2.5 px-2 py-1.5 rounded-lg
                                    hover:bg-gray-50 dark:hover:bg-gray-800/60
                                    transition-all duration-150
                                ">
            <input
                onChange={(e)=>{
                    if (setCheckItem) {
                        setCheckItem(item.id, e.target.checked)
                    }}}
                checked={item.isChecked}
                type="checkbox"
                className="w-3.5 h-3.5 rounded accent-indigo-500 cursor-pointer shrink-0"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                        {item.name}
            </span>
        </li>
    );
}
export default Item;