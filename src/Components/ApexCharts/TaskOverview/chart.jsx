import React, { useState } from "react";
import Chart from "react-apexcharts";
import FetchActivity from "../../../Middleware/Fetchers/FetchActivity";
import FetchGantt from "../../../Middleware/Fetchers/FetchGantt";
import FetchProjectByUserId from "../../../Middleware/Fetchers/FetchProjectByUserId";

export default function DonutChart() {
    //dashboard
    const projectData = FetchProjectByUserId();
    const ganttData = FetchGantt();
    const activityData = FetchActivity();

    function printTaskOverview() {
        let todo = 0;
        let inprogress = 0;
        let done = 0;

        projectData.map((project) => {
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

    // const series = [50, 25, 25];
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
        <div>
            <Chart options={options} type="donut" series={series} width="100%" height="70%" />
        </div>
    );
}