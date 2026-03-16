import {useEffect, useState} from "react";
import type {Project} from "../../types/project";
import PageLayout from "../PageLayout";
import boardService from "../../services/boardService";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import AddProjectButton from "./AddProjectButton";
import useDashboard from "../../hooks/useDashboard";
import useAuth from "../../hooks/auth/useAuth";

const DashBoard=()=>{
    const {projects,addProject,removeProject,navigateToBoard}= useDashboard();
    const {user}=useAuth();
    if(!projects) return null;
    return(
        <PageLayout>
            {/* Welcome header */}
            <div className="mb-10">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
                    Welcome back, {user?.firstName} 👋
                </h1>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    {projects.length > 0
                        ? `You have ${projects.length} ${projects.length > 1 ? "projects" : "project"}`
                        : "Get started by creating your first project"
                    }
                </p>
            </div>

            {projects.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center pt-10 gap-5">
                    <div className="
                w-10 h-10 rounded-2xl
                bg-gray-100 dark:bg-gray-800
                flex items-center justify-center
            ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-500">
                            <rect width="20" height="14" x="2" y="7" rx="2"/>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                            No projects yet
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs">
                            Create your first project and start organizing your work with a kanban board
                        </p>
                    </div>
                    <AddProjectButton addProject={addProject} />
                </div>
            ) : (
                /* Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project: Project) => (
                        <div
                            key={project.id}
                            onClick={() => navigateToBoard(project.id)}
                            className="
                        group
                        flex flex-col gap-4
                        p-5 rounded-2xl
                        bg-white dark:bg-gray-900
                        border border-gray-200 dark:border-gray-800
                        shadow-sm hover:shadow-md
                        hover:border-gray-300 dark:hover:border-gray-700
                        transition-all duration-200
                        cursor-pointer
                    "
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col gap-1 min-w-0">
                                    <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                                        {project.name}
                                    </h2>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                        Created {project.creationDate.toString()}
                                    </p>
                                </div>
                                <button
                                    className="
                                shrink-0 ml-2 p-1 rounded-lg
                                text-gray-300 dark:text-gray-600
                                hover:text-red-400 dark:hover:text-red-400
                                hover:bg-red-50 dark:hover:bg-red-900/20
                                transition-all duration-150
                                opacity-0 group-hover:opacity-100
                            "
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeProject(project.id);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
                                    </svg>
                                </button>
                            </div>

                            {/* Footer card */}
                            <div className="flex items-center justify-between pt-1 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                            View board →
                        </span>
                                <span className="
                            text-xs font-medium px-2 py-0.5 rounded-full
                            bg-indigo-50 dark:bg-indigo-900/20
                            text-indigo-500 dark:text-indigo-400
                        ">
                            Active
                        </span>
                            </div>
                        </div>
                    ))}

                    <AddProjectButton addProject={addProject} />
                </div>
            )}
        </PageLayout>
    )
}
export default DashBoard;
