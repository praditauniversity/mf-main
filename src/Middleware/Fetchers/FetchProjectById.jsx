import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import GetProfile from '../../Components/Auth/GetProfile';
import { GET_PROJECT_DATA_BY_ID } from '../../Components/GraphQL/Queries';

const FetchProjectById = (props) => {
    const profile = GetProfile();
    const {projectID } = props;
    const { data, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: projectID},
        pollInterval: 1000,
    });
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (data) {
            data.project.Data ? setProject(data.project.Data) : console.log("No dataaaaa");
            console.log(project);
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${projectID} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Project Manager");
        }
        refetch();
    }, [data]);

    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }   

    return project;
}

export default FetchProjectById;