import React from "react";
import { IconEdit, IconDelete } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css'

const DRList = () => {
  const data = [
    {
      id: 1,
      reportname: "Daily Report 1",
      reportnumber: "100",
      reportdate: "08/14/2022",
      activity: "Activity 2",
    },
    {
      id: 2,
      reportname: "Daily Report 2",
      reportnumber: "101",
      reportdate: "08/15/2022",
      activity: "Activity 3",
    },
    {
      id: 3,
      reportname: "Daily Report 3",
      reportnumber: "102",
      reportdate: "08/16/2022",
      activity: "Activity 1",
    },
    {
      id: 4,
      reportname: "Daily Report 4",
      reportnumber: "103",
      reportdate: "08/16/2022",
      activity: "Activity 1",
    },
    {
      id: 5,
      reportname: "Daily Report 5",
      reportnumber: "104",
      reportdate: "08/16/2022",
      activity: "Activity 2",
    },
    {
      id: 6,
      reportname: "Daily Report 6",
      reportnumber: "105",
      reportdate: "08/16/2022",
      activity: "Activity 2",
    },
    {
      id: 7,
      reportname: "Daily Report 7",
      reportnumber: "106",
      reportdate: "08/17/2022",
      activity: "Activity 3",
    },
  ];

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
            {data.map((item, index) => (
              <tr key={index}>
                <td align="center">{item.reportname}</td>
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
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default DRList;
