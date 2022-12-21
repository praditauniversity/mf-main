import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import './radialChart.css'
import UserImage from "../../../Assets/Images/png/User.png";

// ===========================|| RADIAL BAR CHART ||=========================== //

const ApexRedialBarChart = () => {
  const options = {
    title: {
      text: 'My chart'
    },
    series: [{
      data: [1, 2, 3]
    }]
  }

  var chartradial = new Highcharts.chart('container', {
    colors: ['#FFD700', '#C0C0C0', '#CD7F32'],
    chart: {
      type: 'column',
      inverted: true,
      polar: true,
      renderTo:'container'
    },
    title: {
      text: 'Winter Olympic medals per existing country (TOP 5)'
    },
    subtitle: {
      text: 'Source: ' +
        '<a href="https://en.wikipedia.org/wiki/All-time_Olympic_Games_medal_table"' +
        'target="_blank">Wikipedia</a>'
    },
    tooltip: {
      outside: true
    },
    pane: {
      size: '85%',
      innerSize: '20%',
      endAngle: 270
    },
    xAxis: {
      tickInterval: 1,
      labels: {
        align: 'right',
        useHTML: true,
        allowOverlap: true,
        step: 1,
        y: 3,
        style: {
          fontSize: '13px'
        }
      },
      lineWidth: 0,
      categories: [
        'Norway <span class="f16"><span id="flag" class="flag no">' +
        '</span></span>',
        'United States <span class="f16"><span id="flag" class="flag us">' +
        '</span></span>',
        'Germany <span class="f16"><span id="flag" class="flag de">' +
        '</span></span>',
        'Austria <span class="f16"><span id="flag" class="flag at">' +
        '</span></span>',
        'Canada <span class="f16"><span id="flag" class="flag ca">' +
        '</span></span>'
      ]
    },
    yAxis: {
      crosshair: {
        enabled: true,
        color: '#333'
      },
      lineWidth: 0,
      tickInterval: 25,
      reversedStacks: false,
      endOnTick: true,
      showLastLabel: true
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0.15
      }
    },
    series: [{
      name: 'Gold medals',
      data: [148, 113, 104, 71, 77]
    }, {
      name: 'Silver medals',
      data: [113, 122, 98, 88, 72]
    }, {
      name: 'Bronze medals',
      data: [124, 95, 65, 91, 76]
    }]
  });
    
  return (
    <div className="rounded-xl shadow-sm bg-white py-6 px-12">
      <div>
        <div className="pt-4 pb-0 flex justify-between">
          <p className="text-sm ">Project Progress</p>
          <p className="text-sm ">Last Month</p>
        </div>
        <div className="pt-1 pb-4 flex justify-start">
          <p className="text-xl font-semibold ">71</p>
          <p className="text-xs opacity-70 align-text-bottom">00 %</p>
        </div>
      </div>

      {/* disini harusnya radial chart */}
      <div className="py-4">
        {/* <img
          src={UserImage}
          className="m-auto border-2 p-1 border-dashed border-indigo-400"
          style={{ borderRadius: "9999px" }}
        /> */}
        {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
        <HighchartsReact highcharts={Highcharts} chart={chartradial} />
        {/* <figure class="highcharts-figure">
          <div id="container"></div>
        </figure> */}
      </div>
      <div className="py-4 flex justify-end">
        <button className="font-semibold text-sm text-secondary">
          Detail Project Overview
        </button>
      </div>
    </div>
  );
};

export default ApexRedialBarChart;
