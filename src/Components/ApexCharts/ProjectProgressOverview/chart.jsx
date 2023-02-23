import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import FetchProjectByUserId from "../../../Middleware/Fetchers/FetchProjectByUserId";

export default function DualColumnChart() {
  // const [projectData, setProjectData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10; // Number of items to display per page


  let projectData = [];
  projectData = FetchProjectByUserId();

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = FetchProjectByUserId();
  //     setProjectData(data);
  //   }
  //   fetchData();
  // }, []);

  const series = [
    {
      name: 'Planning',
      data: projectData.map((project) => project.cost_plan)
    }, {
      name: 'Actual',
      data: projectData.map((project) => project.cost_actual)
    }

    // {
    //   name: 'Planning',
    //   data: projectData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    //     .map((project) => project.cost_plan)
    // }, {
    //   name: 'Actual',
    //   data: projectData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    //     .map((project) => project.cost_actual)
    // }

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
      
      // categories: projectData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      //   .map((project) => project.name),

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

    // annotations: {
    //   points: [
    //     {
    //       x: 0,
    //       y: 0,
    //       yAxisIndex: 0,
    //       label: {
    //         text: `Page ${currentPage}`,
    //         borderColor: "#ccc",
    //         style: {
    //           color: "#fff",
    //           background: "#FF4560"
    //         }
    //       }
    //     }
    //   ]
    // }

  };

  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // }

  return (
    <div>
      <Chart options={options} type="bar" series={series} width="100%" height="200%" />
      
      {/* <Chart options={options} type="bar" series={series} width="100%" height="200%" />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        {Array.from({ length: Math.ceil(projectData.length / itemsPerPage) }, (_, i) => i + 1).map((page) =>
          <button key={page} onClick={() => handlePageChange(page)}>{page}</button>
        )}
      </div> */}

    </div>
  );
}