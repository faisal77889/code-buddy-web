import { useState } from "react";
import axios from "axios";
const Login = () => {
    const [emailId,setEmailId] = useState("");
    const [password,setPassword] = useState("");
    const handleOnClick = async () =>{
        try {
            const response =await axios.post("http://localhost:7777/login",{
                emailId : emailId,
                password : password
            },{withCredentials : true})
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
        
    }
    return (
        <div className="card bg-base-300 w-96 shadow-sm mx-auto my-32">
            <div className="card-body">
                <h2 className="card-title justify-center">Login</h2>
                <label className="input validator my-4">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </g>
                    </svg>
                    <input type="text" placeholder="Username" value={emailId} onChange={(e)=> setEmailId(e.target.value)}/>
                </label>

                <label className="input validator my-4">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>

                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={handleOnClick}>Sign In</button>
                </div>
            </div>
        </div>
    )
}
export default Login;