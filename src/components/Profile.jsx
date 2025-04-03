import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((store) => store.user);

    return (
        <div>
            {user &&
                <div>{user.firstName + " " + user.lastName} is the current user </div>
            }
        </div>
    )
}
export default Profile;