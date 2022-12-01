import React from "react";
import UserImage from "../../Assets/Images/png/User.png";

const UserCard = () => {
  return (

    <div className="rounded-xl shadow-sm bg-white py-8 px-16">

      <img src={UserImage} className="m-auto border-2 p-1 border-dashed border-indigo-400" style={{ borderRadius: "9999px" }} />

      <div className="py-4">
        <center>
          <p className="font-semibold text-md">Valeria Reina</p>
          <p className="opacity-70 text-sm">Development Operation</p>
        </center>
      </div>

      <button className="mx-auto flex py-2 sm:px-8 px-12 text-sm font-semibold text-white rounded-md bg-indigo-700 tracking-wider">Edit Profile</button>
    </div>
  )
}

export default UserCard;