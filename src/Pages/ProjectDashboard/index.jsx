import React, { useEffect, useState } from "react";

import ProjectProgressCard from "../../Components/ApexCharts/ProjectProgress";
import TaskOverviewCard from "../../Components/ApexCharts/TaskOverview";
import TaskOverviewCardProject from "../../Components/ApexCharts/TaskOverviewProject";
import DonutTaskOverviewProject from "../../Components/ApexCharts/TaskOverviewProject/chart";
import TaskOverviewProject from "../../Components/ApexCharts/TaskOverviewProject/chart";
import BudgetCard from "../../Components/Card/BudgetCard";
import CalendarCard from "../../Components/Card/Calendar/CalendarCard";
import CalendarTailwind from "../../Components/Card/CalendarTailwind/Calendar";
import HealthCard from "../../Components/Card/HealthCard";
import IssuesCard from "../../Components/Card/Issues/IssuesCard";
import ProjectOverviewCard from "../../Components/Card/ProjectOverviewCard";
import { PrintGantt, PrintTask, PrintTaskList } from "../../Components/Gantt-Component/CustomActivityState";
import { Actual, Budget, Client, Cost, CostHealth, Danger, ProjectManager, ScheduleHealth, Variance } from "../../Components/GraphQL/ProjectByIdQueries";
import ProjectDashboard from "./ProjectDashboard";

const ProjectDashboardPage = () => {
    // const [savedOption, setSavedOption] = React.useState(localStorage.getItem('projectID')/* ? localStorage.getItem('projectID') : "1"*/);
    const[ProjectID, setProjectID] = React.useState(localStorage.getItem('projectID'));

    useEffect(() => {
        setProjectID(localStorage.getItem('projectID'));
        // savedOption !=0 ? setSavedOption(savedOption) : setSavedOption(0);
        // console.log("savedOption", savedOption);
        // Update the savedOption value in local storage whenever it changes
        // localStorage.setItem('savedOption', savedOption);
    }, [ProjectID]);

    // const [project, setProject] = useState([
    //     { id: 1, name: "Project Anomaly 1", description: "This is project anomaly 1, totally the first one.", link: "/#/projectdashboard/1" },
    //     { id: 2, name: "Project Anomaly 2", description: "This is project anomaly 2, totally the second one.", link: "/#/projectdashboard/2" },
    //     { id: 3, name: "Project Anomaly 3", description: "This is project anomaly 3, totally the third one.", link: "/#/projectdashboard/3" },
    //     { id: 4, name: "Project Anomaly 4", description: "This is project anomaly 4, totally the fourth one.", link: "/#/projectdashboard/4" },
    //     { id: 5, name: "Project Anomaly 5", description: "This is project anomaly 5, totally the fifth one.", link: "/#/projectdashboard/5" },
    //     { id: 6, name: "Project Anomaly 6", description: "This is project anomaly 6, totally the sixth one.", link: "/#/projectdashboard/6" },
    // ]);

    return (
        // <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-18 lg:mt-0 mt-4 no-scrollbar">
        <>
            <ProjectDashboard data={ProjectID}/>

        </>
    );
}
export default ProjectDashboardPage;