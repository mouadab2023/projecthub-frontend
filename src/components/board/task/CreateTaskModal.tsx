// CreateTaskModal.tsx
import { createPortal } from "react-dom";
import { useState } from "react";
import type {Priority} from "../../../types/priority";
import type {TaskForm} from "../Board";



type Props = {
    columnId:number;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (task: TaskForm) => void;
};

export const priorityConfig = {
    LOW:    { label: "Low",    class: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800" },
    MEDIUM: { label: "Medium", class: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800" },
    HIGH:   { label: "High",   class: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800" },
};

const CreateTaskModal = ({columnId,isOpen, onClose, onSubmit }: Props) => {
    const [form, setForm] = useState<TaskForm>({
        columnId:columnId,
        title: "",
        description: "",
        dueDate: "",
        priority: "MEDIUM",
    });

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!form.title.trim() || !form.description.trim() || !form.dueDate) return;
        onSubmit(form);
        setForm({ ...form, title: "", description: "", dueDate: "", priority: "MEDIUM" });
        onClose();
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="
                    relative z-10
                    w-full max-w-md mx-4
                    bg-white dark:bg-gray-900
                    rounded-2xl shadow-2xl
                    border border-gray-200 dark:border-gray-800
                    p-6 flex flex-col gap-5
                "
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
                        New task
                    </h2>
                    <button
                        onClick={onClose}
                        className="
                            p-1.5 rounded-lg
                            text-gray-400 dark:text-gray-500
                            hover:text-gray-600 dark:hover:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-800
                            transition-all duration-150
                        "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                {/* Title */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Title <span className="text-red-400">*</span>
                    </label>
                    <input
                        autoFocus
                        placeholder="Task title..."
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); if (e.key === "Escape") onClose(); }}
                        className="
                            w-full px-3 py-2 rounded-lg
                            text-sm text-gray-800 dark:text-gray-100
                            placeholder-gray-400 dark:placeholder-gray-600
                            bg-gray-50 dark:bg-gray-800
                            border border-gray-200 dark:border-gray-700
                            focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500
                            transition-all duration-150
                        "
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        placeholder="Add a description..."
                        value={form.description}
                        rows={3}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="
                            w-full px-3 py-2 rounded-lg resize-none
                            text-sm text-gray-800 dark:text-gray-100
                            placeholder-gray-400 dark:placeholder-gray-600
                            bg-gray-50 dark:bg-gray-800
                            border border-gray-200 dark:border-gray-700
                            focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500
                            transition-all duration-150
                        "
                    />
                </div>

                {/* Due date + Priority */}
                <div className="flex gap-3">
                    {/* Due date */}
                    <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Due date <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="date"
                            min="2000-01-01"
                            max="2099-12-31"
                            value={form.dueDate}
                            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                            className="
                                w-full px-3 py-2 rounded-lg
                                text-sm text-gray-800 dark:text-gray-100
                                bg-gray-50 dark:bg-gray-800
                                border border-gray-200 dark:border-gray-700
                                focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500
                                transition-all duration-150
                            "
                        />
                    </div>

                    {/* Priority */}
                    <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Priority
                        </label>
                        <div className="flex gap-1.5">
                            {(Object.keys(priorityConfig) as Priority[]).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setForm({ ...form, priority: p })}
                                    className={`
                                        flex-1 py-2 rounded-lg text-xs font-medium
                                        border transition-all duration-150
                                        ${form.priority === p
                                        ? priorityConfig[p].class
                                        : "bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700"
                                    }
                                    `}
                                >
                                    {priorityConfig[p].label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-2 pt-1">
                    <button
                        onClick={onClose}
                        className="
                            flex-1 py-2 rounded-lg
                            text-sm font-medium
                            text-gray-500 dark:text-gray-400
                            bg-gray-100 dark:bg-gray-800
                            hover:bg-gray-200 dark:hover:bg-gray-700
                            transition-all duration-150
                        "
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!form.title.trim() || !form.description.trim() || !form.dueDate}
                        className="
                            flex-1 py-2 rounded-lg
                            text-sm font-medium text-white
                            bg-indigo-500 hover:bg-indigo-600
                            disabled:opacity-40 disabled:cursor-not-allowed
                            transition-all duration-150
                        "
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default CreateTaskModal;