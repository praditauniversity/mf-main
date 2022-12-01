import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import Button from "../Button";

const LOGIN = gql`
    mutation Login ($email: EmailAddress!, $password: String! ){
        login (input: { email: $email, password: $password }) {
            data { auth_token }
        }
    }
`;

// set state logged in using apollo client
export default function Login() {
    const [login] = useMutation(LOGIN);
    const [email, setEmail] = useState('Arthur@mail.com');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [password, setPassword] = useState('Arthurlouis');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login({ variables: { email, password } });
            const token = response.data.login.data.auth_token;
            sessionStorage.setItem('token', token, JSON.stringify(token));
            window.location.reload();
            setError('');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    function form () {
        return (
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " />
                <div className="py-4 mx-auto flex items-center justify-between space-x-4">
                    <Button buttontype="submit" label="Login" />
                </div>
            </form>
        );
    }


    return ( 
        <div className=" max-w-sm mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 sm:max-w-lg ">
            <h1 className="font-bold text-lg uppercase tracking-widest mb-8">Login</h1>
            {form()}
        </div>
    );
}