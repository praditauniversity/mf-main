import React from "react";
import UserImage from "../../../Assets/Images/png/User.png";
import Button from "../../Button";
import GetProfile from "../../Auth/GetProfile";
import { IconEdit } from "../../Icons/icon";

const MyAccount = () => {
    const profile = GetProfile();

    return (

        <div className="rounded-xl shadow-lg bg-white py-8 px-12">

            <div>
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">My Account</p>
                    <button><IconEdit /></button>
                </div>
                <div className="flex justify-start">
                    <p className="text-sm opacity-70">Joined on May 28, 2019</p>
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
                        <p className="text-sm font-semibold">valeriareina@email.com</p>
                    </div>
                </div>
                <div className="py-3">
                    <div className="flex justify-between">
                        <p className="text-sm opacity-70">Username</p>
                        <p className="text-sm font-semibold">valeria_r</p>
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