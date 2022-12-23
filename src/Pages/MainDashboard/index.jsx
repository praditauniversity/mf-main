import React from "react";
import Accordion from "../../Components/Accordion";
import "./scrollbar.css"
import FetchProject from "../../Middleware/Fetchers/FetchProject";
import Tabs from "../../Components/Tabs";
import Counter from "../../Components/Counter";
import TabsDailyReminder from "../../Components/Tabs/tabsDailyReminder";
import { useState } from "react";

const MainDashboard = () => {
    // const project = FetchProject();

    const [project, setProject] = useState([
        { id: 1, name: "Project Anomaly 1", description: "This is project anomaly 1, totally the first one.", link: "/#/projectdashboard/1" },
        { id: 2, name: "Project Anomaly 2", description: "This is project anomaly 2, totally the second one.", link: "/#/projectdashboard/2" },
        { id: 3, name: "Project Anomaly 3", description: "This is project anomaly 3, totally the third one.", link: "/#/projectdashboard/3" },
        { id: 4, name: "Project Anomaly 4", description: "This is project anomaly 4, totally the fourth one.", link: "/#/projectdashboard/4" },
        { id: 5, name: "Project Anomaly 5", description: "This is project anomaly 5, totally the fifth one.", link: "/#/projectdashboard/5" },
        { id: 6, name: "Project Anomaly 6", description: "This is project anomaly 6, totally the sixth one.", link: "/#/projectdashboard/6" },
    ]);
    const projectLength = project.length;

    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-2 mb-7">
            <div className="col-span-12 h-screen">
                <div className="col-span-12 ml-5 mb-10 mr-5 h-100">
                    <div className="flex items-center mb-3 mt-3">
                        <h3 className="font-bold text-2xl">On-going Project</h3>
                        <Counter value={projectLength} textColor="white" bgColor="primary"/>
                    </div>
                    
                    <div className="mt-2 border border-none rounded-lg bg-base-100 bg-background-snow p-5 overflow-y-scroll h-[320px] scrollbar">
                        <Accordion data={project} />
                    </div>
                    
                </div>

                <div className="col-span-12 ml-5 mr-5 mb-10">
                    <h3 className="font-bold text-2xl mt-5 mb-5">Remaining Task</h3>
                    <div className="border border-none rounded-lg bg-background-snow p-5">
                        <Tabs />
                    </div>
                </div>
            
            </div>

            <div className="xl:col-span-6 lg:col-span-12 ml-5">
                <div className="flex items-center mb-3">
                    <h3 className="font-bold text-2xl mt-5">Daily Reminder</h3>
                </div>

                <div className="mt-2 border border-none rounded-lg bg-background-snow p-5 mr-5 h-[950px]">
                    {/* <fCalendar /> */}
                    <TabsDailyReminder />
                </div>
            </div>
        </div>
    );
}
export default MainDashboard;