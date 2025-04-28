import { Link } from "react-router-dom";

const ConnectionCard = ({ connectionInfo, request }) => {
    const { _id, firstName, lastName, about, photoUrl, age, gender } = connectionInfo;
    return (
        <div className="flex gap-3 bg-base-300 mx-auto my-2 rounded-2xl">

            <div className="avatar online my-4 mx-3 ">
                <div className="w-24 rounded-full">
                    <img src={photoUrl ? photoUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                </div>
            </div>
            <div className="my-4 w-[80%] px-2">
                <h2 className="font-bold text-xl">{(firstName ? firstName : "") + " " + (lastName ? lastName : "")}</h2>
                <p>48 Male</p>
                <p className="line-clamp-2">
                    {about ? about : ""}
                </p>


            </div>
            {!request && <Link className="my-auto" to={"/chat/" + _id}>
                <button
                    className="btn btn-active btn-accent  mx-2 w-24"
                >
                    Chat
                </button>
            </Link>
            }

        </div>
    )
}
export default ConnectionCard;