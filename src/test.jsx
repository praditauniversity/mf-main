import React, { useState } from "react";
import { useMutation, useQuery, gql } from '@apollo/client';
import axios from 'axios';

const endpoint= 'http://localhost:4000/graphql';

const LOGIN = gql`
    mutation Login ($email: EmailAddress!, $password: String! ){
        login (input: { email: $email, password: $password }) {
            data { auth_token }
        }
    }
`;

const PROJECT = gql`query GetProject { project { Data { ID name description } } }`;

const get_project = "query GetProject { project { Data { ID name description } } }";
const get_activity = "query GetActivity { activity { data { ID name description } } }";
const project = '';

export default function Project() {
    const [login, { data }] = useMutation(LOGIN);
    const [email, setEmail] = useState('Arthur@mail.com');
    const [password, setPassword] = useState('Arthurlouis');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': document.cookie,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login({ variables: { email, password } });
            setToken(response.data.login.data.auth_token);
            document.cookie = `token=${response.data.login.data.auth_token}`;
            getActivity();
            getProject();
            setError('');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    function getProject () {
        axios.post(endpoint, { query: get_project }, { header: header })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function getActivity () {
        axios.post(endpoint, { query: get_activity }, { header: header })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function removeCookie() {
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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

    // create remove cookie button
    function removeCookieButton () {
        return (
            <button onClick={removeCookie}>Remove Cookie</button>
        );
    }

    // return fetched data
    return ( 
        <div>
            <h1>Login</h1>
            {form()}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>} <br />
            {removeCookieButton()}
        </div>
    );
}