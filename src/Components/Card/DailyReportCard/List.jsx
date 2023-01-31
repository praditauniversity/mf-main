import React from "react";
import { useMutation, gql, useQuery } from '@apollo/client';
import { IconEdit, IconDelete } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css';
import FetchProject from "../../../Middleware/Fetchers/FetchProject";
import FetchGantt from "../../../Middleware/Fetchers/FetchGantt";
import FetchActivity from "../../../Middleware/Fetchers/FetchActivity";
import FetchDailyReport from "../../../Middleware/Fetchers/FetchDailyReport";
import { Link } from "react-router-dom";
import FetchDailyReportByProjectId from "../../../Middleware/Fetchers/FetchDailyReportByProjectId";
import UpdateModalDailyReport from "../../Modal/DailyReportModal/UpdateModal/UpdateModal";
import DeleteModalReport from "../../Modal/DailyReportModal/DeleteModal/DeleteModal";
import ViewModalReport from "../../Modal/DailyReportModal/ViewModal/ViewModal";


const DRList = () => {
  const projectData = FetchProject();
  const ganttData = FetchGantt();
  const activityData = FetchActivity();
  // const dailyReportData = FetchDailyReport();
  const dailyReportData = FetchDailyReportByProjectId();

  const dataLength = dailyReportData.filter((dailyReport) => {
    return activityData.filter((activity) => {
      return activity.ID === dailyReport.activity_id;
    }).filter((activity) => {
      return ganttData.filter((gantt) => {
        return gantt.ID === activity.gantt_id;
      }).filter((gantt) => {
        return projectData.filter((project) => {
          return project.ID === gantt.project_id;
        }).length > 0;
      }).length > 0;
    }).length > 0;
  }).length;

  const ifDRListDataEmpty = () => {
    if (dataLength === 0) {
      return (
        <tr>
          <td colSpan="5" align="center">No Data</td>
        </tr>
      );
    }
  }

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
                                  // const listID = toString(dailyReport.ID);
                                  console.log(typeof dailyReport.ID, dailyReport.ID);
                                  console.log(typeof dailyReport.report_date, dailyReport.report_date);
                                  console.log(typeof dailyReport.report_number, dailyReport.report_number);
                                  console.log(typeof dailyReport.name, dailyReport.name);
                                  console.log(typeof activity.name, activity.name);
                                  const reportDate = new Date(dailyReport.report_date);
                                  const reportDateYear = reportDate.toLocaleDateString('en-US', { year: 'numeric' });
                                  const reportDateMonth = reportDate.toLocaleDateString('en-US', { month: '2-digit' });
                                  const reportDateDay = reportDate.toLocaleDateString('en-US', { day: '2-digit' });
                                  return (
                                    <tr key={dailyReport.ID}>
                                      <td align="center"><Link to="/dailyreportview"><button className="hover:text-primary">{dailyReport.name}</button></Link></td>
                                      <td align="center">{dailyReport.report_number}</td>
                                      <td align="center">{reportDateYear}/{reportDateMonth}/{reportDateDay}</td>
                                      <td align="center">{activity.name}</td>
                                      <td align="center">
                                        <button className="px-1" id="icon">
                                          <UpdateModalDailyReport
                                            reportID={String(dailyReport.ID)}
                                          />
                                        </button>
                                        {/* <button className="px-1" id="icon"
                                          onClick={e => {
                                            const listID = String(dailyReport.ID);
                                            console.log(typeof listID, listID);
                                            console.log(typeof dailyReport.ID, dailyReport.ID);
                                            e.preventDefault();
                                            deleteReport({ variables: { id: listID } });
                                          }}
                                        ><IconDelete /></button> */}
                                        <button className="px-1" id="icon">
                                          <DeleteModalReport
                                            reportID={String(dailyReport.ID)}
                                          />
                                        </button>

                                        <button className="px-1" id="icon">
                                          <ViewModalReport
                                            reportName={dailyReport.name}
                                            reportDesc={dailyReport.description}
                                            reportDate={reportDateMonth + "/" + reportDateDay + "/" + reportDateYear}
                                            reportNumber={dailyReport.report_number}
                                            reportActivity={activity.name}
                                            reportWLName={dailyReport.work_log_name}
                                            reportWLDesc={dailyReport.work_log_desc}
                                            reportWLStatus={dailyReport.work_log_status}
                                            reportWLHour={dailyReport.work_log_hour}
                                            reportEq={dailyReport.equipment}
                                          />
                                        </button>

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
            {ifDRListDataEmpty()}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default DRList;
