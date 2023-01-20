import React, { useEffect, useState } from 'react';
// import IconEdit from '../../Assets/Icons/svg/IconEdit.svg';
// import IconDelete from '../../Assets/Icons/svg/IconDelete.svg';
import { IconEdit } from '../../Components/Icons/icon';
import { useParams } from 'react-router-dom';
import FetchGanttByProjectId from '../../Middleware/Fetchers/FetchGanttByProjectId';
import { IconPlus } from '../../Components/Icons/icon';
import AddModalGantt from '../../Components/Modal/Gantt/AddModalGantt';
import EditModalGantt from '../../Components/Modal/Gantt/EditModalGantt';
import DeleteModalGantt from '../../Components/Modal/Gantt/DeleteModalGantt';
import { GET_GANTT_DATA } from '../../Components/GraphQL/Queries';
import { useQuery, gql, useMutation } from "@apollo/client";

const GanttPage = () => {

    let { projectID } = useParams();

    const ListProject = [
        {
            id: 1,
            name: "Project 1",
            description: "Description 1",
            location: "Location 1",
            jobs: [
                {
                    id: 11,
                    name: "Job 1",
                },
                {
                    id: 12,
                    name: "Job 2",
                }
            ],
            company: "Company 1",
            link: "/#/projectdashboard/1",
            favoriteColor: "Red",
        },
        {
            id: 2,
            name: "Project 2",
            description: "Description 1",
            location: "Location 2",
            jobs: [
                {
                    id: 21,
                    name: "Job 1",
                },
                {
                    id: 22,
                    name: "Job 2",
                }
            ],
            company: "Company 2",
            link: "/#/projectdashboard/2",
            favoriteColor: "Blue",
        },
        {
            id: 3,
            name: "Project 3",
            description: "Description 1",
            location: "Location 3",
            jobs: [
                {
                    id: 31,
                    name: "Job 1",
                }
            ],
            company: "Company 3",
            link: "/#/projectdashboard/3",
            favoriteColor: "Green",
        }
    ]

    function handleAddGantt() {
        console.log("Add Gantt");
    }

    const TableHeader = () => {
        return (
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Version</th>
                <th>Action Badge</th>
                <th><AddModalGantt /></th>
            </tr>
        )
    }



    const ganttData = FetchGanttByProjectId({ projectID });

    console.log("jjjjjjjjhjhjhjhjhjhjhjh", ganttData);
    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }

    function handleModalGantt() {
        console.log("Edit Gantt");

        <EditModalGantt ganttID="1" />
    }

    return (
        <div className="rounded-xl shadow-lg bg-white py-4 px-4 flex min-full">
            <div className="overflow-y-auto overflow-x-auto w-full h-500">

                <table className="table w-full h-full">
                    {/* <!-- head --> */}
                    <thead>
                        <TableHeader />
                    </thead>
                    <tbody>
                        {ganttData.map((gantt) => (
                            <tr key={gantt.ID}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{gantt.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className="truncate w-56 whitespace-nowrap text-ellipsis overflow-hidden">
                                        {gantt.description}
                                    </p>
                                    {/* <span className="badge badge-ghost badge-sm">
                                        gantt
                                    </span> */}
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            {/*parsing from 2023-01-05T04:04:48.377Z to 05 January 2023 */}
                                            <div className="font-bold">{new Date(gantt.start_time).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
                                            <div className="text-sm opacity-50">{new Date(gantt.end_time).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            {/* calculate duration */}
                                            <div className="font-bold">{Math.round((new Date(gantt.end_time) - new Date(gantt.start_time)) / (1000 * 60 * 60 * 24))} days</div>
                                            <div className="text-sm opacity-50">Duration Gantt</div>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{gantt.version}</div>
                                            {/* <div className="badge badge-ghost badge-sm">gantt version</div> */}

                                        </div>
                                    </div>
                                </td>
                                {/* maximum 48 pixel width, otherwise it will be on the next line */}
                                <th className="flex items-center space-x-2 w-48">
                                    <EditModalGantt ganttID={gantt.ID} />
                                    <DeleteModalGantt ganttID={gantt.ID} ganttName={gantt.name} />
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    {/* <!-- foot --> */}
                    <tfoot>
                        <TableHeader />
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default GanttPage;