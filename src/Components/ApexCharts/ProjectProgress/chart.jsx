import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function RadialChart() {
    const series = [70, 80, 90, 100, 100, 100, 100];
    const options = {
        chart: {
            // type: 'radialBar',
            width: 450,
            height: 450
        },
        plotOptions: {
            radialBar: {
                position: 'center',
                offsetY: 0,
                startAngle: 0,
                endAngle: 360,
                hollow: {
                    margin: 0,
                    size: '0%',
                    background: 'transparent',
                    image: undefined
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        show: false
                    }
                }
            }
        },
        stroke: {
            lineCap: 'round'
        },
        labels: ['Closing', 'Evaluation', 'Testing', 'Execution', 'Research', 'Planning', 'Initiation'],
        legend: {
            show: true,
            fontSize: '10px',
            position: 'right',
            offsetX: 0,
            offsetY: 0,
            labels: {
                useSeriesColors: true
            },
            markers: {
                size: 0
            },
            formatter: (seriesName, opts) => `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`,
            itemMargin: {
                vertical: 3
            }
        },
        responsive: [
            {
                breakpoint: 450,
                chart: {
                    width: 280,
                    height: 280
                },
                options: {
                    legend: {
                        show: false,
                        position: 'bottom'
                    }
                }
            }
        ]
    };
    return (
        <div>
            <Chart options={options} type="radialBar" series={series} width="100%" height="150%" />
        </div>
    );
}