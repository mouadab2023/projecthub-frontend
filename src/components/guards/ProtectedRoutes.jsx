import useAuth from "../../hooks/auth/useAuth";
import {Navigate, Outlet} from "react-router-dom";
import AuthSpinner from "../auth/components/AuthSpinner";

const ProtectedRoutes = () => {
    const {user,initialLoading} = useAuth();
    if(initialLoading) return <AuthSpinner loading={initialLoading}/>;
    if(!user) return <Navigate to="/login" replace />;
    return <Outlet/>
}
export default ProtectedRoutes;
