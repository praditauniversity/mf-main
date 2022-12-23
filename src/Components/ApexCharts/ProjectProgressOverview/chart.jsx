import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function DualColumnChart() {
  const series = [
    {
      name: 'Planning',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 80]
    }, {
      name: 'Actual',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 120]
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
      labels:{
        show: true,
        style: {
          fontSize: '11px',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
      },
      },
      categories: ['Gedung Tenanga Panel Surya', 'Pembangunan Gedung Tower ABC', 'Tower Jaringan Jawa Barat', 'Tower Jaringan Jawa Timur', 'Tower Jaringan Jawa Tengah', 'Tower Jaringan Bali', 'Project Tower ABC', 'Tower Jaringan DKI Jakarta', 'Tower Jaringan NTT'],
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
          return "$ " + val + " thousands"
        }
      }
    }
  };
  return (
    <div>
      <Chart options={options} type="bar" series={series} width="100%" height="200%" />
    </div>
  );
}