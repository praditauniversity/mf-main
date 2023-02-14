// TODOLIST View charter list by id


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
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_CHARTER_DATA_BY_ID, GET_CHARTER_DATA_BY_USER_ID } from "../../GraphQL/Queries";
import FetchCharter from "../../../Middleware/Fetchers/FetchCharter";
import FetchProjectById from "../../../Middleware/Fetchers/FetchProjectById";
import { chart } from "highcharts";

const ProjectCharterCard = (props) => {
    const { projectID } = props;
    console.log("PROPS", projectID);
    const projectcharterdata = FetchProjectById({ projectID });
    console.log("PROJECTCHARTERDATA", projectcharterdata);
    // const [pcData, setPcData] = useState('');
    // const [reportCharterID, setReportCharterID] = useState(localStorage.getItem('charterID'));

    // const { data, error } = useQuery(GET_CHARTER_DATA_BY_USER_ID, {
    //     variables: { id: projectID },
    // });
    // const [itemID, setItemID] = useState([]);

    // useEffect(() => {
    //     const itemID = JSON.parse(localStorage.getItem('charterID'));
    //     if(itemID){
    //         setItemID(itemID);
    //     }
    //     if (data) {
    //         setPcData(data.projectByUserId.Data);
    //         reportCharterID == 0 ? localStorage.setItem('charterID', data.projectByUserId.Data[0].ID) : localStorage.setItem('charterID', reportCharterID);
    //         console.log("xxxxxxxxxxxxxxx", readPCData.projectByUserId.Data);
    //     }
    //     else {
    //         console.log("No data list project and milestone");
    //     }
    //     console.log("USE EFFECT list project and milestone");
    // }, [data, itemID]);

    // const handleChange = (event) => {
    //     setReportProjectID(event.target.value);
    //     localStorage.setItem('reportProjectID', event.target.value);
    //     window.location.reload();
    // };

    // const value = props.location.state.value;
    // console.log("VALCHARTER", value);

    // const { data } = useQuery(GET_CHARTER_DATA_BY_ID, {
    //     variables: { projectId: localStorage.getItem('charterID') }
    // });
    // const [charterData, setCharter] = useState([]);
    // // const [charterID, setCharterID] = useState(0);

    // useEffect(() => {
    //     if (data) {
    //         setCharter(data.projectCharter.data);
    //         // charterID === 0 ? localStorage.setItem('charterID', data.projectCharter.data[0].ID) : localStorage.setItem('charterID', charterID);
    //         console.log("Charter data with project id " + localStorage.getItem('charterID') + " found");
    //     } else {
    //         console.log("No data found for charter with project id " + localStorage.getItem('charterID'));
    //     }
    // }, [data]);

    // function printProjectName(){
    //     var projectName = "";
    //     charterData.map((charter) => {
    //         projectName = charter.Project.name;
    //     })
    //     return projectName;
    // }

    // const charterData = FetchCharter();

    return (
        <div className="rounded-xl shadow-lg bg-white py-16 px-4">
            <div>
                {/* Disini rencananya make localstorage yang charterID nya nampilin data sesuai charterID, tapi makai mapping gabsia kayaknya */}
                {projectcharterdata.map((charter) => {
                    // const identify = charter.ID;
                    if (charter.ID !== localStorage.getItem('charterID')) {
                        console.log("Sebelum - CharterID", charter.ID)
                        console.log("Sebelum - Local CharterID", localStorage.getItem('charterID'))
                        // charter.ID == localStorage.getItem('charterID');
                        // localStorage.setItem('charterID', charter.ID)
                        // localStorage.setItem(charter.ID, 'charterID')

                        console.log("Sesudah - CharterID", charter.ID)
                        console.log("Sesudah - Local CharterID", localStorage.getItem('charterID'))
                        console.log("====================================");
                    }
                    else {
                        console.log("ID NYA SAMA");
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
