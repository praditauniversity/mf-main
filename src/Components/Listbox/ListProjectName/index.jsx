import React, { useEffect, useState } from 'react';
import GetProfile from '../../Auth/GetProfile';
import { useQuery, gql } from '@apollo/client';
import { GET_PROJECT_DATA, GET_PROJECT_DATA_BY_USER_ID } from '../../GraphQL/Queries';
import { Actual } from '../../GraphQL/ProjectByIdQueries';

const ListboxProjectName = (props) => {
    const {setGanttID, projectID, setProjectID, projectData} = props;

    console.log("XXXXXXXXXXXXXXX", projectData);

    
    // const [projectData, setProjectData] = useState([]);
    // const [projectID, setProjectID] = useState(localStorage.getItem('projectID'));
    // const profile = GetProfile();
    // const {data} = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
    //     variables: { userId: profile.id, sort: "ID asc" },
    // });
    // useEffect(() => {
    //     if(data){
    //         setProjectData(data.projectByUserId.Data);
    //         localStorage.getItem('projectID') === null ? localStorage.setItem('projectID', data.projectByUserId.Data[0].ID) : console.log("projectID is not null");
    //     projectID === null ? setProjectID(data.projectByUserId.Data[0].ID) : setProjectID(localStorage.getItem('TPEID'));
    // }
    // }, [data]);
    
    
    // const { loading, error, data } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
    //     variables: { userId: profile.id },
    // });
    // const [projectData, setProject] = useState([]);
    // // if (loading) return <p>Loading...</p>;
    // // if (error) return <p>Error :(</p>;

    // useEffect(() => {
    //     if (data) {
    //         console.log("Data Ready");
    //         setProject(data.projectByUserId.Data);
    //         // console.log("FFFFFFFFFFFFFFf", data.projectByUserId.Data[0].ID);
    //         localStorage.setItem('projectID', data.projectByUserId.Data[0].ID);
    //     } else {
    //         console.log("No data");
    //     }
    // }, [data]);

    // useEffect(() => {
    //     // Update the projectID value in local storage whenever it changes
    //     localStorage.setItem('projectID', projectID);
    //     console.log("projectID", projectID);
    // }, [projectID]);

    
// TODO: Fix this
    function printListProjectName() {
        if(projectData.length>0){
        return projectData.map(({ ID, name }) => (
            <>
                <option value={ID}>{name}</option>               
            </>
        ));
        }
        //  else {
        //     return <option value="0">No Data Project</option>
        // }
    }

    const handleChange = (event) => {
        setProjectID(event.target.value);
        localStorage.setItem('projectID', event.target.value);
        localStorage.setItem('ganttID', "0");
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center">
            <select value={projectID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-lg">
                {printListProjectName()}
            </select>
            {/* {<Actual value={selectedOption} />} */}
            {console.log("OPTION val:", typeof projectID, projectID)}
        </div>
    );
}

export default ListboxProjectName;