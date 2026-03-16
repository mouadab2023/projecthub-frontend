import {useState} from "react";

const AddProjectButton = ({addProject}:{addProject:(name:string)=>void}) => {
    const [isEditing, setEditing] = useState<boolean>(false);
    const [projectName, setProjectName] = useState<string>("");

    return (
        isEditing ? (<div className="
              shrink-0 w-[300px]
              flex flex-col gap-2
              p-3 rounded-2xl
              bg-white dark:bg-gray-900
              border-2 border-indigo-400 dark:border-indigo-500
              shadow-sm
            ">
                <input
                    autoFocus
                    placeholder="Project name..."
                    className="
                      w-full mt-1 px-3 py-2 rounded-lg
                      text-sm font-medium
                      text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-600
                      bg-gray-50 dark:bg-gray-800
                      border border-gray-200 dark:border-gray-700
                      focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500
                      transition-all duration-150
                    "
                    onChange={(e) => setProjectName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && projectName.trim() !== "") {
                            addProject(projectName);
                            setEditing(false);
                        }
                        if (e.key === "Escape") setEditing(false);
                    }}
                />
                <div className="flex items-center mt-1 gap-2">
                    <button
                        className="
                          flex-1 py-1.5 rounded-lg
                          text-sm font-medium text-white
                          bg-indigo-500 hover:bg-indigo-600
                          transition-all duration-150
                        "
                        onClick={() => {
                            if (projectName.trim() !== "") addProject(projectName);
                            setEditing(false);
                        }}
                    >
                        Add
                    </button>
                    <button
                        className="
                          flex-1 py-1.5 rounded-lg
                          text-sm font-medium
                          text-gray-500 dark:text-gray-400
                          bg-gray-100 dark:bg-gray-800
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-all duration-150
                        "
                        onClick={() => setEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>):
            (<button className="
                flex items-center justify-center gap-2
                p-5 rounded-2xl
                text-sm font-medium
                text-gray-400 dark:text-gray-500
                bg-gray-100/80 dark:bg-gray-800/40
                border-2 border-dashed border-gray-200 dark:border-gray-700
                hover:border-indigo-300 dark:hover:border-indigo-500/50
                hover:text-indigo-500 dark:hover:text-indigo-400
                hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10
                transition-all duration-200
                cursor-pointer
              "
                onClick={() => setEditing(true)}
        >
            <span className="text-base leading-none">+</span>
            New project
        </button>)
    )
}
export default AddProjectButton;