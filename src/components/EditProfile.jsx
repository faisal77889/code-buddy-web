import { useState } from "react";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = (props) => {
    // console.log(firstName);
    const user = props.user;
    const {firstName,lastName,age,gender,photoUrl,about} = user;
    const [FirstName,setFirstName] = useState(firstName);
    const [LastName,setLastName] = useState(lastName);
    const [Age,setAge] = useState(age || "");
    const [Gender,setGender] = useState(gender || "");
    const [PhotoUrl,setPhotoUrl] = useState(photoUrl || "");
    const [About,setAbout] = useState(about || "");
    const dispatch = useDispatch();
    const handleButtonClick = async () =>{
        try {
            const response = await axios.patch("http://localhost:7777/profile/edit",
            {firstName : FirstName, lastName: LastName, age : Age , gender : Gender, photoUrl : PhotoUrl,about : About},
            {withCredentials : true});
            dispatch(addUser(response.data));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex items-center justify-center gap-4 my-4">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">Your Profile</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input type="text" className="input" placeholder="Enter your first name" value={FirstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input type="text" className="input" placeholder="Enter your last name" value={LastName} onChange={(e) => setLastName(e.target.value)} />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Gender</legend>
                        <input type="text" className="input" placeholder="Select Your Gender" list="gender" value={Gender} onChange={(e) => setGender(e.target.value)}/>
                        <datalist id="gender">
                            <option value="Male"></option>
                            <option value="Female"></option>
                        </datalist>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Age</legend>
                        <input type="number" className="input validator" required placeholder="Type a number between 1 to 100" value={Age} onChange={(e) => setAge(e.target.value)}
                            min="1" max="100" title="Must be between be 1 to 100" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Photo URL</legend>
                        <input type="text" className="input" placeholder="Enter your photoUrl" value={PhotoUrl} onChange={(e) => setPhotoUrl(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Your bio</legend>
                        <textarea className="textarea h-24" placeholder="Bio" value={About} onChange={(e) => setAbout(e.target.value)}></textarea>
                    </fieldset>



                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleButtonClick}>Save Changes</button>
                    </div>
                </div>
            </div>
            <ProfileCard user = {{FirstName,LastName,Age,Gender,PhotoUrl,About}}/>
        </div>
    )
}
export default EditProfile;