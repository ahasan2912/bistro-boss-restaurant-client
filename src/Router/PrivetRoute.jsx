import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import spinerImg from '../../src/assets/spinner.gif';
import { AuthContext } from "../Providers/AuthProvider";

const PrivetRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <>
            <div className="flex flex-col justify-center items-center h-screen">
                <img className="w-20 animate-spin" src={spinerImg} alt="" />
            </div>
        </>
    }
    if (user) {
        return children
    }
    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default PrivetRoute;