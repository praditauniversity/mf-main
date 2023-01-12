import React from "react";
import { IconEdit, IconDelete } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css';
import FetchProject from "../../../Middleware/Fetchers/FetchProject";
import FetchGantt from "../../../Middleware/Fetchers/FetchGantt";
import FetchActivity from "../../../Middleware/Fetchers/FetchActivity";
import FetchDailyReport from "../../../Middleware/Fetchers/FetchDailyReport";
import { Link } from "react-router-dom";

const DRList = () => {
  const projectData = FetchProject();
  const ganttData = FetchGantt();
  const activityData = FetchActivity();
  const dailyReportData = FetchDailyReport();
  // const data = [
  //   {
  //     id: 1,
  //     reportname: "Daily Report 1",
  //     reportnumber: "100",
  //     reportdate: "08/14/2022",
  //     activity: "Activity 2",
  //   },
  //   {
  //     id: 2,
  //     reportname: "Daily Report 2",
  //     reportnumber: "101",
  //     reportdate: "08/15/2022",
  //     activity: "Activity 3",
  //   },
  //   {
  //     id: 3,
  //     reportname: "Daily Report 3",
  //     reportnumber: "102",
  //     reportdate: "08/16/2022",
  //     activity: "Activity 1",
  //   },
  //   {
  //     id: 4,
  //     reportname: "Daily Report 4",
  //     reportnumber: "103",
  //     reportdate: "08/16/2022",
  //     activity: "Activity 1",
  //   },
  //   {
  //     id: 5,
  //     reportname: "Daily Report 5",
  //     reportnumber: "104",
  //     reportdate: "08/16/2022",
  //     activity: "Activity 2",
  //   },
  //   {
  //     id: 6,
  //     reportname: "Daily Report 6",
  //     reportnumber: "105",
  //     reportdate: "08/16/2022",
  //     activity: "Activity 2",
  //   },
  //   {
  //     id: 7,
  //     reportname: "Daily Report 7",
  //     reportnumber: "106",
  //     reportdate: "08/17/2022",
  //     activity: "Activity 3",
  //   },
  // ];

  return (
    <div className="rounded-xl shadow-lg bg-white pt-6">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full table-hover h-1/3">
          <thead>
            <tr>
              <th align="center">Report Name</th>
              <th align="center">Report Number</th>
              <th align="center">Report Date</th>
              <th align="center">Activity</th>
              <th align="center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((item, index) => (
              <tr key={index}>
                <td align="center"><Link to="/dailyreportview"><button className="hover:text-primary">{item.reportname}</button></Link></td>
                <td align="center">{item.reportnumber}</td>
                <td align="center">{item.reportdate}</td>
                <td align="center">{item.activity}</td>
                <td align="center">
                  <button className="px-1" id="icon">
                    <IconEdit />
                  </button>
                  <button className="px-1" id="icon"><IconDelete /></button>
                </td>
              </tr>
            ))} */}
            {
              projectData.map((project) => {
                return (
                  ganttData.map((gantt) => {
                    if (project.ID === gantt.project_id) {
                      return (
                        activityData.map((activity) => {
                          if (gantt.ID === activity.gantt_id) {
                            return (
                              dailyReportData.map((dailyReport) => {
                                if (activity.ID === dailyReport.activity_id /*&& gantt.project_id === dailyReport.project_id*/) {
                                  const reportDate = new Date(dailyReport.report_date);
                                  const reportDateYear = reportDate.toLocaleDateString('en-US', {year: 'numeric'});
                                  const reportDateMonth = reportDate.toLocaleDateString('en-US', {month: '2-digit'});
                                  const reportDateDay = reportDate.toLocaleDateString('en-US', {day: '2-digit'});
                                  return (
                                    <tr key={dailyReport.ID}>
                                      <td align="center"><Link to="/dailyreportview"><button className="hover:text-primary">{dailyReport.name}</button></Link></td>
                                      <td align="center">{dailyReport.report_number}</td>
                                      <td align="center">{reportDateYear}/{reportDateMonth}/{reportDateDay}</td>
                                      <td align="center">{activity.name}</td>
                                      <td align="center">
                                        <button className="px-1" id="icon">
                                          <IconEdit />
                                        </button>
                                        <button className="px-1" id="icon"><IconDelete /></button>
                                      </td>
                                    </tr>
                                  )
                                }
                              })
                            )
                          }
                        })
                      )
                    }
                  })
                )
              })
            }
          </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default DRList;
