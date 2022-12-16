import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function DonutChart2() {
    const series = [10, 3, 5];
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
    };
    return (
        <div>
            <Chart options={options} type="donut" series={series} width="100%" height="200%" />
        </div>
    );
}