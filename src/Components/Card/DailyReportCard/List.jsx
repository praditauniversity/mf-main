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
import { GET_DAILY_REPORT_DATA_BY_PROJECT_ID, GET_GANTT_PROJECT_ID, GET_PROJECT_DATA_BY_ID } from "../../GraphQL/Queries";

const DELETE_DAILYREPORT = gql`
  mutation DeleteDailyReport($id: String!) {
    deleteDailyReport(id: $id) 
  }`;


const DRList = () => {
  // const { data } = useQuery(GET_PROJECT_DATA_BY_ID, {
  //   variables: { id: localStorage.getItem('reportProjectID') }
  // });
  // const [projectData, setProjectData] = React.useState([]);

  // const { data: data2 } = useQuery(GET_GANTT_PROJECT_ID, {
  //   variables: { id: localStorage.getItem('reportProjectID') }
  // });
  // const [ganttData, setGanttData] = React.useState([]);

  // React.useEffect(() => {
  //   if (data) {
  //     setProjectData(data.project.Data);
  //   } 
  //   if (data2) {
  //     setGanttData(data2.ganttGetProjectID.data);
  //   } 
  //   else {
  //     console.log("No data found for project and gantt with user id : " + localStorage.getItem('reportProjectID'));
  //   }
  // }, [data, data2]);

  const projectData = FetchProject();
  const ganttData = FetchGantt();
  const activityData = FetchActivity();
  // const dailyReportData = FetchDailyReport();
  const dailyReportData = FetchDailyReportByProjectId();

  const [deleteReport, { loading, error }] = useMutation(DELETE_DAILYREPORT,
    {
      refetchQueries: [
        { query: GET_DAILY_REPORT_DATA_BY_PROJECT_ID }
      ]
    }
  );

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;


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
                                          <IconEdit />
                                        </button>
                                        <button className="px-1" id="icon"
                                          onClick={e => {
                                            const listID = String(dailyReport.ID);
                                            console.log(typeof listID, listID);
                                            console.log(typeof dailyReport.ID, dailyReport.ID);
                                            e.preventDefault();
                                            deleteReport({ variables: { id: listID } });
                                          }}
                                        ><IconDelete /></button>
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
