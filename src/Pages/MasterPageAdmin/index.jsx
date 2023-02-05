import React from "react";
import IconHome from "../../Assets/Icons/svg/Home.svg";
import IconUser from "../../Assets/Icons/svg/User_bw.svg";
import IconUserGroup from "../../Assets/Icons/svg/UserGroup.svg";
import MasterPageInnerCard from "../../Components/Card/MasterPage/MasterPageInnerCard";

const MasterPageAdmin = () => {
    const MainHeader = (props) => {
        const { label } = props;
        return (
            <>
                <h3 className="font-bold text-lg">{label}</h3>
            </>
        );
    };

    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-2 mb-7">
            <div className="2xl:col-span-18 col-span-12 h-100">
                <div className="col-span-12 ml-5 mb-10 mr-5 h-100">
                    <div className="flex items-center mb-3 mt-3">
                        <MainHeader label="Master Page"/>
                    </div>

                    {/* Still static hehe, gonna move this to the component part */}
                    <div className="mt-2 border border-none rounded-lg grid lg:grid-cols-18 grid-cols-12 gap-5">
                        <div className="lg:col-span-9 col-span-12 p-5 bg-background-snow rounded-lg">
                            <MasterPageInnerCard title="Total Users" total="144" status="About the same as usual" icon={IconUser}/>
                        </div>

                        <div className="lg:col-span-9 col-span-12 p-5 bg-background-snow rounded-lg">
                            <MasterPageInnerCard title="Total Roles" total="5" status="About the same as usual" icon={IconUserGroup}/>
                        </div>
                    </div>

                </div>

                <div className="col-span-12 ml-5 mr-5 mb-10">
                    <div className="mt-5 mb-5">
                        <MainHeader label="All Lists" />
                    </div>
                    <div className="border border-none rounded-lg bg-background-snow p-5">
                        
                    </div>
                </div>

            </div>
        </div>
    );
}
export default MasterPageAdmin;