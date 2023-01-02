import React from "react";
import AboutMeCard from "../../Components/Card/AccountDescriptionCard/AboutMeCard";
import EducationCard from "../../Components/Card/AccountDescriptionCard/EducationCard";
import EmploymentCard from "../../Components/Card/AccountDescriptionCard/EmploymentCard";
import SkillsCard from "../../Components/Card/AccountDescriptionCard/SkillsCard";
import CalendarCard from "../../Components/Card/Calendar/CalendarCard";
import MyAccount from "../../Components/Card/MyAccount";
import SocialMediaCard from "../../Components/Card/SocialMedia";
import UserCard from "../../Components/Card/UserCard";

const UserAccount = () => {
    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4">
            <div className="col-span-4">
                <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-4"> <MyAccount /> </div>
                    <div className="col-span-4"> <SocialMediaCard /> </div>
                </div>
            </div>
            <div className="col-span-10">
                <div className="grid grid-cols-10 gap-2">
                    <div className="col-span-10"> <AboutMeCard /> </div>
                    <div className="col-span-10"> <EducationCard /> </div>
                    <div className="col-span-10"> <EmploymentCard /> </div>
                    <div className="col-span-10"> <SkillsCard /> </div>
                </div>
            </div>
            <div className="col-span-4">
                <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-4"> <CalendarCard /> </div>
                </div>
            </div>
        </div>
    );
}
export default UserAccount;