import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import userLogo from '../../../assets/download-2.jpeg'
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaCartArrowDown } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
    const { user, handleLogout } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    const handleLogoutBtn = () => {
        handleLogout()
            .then(() => { })
            .catch((error => console.log(error)))
    }
    const navOption = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Menu</Link></li>
        <li><Link to='/allmenu'>All Menu</Link></li>
        <li><Link to='/order/salad'>Orders</Link></li>
        {
            user && isAdmin && <li><Link to='/dashboard/adminHome'>Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to='/dashboard/userHome'>Dashboard</Link></li>
        }
        <li>
            <Link to="/dashboard/cart" className="btn text-lg">
                <FaCartArrowDown />
                <div className="badge badge-secondary text-lg">{cart.length}</div>
            </Link >
        </li>
        {
            user ? <>
                <li><button onClick={handleLogoutBtn} className="">LogOut</button></li>
            </> : <>
                <li><Link to="/login">Login</Link></li>
            </>
        }
    </>
    return (
        <div className="navbar fixed z-10 bg-gray-600 text-white max-w-screen-xl mx-auto px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navOption}
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl">Bistro Boss</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg">
                    {navOption}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="border-2 border-red-400 rounded-full p-1">
                        <img className="w-10 h-10 object-cover rounded-full" referrerPolicy='no-referrer' src={user?.photoURL} data-tooltip-id="my-tooltip-1" alt="" />
                        <ReactTooltip
                            id="my-tooltip-1"
                            place="bottom"
                            className="mr-60"
                            content={user?.displayName}
                        />
                    </div> : <div className="border-2 border-red-400 animate-pulse rounded-full p-1">
                        <img className="w-10 rounded-full" src={userLogo} alt="" />
                        <ReactTooltip
                            id="my-tooltip-1"
                            place="bottom"
                            content={user?.displayName}
                        />
                    </div>
                }

            </div>
        </div>
    );
};

export default Navbar;