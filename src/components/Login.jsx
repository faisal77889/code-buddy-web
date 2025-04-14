import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleOnClick = async () => {
        if(isSignUp){
            return;
        }
        try {
            const response = await axios.post(BASE_URL + "/login", {
                emailId: emailId,
                password: password
            }, { withCredentials: true })
            dispatch(addUser(response.data));
            return navigate("/");
            // console.log(response);
        } catch (error) {
            setErrorMessage(error?.response?.data);
        }

    }
    const handleSignUp = async () =>{
        if(!isSignUp){
            return;
        }
        try {
            const response = await axios.post(BASE_URL + "/signup",{
                firstName,
                lastName,
                emailId,
                password
            },{withCredentials : true});
            dispatch(addUser(response?.data));
            return navigate("/profile/view");
            // console.log(response);
        } catch (error) {
            setErrorMessage(error?.response?.data);
        }
    }

    useEffect(() => {
        if (user) {
            if(isSignUp){
                navigate("/profile/view");
            }
            if(!isSignUp){

                navigate("/");
            }
        }
    }, [user])
    return (
        <div className="card bg-base-300 w-96 shadow-sm mx-auto my-32">
            <div className="card-body">
                    <h2 className="card-title justify-center">{isSignUp ? "Sign Up Now" : "Login"}</h2>
                {isSignUp && <>
                    <fieldset className="fieldset">
                        <input type="text" className="input" placeholder="Enter your first name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <input type="text" className="input" placeholder="Enter your last name" value={lastName} onChange={(e)=> setLastName(e.target.value)} />
                    </fieldset>
                </>}
                <label className="input validator my-4">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </g>
                    </svg>
                    <input type="text" placeholder="Username" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                </label>

                <label className="input validator my-4">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <p className="text-center">{errorMessage}</p>

                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={ isSignUp ? handleSignUp : handleOnClick}>{isSignUp ? "Register Now " : "Login"}</button>
                </div>
                <p className="text-center cursor-pointer my-1" onClick={()=> {setIsSignUp(!isSignUp)
                    setEmailId("");
                    setPassword("");
                }}>{isSignUp ? "Already a User? Login Now" : "New to CodeBuddy? Sign Up Now"}</p>
            </div>
        </div>
    )
}
export default Login;