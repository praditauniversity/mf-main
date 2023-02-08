import React from "react";
import UserImage from "../../../Assets/Images/png/User.png";
import Button from "../../Button";
import GetProfile from "../../Auth/GetProfile";
import { IconEdit } from "../../Icons/icon";
import FutureUpdateEdit from "../../Modal/FutureUpdateModal/Edit (Profile Page)/FutureUpdateEdit";

const MyAccount = () => {
    const profile = GetProfile();
    const joined = new Date(profile.created_at);
    const joinedDate = joined.getDate();
    const joinedMonth = joined.toLocaleString('default', { month: 'long' });
    const joinedYear = joined.getFullYear();
    return (

        <div className="rounded-xl shadow-lg bg-white py-8 px-12">

            <div>
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">My Account</p>
                    <div><FutureUpdateEdit /></div>
                </div>
                <div className="flex justify-start">
                    <p className="text-sm opacity-70">Joined on {joinedMonth} {joinedDate}, {joinedYear}</p>
                </div>
            </div>

            <div className="py-10">
                <div className="py-2">
                    <img src={UserImage} className="m-auto border-2 p-1 border-dashed border-indigo-400" style={{ borderRadius: "9999px" }} />
                </div>
                <div className="py-2">
                    <center>
                        <p className="font-semibold text-md">{profile.first_name} {profile.last_name}</p>
                        <p className="opacity-70 text-sm">Development Operation</p>
                    </center>
                </div>
            </div>


            <div>
                <div className="py-3">
                    <div className="flex justify-between">
                        <p className="text-sm opacity-70">Email</p>
                        <p className="text-sm font-semibold">{profile.email}</p>
                    </div>
                </div>
                <div className="py-3">
                    <div className="flex justify-between">
                        <p className="text-sm opacity-70">Username</p>
                        <p className="text-sm font-semibold">{profile.username}</p>
                    </div>
                </div>
                <div className="py-3">
                    <div className="flex justify-between">
                        <p className="text-sm opacity-70">Role</p>
                        <p className="text-sm font-semibold">Project Manager</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount;