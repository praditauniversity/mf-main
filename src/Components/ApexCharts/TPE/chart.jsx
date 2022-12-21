import React, { useState } from "react";
import Chart from "react-apexcharts";
import { SumActual, SumBudget, SumCost, SumDanger, Variance } from "../../GraphQl/ProjectQueries";

export default function BarChart() {

    const series = [
        {
            name: 'Value',
            data: [SumBudget, SumActual, SumCost, SumDanger, Variance]
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