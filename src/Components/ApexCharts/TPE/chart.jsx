import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_DATA } from "../../GraphQl/Queries";

export default function BarChart() {

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

  function printDataFinance() {
    var sumBudget = 0;
    var sumAct = 0;
    var sumCost = 0;
    var sumDanger = 0;
    var variance = 0;
    var projectCurrency = "";
    projectdata.map((project) => {
      sumBudget = sumBudget + project.budget;
      sumAct = sumAct + project.cost_actual;
        sumCost = sumCost + project.cost_plan;
        sumDanger = sumAct - sumCost ;
        variance = sumBudget - sumAct;
      projectCurrency = project.currency_symbol;
    });
    return (
      [sumBudget, sumAct, sumCost, sumDanger, variance]
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
            show: false
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