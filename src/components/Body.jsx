import { useEffect } from "react";
import Navbar from "./Navbar"
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Body = () =>{
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchData = async () => {
        
        try {
            const response = await axios.get(BASE_URL+"/profile/view", {
                withCredentials: true,
            });
            dispatch(addUser(response.data));
        } catch (error) {
            if (error?.response?.status === 401) {
                navigate("/login");
            }
            console.error(error);
        }
    };
    useEffect(() => {
            
            if (!user) {
                fetchData();
            }
        }, []);


    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}
export default Body;