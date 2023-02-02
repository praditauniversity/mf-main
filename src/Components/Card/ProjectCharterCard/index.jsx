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

const ProjectCharterCard = (props) => {
    const { projectID } = props;
    console.log("PROPS", projectID);
    const projectcharterdata = FetchProjectById({projectID});
    console.log("PROJECTCHARTERDATA", projectcharterdata);
    const [pcData, setPcData] = useState('');
    const [reportCharterID, setReportCharterID] = useState(localStorage.getItem('charterID'));

    const { data, error } = useQuery(GET_CHARTER_DATA_BY_USER_ID, {
        variables: { id: projectID },
    });
    const [itemID, setItemID] = useState([]);

    useEffect(() => {
        const itemID = JSON.parse(localStorage.getItem('charterID'));
        if(itemID){
            setItemID(itemID);
        }
        if (data) {
            setPcData(data.projectByUserId.Data);
            reportCharterID == 0 ? localStorage.setItem('charterID', data.projectByUserId.Data[0].ID) : localStorage.setItem('charterID', reportCharterID);
            console.log("xxxxxxxxxxxxxxx", readPCData.projectByUserId.Data);
        }
        else {
            console.log("No data list project and milestone");
        }
        console.log("USE EFFECT list project and milestone");
    }, [data, itemID]);

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

    const charterData = FetchCharter();

    return (
        <div className="rounded-xl shadow-lg bg-white py-4 px-4">
            <div>
                {/* Disini rencananya make localstorage yang charterID nya nampilin data sesuai charterID, tapi makai mapping gabsia kayaknya */}
                {charterData.map((charter) => {
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
                            <div className="pt-4 pb-0 flex justify-between">
                                <div className="flex justify-start">
                                    <p className="text-xl font-semibold px-2">Project Charter</p>
                                </div>
                                <div className="flex justify-end">
                                    <div className="flex justify-between">
                                    </div>
                                </div>
                            </div>
                            <div className="px-36">
                                <div className="py-6 flex justify-between">
                                    <div> <DescTitle title="Project Name" description={charter.name} /></div>
                                    <div> <DescTitle title="Project Manager" description="Jhon Doe" /></div>
                                    <div> <DescTitle title="Customer" description={charter.client} /></div>
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
