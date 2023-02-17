import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useQuery } from '@apollo/client';
import FetchActivity from "../../../Middleware/Fetchers/FetchActivity";
import FetchGantt from "../../../Middleware/Fetchers/FetchGantt";
import FetchProject from "../../../Middleware/Fetchers/FetchProject";
import { GET_PROJECT_DATA_BY_ID } from "../../GraphQL/Queries";

const DonutTaskOverviewProject = (props) => {
    const { value } = props;

    const ganttData = FetchGantt();
    const activityData = FetchActivity();

    const { data} = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value },
        pollInterval: 1000,
    });

    const [projectDataID, setProjectDataID] = useState([]);

    useEffect(() => {
        if (data) {
            setProjectDataID(data.project.Data);
        } else {
            console.log("No data found for project with user id : ");
        }
    }, [data]);
    

    function printTaskOverview() {
        let todo = 0;
        let inprogress = 0;
        let done = 0;

        projectDataID.map((project) => {
            ganttData.map((gantt) => {
                activityData.map((activity) => {
                    if (project.ID === gantt.project_id && gantt.ID === activity.gantt_id) {
                        if (activity.phase.name === "Todo") {
                            todo++;
                        } else if (activity.phase.name === "In Progress") {
                            inprogress++;
                        } else if (activity.phase.name === "Done") {
                            done++;
                        }
                    }
                });
            });
        });

        return (
            [todo, inprogress, done]
        );
    }

    const series = printTaskOverview();
    const options = {
        chart: {
            id: 'task-overview-chart'
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#5E35B1", "#FDAC42", "#8AB73A"],
        labels: ['Todo', 'In Progress', 'Done'],
        legend: {
            show: true,
            position: 'left',
            fontFamily: 'inherit',
            labels: {
                colors: 'inherit'
            },
            itemMargin: {
                horizontal: 3,
                vertical: 3
            },
            formatter: (seriesName, opts) => `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`
        }
    };
    return (
        <div className="rounded-xl shadow-lg bg-white py-6 px-12">
            <div>
                <div className="pt-4 pb-0 flex justify-between">
                    <p className="text-sm ">Task Overview Project</p>
                </div>
            </div>
            <div className="py-4">
                <Chart options={options} type="donut" series={series} width="100%" height="70%" />
            </div>
        </div>
    );
}

export default DonutTaskOverviewProject;