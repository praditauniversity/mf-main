import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { useQuery, gql } from "@apollo/client";
import { GET_PROJECT_DATA } from "../../GraphQL/Queries";
import { GET_PHASE_DATA } from "../../GraphQL/Queries";
import GetProfile from "../../Auth/GetProfile";

export default function RadialChart() {

  const profile = GetProfile();
  const { loading, error, data } = useQuery(GET_PROJECT_DATA, {
    pollInterval: 1000,
  });
  const { loading: loading2, error: error2, data: data2 } = useQuery(GET_PHASE_DATA, {
    pollInterval: 1000,
  });
  
  function printSeries() {
    // let totalProject = projectPerPhase.length;
    let totalProject = 0;
    let initiation = 0;
    let planning = 0;
    let research = 0;
    let execution = 0;
    let testing = 0;
    let evaluation = 0;
    let closing = 0;
    projectPerPhase.map((item) => {
      if (item.user_id === profile.id) {
        totalProject += 1;
        if (item.Phase.name === "Initiation") {
          initiation += 1;
        } else if (item.Phase.name === "Planning") {
          planning += 1;
        } else if (item.Phase.name === "Research") {
          research += 1;
        } else if (item.Phase.name === "Execution") {
          execution += 1;
        } else if (item.Phase.name === "Testing") {
          testing += 1;
        } else if (item.Phase.name === "Evaluation") {
          evaluation += 1;
        } else if (item.Phase.name === "Closing") {
          closing += 1;
        }
      } else {
        console.log("no project");
      }
    });
    closing = (closing / totalProject) * 100;
    evaluation = (evaluation / totalProject) * 100;
    testing = (testing / totalProject) * 100;
    execution = (execution / totalProject) * 100;
    research = (research / totalProject) * 100;
    planning = (planning / totalProject) * 100;
    initiation = (initiation / totalProject) * 100;
    return (
      //rounding number
      [Math.round(closing), Math.round(evaluation), Math.round(testing), Math.round(execution), Math.round(research), Math.round(planning), Math.round(initiation)]
    );
  }

  function printLabels() {
    let labels = [];
    phase.map((item) => {
      if (item) {
        labels.push(item.name);
      } else {
        console.log("no phase")
      }
    });
    return labels.reverse();
  }

  function printColors() {
    let colors = [];
    phase.map((item) => {
      if (item) {
        colors.push(item.color);
      } else {
        console.log("no phase")
      }
    });

    return colors.reverse();
  }

    const series = [70, 80, 90, 100, 100, 100, 100];
  const options = {
    chart: {
      width: 450,
      height: 450,
    },
    plotOptions: {
      radialBar: {
        position: "center",
        offsetY: 0,
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: "0%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    colors: [
      "#FFC107",
      "#E54C00",
      "#C62828",
      "#A8186E",
      "#4527A0",
      "#673AB7",
      "#B39DDB",
    ],
    labels: [
      "Closing",
      "Evaluation",
      "Testing",
      "Execution",
      "Research",
      "Planning",
      "Initiation",
    ],
    legend: {
      show: true,
      fontSize: "10px",
      position: "right",
      offsetX: 0,
      offsetY: 0,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: (seriesName, opts) =>
        `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`,
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 450,
        chart: {
          width: 280,
          height: 280,
        },
        options: {
          legend: {
            show: false,
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div>
      <Chart
        options={options}
        type="radialBar"
        series={series}
        // series={printSeries()}
        width="100%"
        height="150%"
      />
    </div>
  );
}
