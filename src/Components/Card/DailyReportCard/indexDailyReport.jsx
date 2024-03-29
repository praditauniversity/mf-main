import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { IconSearch } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css'
import TableFooter from "./TableFooter";
import DRList from "./List";
import GetProfile from "../../Auth/GetProfile";
import { Client, ClientContact, Location, ProjectManager, ProjectStatus } from "../../GraphQL/ProjectByIdQueries";
import { GET_PROJECT_DATA_BY_USER_ID } from "../../GraphQL/Queries";
import FetchDailyReportByProjectId from "../../../Middleware/Fetchers/FetchDailyReportByProjectId";
import FutureUpdateFilter from "../../Modal/FutureUpdateModal/Filter/FutureUpdateFilter";

const DailyReportPage = (props) => {
    const { icon } = props;
    const iconA = <IconSearch />;

    const [page, setPage] = useState(1);
    const DRDataList = FetchDailyReportByProjectId();

    const profile = GetProfile();
    const { data, refetch } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: profile.id, sort: "ID asc" },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    const [reportProjectID, setReportProjectID] = useState(localStorage.getItem('reportProjectID'));

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5) // hardcode
    const [totalItems, setTotalItems] = useState(DRDataList.length)

    useEffect(() => {
        if (data) {
            setProject(data.projectByUserId.Data);

            if (data.projectByUserId.Data.length !== 0) {
                //if local storage is empty, set to first project id
                localStorage.getItem('reportProjectID') === null ? localStorage.setItem('reportProjectID', data.projectByUserId.Data[0].ID) : console.log("reportProjectID is not null");
                reportProjectID === null ? setReportProjectID(data.projectByUserId.Data[0].ID) : setReportProjectID(localStorage.getItem('reportProjectID'));
            }

            if (data.projectByUserId.Data.length === 0){
                localStorage.removeItem('reportProjectID');
            }
        }

        if (DRDataList) {
            setTotalItems(DRDataList.length);
        }

        refetch({ userId: String(profile.id), sort: "ID asc" });
    }, [data, DRDataList]);

    const totalPages = Math.ceil(totalItems / itemsPerPage) ? Math.ceil(totalItems / itemsPerPage) : 1

    const handlePageChange = (currentPage) => {
        setCurrentPage(currentPage)
    }

    const increaseTotalItems = () => {
        setTotalItems(totalItems + 1);
    };

    const decreaseTotalItems = () => {
        setTotalItems(totalItems - 1);
    };

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
            {/* Snackbar */}
            <div id="snackbar">Daily Report created successfully!</div>
            <div id="snackbarupd">Daily Report updated successfully!</div>
            <div id="snackbardel">Daily Report deleted successfully!</div>
            <div>
                <div className="pt-4 pb-0 flex justify-between">
                    <div className="flex justify-start">
                        <p className="text-xl font-semibold px-2">Daily Report</p>
                    </div>
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
                                        <p className="text-base font-semibold"><ProjectManager value={reportProjectID} /></p>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Client</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold"><Client value={reportProjectID} /></p>
                                    </div>
                                </div>
                            </div>

                            <div className="py-8 grid grid-cols-15">
                                <div className="col-span-6">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Location</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold"><Location value={reportProjectID} /></p>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">General Project Status</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold"><ProjectStatus value={reportProjectID} /></p>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Client Contact</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold"><ClientContact value={reportProjectID} /></p>
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
                                <input
                                    className="form-control shadow appearance-none border rounded py-1 px-3 text-darkest leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder={"Search"}
                                />
                                <div className="px-1" id="icon"><FutureUpdateFilter /></div>
                            </div>
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="2xl:col-span-15 col-span-12">
                            <DRList
                                page={currentPage}
                                limit={itemsPerPage}
                                sort="ID asc"
                                totalItems={totalItems}
                                updateTotalItems={decreaseTotalItems}
                                onPageChange={handlePageChange}
                                totalPages={totalPages}
                            />
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="content-end items-end">
                            <TableFooter
                                limit={itemsPerPage}
                                sort="ID asc"
                                totalItems={totalItems}
                                updateTotalItems={increaseTotalItems}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DailyReportPage;
