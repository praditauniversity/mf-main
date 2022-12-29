import React from "react";
import { IconEdit, IconDelete } from "../../Icons/icon";

const MinutesofMeetingList = () => {
  const data = [
    {
      meetingname: "Initiation Project 1 Meeting",
      datemeeting: "11/10/2021",
      time: "11/10/2021",
      location: "100 Days",
      meetingleader: "Done",
    },
    {
      meetingname: "Initiation Project 2 Meeting",
      datemeeting: "11/10/2021",
      time: "11/10/2021",
      location: "100 Days",
      meetingleader: "Done",
    },
    {
      meetingname: "Initiation Project 3 Meeting",
      datemeeting: "11/10/2021",
      time: "11/10/2021",
      location: "100 Days",
      meetingleader: "In Progress",
    },
    {
      meetingname: "Initiation Project 4 Meeting",
      datemeeting: "11/10/2021",
      time: "11/10/2021",
      location: "100 Days",
      meetingleader: "In Progress",
    },
    {
      meetingname: "Initiation Project 5 Meeting",
      datemeeting: "11/10/2021",
      time: "11/10/2021",
      location: "100 Days",
      meetingleader: "In Progress",
    },
    {
      meetingname: "Initiation Project 6 Meeting",
      datemeeting: "11/10/2021",
      time: "11/10/2021",
      location: "100 Days",
      meetingleader: "In Progress",
    },
    {
      meetingname: "Initiation Project 7 Meeting",
      datemeeting: "11/10/2021",
      time: "11/10/2021",
      location: "100 Days",
      meetingleader: "In Progress",
    },
  ];
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
              <th align="center">Edit</th>
              <th align="center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td align="center">{item.meetingname}</td>
                <td align="center">{item.datemeeting}</td>
                <td align="center">{item.time}</td>
                <td align="center">{item.location}</td>
                <td align="center">{item.meetingleader}</td>
                <td align="center">
                  <button className="px-1">
                    <IconEdit />
                  </button>
                </td>
                <td align="center">
                  <button className="px-1"><IconDelete /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MinutesofMeetingList;
