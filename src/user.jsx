import React, { useState } from "react";
import { useMutation, useQuery, gql } from '@apollo/client';
import axios from 'axios';

const LOGIN = gql`
    mutation Login ($email: EmailAddress!, $password: String! ){
        login (input: { email: $email, password: $password }) {
            data { auth_token }
        }
    }
`;
const PROJECT = gql`query GetProject { project { Data { ID name description } } }`;
const get_project = "query GetProject { project { Data { ID name description } } }";

export default function User() {
    const [login, { data }] = useMutation(LOGIN);
    const {project} = useQuery(PROJECT);
    const [projectData, setProjectData] = useState(project);
    const [email, setEmail] = useState('Arthur@mail.com');
    const [password, setPassword] = useState('Arthurlouis');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login({ variables: { email, password } });
            setToken(response.data.login.data.auth_token);
            document.cookie = `token=${response.data.login.data.auth_token}`;
            console.log(document.cookie);
            setError('');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    function getProject () {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                query: get_project
            })
        })
        .then(r => r.json())
        .then(data => console.log('data returned:', data));
    }

    function getActivity () {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                query: `{ activity { data { ID name } } }`
            })
        })
        .then(r => r.json())
        .then(data => console.log('data returned:', data));
    }

    function form () {
        return (
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        );
    }

    // return fetched data
    return ( 
        <div>
            <h1>Login</h1>
            {form()}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>} <br />
            <button onClick={getProject}>Fetch Project</button>
            <button onClick={getActivity}>Fetch Activity</button>
            {/* show projectData as array */}
            {/* {projectData && projectData.map(({ ID, name, description }) => (
                <div key={ID}>
                    <h3>{ID}. {name}</h3>
                    <p>{description}</p>
                    <p />
                </div>
            ))} */}
            {projectData && console.log("projectData", projectData)}

        </div>
    );
}