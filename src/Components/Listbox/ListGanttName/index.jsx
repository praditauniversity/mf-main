import React, { useEffect, useState } from 'react';
import GetProfile from '../../Auth/GetProfile';
import { useQuery, gql } from '@apollo/client';
import { GET_GANTT_PROJECT_ID } from '../../GraphQL/Queries';

const ListGanttByProject = () => {
    const [ganttID, setGanttID] = useState(localStorage.getItem('ganttID'));
    const [projectID, setProjectID] = useState(localStorage.getItem('projectID'));

    const { data, loading, error } = useQuery(GET_GANTT_PROJECT_ID, {
        variables: { project_id: projectID }
    });
    const [ganttName, setGanttName] = useState([]);

    useEffect(() => {
        if (data) {
            console.log("Data Ready list gantt");
            setGanttName(data.ganttGetProjectID.data);
            console.log("Data Ready", data.ganttGetProjectID.data);
            ganttID ? localStorage.setItem('ganttID', ganttID) : localStorage.setItem('ganttID', data.ganttGetProjectID.data[0].ID);

        } else {
            console.log("No data list gantt");
        }
        console.log("USE EFFECT list gantt");
    }, [data]);

    function printListGanttName() {
        // if (loading) return <p>Loading...</p>;
        // if (error) return <p>Error :(</p>;


        return ganttName.map(({ ID, name }) => (
            <>
                {/* {console.log("ID VALUE TYPE", typeof ID)} */}
                {/* {console.log("ID VALUE TYPE", typeof ID.toString())} */}
                <option value={ID}>{name}</option>
            </>
        ));
    }

    const handleChange = (event) => {
        setGanttID(event.target.value);
        localStorage.setItem('ganttID', event.target.value);
        window.location.reload();
        // localStorage.setItem('selectedOption', selectedOption);
    };

    return (
        <div className="flex flex-col items-center">
            <select value={ganttID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-lg">
                {/* <option value="1">Project Anomaly</option>
                <option value="2">Project Alpha</option>
                <option value="3">Project Beta</option>
                <option value="4">Project Gamma</option> */}
                {printListGanttName()}
            </select>
            {/* {<Actual value={selectedOption} />} */}
            {console.log("OPTION val project id:", typeof projectID, projectID)}
            {console.log("OPTION val gantt id:", typeof projectID, projectID)}
        </div>
    );
}

export default ListGanttByProject;