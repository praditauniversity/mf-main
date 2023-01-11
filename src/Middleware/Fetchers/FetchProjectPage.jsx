import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_PROJECT_WITH_LIMIT } from "../../Components/GraphQL/Queries";

const FetchProjectPage = () => {
    const { data } = useQuery(GET_PROJECT_WITH_LIMIT, {
        variables: { page: "1", limit: "7" }
    });

    const [project, setProject] = useState([]);

    useEffect(() => {
        if (data) {
            setProject(data.projectPage.Data);
        } else {
            console.log("No data found for project");
        }
    }, [data]);

    return project;
}

export default FetchProjectPage;