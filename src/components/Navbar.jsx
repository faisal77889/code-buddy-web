import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { addUser, removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(user);
    const fetchData = async () =>{
        try {
            const response = await axios.get("http://localhost:7777/profile/view",{withCredentials : true})
            dispatch(addUser(response.data));
        } catch (error) {
            if(error.status === 401){
                navigate("/login");
            }
            //make an error page and handle the errors that are caused due to different reasons
            console.error(error);
        }
    }
    const handleButtonClick = async ()=>{
        try {
            await axios.post("http://localhost:7777/logout",{},{withCredentials: true});
            dispatch(removeUser());
            return navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(!user){
            fetchData();
        }
    },[])

    return (
        <>
            <div className="navbar bg-base-300">
                <div className="flex-1">
                    <Link to={"/"} className="btn btn-ghost text-xl">codeBuddy</Link>
                </div>
                {user && <div className="flex gap-2">

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link className="justify-between" to={"/profile/view"}>
                                    Profile
                                    <span className="badge">New</span>
                                </Link> 
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={handleButtonClick}>Logout</a></li>
                        </ul>
                    </div>
                    <div>Welcome , {user.firstName}</div>
                </div>
                }

            </div>
        </>
    )
}
export default Navbar;