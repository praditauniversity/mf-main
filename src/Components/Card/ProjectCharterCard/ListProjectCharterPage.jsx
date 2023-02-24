import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from "react";
import '../../../Assets/svgbutton/svgbutton.css';
import GetProfile from '../../Auth/GetProfile';
import { GET_PROJECT_DATA_BY_USER_ID } from "../../GraphQL/Queries";
import DeleteModalProject from '../../Modal/ProjectCharterModal/DeleteModal/DeleteModal';
import UpdateModalProject from '../../Modal/ProjectCharterModal/UpdateModal/UpdateModal';
import ViewModalCharter from '../../Modal/ProjectCharterModal/ViewModal/ViewModal';
import './table.css';

const PCList = (props) => {
    const { page, limit, sort, totalItems, updateTotalItems, onPageChange, totalPages } = props;
    const profile = GetProfile();
    const { data, error: errorGetProject } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: String(profile.id), page: String(page), limit: String(limit), sort: String(sort) },
        pollInterval: 1000,
    });
    const [charterData, setCharter] = useState([]);

    useEffect(() => {
        if (errorGetProject) {
            // console.log("Error Get Project", errorGetProject);
        }
        if (data) {
            setCharter(data.projectByUserId.Data);
            // console.log("Data found for project with user id : " + profile.id);
            // console.log("Data found for project with user id : " + data.projectByUserId.Data);
        } else {
            // console.log("No data found for project with user id : " + profile.id);
        }
    }, [data]);

    const ifCharterDataEmpty = () => {
        if (charterData.length === 0) {
            return (
                <tr className="h-full" >
                    <td colSpan="7" className="text-center ">
                        <div className="text-gray-400">
                            <div className="text-5xl font-bold">No Project Charter</div>
                            <div className="text-xl">Please add a project charter</div>
                        </div>
                    </td>
                </tr>
            )
        }
    }

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
                        {Array.isArray(charterData) ? charterData.map((item) => {

                            const startProject = new Date(item.start_project);
                            const endProject = new Date(item.end_project);

                            const startProjectYear = startProject.toLocaleDateString('en-US', { year: 'numeric' });
                            const startProjectMonth = startProject.toLocaleDateString('en-US', { month: '2-digit' });
                            const startProjectDay = startProject.toLocaleDateString('en-US', { day: '2-digit' });

                            const endProjectYear = endProject.toLocaleDateString('en-US', { year: 'numeric' });
                            const endProjectMonth = endProject.toLocaleDateString('en-US', { month: '2-digit' });
                            const endProjectDay = endProject.toLocaleDateString('en-US', { day: '2-digit' });

                            const StartingProject = startProjectMonth + '/' + startProjectDay + '/' + startProjectYear
                            const EndingProject = endProjectMonth + '/' + endProjectDay + '/' + endProjectYear
                            return (
                                <tr key={item.ID} >
                                    <td align="center">{item.name}</td>
                                    <td align="center">{item.project_manager ? item.project_manager : "N/A"}</td>
                                    <td align="center">{item.client ? item.client : "N/A"}</td>
                                    <td align="center">{startProjectMonth}/{startProjectDay}/{startProjectYear}</td>
                                    <td align="center">{endProjectMonth}/{endProjectDay}/{endProjectYear}</td>
                                    <td align="center">
                                        <button className="" id="">
                                            <UpdateModalProject
                                                projectData={item}
                                                page={page}
                                                limit={limit}
                                                sort={sort}
                                            />
                                        </button>
                                        <button className="" id="">
                                            <DeleteModalProject
                                                projectID={String(item.ID)}
                                                projectName={item.name}
                                                page={page}
                                                limit={limit}
                                                sort={sort}
                                                total={totalItems}
                                                updateTotal={updateTotalItems}
                                                dropCurrentPage={onPageChange}
                                                totalPages={totalPages}
                                            />
                                        </button>
                                        <button className="" id="">
                                            <ViewModalCharter
                                                charterID={item.ID}
                                                charterName={item.name}
                                                charterManager={item.project_manager ? item.project_manager : "N/A"}
                                                charterClient={item.client ? item.client : "N/A"}
                                                charterDesc={item.description ? item.description : "N/A"}
                                                charterObj={item.project_objectives}
                                                charterTeam={item.total_man_power}
                                                charterStakeholder={item.stakeholder_ammount}
                                                charterParticipant={item.participants}
                                                charterPlanned={item.cost_plan}
                                                charterActual={item.cost_actual}
                                                charterSymbol={item.currency_symbol ? item.currency_symbol : "N/A"}
                                                charterResource={item.available_resources}
                                                charterStart={StartingProject}
                                                charterEnd={EndingProject}
                                                charterRisk={item.potential_risk}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        ) :
                            <tr>
                                <td align="center">No Data</td>
                            </tr>
                        }
                        {ifCharterDataEmpty()}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default PCList;