import React from "react";
import FutureUpdateEdit from "../../Modal/FutureUpdateModal/Edit (Profile Page)/FutureUpdateEdit";

const EmploymentCard = () => {

    const employmentList = [
        { label: "Current", level: "Senior", jobdesk: "Senior UI/UX Designer", company: "Google" },
        { label: "2014 - 2017", level: "Senior", jobdesk: "Senior UI/UX Designer", company: "Google" },
    ]

    return (
        <div className="rounded-xl shadow-lg bg-white py-8 px-12">

            <div className="pb-5 border-b-2">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">Employment</p>
                    <div><FutureUpdateEdit /></div>
                </div>
            </div>


            <div className="py-5">
                <div className="grid grid-cols-18">
                    <div className="col-span-18">

                        {employmentList.map((item, index) => (
                            <div className="grid grid-cols-16 py-2" key={index}>
                                <div className="xl:col-span-4 col-span-8">
                                    <p className="text-sm font-semibold">{item.label}</p>
                                    <p className="text-xs opacity-70">{item.level}</p>
                                </div>
                                <div className="xl:col-span-12 col-span-8">
                                    <p className="text-sm">{item.jobdesk}</p>
                                    <p className="text-xs opacity-70">{item.company}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

        </div>
    );
}

export default EmploymentCard;