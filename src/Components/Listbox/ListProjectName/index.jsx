import React, { useEffect, useState } from 'react';
import GetProfile from '../../Auth/GetProfile';
import { useQuery, gql } from '@apollo/client';
import { GET_PROJECT_DATA, GET_PROJECT_DATA_BY_USER_ID } from '../../GraphQL/Queries';
import { Actual } from '../../GraphQL/ProjectByIdQueries';

const ListboxProjectName = (props) => {
    const {setGanttID, projectID, setProjectID} = props;
    const profile = GetProfile();
    const { loading, error, data } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: profile.id },
    });
    const [projectData, setProject] = useState([]);

    useEffect(() => {
        if (data) {
            setProject(data.projectByUserId.Data);
            // console.log("FFFFFFFFFFFFFFf", data.projectByUserId.Data[0].ID);
            projectID === 0 ? localStorage.setItem('projectID', data.projectByUserId.Data[0].ID) : localStorage.setItem('projectID', projectID);
        } else {
            console.log("No data");
            localStorage.setItem('projectID', 0)
        }
    }, [data]);

    function printListProjectName() {
        // if (loading) return <p>Loading...</p>;
        // if (error) return <p>Error :(</p>;

        return projectData.map(({ ID, name, user_id }) => (
            <>
                <option value={ID}>{name}</option>               
            </>
        ));
    }

    const handleChange = (event) => {
        setProjectID(event.target.value);
        localStorage.setItem('projectID', event.target.value);
        setGanttID(0);
        // localStorage.setItem('ganttID', "1");
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center">
            <select value={projectID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-lg">
                {/* <option value="1">Project Anomaly</option>
                <option value="2">Project Alpha</option>
                <option value="3">Project Beta</option>
                <option value="4">Project Gamma</option> */}
                {printListProjectName()}
            </select>
            {/* {<Actual value={selectedOption} />} */}
            {console.log("OPTION val:", typeof projectID, projectID)}
        </div>
    );
}

export default ListboxProjectName;