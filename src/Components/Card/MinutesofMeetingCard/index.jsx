import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import MinutesofMeetingList from "./MinutesofMeetingList";
import { IconPlus, IconEdit, IconDelete, IconFilter, IconSearch } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css'
import { InputField } from "../../Input/Input";
import TableFooter from "./TableFooter";
import AddModalMinutesOfMeeting from "../../Modal/MinutesOfMeetingModal/AddModal/AddModal";
import GetProfile from "../../Auth/GetProfile";
import { GET_PROJECT_DATA_BY_USER_ID } from "../../GraphQL/Queries";
import { Client, ProjectManager } from "../../GraphQL/ProjectByIdQueries";
import FetchMomByProjectId from "../../../Middleware/Fetchers/FetchMomByProjectId";

const MinutesofMeetingCard = (props) => {
    const { icon } = props;
    const iconA = <IconSearch />;

    const [page, setPage] = useState(1);

    const momData = FetchMomByProjectId();

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)
    const [totalItems, setTotalItems] = useState(1)
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const handlePageChange = (currentPage) => {
      setCurrentPage(currentPage)
    }

    const profile = GetProfile();
    const { data } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: profile.id},
    });
    const [projectData, setProject] = useState([]);
    const [momProjectID, setMomProjectID] = useState(localStorage.getItem('momProjectID'));

    useEffect(() => {
        if (data) {
            setProject(data.projectByUserId.Data);
            localStorage.getItem("momProjectID") === null ? localStorage.setItem('momProjectID', data.projectByUserId.Data[0].ID) : console.log("momProjectID is not null");
            momProjectID === null ? setMomProjectID(data.projectByUserId.Data[0].ID) : setMomProjectID(localStorage.getItem('momProjectID'));
            // momProjectID === null ? localStorage.setItem('momProjectID', data.projectByUserId.Data[0].ID) : localStorage.setItem('momProjectID', momProjectID);
        }
        if (momData) {
            setTotalItems(momData.length)
        }
         else {
            console.log("No data found for project with user id : " + profile.id);
            localStorage.setItem('momProjectID', 0)
        }
    }, [data, momData]);

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
                    {/* <div className="flex justify-end">
                        <div className="flex justify-between">
                            <AddModalMinutesOfMeeting />
                            <button className="px-1" id="icon"><IconEdit /></button>
                            <button className="px-1" id="icon"><IconDelete /></button>
                        </div>
                    </div> */}
                </div>

                <div className="px-8">
                    <div className="py-6 grid grid-cols-18">
                        <div className="md:col-span-7 col-span-6">
                            <div className="pb-2">
                                <p className="text-sm font-semibold opacity-70">Project Name</p>
                            </div>
                            <div>
                                {/* <p className="text-base font-semibold">Project Anomaly</p> */}
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
                                <p className="text-base font-semibold"><Client value={momProjectID}/></p>
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
                            <MinutesofMeetingList page={currentPage} limit={itemsPerPage} sort="meeting_date asc" />
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

export default MinutesofMeetingCard;
