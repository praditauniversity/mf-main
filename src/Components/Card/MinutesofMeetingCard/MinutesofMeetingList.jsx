import React from "react";
import { useMutation, gql } from '@apollo/client';
import { IconEdit, IconDelete } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css'
import FetchProject from "../../../Middleware/Fetchers/FetchProject";
import FetchGantt from "../../../Middleware/Fetchers/FetchGantt";
import FetchActivity from "../../../Middleware/Fetchers/FetchActivity";
import FetchMomByProjectId from "../../../Middleware/Fetchers/FetchMomByProjectId";
import { GET_MINUTES_OF_MEETING_DATA_BY_PROJECT_ID } from "../../GraphQL/Queries";
import FetchProjectByUserId from "../../../Middleware/Fetchers/FetchProjectByUserId";
import DeleteModalMinuteOfMeeting from "../../Modal/MinutesOfMeetingModal/DeleteModal/DeleteModal";
import UpdateModalMinutesOfMeeting from "../../Modal/MinutesOfMeetingModal/UpdateModal/UpdateModal";

const DELETE_MINUTES_OF_MEETING = gql`
  mutation deleteMinuteOfMeeting($id: String!) {
    deleteMinuteOfMeeting(id: $id)
  }
`;

const MinutesofMeetingList = () => {
  const projectData = FetchProjectByUserId();
  // const ganttData = FetchGantt();
  // const activityData = FetchActivity();
  const momData = FetchMomByProjectId();

  // const [deleteMom, { loading, error }] = useMutation(DELETE_MINUTES_OF_MEETING,
  //   {
  //     refetchQueries: [
  //       { query: GET_MINUTES_OF_MEETING_DATA_BY_PROJECT_ID }
  //     ]
  //   }
  // );

  // if (loading) return 'Submitting...';
  // if (error) return `Submission error! ${error.message}`;
  

  return (
    <div className="rounded-xl shadow-lg bg-white pt-6">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full table-hover h-1/3">
          <thead>
            <tr>
              <th align="center">Meeting Name</th>
              <th align="center">Date of Meeting</th>
              <th align="center">Time</th>
              <th align="center">Location</th>
              <th align="center">Meeting Leader</th>
              <th align="center">Action</th>\
            </tr>
          </thead>
          <tbody>
            {
              projectData.map((project) => {
                return (
                  momData.map((mom) => {
                    if (project.ID === mom.project_id /*&& gantt.project_id === mom.project_id*/) {
                      const meetingDate = new Date(mom.meeting_date);
                      const meetingDateYear = meetingDate.toLocaleDateString('en-US', { year: 'numeric' });
                      const meetingDateMonth = meetingDate.toLocaleDateString('en-US', { month: '2-digit' });
                      const meetingDateDay = meetingDate.toLocaleDateString('en-US', { day: '2-digit' });

                      const startDate = new Date(mom.start_time_meeting);
                      const startHour = typeof startDate.getHours() === 'number' ? startDate.getHours().toString().padStart(2, '0') : "00";
                      const startMinute = typeof startDate.getMinutes() === 'number' ? startDate.getMinutes().toString().padStart(2, '0') : "00";
                      // const second = typeof startDate.getSeconds() === 'number' ? startDate.getSeconds() : 0;
                      const startTime = `${startHour}:${startMinute}`;
                      // console.log("TIMEEEEEE", startTime);

                      const endDate = new Date(mom.end_time_meeting);
                      const endHour = typeof endDate.getHours() === 'number' ? endDate.getHours().toString().padStart(2, '0') : "00";
                      const endMinute = typeof endDate.getMinutes() === 'number' ? endDate.getMinutes().toString().padStart(2, '0') : "00";
                      // const second = typeof startDate.getSeconds() === 'number' ? startDate.getSeconds() : 0;
                      const endTime = `${endHour}:${endMinute}`;

                      return (
                        <tr key={mom.ID}>
                          <td align="center">{mom.meeting_name}</td>
                          <td align="center">{meetingDateYear}/{meetingDateMonth}/{meetingDateDay}</td>
                          <td align="center">{startTime} - {endTime}</td>
                          <td align="center">{mom.location}</td>
                          <td align="center">{mom.meeting_leader}</td>
                          <td align="center">
                            {/* <button className="px-1" id="icon"
                              onClick={e => {
                                // const listID = String(mom.ID);
                                // console.log(typeof listID, listID);
                                // e.preventDefault();
                                // deleteReport({ variables: { id: listID } });
                              }}
                            >
                              <IconEdit />
                            </button> */}
                            {/* <button className="px-1" id="icon"
                              onClick={e => {
                                const recordID = String(mom.ID);
                                console.log(typeof recordID, recordID);
                                e.preventDefault();
                                deleteMom({ variables: { id: recordID } });
                              }}
                            >
                              <IconDelete />
                            </button> */}
                            <button className="px-1" id="icon">
                              <UpdateModalMinutesOfMeeting 
                              momID = {String(mom.ID)}
                              />
                            </button>
                            <button className="px-1" id="icon">
                              <DeleteModalMinuteOfMeeting 
                              momID = {String(mom.ID)}
                              />
                            </button>
                          </td>
                        </tr>
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

export default MinutesofMeetingList;
