import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';

const LOGIN = gql`
    mutation Login ($email: EmailAddress!, $password: String! ){
        login (input: { email: $email, password: $password }) {
            data { auth_token }
        }
    }
`;

export default function Login() {
    const [login, { data }] = useMutation(LOGIN);
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
            localStorage.setItem('token', response.data.login.data.auth_token);
            setError('');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
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

    function removeCookieButton () {
        return (
            <button onClick={removeCookie}>Remove Cookie</button>
        );
    }

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