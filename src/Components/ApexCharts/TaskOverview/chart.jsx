import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function DonutChart() {
    const series = [50, 25, 25];
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