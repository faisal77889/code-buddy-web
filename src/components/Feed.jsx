import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";
import { useEffect } from "react";
import axios from "axios";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";

const Feed = () => {
    const feedUser = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:7777/user/feed", {
                withCredentials: true,
            });
            dispatch(addFeed(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    const handleButtonClick = async (status, userId) => {
        try {
            const response = await axios.post(
                `http://localhost:7777/request/${status}/${userId}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId));
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!feedUser || feedUser.length === 0) return <div>No users left</div>;

    const { _id, firstName, lastName, age, gender, about, photoUrl } = feedUser[0];

    return (
        <div>
            <div className="w-[30%] mx-auto bg-base-300 my-[2rem]">
                <div className="mx-auto w-[80%]">
                    <ProfileCard
                        user={{
                            FirstName: firstName,
                            LastName: lastName,
                            Age: age,
                            Gender: gender,
                            About: about,
                            PhotoUrl: photoUrl,
                        }}
                    />
                </div>
                <div className="flex justify-end ">
                    <button
                        className="btn btn-active btn-accent my-1 mx-2 w-24"
                        onClick={() => handleButtonClick("interested", _id)}
                    >
                        Interested
                    </button>
                    <button
                        className="btn btn-active btn-error my-1 mx-2 w-24"
                        onClick={() => handleButtonClick("ignored", _id)}
                    >
                        Ignore
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Feed;
