import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function BarChart() {
    const series = [
        {
            name: 'Value',
            data: [42.5, 32.5, 32.5, 12.5, 12.5]
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