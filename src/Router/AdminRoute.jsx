import { Navigate, useLocation } from "react-router-dom";
import spinerImg from '../../src/assets/spinner.gif';
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    if (loading) {
        return <>
            <div className="flex flex-col justify-center items-center h-screen">
                <img className="w-20 animate-spin" src={spinerImg} alt="" />
            </div>
        </>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default AdminRoute;