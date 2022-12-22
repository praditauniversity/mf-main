import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@apollo/client";
import { ProjectHealth } from "../../GraphQl/ProjectQueries";
import { GET_PROJECT_DATA } from "../../GraphQl/Queries";

export default function DonutChart2() {
    const { error, loading, data } = useQuery(GET_PROJECT_DATA);
  const [projectdata, setProject] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("Data Ready");
      console.log(data);
      setProject(data.project.Data);
    } else {
      console.log("No data");
    }
  }, [data]);

  function printProjectHealth() {
    let projectbudgetonbudget = 0;
    let projectbudgetwarning = 0;
    let projectbudgetoverbudget = 0;

    projectdata.map((projectHealth) => {
      // count budget health by status
      if (projectHealth["budget_health"] === "On Budget") {
        projectbudgetonbudget += 1;
      } else if (projectHealth["budget_health"] === "Early Warning") {
        projectbudgetwarning += 1;
      } else if (projectHealth["budget_health"] === "Cost Overrun") {
        projectbudgetoverbudget += 1;
      }
    });

    return (
      [projectbudgetoverbudget, projectbudgetwarning, projectbudgetonbudget]
    );
  }
    const options = {
        chart: {
            height: 350,
            type: "line",
            id: 'task-overview-chart'
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#C62828", "#FDAC42", "#88B135"],
        labels: ['Cost Overrun', 'Early Warning', 'On Budget'],
        legend: {
            show: true,
            position: 'right',
            fontFamily: 'inherit',
            labels: {
                colors: 'inherit'
            },
            itemMargin: {
                horizontal: 10,
                vertical: 10
            },
            formatter: (seriesName, opts) => `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`
        }
    }
    return (
        <div>
            <Chart options={options} type="donut" series={printProjectHealth()} width="100%" height="200%" />
        </div>
    );
}
