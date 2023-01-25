import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import GetProfile from '../../Components/Auth/GetProfile';
import { GET_PROJECT_DATA_BY_USER_ID, GET_PROJECT_WITH_LIMIT } from "../../Components/GraphQL/Queries";

const FetchProjectPage = () => {
    // const { data } = useQuery(GET_PROJECT_WITH_LIMIT, {
    //     variables: { page: "1", limit: "7" }
    // });
    const profile = GetProfile();
    const { data } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: profile.id, limit: "7", sort: "start_project ASC" },
    });
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (data) {
            // setProject(data.projectPage.Data);
            setProject(data.projectByUserId.Data);
        } else {
            console.log("No data found for project");
        }
    }, [data]);

    return project;
}

export default FetchProjectPage;