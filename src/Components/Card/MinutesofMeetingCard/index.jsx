import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import MinutesofMeetingList from "./MinutesofMeetingList";
import { IconSearch } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css'
import TableFooter from "./TableFooter";
import GetProfile from "../../Auth/GetProfile";
import { GET_PROJECT_DATA_BY_USER_ID } from "../../GraphQL/Queries";
import { Client, ProjectManager } from "../../GraphQL/ProjectByIdQueries";
import FetchMomByProjectId from "../../../Middleware/Fetchers/FetchMomByProjectId";
import FutureUpdateFilter from "../../Modal/FutureUpdateModal/Filter/FutureUpdateFilter";

const MinutesofMeetingCard = (props) => {
    const { icon } = props;
    const iconA = <IconSearch />;

    const [page, setPage] = useState(1);

    const momData = FetchMomByProjectId();

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5) // hardcode
    const [totalItems, setTotalItems] = useState(momData.length)

    const profile = GetProfile();
    const { data, refetch } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: profile.id, sort: "ID asc" },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    const [momProjectID, setMomProjectID] = useState(localStorage.getItem('momProjectID'));
    const [isNewDataArrived, setIsNewDataArrived] = useState(false);

    useEffect(() => {
        if (data) {
            setProject(data.projectByUserId.Data);
            if (data.projectByUserId.Data.length !== 0) {
                localStorage.getItem("momProjectID") === null ? localStorage.setItem('momProjectID', data.projectByUserId.Data[0].ID) : console.log("momProjectID is not null");
                momProjectID === null ? setMomProjectID(data.projectByUserId.Data[0].ID) : setMomProjectID(localStorage.getItem('momProjectID'));
            }

            if (data.projectByUserId.Data.length === 0){
                localStorage.removeItem('momProjectID');
            }

        }
        if (momData) {
            setTotalItems(momData.length);
            console.log("totalItems : " + totalItems);
        }
        else {
            console.log("No data found for project with user id : " + profile.id);
            localStorage.setItem('momProjectID', 0)
        }

        refetch({ userId: String(profile.id), sort: "ID asc" });
    }, [data, momData]);

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
        setMomProjectID(event.target.value);
        localStorage.setItem('momProjectID', event.target.value);
        window.location.reload();
    };

    return (
        <div className="rounded-xl shadow-lg bg-white py-4 px-4">
            <div>
                <div className="pt-4 pb-0 flex justify-between">
                    <div className="flex justify-start">
                        <p className="text-xl font-semibold px-2">Minutes of Meeting</p>
                    </div>
                </div>

                <div className="px-8">
                    <div className="py-6 grid grid-cols-18">
                        <div className="md:col-span-7 col-span-6">
                            <div className="pb-2">
                                <p className="text-sm font-semibold opacity-70">Project Name</p>
                            </div>
                            <div>
                                <select value={momProjectID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-xs">
                                    {printListProjectName()}
                                </select>
                            </div>
                        </div>
                        <div className="md:col-span-7 col-span-6">
                            <div className="pb-2">
                                <p className="text-sm font-semibold opacity-70">Project Manager</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold"><ProjectManager value={momProjectID}></ProjectManager></p>
                            </div>
                        </div>
                        <div className="md:col-span-4 col-span-6">
                            <div className="pb-2">
                                <p className="text-sm font-semibold opacity-70">Client</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold"><Client value={momProjectID} /></p>
                            </div>
                        </div>
                    </div>

                    <div className="py-6">
                        <div>
                            <div className="py-2 w-full bg-grey-light text-center">
                                <p className="text-sm font-semibold opacity-70">Meeting List</p>
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
                        <div className="col-span-15">
                            <MinutesofMeetingList
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

export default MinutesofMeetingCard;
