import React, { useEffect, useState } from "react";
import { useMutation, gql, useQuery } from '@apollo/client';
import '../../../Assets/svgbutton/svgbutton.css';
import FetchProject from "../../../Middleware/Fetchers/FetchProject";
import FetchGantt from "../../../Middleware/Fetchers/FetchGantt";
import FetchActivity from "../../../Middleware/Fetchers/FetchActivity";
import UpdateModalDailyReport from "../../Modal/DailyReportModal/UpdateModal/UpdateModal";
import DeleteModalReport from "../../Modal/DailyReportModal/DeleteModal/DeleteModal";
import ViewModalReport from "../../Modal/DailyReportModal/ViewModal/ViewModal";
import { GET_DAILY_REPORT_DATA_BY_PROJECT_ID } from "../../GraphQL/Queries";
import FetchProjectById from "../../../Middleware/Fetchers/FetchProjectById";


const DRList = (props) => {
  const { page, limit, sort, totalItems, updateTotalItems, onPageChange, totalPages } = props;
  const projectData = FetchProject();
  const ganttData = FetchGantt();
  const activityData = FetchActivity();

  const projectID = localStorage.getItem('momProjectID');
  const projectPerID = FetchProjectById({ projectID });

  const { data } = useQuery(GET_DAILY_REPORT_DATA_BY_PROJECT_ID, {
    variables: { projectId: String(localStorage.getItem('reportProjectID')), page: String(page), limit: String(limit), sort: String(sort) },
    pollInterval: 1000,
  });
  const [dailyReportData, setDailyReport] = useState([]);

  useEffect(() => {
    if (data) {
      setDailyReport(data.dailyReportGetProjectID.data);
      console.log("Daily Report data with project id " + localStorage.getItem('reportProjectID') + " found");
    } else {
      console.log("No data found for daily report with project id " + localStorage.getItem('reportProjectID'));
    }
  }, [data, projectPerID]);

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

  const noneDataLength = dailyReportData.filter((dailyReport) => {
    return dailyReport.activity_id === 0;
  }).filter((dailyReport) => {
    return projectData.filter((project) => {
      return project.ID === dailyReport.project_id;
    }).length > 0;
  }).length;

  // const setDataEmpty = () => {
  //   // setDailyReport([]);
  //   console.log("Empty Daily Report Data")
  // }

  const ifDRListDataEmpty = () => {
    if (dataLength === 0 && noneDataLength === 0) {
      return (
        <tr className="h-full" >
             <td colSpan="7" className="text-center ">
                 <div className="text-gray-400">
                     <div className="text-5xl font-bold">No Daily Report</div>
                     <div className="text-xl">Please add a daily report</div>
                 </div>
             </td>
         </tr>
      );
    }
  };

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
                return dailyReportData.map((dailyReport) => {
                  if (project.ID === dailyReport.project_id && dailyReport.activity_id === 0) {

                    const reportDate = new Date(dailyReport.report_date);
                    const reportDateYear = reportDate.toLocaleDateString('en-US', { year: 'numeric' });
                    const reportDateMonth = reportDate.toLocaleDateString('en-US', { month: '2-digit' });
                    const reportDateDay = reportDate.toLocaleDateString('en-US', { day: '2-digit' });
                    return (
                      <tr key={dailyReport.ID}>
                        <td align="center">{dailyReport.name}</td>
                        <td align="center">{dailyReport.report_number}</td>
                        <td align="center">{reportDateYear}/{reportDateMonth}/{reportDateDay}</td>
                        <td align="center">None</td>
                        <td align="center">
                          <button className="px-1" id="">
                            <UpdateModalDailyReport
                              reportData={dailyReport}
                              page={page}
                              limit={limit}
                              sort={sort}
                            />
                          </button>
                          <button className="px-1" id="">
                            <DeleteModalReport
                              reportID={String(dailyReport.ID)}
                              reportName={dailyReport.name}
                              page={page}
                              limit={limit}
                              sort={sort}
                              total={totalItems}
                              updateTotal={updateTotalItems}
                              dropCurrentPage={onPageChange}
                              totalPages={totalPages}
                              // setDataEmpty={setDataEmpty}
                            />
                          </button>
                          <button className="px-1" id="">
                            <ViewModalReport
                              reportName={dailyReport.name}
                              reportDesc={dailyReport.description}
                              reportDate={reportDateMonth + "/" + reportDateDay + "/" + reportDateYear}
                              reportNumber={dailyReport.report_number}
                              reportActivity="None"
                              reportWLName={dailyReport.work_log_name}
                              reportWLDesc={dailyReport.work_log_desc}
                              reportWLStatus={dailyReport.work_log_status}
                              reportWLHour={dailyReport.work_log_hour}
                              reportEq={dailyReport.equipment}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                });
              })
            }
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
                                if (activity.ID === dailyReport.activity_id) {
                                  const reportDate = new Date(dailyReport.report_date);
                                  const reportDateYear = reportDate.toLocaleDateString('en-US', { year: 'numeric' });
                                  const reportDateMonth = reportDate.toLocaleDateString('en-US', { month: '2-digit' });
                                  const reportDateDay = reportDate.toLocaleDateString('en-US', { day: '2-digit' });
                                  return (
                                    <tr key={dailyReport.ID}>
                                      <td align="center">{dailyReport.name}</td>
                                      <td align="center">{dailyReport.report_number}</td>
                                      <td align="center">{reportDateYear}/{reportDateMonth}/{reportDateDay}</td>
                                      <td align="center">{activity.name === null ? "None" : activity.name}</td>
                                      <td align="center">

                                        <button className="px-1" id="icon">
                                          <UpdateModalDailyReport
                                            reportData={dailyReport}
                                            page={page}
                                            limit={limit}
                                            sort={sort}
                                          />
                                        </button>

                                        <button className="px-1" id="icon">
                                          <DeleteModalReport
                                            reportID={String(dailyReport.ID)}
                                            reportName={dailyReport.name}
                                            page={page}
                                            limit={limit}
                                            sort={sort}
                                            total={totalItems}
                                            updateTotal={updateTotalItems}
                                            dropCurrentPage={onPageChange}
                                            totalPages={totalPages}
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
