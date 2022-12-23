import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function DualLineChart() {
    const series = [
        {
            name: 'Plan Curve',
            data: [10, 20, 40, 60, 80, 95, 100, 105, 115]
        },
        {
            name: 'Actual Curve',
            data: [5, 10, 20, 40, 50, 60, 70, 80, 90]
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