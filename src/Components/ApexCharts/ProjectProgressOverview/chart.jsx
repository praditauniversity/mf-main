import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import FetchProjectByUserId from "../../../Middleware/Fetchers/FetchProjectByUserId";

export default function DualColumnChart() {

  let projectData = [];
  projectData = FetchProjectByUserId();

  const series = [
    {
      name: 'Planning',
      data: projectData.map((project) => project.cost_plan)
    }, {
      name: 'Actual',
      data: projectData.map((project) => project.cost_actual)
    }

  ]
  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        columnWidth: '60%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    colors: ["#7E57C2", "#1E88E5"],
    xaxis: {
      show: false,
      labels: {
        show: true,
        style: {
          fontSize: '11px',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        },
      },
      categories: projectData.map((project) => project.name),
      
    },
    yaxis: {
      show: false
    },
    grid: {
      show: false
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val
        }
      }
    },

  };

  return (
    <div>
      <Chart options={options} type="bar" series={series} width="100%" height="200%" />
    </div>
  );
}