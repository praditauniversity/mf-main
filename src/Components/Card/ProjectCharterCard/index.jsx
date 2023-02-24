import React from "react";
import DescTitle from "./desctitle";
import DescTitleBudget from "./desctitlebudget";
import DescTitleBudgetPadding from "./desctitlebudgetpadd";
import DescTitlePadding from "./desctitlepadd";
import List from "./list";
import Title from "./title";
import TitleMilestone from "./titlemilestone";
import '../../../Assets/svgbutton/svgbutton.css'
import FetchProjectById from "../../../Middleware/Fetchers/FetchProjectById";
const ProjectCharterCard = (props) => {
    const { projectID } = props;
    const projectcharterdata = FetchProjectById({ projectID });

    return (
        <div className="rounded-xl shadow-lg bg-white py-16 px-4">
            <div>
                {projectcharterdata.map((charter) => {
                    if (charter.ID !== localStorage.getItem('charterID')) {
                        // console.log("Different ID")
                    }
                    else {
                        // console.log("same ID");
                    }
                    return (
                        <div key={charter.item}>
                            <div className="flex justify-between">
                                <div className="flex justify-start">
                                    <p className="text-xl font-bold leading-6 px-24 pb-8">Project Charter</p>
                                </div>
                            </div>
                            <div className="px-36">
                                <div>
                                    <div className="grid grid-cols-12 py-6 flex justify-between">
                                        <div className="col-span-5">
                                            <DescTitle title="Project Name" description={charter.name} />
                                        </div>
                                        <div className="col-span-5">
                                            <DescTitle title="Project Manager" description={charter.project_manager ? charter.project_manager : "N/A"} />
                                        </div>
                                        <div className="col-span-2">
                                            <DescTitle title="Customer" description={charter.client ? charter.client : "N/A"} />
                                        </div>
                                    </div>
                                </div>

                                <div className="py-6 flex justify-start">
                                    <div>
                                        <DescTitle title="Project Description" description={charter.description ? charter.description : "N/A"} />
                                    </div>
                                </div>

                                <div className="py-6 flex justify-start">
                                    <div>
                                        <div><Title title="Project Objective" /></div>
                                        <div>
                                            {charter.project_objectives.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <List description={item ? item : "N/A"} />
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 py-6 flex justify-between">
                                    <div className='col-span-5'>
                                        <DescTitle title="Project Team Members" description={charter.total_man_power} />
                                    </div>
                                    <div className='col-span-5'>
                                        <DescTitlePadding title="Stakeholders" description={charter.stakeholder_ammount} />
                                    </div>
                                </div>

                                <div className="py-6 flex justify-between">
                                    <DescTitle title="Participants" description={charter.participants} />
                                </div>

                                <div className="grid grid-cols-12 py-6 flex justify-between">
                                    <div className='col-span-5'>
                                        <DescTitleBudget title="Planned Budget" description={charter.cost_plan} />
                                    </div>
                                    <div className='col-span-5'>
                                        <DescTitleBudgetPadding title="Actual Budget" description={charter.cost_actual} />
                                    </div>
                                </div>

                                <div className="py-6 flex justify-start">
                                    <div>
                                        <Title title="Resources" />
                                        <div>
                                            {charter.available_resources.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <List description={item ? item : "N/A"} />
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                                    <TitleMilestone title="Milestone" />
                                    <div className="grid grid-cols-12 pb-6 flex justify-between">
                                        <div className='col-span-5'>
                                            <DescTitle title="Start Date" description={charter.start_project.substring(0, 10)} />
                                        </div>
                                        <div className='col-span-5'>
                                            <DescTitlePadding title="End Date" description={charter.end_project.substring(0, 10)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="py-6 flex justify-start">
                                    <div>
                                        <Title title="Potential Risks" />
                                        <div>
                                            {charter.potential_risk.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <List description={item ? item : "N/A"} />
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ProjectCharterCard;
