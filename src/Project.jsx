import React from "react";
import { useQuery, gql } from '@apollo/client';

const get_project = gql`query project { project { Data { ID name description user_id } } }`;

function FetchProject() {
    const { loading, error, data } = useQuery(get_project);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    return data.project.Data.map(({ ID, name, description, user_id }) => (
        <div key={ID}>
            <h3>{ID}. {name}</h3>
            <p>{description}</p>
            <p>{user_id}</p>
            <p />
        </div>
    ));
}

export default function Project() {

    return (
        <div>
            <h1>Project</h1>
            <FetchProject />
        </div>
    );
}