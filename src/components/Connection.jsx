import ConnectionCard from "./ConnectionCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";


const Connections = () => {
    const [connectionInfo, setConnectionInfo] = useState("");
    const fetchData = async () => {
        try {
            const response = await axios.get(BASE_URL + "/user/connections",
                { withCredentials: true });
            setConnectionInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    if (!connectionInfo) {
        return;
    }
    if (connectionInfo.length === 0) {
        return <div>No Connections Found</div>
    }
    return (
        <div className="w-1/2 mx-auto my-[1rem]">
            <h2 className="font-bold text-[2rem] text-center">Connections</h2>
            {
                connectionInfo.map((connection) => {
                    return (
                        <div>
                            <ConnectionCard key={connection._id} connectionInfo={connection} />
                            
                        </div>
                    )
                })
            }

        </div>
    )
}
export default Connections;