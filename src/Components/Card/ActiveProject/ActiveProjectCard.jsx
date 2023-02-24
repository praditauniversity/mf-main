import React from "react";
import FetchProjectByUserId from "../../../Middleware/Fetchers/FetchProjectByUserId";
import FutureUpdateDeleteText from "../../Modal/FutureUpdateModal/Edit & Delete text/FutureUpdateDeleteText";
import FutureUpdateEditText from "../../Modal/FutureUpdateModal/Edit & Delete text/FutureUpdateEditsText";

const ActiveProjectCard = () => {

    const project = FetchProjectByUserId();

    const projectFilter = project.filter((item) => {
        const todayDate = new Date();
        const startDate = new Date(item.start_project);
        const endDate = new Date(item.end_project);
        return startDate <= todayDate && endDate > todayDate;
    });

    const projectLength = projectFilter.length;

    const ifActiveProjectEmpty = () => {
        if (projectLength === 0) {
            return (
                <div className="h-full" >
                    <div colSpan="7" className="text-center py-24">
                        <div className="text-gray-400">
                            <div className="text-5xl font-bold">No Active Project</div>
                            <div className="text-xl">Please take your time</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const filteredProjects = projectFilter
        .sort((a, b) => {
            return new Date(a.start_project) - new Date(b.start_project);
        })
        .slice(0, 6);

    return (
        <div className="rounded-xl shadow-lg bg-white">
            <div>
                <div className="pt-8 pb-8 pl-12 pr-12 flex justify-between">
                    <div className="flex justify-start">
                        <p className="text-lg font-semibold ">Active Projects</p>
                    </div>
                </div>
            </div>
            <div className="h-96 border-t-2 border-b-2">
                <div className="pt-6 pb-6 pl-12 pr-12">
                {filteredProjects.map((item) => {
                    const todayDate = new Date();
                    const startDate = new Date(item.start_project);
                    const endDate = new Date(item.end_project);
                    
                    if (startDate <= todayDate && endDate > todayDate) {
                        return (
                            <div className="pt-4">
                                <div className="flex justify-between">
                                    <div className="flex justify-start">
                                        <p className="text-base font-semibold ">{item.name}</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="dropdown dropdown-button dropdown-end">
                                            <button tabIndex={0} className="text-base font-black">:</button>
                                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                                                <li>
                                                    <FutureUpdateEditText/>
                                                </li>
                                                <li>
                                                    <FutureUpdateDeleteText/>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-start">
                                    <p className="text-xs opacity-70 align-text-bottom">{item.work_area ? item.work_area : "N/A"}</p>
                                </div>
                            </div>
                        )
                    }
                })}  
                {ifActiveProjectEmpty()}
                </div>
            </div>
            <div className="pt-8 pb-8 pl-12 pr-12 flex justify-end">
                <button className="font-semibold text-sm text-primary">
                    <a href="/#/project-list">View All Projects</a>
                </button>
            </div>
        </div>
    )

}

export default ActiveProjectCard;