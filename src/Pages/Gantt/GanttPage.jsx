import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchGanttByProjectId from '../../Middleware/Fetchers/FetchGanttByProjectId';
import AddModalGantt from '../../Components/Modal/Gantt/AddModalGantt';
import EditModalGantt from '../../Components/Modal/Gantt/EditModalGantt';
import DeleteModalGantt from '../../Components/Modal/Gantt/DeleteModalGantt';
import ViewIcon from "../../Assets/Icons/svg/ViewIcon.svg";

const GanttPage = () => {

    let { projectID } = useParams();

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

    const TableFooter = () => {
        return (
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Version</th>
                <th>Action Badge</th>
                <th></th>
            </tr>
        )
    }

    const ganttList = FetchGanttByProjectId({ projectID });
    const [totalData, setTotalData] = useState(ganttList.length);
    const [ganttData, setGanttData] = useState([]);

    useEffect(() => {
        if (ganttList) {
            setTotalData(ganttList.length);
            setGanttData(ganttList);
        }
    }, [ganttList]);

    const filler = () => {
        if (ganttData.length > 0) {
            // fill the table with white space
            return (
                <tr className="h-full" >
                    <td colSpan="7" className="text-center ">
                        <div className="text-gray-400 opacity-10 hover:opacity-40 hover:cursor-pointer">
                            <div className="text-4xl font-bold">Other Gantt</div>
                            <div className="text-md">Add another gantt?</div>
                        </div>
                    </td>
                </tr>
            )
        }
    }

    const ifGanttDataEmpty = () => {
        if (ganttData.length === 0) {
            // fill the table with white space
            return (
                <tr className="h-full" >
                    <td colSpan="7" className="text-center ">
                        <div className="text-gray-400">
                            <div className="text-5xl font-bold">No Gantt</div>
                            <div className="text-xl">Please add a gantt</div>
                        </div>
                    </td>
                </tr>
            )
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }

    return (
        <div className="rounded-xl shadow-lg bg-white py-4 px-4 flex min-full">
            {/* Snackbar */}
            <div id="snackbar">Gantt created successfully!</div>
            <div id="snackbarupd">Gantt updated successfully!</div>
            <div id="snackbardel">Gantt deleted successfully!</div>
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
                                        {gantt.description ? gantt.description : "N/A"}
                                    </p>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            {/* parsing from 2023-01-05T04:04:48.377Z to 05 January 2023 */}
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

                                        </div>
                                    </div>
                                </td>
                                {/* maximum 48 pixel width, otherwise it will be on the next line */}
                                <td className="flex items-center space-x-3 w-48 pt-6">
                                    <div className="flex items-center mb-4">
                                        <EditModalGantt ganttID={gantt.ID} />
                                        <DeleteModalGantt ganttID={gantt.ID} ganttName={gantt.name} total={totalData} />
                                        <a
                                            href={`/#/project-list/${projectID}/gantt/${gantt.ID}/gantt-chart`}
                                        >
                                            <img
                                                src={ViewIcon}
                                                alt="view gantt"
                                                id='icon'
                                            />
                                        </a>
                                    </div>

                                </td>
                            </tr>
                        ))}
                        {ifGanttDataEmpty()}
                        {filler()}
                    </tbody>
                    {/* <!-- foot --> */}
                    <tfoot>
                        <TableFooter />
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default GanttPage;