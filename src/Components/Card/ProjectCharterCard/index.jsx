import React from "react";
import DescTitle from "./desctitle";
import DescTitleBudget from "./desctitlebudget";
import DescTitleBudgetPadding from "./desctitlebudgetpadd";
import DescTitlePadding from "./desctitlepadd";
import List from "./list";
import MilestoneDue from "./milestonedue";
import Title from "./title";
import TitleMilestone from "./titlemilestone";
import { IconPlus, IconEdit, IconDelete, IconList } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css'
import DeleteModal from "../../Modal/ProjectCharterModal/DeleteModal/DeleteModal";
import AddModalProjectCharter from "../../Modal/ProjectCharterModal/AddModal/AddModal";
import ProjectCharterPage from "./indexProjectCharter";

const ProjectCharterCard = (props) => {
    const { icon } = props;
    // const { value } = props.location.state;
    return (
        <div className="rounded-xl shadow-lg bg-white py-4 px-4">
            <div>
                <div className="pt-4 pb-0 flex justify-between">
                    <div className="flex justify-start">
                        <p className="text-xl font-semibold px-2">Project Charter</p>
                    </div>
                    <div className="flex justify-end">
                        <div className="flex justify-between">
                            <AddModalProjectCharter/>
                            {/* <button className="px-1" id="icon"><IconPlus /></button> */}
                            <button className="px-1" id="icon"><IconEdit /></button>
                            <DeleteModal/>
                            {/* <button className="px-1" id="icon"><IconDelete /></button> */}
                        </div>
                    </div>
                </div>
                <div className="px-36">
                    <div className="py-6 flex justify-between">
                        <div> <DescTitle title="Project Name" description="Project Anomaly" /></div>
                        <div> <DescTitle title="Project Manager" description="Jhon Doe" /></div>
                        <div> <DescTitle title="Customer" description="Jaya Gedung Group" /></div>
                    </div>

                    <div className="py-6 flex justify-start">
                        <div>
                            <DescTitle title="Project Description" description="The purpose of this project is to build applications of anomaly detection include fraud detection in many case, i.e. financial transactions, fault detection in manufacturing, intrusion detection in a computer network, monitoring sensor readings in an aircraft, spotting potential risk or medical problems in health data, and predictive maintenance." />
                        </div>
                    </div>

                    <div className="py-6 flex justify-start">
                        <div>
                            <div><Title title="Project Objective" /></div>
                            <div>
                                <List description="Requirement Gathering for Anomaly Application" />
                                <List description="Prototype and designing Anomaly Application for multiplatform" />
                                <List description="Implementation and building Anomaly Application" />
                                <List description="Testing Anomaly Application" />
                                <List description="Maintenance Anomaly Application" />
                            </div>
                        </div>
                    </div>

                    <div className="py-6 flex justify-between">
                        <DescTitle title="Project Team Members" description="Jhon Doe, Jhon Doe" />
                        <DescTitlePadding title="Stakeholders" description="Doe Jhon" />
                    </div>

                    <div className="py-6 flex justify-between">
                        <DescTitle title="Participants" description="100" />
                    </div>

                    <div className="py-6 flex justify-between">
                        <DescTitleBudget title="Planned Budget" description="350.000.000,00" />
                        <DescTitleBudgetPadding title="Actual Budget" description="210.000.000,00" />
                    </div>

                    <div className="py-6 flex justify-start">
                        <div>
                            <Title title="Resources" />
                            <div>
                                <List description="10 Computer" />
                                <List description="45 Manpower" />
                                <List description="45 Project equipments" />
                                <List description="Etc" />
                            </div>
                        </div>
                    </div>

                    <div className="py-6">
                        <TitleMilestone title="Milestone" />
                        <div className="flex justify-between">
                            <DescTitle title="Start Date" description="October 13 2022" />
                            <DescTitlePadding title="End Date" description="December 25 2024" />
                        </div>
                    </div>

                    {/* <div className="py-6">
                        <TitleMilestone title="Milestone" />
                        <div className="flex justify-between">
                            <MilestoneDue title="Initiation" description="Dec 23 2022" />
                            <MilestoneDue title="Planning" description="Mar 14 2023" />
                            <MilestoneDue title="Execution" description="Aug 17 2024" />
                            <MilestoneDue title="Evaluation" description="Dec 3 2024" />
                            <MilestoneDue title="Closing" description="Dec 24 2024" />
                        </div>
                    </div> */}

                    <div className="py-6 flex justify-start">
                        <div>
                            <Title title="Potential Risks" />
                            <div>
                                <List description="Low Performance" />
                                <List description="High Costs" />
                                <List description="Operational Changes" />
                                <List description="Scope Creep" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* <div className="py-4">
            </div>
            <div className="py-4 flex justify-end">
                <button className="font-semibold text-sm text-primary">
                    Detail Project Overview
                </button>
            </div> */}
        </div>
    );
};

export default ProjectCharterCard;
