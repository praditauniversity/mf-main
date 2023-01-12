import React, { useState } from "react";
import { IconEdit, IconDelete } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css'
import { Link } from 'react-router-dom';
import './table.css'

const PCList = () => {
  const data = [
    {
      id: 1,
      projectname: "Project Anomaly",
      projectmanager: "Jhon Doe",
      customer: "Jaya Gedung Group",
      startdate: "08/14/2022",
      enddate: "08/14/2023",
    },
    {
      id: 2,
      projectname: "Project Beta",
      projectmanager: "Jhon Doe",
      customer: "ABC Corp",
      startdate: "08/14/2022",
      enddate: "08/14/2023",
    },
    {
      id: 3,
      projectname: "Project Delta",
      projectmanager: "Jhon Doe",
      customer: "XYZ Company",
      startdate: "08/14/2022",
      enddate: "08/14/2023",
    },
    {
      id: 4,
      projectname: "Project Gamma",
      projectmanager: "Jhon Doe",
      customer: "Synthetica Corp",
      startdate: "08/14/2022",
      enddate: "08/14/2023",
    },
    {
      id: 5,
      projectname: "Project Alpha",
      projectmanager: "Jhon Doe",
      customer: "Syncronize Group",
      startdate: "08/14/2022",
      enddate: "08/14/2023",
    },
    {
      id: 6,
      projectname: "Project Magna",
      projectmanager: "Jhon Doe",
      customer: "Merdeka Gedung Group",
      startdate: "08/14/2022",
      enddate: "08/14/2023",
    },
    {
      id: 7,
      projectname: "Project Gadget",
      projectmanager: "Jhon Doe",
      customer: "Gadget Company Group",
      startdate: "08/14/2022",
      enddate: "08/14/2023",
    },
  ];

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (event) => {
    setIsClicked(!isClicked);
    event.currentTarget.classList.toggle("selected");
    console.log(event.currentTarget);
  }


  return (
    <div className="rounded-xl shadow-lg bg-white pt-6">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full table-hover h-1/3">
          <thead>
            <tr>
              <th align="center">Project Name</th>
              <th align="center">Project Manger</th>
              <th align="center">Customer</th>
              <th align="center">Start Date</th>
              <th align="center">End Date</th>
              <th align="center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} onClick="handleClick(event)">
                {/* className={`cursor-pointer ${isClicked ? 'bg-yellow-500 text-primary' : ''}`} */}
                <td align="center"><Link to="/charterview"><button className="hover:text-primary">{item.projectname}</button></Link></td>
                <td align="center">{item.projectmanager}</td>
                <td align="center">{item.customer}</td>
                <td align="center">{item.startdate}</td>
                <td align="center">{item.enddate}</td>
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

export default PCList;
