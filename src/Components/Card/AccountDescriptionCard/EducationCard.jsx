import React from "react";
import { IconEdit } from "../../Icons/icon";
import FutureUpdateEdit from "../../Modal/FutureUpdateModal/Edit (Profile Page)/FutureUpdateEdit";

const EducationCard = () => {

    const educationList = [
        { label: "2014 - 2017", degree: "Master Degree", value: "Master Degree in Computer Application", university: "University of Oxford, England" },
        { label: "2011 - 2013", degree: "Bachelor", value: "Bachelor Degree in Computer Engineering", university: "Imperial College London" },
        { label: "2009 - 2012", degree: "High School", value: "High School in Computer Science", university: "University of Oxford, England" },
    ]

    return (
        <div className="rounded-xl shadow-lg bg-white py-8 px-12">

            <div className="pb-5 border-b-2">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">Education</p>
                    <div><FutureUpdateEdit /></div>
                </div>
            </div>

            <div className="py-5">
                <div className="grid grid-cols-18">
                    <div className="col-span-18">


                        {educationList.map((item, index) => (
                            <div className="grid grid-cols-16 py-2" key={index}>
                                <div className="xl:col-span-4 col-span-8">
                                    <p className="text-sm font-semibold">{item.label}</p>
                                    <p className="text-xs opacity-70">{item.degree}</p>
                                </div>
                                <div className="xl:col-span-12 col-span-8">
                                    <p className="text-sm">{item.value}</p>
                                    <p className="text-xs opacity-70">{item.university}</p>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>

        </div>
    );
}

export default EducationCard;