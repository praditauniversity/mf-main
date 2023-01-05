import React from "react";
import { IconEdit, IconDelete } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css'

const MinutesofMeetingList = () => {
  const data = [
    {
      id: 1,
      meetingname: "Initiation Project 1 Meeting",
      datemeeting: "08/14/2022",
      time: "12.00 - 14.00",
      location: "Serpong, Tangerang",
      meetingleader: "Jhon Doe",
    },
    {
      id: 2,
      meetingname: "Initiation Project 2 Meeting",
      datemeeting: "08/15/2022",
      time: "12.00 - 14.00",
      location: "Serpong, Tangerang",
      meetingleader: "Jhon Doe",
    },
    {
      id: 3,
      meetingname: "Initiation Project 3 Meeting",
      datemeeting: "08/16/2022",
      time: "12.30 - 14.00",
      location: "Serpong, Tangerang",
      meetingleader: "Jhon Doe",
    },
    {
      id: 4,
      meetingname: "Initiation Project 4 Meeting",
      datemeeting: "08/17/2022",
      time: "12.00 - 14.00",
      location: "Serpong, Tangerang",
      meetingleader: "Jhon Doe",
    },
    {
      id: 5,
      meetingname: "Initiation Project 5 Meeting",
      datemeeting: "08/18/2022",
      time: "13.00 - 15.30",
      location: "Serpong, Tangerang",
      meetingleader: "Jhon Doe",
    },
    {
      id: 6,
      meetingname: "Initiation Project 6 Meeting",
      datemeeting: "08/21/2022",
      time: "12.00 - 14.30",
      location: "Serpong, Tangerang",
      meetingleader: "Jhon Doe",
    },
    {
      id: 7,
      meetingname: "Initiation Project 7 Meeting",
      datemeeting: "08/22/2022",
      time: "12.00 - 14.00",
      location: "Serpong, Tangerang",
      meetingleader: "Jhon Doe",
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
                  <button className="px-1" id="icon">
                    <IconEdit />
                  </button>
                </td>
                <td align="center">
                  <button className="px-1" id="icon"><IconDelete /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default MinutesofMeetingList;
