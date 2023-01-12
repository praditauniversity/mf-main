import React, { useState } from "react";
import { IconEdit, IconDelete } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css'
import { Link, useHistory } from 'react-router-dom';
import './table.css'
import FetchCharter from "../../../Middleware/Fetchers/FetchCharter";

const PCList = () => {
  const charterData = FetchCharter();
  // const data = [
  //   {
  //     id: 1,
  //     projectname: "Project Anomaly",
  //     projectmanager: "Jhon Doe",
  //     customer: "Jaya Gedung Group",
  //     startdate: "08/14/2022",
  //     enddate: "08/14/2023",
  //   },
  //   {
  //     id: 2,
  //     projectname: "Project Beta",
  //     projectmanager: "Jhon Doe",
  //     customer: "ABC Corp",
  //     startdate: "08/14/2022",
  //     enddate: "08/14/2023",
  //   },
  //   {
  //     id: 3,
  //     projectname: "Project Delta",
  //     projectmanager: "Jhon Doe",
  //     customer: "XYZ Company",
  //     startdate: "08/14/2022",
  //     enddate: "08/14/2023",
  //   },
  //   {
  //     id: 4,
  //     projectname: "Project Gamma",
  //     projectmanager: "Jhon Doe",
  //     customer: "Synthetica Corp",
  //     startdate: "08/14/2022",
  //     enddate: "08/14/2023",
  //   },
  //   {
  //     id: 5,
  //     projectname: "Project Alpha",
  //     projectmanager: "Jhon Doe",
  //     customer: "Syncronize Group",
  //     startdate: "08/14/2022",
  //     enddate: "08/14/2023",
  //   },
  //   {
  //     id: 6,
  //     projectname: "Project Magna",
  //     projectmanager: "Jhon Doe",
  //     customer: "Merdeka Gedung Group",
  //     startdate: "08/14/2022",
  //     enddate: "08/14/2023",
  //   },
  //   {
  //     id: 7,
  //     projectname: "Project Gadget",
  //     projectmanager: "Jhon Doe",
  //     customer: "Gadget Company Group",
  //     startdate: "08/14/2022",
  //     enddate: "08/14/2023",
  //   },
  // ];

  // const [value, setValue] = useState('');
  // const history = useHistory();

  // const handleClick = (val) => {
  //   // setIsClicked(!isClicked);
  //   // event.currentTarget.classList.toggle("selected");
  //   // console.log(event.currentTarget);
  //   // setValue(val);
  //   // history.push({
  //   //   pathname: '/charterview',
  //   //   state: { value }
  //   // })
  //   return val;
  // }
  
  return (
    <div className="rounded-xl shadow-lg bg-white pt-6">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full table-hover h-1/3">
          <thead>
            <tr>
              <th align="center">Project Name</th>
              <th align="center">Project Manger</th>
              <th align="center">Client</th>
              <th align="center">Start Date</th>
              <th align="center">End Date</th>
              <th align="center">Action</th>
            </tr>
          </thead>
          <tbody>
            {charterData.map((item, index) => {
              const startProject = new Date(item.Project.start_project);
              const endProject = new Date(item.Project.end_project);
              
              const startProjectYear = startProject.toLocaleDateString('en-US', {year: 'numeric'});
              const startProjectMonth = startProject.toLocaleDateString('en-US', {month: '2-digit'});
              const startProjectDay = startProject.toLocaleDateString('en-US', {day: '2-digit'});
              
              const endProjectYear = endProject.toLocaleDateString('en-US', {year: 'numeric'});
              const endProjectMonth = endProject.toLocaleDateString('en-US', {month: '2-digit'});
              const endProjectDay = endProject.toLocaleDateString('en-US', {day: '2-digit'});
              return (
                <tr key={item.ID}>
                  {/* className={`cursor-pointer ${isClicked ? 'bg-yellow-500 text-primary' : ''}`} */}
                  <td align="center"><Link to={{pathname: '/charterview', state: { value: item.ID }}}><button className="hover:text-primary">{item.Project.name}</button></Link></td>
                  <td align="center">{item.Project.project_manager}</td>
                  <td align="center">{item.Project.client}</td>
                  <td align="center">{startProjectYear}/{startProjectMonth}/{startProjectDay}</td>
                  <td align="center">{endProjectYear}/{endProjectMonth}/{endProjectDay}</td>
                  <td align="center">
                    <button className="px-1" id="icon">
                      <IconEdit />
                    </button>
                    <button className="px-1" id="icon"><IconDelete /></button>
                  </td>
                </tr>
              )}
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default PCList;