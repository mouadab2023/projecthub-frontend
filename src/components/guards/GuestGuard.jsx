import useAuth from "../../hooks/auth/useAuth";
import {Navigate, Outlet} from "react-router-dom";
import AuthSpinner from "../auth/components/AuthSpinner";

const GuestGuard=()=>{
    const {user,initialLoading} = useAuth();
    if(initialLoading) return <AuthSpinner loading={initialLoading}/>;
    if(user) return <Navigate to="/dashboard" replace />;
    return <Outlet/>;
}
export default GuestGuard;