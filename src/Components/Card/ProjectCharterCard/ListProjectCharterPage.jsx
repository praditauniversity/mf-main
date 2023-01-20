import { gql, useMutation } from '@apollo/client';
import React from "react";
import { Link } from 'react-router-dom';
import '../../../Assets/svgbutton/svgbutton.css';
import FetchCharter from "../../../Middleware/Fetchers/FetchCharter";
import { GET_CHARTER_DATA, GET_CHARTER_DATA_BY_USER_ID } from "../../GraphQL/Queries";
import { IconDelete, IconEdit } from "../../Icons/icon";
import DeleteModalProject from '../../Modal/ProjectCharterModal/DeleteModal/DeleteModal';
import UpdateModalProject from '../../Modal/ProjectCharterModal/UpdateModal/UpdateModal';
import UpdateModalProjectCharter from '../../Modal/ProjectCharterModal/UpdateModal/UpdateModal';
import './table.css';
// import { GET_PROJECT_DATA_BY_USER_ID } from "../../GraphQL/Queries";


const DELETE_PROJECTCHARTER = gql`
  mutation DeleteProject($id: String!) {
    deleteProject(id: $id) 
  }`;

const PCList = () => {
    const charterData = FetchCharter();

    const [deleteCharter, { loading, error }] = useMutation(DELETE_PROJECTCHARTER,
        {
            refetchQueries: [
                { query: GET_CHARTER_DATA }, console.log("Berhasil Fetch")
            ]
        }
    );

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;


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
                        {/* ada masalah disini */}
                        {Array.isArray(charterData) ? charterData.map((item) => {
                            console.log("AAA", item.ID);
                            const idMap = toString(item.ID);
                            const startProject = new Date(item.start_project);
                            const endProject = new Date(item.end_project);

                            const startProjectYear = startProject.toLocaleDateString('en-US', { year: 'numeric' });
                            const startProjectMonth = startProject.toLocaleDateString('en-US', { month: '2-digit' });
                            const startProjectDay = startProject.toLocaleDateString('en-US', { day: '2-digit' });

                            const endProjectYear = endProject.toLocaleDateString('en-US', { year: 'numeric' });
                            const endProjectMonth = endProject.toLocaleDateString('en-US', { month: '2-digit' });
                            const endProjectDay = endProject.toLocaleDateString('en-US', { day: '2-digit' });
                            return (
                                <tr key={item.ID} onClick={localStorage.setItem('charterID', item.ID)}>
                                    {/* className={`cursor-pointer ${isClicked ? 'bg-yellow-500 text-primary' : ''}`} */}
                                    <td align="center"><Link to={{ pathname: '/charterview', state: { value: item.ID } }}><button className="hover:text-primary">{item.name}</button></Link></td>
                                    <td align="center">{item.project_manager}</td>
                                    <td align="center">{item.client}</td>
                                    <td align="center">{startProjectMonth}/{startProjectDay}/{startProjectYear}</td>
                                    <td align="center">{endProjectMonth}/{endProjectDay}/{endProjectYear}</td>
                                    <td align="center">
                                        <button className="" id="icon">
                                            {/* <IconEdit /> */}
                                            <UpdateModalProject
                                                projectID={String(item.ID)}

                                            />
                                        </button>
                                        <button className="" id="icon">
                                            {/* <IconEdit /> */}
                                            <DeleteModalProject
                                                projectID={String(item.ID)}
                                            />
                                        </button>
                                        {/* <button className="px-1" id="icon" onClick={e => {
                                            console.log(typeof idMap, idMap);
                                            console.log(typeof item.ID, item.ID);
                                            const testDAH = String(item.ID);
                                            console.log(typeof testDAH, testDAH);
                                            e.preventDefault();
                                            deleteCharter({ variables: { id: testDAH } });
                                            // window.location.reload(true);
                                            // setId('');
                                            // id =idMap;
                                        }}><IconDelete /></button> */}
                                    </td>
                                </tr>
                            )
                        }
                        ) :
                            <tr>
                                <td align="center">No Data</td>
                            </tr>
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default PCList;