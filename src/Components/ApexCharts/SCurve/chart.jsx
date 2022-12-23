import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function DualLineChart() {
    const series = [
        {
            name: 'Plan Curve',
            data: [0, 2, 15, 40, 68, 84, 90, 97, 100]
        },
        {
            name: 'Actual Curve',
            data: [0, 2, 8, 30, 40, 66, 78, 85, 90]
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
        colors: ["#1565C0", "#FF8800"],
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
        forecastDataPoints: {
            // count: [2, 3],
            // dashArray: [10, 5]
            count: [2]
        }
    };
    return (
        <div>
            <Chart options={options} type="line" series={series} width="100%" height="200%" />
        </div>
    );
}