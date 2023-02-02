import { gql, useMutation } from '@apollo/client';
import React from "react";
import { Link, useParams } from 'react-router-dom';
import ProjectCharterCard from '.';
import '../../../Assets/svgbutton/svgbutton.css';
import FetchCharter from "../../../Middleware/Fetchers/FetchCharter";
import FetchProjectCharterID from '../../../Middleware/Fetchers/FetchProjectCharterID';
import { GET_CHARTER_DATA } from "../../GraphQL/Queries";
import DeleteModalProject from '../../Modal/ProjectCharterModal/DeleteModal/DeleteModal';
import UpdateModalProject from '../../Modal/ProjectCharterModal/UpdateModal/UpdateModal';
import ViewModalCharter from '../../Modal/ProjectCharterModal/ViewModal/ViewModal';
import './table.css';
// import { GET_PROJECT_DATA_BY_USER_ID } from "../../GraphQL/Queries";


const DELETE_PROJECTCHARTER = gql`
  mutation DeleteProject($id: String!) {
    deleteProject(id: $id) 
  }`;

const PCList = () => {
    let { projectID } = useParams();
    // const charterData = FetchCharter();
    const charterData2 = FetchProjectCharterID({projectID});

    const [deleteCharter, { loading, error }] = useMutation(DELETE_PROJECTCHARTER,
        {
            refetchQueries: [
                { query: GET_CHARTER_DATA }, console.log("Berhasil Fetch")
            ]
        }
    );

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    const ifCharterDataEmpty = () => {
        if (charterData2.length === 0) {
            // fill the table with white space
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
                        {/* ada masalah disini */}
                        {Array.isArray(charterData2) ? charterData2.map((item) => {
                            console.log("AAA", item.ID);
                            const idMap = toString(item.ID);
                            // const onClickTask = (identifier) => {
                            //     const index = charterData.findIndex(task => task.id === identifier);
                            //     const newTasks = [...tasks];
                            //     newTasks[index].isComplete = true;

                            //     setTasks(newTasks);
                            //   };    

                            const startProject = new Date(item.start_project);
                            const endProject = new Date(item.end_project);

                            const startProjectYear = startProject.toLocaleDateString('en-US', { year: 'numeric' });
                            const startProjectMonth = startProject.toLocaleDateString('en-US', { month: '2-digit' });
                            const startProjectDay = startProject.toLocaleDateString('en-US', { day: '2-digit' });

                            const endProjectYear = endProject.toLocaleDateString('en-US', { year: 'numeric' });
                            const endProjectMonth = endProject.toLocaleDateString('en-US', { month: '2-digit' });
                            const endProjectDay = endProject.toLocaleDateString('en-US', { day: '2-digit' });

                            const StartingProject = startProjectMonth+'/'+startProjectDay+'/'+startProjectYear
                            const EndingProject = endProjectMonth+'/'+endProjectDay+'/'+endProjectYear
                            return (
                                <tr key={item.ID} >
                                    {/* className={`cursor-pointer ${isClicked ? 'bg-yellow-500 text-primary' : ''}`} */}
                                    {/* <td align="center"><Link to={{ pathname: '/charterview', state: { value: item.ID } }}><button className="hover:text-primary" onClick={localStorage.setItem('charterID', item.ID)} >{item.name}</button></Link></td> */}
                                    {/* <td align="center"><button className="" id="icon" onClick={(e) => {
                                        localStorage.setItem('charterID', item.ID)
                                        console.log("ID", localStorage.getItem('charterID'))
                                    }}><Link Link to={{ pathname: '/charterview', state: { value: item.ID } }}>{item.name}e</Link>
                                    </button>
                                    </td> */}
                                    <td align="center">{item.name}</td>
                                    <td align="center">{item.project_manager ? item.project_manager : "N/A"}</td>
                                    <td align="center">{item.client ? item.client : "N/A"}</td>
                                    <td align="center">{startProjectMonth}/{startProjectDay}/{startProjectYear}</td>
                                    <td align="center">{endProjectMonth}/{endProjectDay}/{endProjectYear}</td>
                                    <td align="center">
                                        <button className="" id="icon">
                                            {/* <IconEdit /> */}
                                            <UpdateModalProject
                                                projectID={String(item.ID)}
                                                projectData={item}
                                            />
                                        </button>
                                        <button className="" id="icon">
                                            {/* <IconEdit /> */}
                                            <DeleteModalProject
                                                projectID={String(item.ID)}
                                                projectName={item.name}
                                            />
                                        </button>
                                        <button className="" id="icon">
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
                                        {/* <button className="" id="icon" onClick={(e) => {
                                            localStorage.setItem('charterID', item.ID)
                                            console.log("ID", localStorage.getItem('charterID'))
                                        }}>
                                            <Link Link to={{ pathname: '/charterview', state: { value: item.ID } }}>++</Link>
                                        </button> */}
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
                        {ifCharterDataEmpty()}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default PCList;