import ConnectionCard from "./ConnectionCard";
import axios from "axios";
import { useEffect, useState } from "react";


const Connections = () => {
    const [connectionInfo,setConnectionInfo] = useState("");
    const fetchData = async () =>{
        try {
            const response = await axios.get("http://localhost:7777/user/connections",
            {withCredentials : true});
            setConnectionInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
    if(!connectionInfo){
        return;
    }
    if(connectionInfo.length === 0){
        return <div>No Connections Found</div>
    }
    return (
        <div className="w-1/2 mx-auto my-[1rem]">
            <h2 className="font-bold text-[2rem] text-center">Connections</h2>
            {
                connectionInfo.map((connection) => {
                    return <ConnectionCard key = {connection._id} connectionInfo={connection}/>
                })
            }
            
        </div>
    )
}
export default Connections;