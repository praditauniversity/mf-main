import React from "react";
import Facebook from "../../../Assets/Images/png/Facebook.png";
import Instagram from "../../../Assets/Images/png/Instagram.png";
import Twitter from "../../../Assets/Images/png/Twitter.png";
import Linkedin from "../../../Assets/Images/png/Linkedin.png";
import Button from "../../Button";
import { IconEdit } from "../../Icons/icon";
import FutureUpdateEdit from "../../Modal/FutureUpdateModal/Edit (Profile Page)/FutureUpdateEdit";

const SocialMediaCard = () => {
    return (

        <div className="rounded-xl shadow-lg bg-white py-8 px-12">

            <div className="pb-5">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">My Account</p>
                    <div><FutureUpdateEdit /></div>
                </div>
            </div>

            <div className="pt-5">
                <div className="py-4">
                    <div className="flex justify-between">
                        <div className="flex justify-start">
                            <img src={Facebook} className="mr-2"></img>
                            <p className="text-sm opacity-70">Facebook</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm font-semibold">Valeria Reina</p>
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <div className="flex justify-between">
                        <div className="flex justify-start">
                            <img src={Twitter} className="mr-2"></img>
                            <p className="text-sm opacity-70">Twitter</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm font-semibold">@valeria_reina</p>
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <div className="flex justify-between">
                        <div className="flex justify-start">
                            <img src={Instagram} className="mr-2"></img>
                            <p className="text-sm opacity-70">Instagram</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm font-semibold">@valeria_reina</p>
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <div className="flex justify-between">
                        <div className="flex justify-start">
                            <img src={Linkedin} className="mr-2"></img>
                            <p className="text-sm opacity-70">LinkedIn</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm font-semibold">Valeria Reina</p>
                        </div>
                    </div>
                </div>
    
            </div>
        </div>
    )
}

export default SocialMediaCard;