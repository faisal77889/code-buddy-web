const ProfileCard = ({user}) => {
    const {FirstName,LastName,Age,Gender,PhotoUrl,About} = user;
    return (
        <>
            <div className="card bg-base-300 w-96 h-[60vh] shadow-sm flex flex-col justify-between self-start">
                <figure className="px-10 pt-10">
                    <img
                        src={PhotoUrl ? PhotoUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                        alt="Shoes"
                        className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center flex-grow">
                    <h2 className="card-title">{(FirstName ? FirstName : "") + " " + (LastName ? LastName : "")}</h2>
                    <p>{(Age ? Age : 1) +  " " + (Gender ? Gender : "")}</p>
                    <p>{About ? About : ""}</p>
                    
                </div>
            </div>

        </>
    )
}
export default ProfileCard;