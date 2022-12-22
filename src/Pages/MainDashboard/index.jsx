import React from "react";
import Accordion from "../../Components/Accordion";
import "./scrollbar.css"
import FetchProject from "../../Middleware/Fetchers/FetchProject";

const MainDashboard = () => {
    // const [options, setOptions] = useState([
    //     { id: 1, name: "Project Anomaly 1", link: "/#/project-anomaly-1" },
    //     { id: 2, name: "Project Anomaly 2", link: "/#/project-anomaly-2"},
    // ]);

    const project = FetchProject();
    const projectLength = project.length;

    // const data = [
    //     {
    //         id: 1,
    //         name: "Project Anomaly 1",
    //         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nunc. Sed euismod, nunc sit amet aliquam lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nunc.",
    //         link: "/#/project-anomaly-1",
    //     },
    //     {
    //         id: 2,
    //         name: "Project Anomaly 2",
    //         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nunc. Sed euismod, nunc sit amet aliquam lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nunc.",
    //         link: "/#/project-anomaly-2",
    //     }
    // ]

    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-2">
            <div className="col-span-12">
                <div className="col-span-12 ml-5 mb-10 mr-5">
                    <div className="flex items-center mb-3">
                        <h3 className="font-bold text-2xl mt-3">On-going Project</h3>
                        <div className="border border-none rounded-full bg-base-100 bg-primary ml-[20px] mt-3 flex items-center p-[5px] pr-[14px] pl-[14px]">
                            <h6 className="text-bold text-lg text-white">
                                {projectLength}
                            </h6>
                        </div>
                    </div>
                    
                    <div className="mt-2 border border-none rounded-lg bg-base-100 bg-background-snow p-5 overflow-y-scroll h-[320px] scrollbar">
                        <Accordion data={project} />
                    </div>
                    
                </div>

                <div className="col-span-12 ml-5 mr-5">
                    <h3 className="font-bold text-2xl mt-5 mb-5">Remaining Task</h3>
                    <div className="mt-2 border border-none rounded-lg bg-base-100 bg-background-snow p-5 h-[320px]">

                    </div>
                </div>
            
            </div>

            <div className="col-span-6">
                <h3 className="font-bold text-2xl ml-5 mt-5">Daily Reminder</h3>
            </div>
        </div>
    );
}
export default MainDashboard;