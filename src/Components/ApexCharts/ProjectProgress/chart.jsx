import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { useQuery, gql } from "@apollo/client";
import { GET_PROJECT_DATA } from "../../GraphQl/Queries";

export default function RadialChart() {
  const { loading, error, data } = useQuery(GET_PROJECT_DATA);
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error {console.log(error)}</div>;

  const [projectPerPhase, setProjectPerPhase] = useState([]);
  useEffect(() => {
    if (data) {
      console.log("data is ready");
      console.log(data);
      setProjectPerPhase(data.project.Data);
    //   console.log("LENGTHHHHHHH", data.project.Data.length);
    } else {
      // setProjectPerPhase([]);
      console.log("data is empty");
    }
  }, [data]);

  function printPerPhase() {
    const series = [];
    var phasename = "";
    projectPerPhase.map((item) => {
      phasename = item.Phase.name;
      console.log("PHASEEEEEEEEEEEEEEE", phasename);
      series.push(item.Phase.order);
      console.log(" SERIES ", series.length);
    });
    return [series];
  }

  //   const series = [70, 80, 90, 100, 100, 100, 100];
  const options = {
    chart: {
      // type: 'radialBar',
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
      //   "#A8186E",
      //   "#4527A0",
      //   "#673AB7",
      //   "#B39DDB",
    ],
    // colors : [],
    labels: [
      "Closing",
      "Evaluation",
      "Testing",
      //   "Execution",
      //   "Research",
      //   "Planning",
      //   "Initiation",
    ],
    // labels: [],
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
        series={printPerPhase()}
        width="100%"
        height="150%"
      />
      {console.log("PHASElength", projectPerPhase.length)}
      {console.log("PerPhase", printPerPhase())}
      {/* {printPerPhase} */}
      {/* {console.log("PHASE", projectPerPhase[0].Phase)} */}
    </div>
  );
}