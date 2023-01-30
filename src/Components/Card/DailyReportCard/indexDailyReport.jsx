import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { IconPlus, IconEdit, IconDelete, IconFilter, IconSearch } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css'
import { InputField } from "../../Input/Input";
import TableFooter from "./TableFooter";
import DRList from "./List";
import AddModalDailyReport from "../../Modal/DailyReportModal/AddModal/AddModal";
import FetchProjectByUserId from "../../../Middleware/Fetchers/FetchProjectByUserId";
import GetProfile from "../../Auth/GetProfile";
import { Client, ClientContact, Location, ProjectManager, ProjectStatus } from "../../GraphQL/ProjectByIdQueries";
import { GET_PROJECT_DATA_BY_USER_ID } from "../../GraphQL/Queries";

const DailyReportPage = (props) => {
    const { icon } = props;
    const iconA = <IconSearch />;

    const [page, setPage] = useState(1);

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(10)
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    // const projectData = FetchProjectByUserId();

    const profile = GetProfile();
    const { data } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: profile.id},
    });
    const [projectData, setProject] = useState([]);
    const [reportProjectID, setReportProjectID] = useState(localStorage.getItem('reportProjectID'));

    useEffect(() => {
        if (data) {
            setProject(data.projectByUserId.Data);
            reportProjectID == 0 ? localStorage.setItem('reportProjectID', data.projectByUserId.Data[0].ID) : localStorage.setItem('reportProjectID', reportProjectID);
        } else {
            console.log("No data found for project with user id : " + profile.id);
            localStorage.setItem('reportProjectID', 0)
        }
    }, [data]);

    function printListProjectName() {
        return projectData.map(({ ID, name }) => (
            <>
                <option value={ID}>{name}</option>               
            </>
        ));
    }

    const handleChange = (event) => {
        setReportProjectID(event.target.value);
        localStorage.setItem('reportProjectID', event.target.value);
        window.location.reload();
    };

    return (
        <div className="rounded-xl shadow-lg bg-white py-4 px-4">
            <div>
                <div className="pt-4 pb-0 flex justify-between">
                    <div className="flex justify-start">
                        <p className="text-xl font-semibold px-2">Daily Report</p>
                    </div>
                    {/* <div className="flex justify-end">
                        <div className="flex justify-between">
                            <AddModalDailyReport />
                            <button className="px-1" id="icon"><IconEdit /></button>
                            <button className="px-1" id="icon"><IconDelete /></button>
                        </div>
                    </div> */}
                </div>

                <div className="px-8">
                    <div className="grid grid-cols-18">
                        <div className="pt-6 pb-4 col-span-18">
                            <div className="grid grid-cols-15">
                                <div className="col-span-6">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Project Name</p>
                                    </div>
                                    <div>
                                        {/* <p className="text-base font-semibold">Project Anomaly</p> */}
                                        <select value={reportProjectID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-xs">
                                            {printListProjectName()}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Project Manager</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold"><ProjectManager value={reportProjectID}/></p>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Client</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold"><Client value={reportProjectID}/></p>
                                    </div>
                                </div>
                            </div>

                            <div className="py-8 grid grid-cols-15">
                                <div className="col-span-6">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Location</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold"><Location value={reportProjectID}/></p>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">General Project Status</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold"><ProjectStatus value={reportProjectID}/></p>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Client Contact</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold"><ClientContact value={reportProjectID}/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="py-6">
                        <div>
                            <div className="py-2 w-full bg-grey-light text-center">
                                <p className="text-sm font-semibold opacity-70">Report List</p>
                            </div>
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="content-end items-end text-right">
                            <div className="flex justify-end align-middle items-center text-center">
                                {/* <Input > */}
                                {/* <InputField /> */}
                                {/* {var iconaaa = <IconSearch />} */}
                                <input
                                    className="form-control shadow appearance-none border rounded py-1 px-3 text-darkest leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder={"search"}
                                />
                                {/* <IconSearch /> */}
                                <button className="px-1" id="icon"><IconFilter /></button>
                            </div>
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="col-span-15">
                            <DRList />
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="content-end items-end">
                            <TableFooter
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* <div className="py-4">
            </div>
            <div className="py-4 flex justify-end">
                <button className="font-semibold text-sm text-primary">
                    Detail Project Overview
                </button>
            </div> */}
        </div>
    );
};

export default DailyReportPage;
