import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@apollo/client";
import FetchProjectByUserId from "../../../Middleware/Fetchers/FetchProjectByUserId";
import { SumActual } from "../../GraphQL/ProjectQueries";
import GetProfile from "../../Auth/GetProfile";
import { GET_PROJECT_DATA_BY_ID } from "../../GraphQL/Queries";

export default function BarChart(props) {
    
    const profile = GetProfile();
    const { value } = props;
    const { data, loading, error } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            console.log("Project Data Available");
            setProject(data.project.Data);
        } else {
            console.log("No data");
        }
    }, [data]);
  function printDataFinance() {
    let sumBudget = 0;
    let sumAct = 0;
    let sumCost = 0;
    let sumDanger = 0;
    let sumVariance = 0;

    projectData.map((project) => {
        if (profile.id === project.user_id) {
            sumBudget = sumBudget + project.budget;
            sumAct = sumAct + project.cost_actual;
            sumCost = sumCost + project.cost_plan;
            const tempDanger = sumDanger + (sumCost - sumAct);
            sumDanger = tempDanger <= 0 ? tempDanger * -1 : 0;
            const tempVariance = sumVariance + (sumBudget - sumAct);
            sumVariance = tempVariance <= 0 ? tempVariance * -1 : 0;
        }
    });
    return (
        [   sumBudget % 1 !== 0 ? sumBudget.toFixed(2) : sumBudget,
            sumAct % 1 !== 0 ? sumAct.toFixed(2) : sumAct,
            sumCost % 1 !== 0 ? sumCost.toFixed(2) : sumCost,
            sumDanger % 1 !== 0 ? sumDanger.toFixed(2) : sumDanger,
            sumVariance % 1 !== 0 ? sumVariance.toFixed(2) : sumVariance
        ]
    );
  }

    const series = [
        {
            name: 'Value',
            data: printDataFinance()
        }
    ]
    const options = {
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                columnWidth: '55%',
                distributed: true,
                endingShape: 'rounded'
            }
        },
        colors: ["#1565C0", "#4527A0", "#FF8800", "#C62828", "#82A027"],
        xaxis: {
            categories: ["Budget", "Actual", "Cost", "Danger", "Variance"]
        },
        yaxis: {
            show: true
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: false
        },
        legend: {
            show: false
        }
    };
    return (
        <div>
            <Chart options={options} type="bar" series={series} width="100%" height="200%" />
        </div>
    );
}