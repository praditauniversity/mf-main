import React from "react";
import FutureUpdateEdit from "../../Modal/FutureUpdateModal/Edit (Profile Page)/FutureUpdateEdit";

const SkillsCard = () => {

    const columnCount = 2; // Number of columns
    const maxItemsPerColumn = 5; // Maximum number of items per column

    const skillsList = [
        { label: "HTML", level: "Expert" },
        { label: "PHP", level: "Expert" },
        { label: "Database", level: "Expert" },
        { label: "React", level: "Intermediete" },
        { label: "CSS", level: "Intermediete" },
        { label: "Javascript", level: "Intermediete" },
        { label: "Laravel", level: "Intermediete" },
        { label: "NodeJS", level: "Beginner" },
        { label: "Python", level: "Beginner" },
        { label: "Java", level: "Beginner" },
    ]

    const columnizedSkillsList = Array.from({ length: Math.ceil(skillsList.length / maxItemsPerColumn) }, (_, i) =>
        skillsList.slice(i * maxItemsPerColumn, (i + 1) * maxItemsPerColumn)
    );

    return (
        <div className="rounded-xl shadow-lg bg-white py-8 px-12">

            <div className="pb-5 border-b-2">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">Skills</p>
                    <div><FutureUpdateEdit /></div>
                </div>
            </div>

            <div className="py-5">
                <div className="grid grid-cols-18">
                    <div className="col-span-18">

                        <div className="grid grid-cols-2">
                            {columnizedSkillsList.map((items, index) => (
                                <div className="col-span-1" key={index}>
                                    {items.map((item, i) => (
                                        <div key={i} className="py-2">
                                            <p className="text-sm">{item.label}</p>
                                            <p className="text-xs opacity-70">{item.level}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SkillsCard;