import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function DualLineChart() {
    const series = [
        {
            name: 'Plan Curve',
            data: [40, 80, 120, 70, 100, 120, 90, 150, 200]
        },
        {
            name: 'Actual Curve',
            data: [20, 20, 45, 60, 39, 52, 79, 82, 120]
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
            count: [2, 3],
            dashArray: [10, 5]
        }
    };
    return (
        <div>
            <Chart options={options} type="line" series={series} width="100%" height="200%" />
        </div>
    );
}