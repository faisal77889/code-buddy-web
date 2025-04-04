import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import ProfileCard from "./ProfileCard";

const Profile = () => {
    const user = useSelector((store) => store.user);

    return (
        <div>
            {user &&

                <div className="flex items-center justify-center gap-4">
                <EditProfile user = {user} />
                
            </div>
            }
            

        </div>
    )
}
export default Profile;