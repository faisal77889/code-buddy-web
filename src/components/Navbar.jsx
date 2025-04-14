import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { addUser, removeUser } from "../utils/userSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); 
    // console.log(location.pathname);

    

    const handleButtonClick = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    

    return (
        <>
            <div className="navbar bg-base-300">
                <div className="flex-1">
                    <Link to={"/"} className="btn btn-ghost text-xl">
                        codeBuddy
                    </Link>
                </div>
                {user && (
                    <div className="flex gap-2">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User Avatar"
                                        src={
                                            user.photoUrl
                                                ? user.photoUrl
                                                : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        }
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <Link className="justify-between" to={"/profile/view"}>
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/connections"}>Connections</Link>
                                </li>
                                <li>
                                    <Link to={"/requests"}>Requests</Link>
                                </li>
                                <li>
                                    <a onClick={handleButtonClick}>Logout</a>
                                </li>
                            </ul>
                        </div>
                        <div>Hi, {user.firstName}</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;
