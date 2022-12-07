import React, { useState } from "react";
import UserImage from "../../../Assets/Images/png/User.png";
// import { useSelector } from "react-redux";

// // third-party
// import ReactApexChart from "react-apexcharts";

// const status = [
//   {
//     value: "today",
//     label: "Today",
//   },
//   {
//     value: "month",
//     label: "Last Month",
//   },
//   {
//     value: "year",
//     label: "Last Year",
//   },
// ];

// const DropdownStatus = () => {
//     const [value1, setValueStatus] = React.useState('month');

//     return (
//         <Button>
//             <TextField
//                 variant="standard"
//                 id="standard-select-currency"
//                 select
//                 value={value1}
//                 onChange={(e) => setValueStatus(e.target.value)}
//                 InputProps={{
//                     disableUnderline: true
//                 }}
//             >
//                 {status.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                     </MenuItem>
//                 ))}
//             </TextField>
//         </Button>
//     );
// };

// chart options
// const redialBarChartOptions = {
//   chart: {
//     type: "radialBar",
//     width: 450,
//     height: 450,
//   },
//   plotOptions: {
//     radialBar: {
//       offsetY: 0,
//       startAngle: 0,
//       endAngle: 360,
//       hollow: {
//         margin: 0,
//         size: "0%",
//         background: "transparent",
//         image: undefined,
//       },
//       dataLabels: {
//         name: {
//           show: false,
//         },
//         value: {
//           show: false,
//         },
//       },
//     },
//   },
//   stroke: {
//     lineCap: "round",
//   },
//   labels: [
//     "Closing",
//     "Evaluation",
//     "Testing",
//     "Execution",
//     "Research",
//     "Planning",
//     "Initiation",
//   ],
//   legend: {
//     show: true,
//     fontSize: "10px",
//     position: "right",
//     offsetX: 0,
//     offsetY: 0,
//     labels: {
//       useSeriesColors: true,
//     },
//     markers: {
//       size: 0,
//     },
//     formatter: (seriesName, opts) =>
//       `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`,
//     itemMargin: {
//       vertical: 3,
//     },
//   },
//   responsive: [
//     {
//       breakpoint: 450,
//       chart: {
//         width: 280,
//         height: 280,
//       },
//       options: {
//         legend: {
//           show: false,
//           position: "bottom",
//         },
//       },
//     },
//   ],
// };

// ===========================|| RADIAL BAR CHART ||=========================== //

const ApexRedialBarChart = () => {
  // const theme = useTheme();
  //   const customization = useSelector((state) => state.customization);

  //   const { navType } = customization;
  //   const { primary } = theme.palette.text;
  //   const darkLight = theme.palette.dark.light;
  //   const grey200 = theme.palette.grey[200];

  //   const [series] = useState([20, 40, 60, 80, 100, 100, 100]);
  //   const [options, setOptions] = useState(redialBarChartOptions);

  //   const secondary = theme.palette.secondary.main;
  //   const primaryMain = theme.palette.primary.main;
  //   const successDark = theme.palette.success.dark;
  //   const error = theme.palette.error.main;

  //   React.useEffect(() => {
  //     setOptions((prevState) => ({
  //       ...prevState,
  //       colors: [secondary, primaryMain, successDark, error],
  //       xaxis: {
  //         labels: {
  //           style: {
  //             colors: [
  //               primary,
  //               primary,
  //               primary,
  //               primary,
  //               primary,
  //               primary,
  //               primary,
  //             ],
  //           },
  //         },
  //       },
  //       yaxis: {
  //         labels: {
  //           style: {
  //             colors: [primary],
  //           },
  //         },
  //       },
  //       grid: {
  //         borderColor: navType === "dark" ? darkLight + 20 : grey200,
  //       },
  //       plotOptions: {
  //         radialBar: {
  //           track: {
  //             background: navType === "dark" ? darkLight + 20 : grey200,
  //           },
  //         },
  //       },
  //     }));
  //   }, [
  //     navType,
  //     primary,
  //     darkLight,
  //     grey200,
  //     secondary,
  //     primaryMain,
  //     successDark,
  //     error,
  //   ]);

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
        <img
          src={UserImage}
          className="m-auto border-2 p-1 border-dashed border-indigo-400"
          style={{ borderRadius: "9999px" }}
        />
      </div>
      <div className="py-4 flex justify-end">
        <button className="font-semibold text-sm text-secondary">
          Detail Project Overview
        </button>
      </div>
    </div>

    // <div id="chart">
    //     <CardContent>
    //         <Grid container justifyContent="space-between" alignItems="center">
    //             <Grid item>
    //                 <Typography align="left" component="div" variant="h5">
    //                     Project Progress
    //                     {/* <DropdownCurve /> */}
    //                 </Typography>
    //             </Grid>
    //             <Grid item>
    //                 <DropdownStatus />
    //             </Grid>
    //         </Grid>
    //         <Grid container justifyContent="flex-start" alignItems="center">
    //             <Grid item>
    //                 <Typography align="left" variant="h2">
    //                     71
    //                 </Typography>
    //             </Grid>
    //             <Grid item>
    //                 <Typography align="left" variant="subtitle2" color="#82A027">
    //                     00 %
    //                 </Typography>
    //             </Grid>
    //         </Grid>
    //     </CardContent>
    //     <ReactApexChart options={options} series={series} type="radialBar" />
    //     {/* Footer */}
    //     <CardActions sx={{ justifyContent: 'flex-end' }}>
    //         <Button variant="text" size="small">
    //             Detail Project Overview
    //         </Button>
    //     </CardActions>
    // </div>
  );
};

export default ApexRedialBarChart;
