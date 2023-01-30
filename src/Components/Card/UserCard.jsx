import React from "react";
import { Link } from "react-router-dom";
import UserImage from "../../Assets/Images/png/User.png";
import GetProfile from "../Auth/GetProfile";
import Button from "../Button";

const UserCard = () => {
  const profile = GetProfile();

  return (

    <div className="rounded-xl shadow-lg bg-white py-8 px-16">

      <img src={UserImage} className="m-auto border-2 p-1 border-dashed border-indigo-400" style={{ borderRadius: "9999px" }} />

      <div className="py-4">
        <center>
          <p className="font-semibold text-md">{profile.first_name} {profile.last_name}</p>
          <p className="opacity-70 text-sm">Development Operation</p>
        </center>
      </div>

      <Link to="/profile">
        <Button label="Edit Profile" />
      </Link>
    </div>
  )
}

export default UserCard;