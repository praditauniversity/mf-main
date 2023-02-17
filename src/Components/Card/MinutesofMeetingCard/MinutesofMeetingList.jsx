import React, { useEffect, useState } from "react";
import { useMutation, gql, useQuery } from '@apollo/client';
import '../../../Assets/svgbutton/svgbutton.css'
import FetchMomByProjectId from "../../../Middleware/Fetchers/FetchMomByProjectId";
import FetchProjectByUserId from "../../../Middleware/Fetchers/FetchProjectByUserId";
import DeleteModalMinuteOfMeeting from "../../Modal/MinutesOfMeetingModal/DeleteModal/DeleteModal";
import UpdateModalMinutesOfMeeting from "../../Modal/MinutesOfMeetingModal/UpdateModal/UpdateModal";
import ViewModalMOM from "../../Modal/MinutesOfMeetingModal/ViewModal/ViewModal";
import { GET_MINUTES_OF_MEETING_DATA_BY_PROJECT_ID } from "../../GraphQL/Queries";


const MinutesofMeetingList = (props) => {
  const { page, limit, sort, totalItems, updateTotalItems, onPageChange, totalPages } = props;

  const projectData = FetchProjectByUserId();

  const { data } = useQuery(GET_MINUTES_OF_MEETING_DATA_BY_PROJECT_ID, {
    variables: { projectId: String(localStorage.getItem('momProjectID')), page: String(page), limit: String(limit), sort: String(sort) },
    pollInterval: 1000,
  });

  const [momData, setMomData] = useState([]);

  useEffect(() => {
    if (data) {
      setMomData(data.minuteOfMeetingGetProjectID.data);
      // reportProjectID === 0 ? localStorage.setItem('reportProjectID', data.minutesOfMeetingGetProjectID.data[0].ID) : localStorage.setItem('reportProjectID', reportProjectID);
      console.log("Minutes of Meeting data with project id " + localStorage.getItem('momProjectID') + " found");
    } else {
      console.log("No data found for Minutes of Meeting with project id " + localStorage.getItem('momProjectID'));
    }
  }, [data]);

  const dataLength = momData.filter((mom) => {
    return projectData.filter((project) => {
      return project.ID === mom.project_id;
    }).length > 0;
  }).length;

  const setDataEmpty = () => {
    // setMomData([]);
    console.log("Data Minutes of Meeting is empty")
  }

  const ifMomListEmpty = () => {
    if (dataLength === 0) {
      return (
        <tr className="h-full" >
            <td colSpan="7" className="text-center ">
                <div className="text-gray-400">
                    <div className="text-5xl font-bold">No Minutes of Meeting</div>
                    <div className="text-xl">Please add a minutes of meeting</div>
                </div>
            </td>
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
              <th align="center">Meeting Name</th>
              <th align="center">Date of Meeting</th>
              <th align="center">Time</th>
              <th align="center">Location</th>
              <th align="center">Meeting Leader</th>
              <th align="center">Action</th>
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

                      const dateOfMeeting = meetingDateMonth + "/" + meetingDateDay + "/" + meetingDateYear;

                      const startDate = new Date(mom.start_time_meeting);
                      const startHour = typeof startDate.getHours() === 'number' ? startDate.getHours().toString().padStart(2, '0') : "00";
                      const startMinute = typeof startDate.getMinutes() === 'number' ? startDate.getMinutes().toString().padStart(2, '0') : "00"; // const second = typeof startDate.getSeconds() === 'number' ? startDate.getSeconds() : 0;
                      const startTime = `${startHour}:${startMinute}`;

                      const endDate = new Date(mom.end_time_meeting);
                      const endHour = typeof endDate.getHours() === 'number' ? endDate.getHours().toString().padStart(2, '0') : "00";
                      const endMinute = typeof endDate.getMinutes() === 'number' ? endDate.getMinutes().toString().padStart(2, '0') : "00";
                      const endTime = `${endHour}:${endMinute}`;

                      const meetingTime = startTime + " - " + endTime;

                      return (
                        <tr key={mom.ID}>
                          <td align="center">{mom.meeting_name}</td>
                          <td align="center">{meetingDateYear}/{meetingDateMonth}/{meetingDateDay}</td>
                          <td align="center">{startTime} - {endTime}</td>
                          <td align="center">{mom.location ? mom.location : "N/A"}</td>
                          <td align="center">{mom.meeting_leader ? mom.meeting_leader : "N/A"}</td>
                          <td align="center">
                            <button className="px-1" id="icon">
                              <UpdateModalMinutesOfMeeting
                                momData={mom}
                                page={page}
                                limit={limit}
                                sort={sort}
                              />
                            </button>
                            <button className="px-1" id="icon">
                              <DeleteModalMinuteOfMeeting
                                momID={String(mom.ID)}
                                momName={mom.meeting_name}
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
                            <button className="px-1" id="icon">
                              <ViewModalMOM
                                meetingName={mom.meeting_name}
                                meetingDate={dateOfMeeting}
                                meetingTime={meetingTime}
                                meetingEndTime={mom.end_time_meeting}
                                meetingLocation={mom.location}
                                meetingLeader={mom.meeting_leader}
                                meetingObj={mom.meeting_objective}
                                meetingAtendees={mom.atendees}
                                meetingNotes={mom.notes}
                                meetingActionItem={mom.action_item}
                                meetingOwner={mom.owner}
                                meetingDeadline={mom.deadline}
                                meetingStatus={mom.status}

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
            {ifMomListEmpty()}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default MinutesofMeetingList;
