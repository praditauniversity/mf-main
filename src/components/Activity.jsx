import React, { useEffect } from "react";
import { useQuery, gql } from '@apollo/client';

const GET_ACTIVITY = gql`query activity { activity { data { ID name description user_id } } }`;

function FetchActivity() {
    const { loading, error, data } = useQuery(GET_ACTIVITY);
    if (localStorage.getItem('token') === null) {
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return data.activity.data.map(({ ID, name, description, user_id }) => (
        <div key={ID}>
            <h3>{ID}. {name}</h3>
            <p>{description}</p>
            <p />
        </div>
    ));
}

export default function Activity() {
    const islogin = localStorage.getItem('token') !== null;
    if (islogin) {
        return (
            <div>
                <h1>Activity</h1>
                <FetchActivity />
            </div>
        );
    }
    return(
        <div>
            <h1>Activity</h1>
            <p>Not logged in</p>
        </div>
    );
}