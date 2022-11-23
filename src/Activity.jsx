import React from "react";
import { useQuery, gql } from '@apollo/client';

const get_project = gql`query activity { activity { data { ID name description user_id } } }`;

function FetchActivity() {
    const { loading, error, data } = useQuery(get_project);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    return data.activity.data.map(({ ID, name, description, user_id }) => (
        <div key={ID}>
            <h3>{ID}. {name}</h3>
            <p>{description}</p>
            <p>{user_id}</p>
            <p />
        </div>
    ));
}

export default function Activity() {

    return (
        <div>
            <h1>Activity</h1>
            <FetchActivity />
        </div>
    );
}