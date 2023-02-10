import React from "react";
import Accordion from "../../Components/Accordion";
import Counter from "../../Components/Counter";
import Tabs from "../../Components/Tabs";
import TabsDailyReminder from "../../Components/Tabs/tabsDailyReminder";
import FetchProjectByUserId from "../../Middleware/Fetchers/FetchProjectByUserId";
import "./scrollbar.css";

const MainDashboard = () => {
    const project = FetchProjectByUserId();

    // const [project, setProject] = useState([
    //     { id: 1, name: "Project Anomaly 1", description: "This is project anomaly 1, totally the first one.", link: "/#/projectdashboard/1" },
    //     { id: 2, name: "Project Anomaly 2", description: "This is project anomaly 2, totally the second one.", link: "/#/projectdashboard/2" },
    //     { id: 3, name: "Project Anomaly 3", description: "This is project anomaly 3, totally the third one.", link: "/#/projectdashboard/3" },
    //     { id: 4, name: "Project Anomaly 4", description: "This is project anomaly 4, totally the fourth one.", link: "/#/projectdashboard/4" },
    //     { id: 5, name: "Project Anomaly 5", description: "This is project anomaly 5, totally the fifth one.", link: "/#/projectdashboard/5" },
    //     { id: 6, name: "Project Anomaly 6", description: "This is project anomaly 6, totally the sixth one.", link: "/#/projectdashboard/6" },
    // ]);
    // const projectLength = project.length;

    const projectLength = project.filter((item) => {
        const todayDate = new Date();
        const startDate = new Date(item.start_project);
        const endDate = new Date(item.end_project);
        return startDate <= todayDate && endDate > todayDate;
    }).length;

    const ifOnGoingProjectEmpty = () => {
        if (projectLength === 0) {
            // fill the table with white space
            return (
                <div className="h-full" >
                    <div colSpan="7" className="text-center py-24">
                        <div className="text-gray-400">
                            <div className="text-5xl font-bold">No On-going Project</div>
                            <div className="text-xl">Please take your time</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const MainHeader = (label) => {
        return (
            <>
                <h3 className="font-bold text-lg">{label}</h3>
            </>
        );
    };

    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-2 mb-7">
            <div className="2xl:col-span-12 col-span-12 h-100">
                <div className="col-span-12 ml-5 mb-10 mr-5 h-100">
                    <div className="flex items-center mb-3 mt-3">
                        <h3 className="font-bold text-lg">On-going Project</h3>
                        <Counter value={projectLength} textColor="white" bgColor="primary" />
                    </div>

                    <div className="mt-2 border border-none rounded-lg bg-base-100 bg-background-snow p-5 overflow-y-scroll h-[320px] scrollbar">
                        <Accordion data={project} />
                        {ifOnGoingProjectEmpty()}
                    </div>

                </div>

                <div className="col-span-12 ml-5 mr-5 mb-10">
                    <h3 className="font-bold text-lg mt-5 mb-5">Remaining Task</h3>
                    <div className="border border-none rounded-lg bg-background-snow p-5">
                        <Tabs />
                    </div>
                </div>

            </div>

            <div className="2xl:col-span-6 col-span-12 ml-5">
                <div className="flex items-center mb-3">
                    <h3 className="font-bold text-lg mt-5">Daily Reminder</h3>
                </div>

                <div className="mt-2 border border-none rounded-lg bg-background-snow p-5 mr-5 2xl:min-h-[900px] min-h-none">
                    {/* <fCalendar /> */}
                    <TabsDailyReminder />
                </div>
            </div>
        </div>
    );
}
export default MainDashboard;