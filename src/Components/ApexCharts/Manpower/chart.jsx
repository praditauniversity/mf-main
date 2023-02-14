import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function LineChart() {
    // Still static data
    const series = [
        {
            name: 'Manpower',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
    ]
    const options = {
        chart: {
            height: 350,
            type: "line",
            stacked: false,
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        colors: ["#7E57C2"],
        plotOptions: {
            bar: {
                columnWidth: "20%"
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        yaxis: {
            show: false
        },
        grid: {
            show: false
        },
        legend: {
            show: false
        },
    };
    return (
        <div>
            <Chart options={options} type="line" series={series} width="100%" height="200%" />
        </div>
    );
}