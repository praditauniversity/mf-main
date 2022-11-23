import React, { useState } from "react";
import { useMutation, useQuery, gql } from '@apollo/client';
import axios from 'axios';

const endpoint= 'http://localhost:4000/graphql';
const get_project = "query GetProject { project { Data { ID name description } } }";

export default function Project() {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState('');
    const header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': document.cookie,
    };

    function getProject () {
        axios.post(endpoint, { query: get_project }, { header: header })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    ///button getProjectButton
    function getProjectButton(){
        return (
            <button onClick={getProject}>Get Project</button>
        );
    }

    return ( 
        <div>
            <h1>Project</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>} <br />
            {getProjectButton()}
        </div>
    );
}