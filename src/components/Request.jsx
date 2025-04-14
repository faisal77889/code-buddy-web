import ConnectionCard from "./ConnectionCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Request = () => {
    const [profileInfo, setProfileInfo] = useState([]);
    const [removedId,setRemovedId] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(BASE_URL + "/user/pending-request",
                { withCredentials: true }
            );
            setProfileInfo(response?.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleButtonClick = async (status,requestId) =>{
        try {
            const response = await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId,{},{withCredentials: true});
            setRemovedId(prev => [...prev, response.data._id]);

        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        fetchData();
    }, [])
    if (!profileInfo) {
        return;
    }
    if (profileInfo.length === 0) {
        return (
            <div>There are no requests</div>
        )
    }
    return (
        <div>

            {
                profileInfo.map((connectionInfo, index) => {
                    if(!removedId.includes(connectionInfo._id)){
                        return (
                        
                            <div
                                key={connectionInfo._id || index} // Prefer unique id over index
                                className="w-1/2 mx-auto my-[1rem] flex bg-base-300 rounded-xl"
                            >
                                <div className="w-[85%]">
                                    <ConnectionCard connectionInfo={connectionInfo.fromUserId} />
                                </div>
                                <div className="my-auto">
                                    <div>
                                        <button className="btn btn-active btn-accent my-1 mx-2 w-24" onClick={()=>{
                                            handleButtonClick("accepted",connectionInfo._id)
                                        }}>Accepted</button>
                                    </div>
                                    <div>
                                        <button className="btn btn-active btn-error my-1 mx-2 w-24" onClick={()=> handleButtonClick("rejected",connectionInfo._id)}>Rejected</button>
                                    </div>
                                </div>
                            </div>
                        );  
                    }
                    
                })
            }

        </div>

    )
}
export default Request;