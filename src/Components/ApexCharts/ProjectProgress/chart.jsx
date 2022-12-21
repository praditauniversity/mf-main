import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

// import { useQuery, gql } from "@apollo/client";
// import { GET_PROJECTPHASE_DATA } from "../../GraphQl/Queries";

export default function RadialChart() {
//     const { loading, error, data } = useQuery(GET_PROJECTPHASE_DATA);
//     // if (loading) return <div>Loading...</div>;
//     // if (error) return <div>Error {console.log(error)}</div>;
//     // const projectPerPhase = data.project.Data.Phase;
//     const [projectPerPhase, setProjectPerPhase] = useState([]);
//     useEffect(() => {
//         if (data) {
//             setProjectPerPhase(data.project.Data);
//             console.log("data is ready");
//             // console.log(projectPerPhase.ID);
//             // console.log(data.project.Data[0].Phase);
//             console.log(data.project.Data);
//             // console.log(projectPerPhase);
//         } else {
//             // setProjectPerPhase([]);
//             console.log("data is empty");
//         }
//     }, [data]);
//     // const projectPerPhaseList = projectPerPhase.map((item, index) => {
//     //     console.log(item.Data[index].Phase);
//     //   });

    const series = [70, 80, 90, 100, 100, 100, 100];
    // const series = projectPerPhase.map((item) => item.order);
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
        colors: ["#FFC107", "#E54C00", "#C62828", "#A8186E", "#4527A0", "#673AB7", "#B39DDB"],
        // colors: projectPerPhase.map((item) => item.color),
        labels: ['Closing', 'Evaluation', 'Testing', 'Execution', 'Research', 'Planning', 'Initiation'],
        // labels: projectPerPhase.map((item) => item.name),
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
            {/* {projectPerPhaseList} */}
            {/* {console.log("aaaa", projectPerPhase)} */}
            {/* {projectPerPhase.map((item, index) => <h1 key={index}>{item}</h1>)} */}
        </div>
    );
}