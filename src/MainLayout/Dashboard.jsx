import { FaBorderAll, FaCalendar, FaHome, FaList, FaUser, FaUtensils } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdOutlineReviews } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();

    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome />
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems">
                                    <FaUtensils></FaUtensils>
                                    Add Items</NavLink>
                            </li>
                            <li className="rounded-md">
                                <NavLink to="/dashboard/manageItems">
                                    <FaList></FaList>
                                    Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <MdOutlineReviews />
                                   Manages Bookins</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUser></FaUser>
                                    All Users</NavLink>
                            </li>
                        </> : <>
                            <li>
                                <NavLink to="/dashboard/userHome">
                                    <FaHome />
                                    User Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymentHistory">
                                    <FaCalendar />
                                    Payment History</NavLink>
                            </li>
                            <li className="bg-gray-600 rounded-md text-white">
                                <NavLink to="/dashboard/cart">
                                    <FaCartShopping />
                                    My Cart ({cart.length})</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/review">
                                    <MdOutlineReviews />
                                    Add a Reviews</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymentHistory">
                                    <FaList></FaList>
                                    Payment Real History</NavLink>
                            </li>
                        </>
                    }
                    {/* shared nav links */}
                    <div className="divider">OR</div>
                    <li>
                        <NavLink to="/">
                            <FaHome />
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaBorderAll />
                            All Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <IoCall />
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;