import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Project} from "../types/project";
import toast from "react-hot-toast";
import boardService from "../services/boardService";

const useDashboard =()=>{
    const navigate = useNavigate();
    const [projects,setProjects]=useState<Project[]|null>(null);

    const removeProject=async (id:number)=>{
        const projectsSnapshot=projects;
        setProjects(prevState => {
            if (!prevState) return []
            return prevState?.filter(prevState=>prevState.id!==id)
        })
        try {
            toast.loading("Loading...");
            await boardService.removeProject(id);
            toast.dismiss();
            toast.success("Project removed successfully");
        }catch(err){
            setProjects(projectsSnapshot)
            toast.dismiss();
            toast.error("Could not remove project, try again later");
        }
    }
    const addProject=async (name:string)=>{
        const projectsSnapshot=projects;
        const tempId=Date.now();
        const project:Project ={
            id:tempId,
            name:name,
            creationDate:new Date().toISOString().split('T')[0]??"",
        }
        setProjects(prevState => [...prevState??[], project]);
        try {
            toast.loading("Loading...");
            const res=await boardService.addProject(name);
            setProjects(prevState => {
                if (!prevState) return null;
                return prevState.map(project=>project.id===tempId?res.data:project);
            })
            toast.dismiss();
            toast.success("Project added successfully");
        }catch (err){
            setProjects(projectsSnapshot);
            toast.dismiss();
            toast.error("Could not add project, try again later");
        }
    }
    const navigateToBoard=(id:number)=>{
        navigate("/board/"+id);
    }
    useEffect(()=>{
        const fetchProjects=async ()=>{
            try {
                const res= await boardService.getAllProjects();
                setProjects(res.data);
            }catch (err){
                toast.error("Could not fetch projects, please try again");
            }
        }
        fetchProjects();
    },[])
    return {
        projects,
        addProject,
        removeProject,
        navigateToBoard
    }
}
export default useDashboard;