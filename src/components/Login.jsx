import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import Button from "./Button";
import InputField from "./Input";

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
    const [password, setPassword] = useState('Arthurlouis');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const islogin = localStorage.getItem('token') !== null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login({ variables: { email, password } });
            const token = response.data.login.data.auth_token;
            localStorage.setItem('token', token, JSON.stringify(token));
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
                <InputField type="email" placeholder="Arthur@mail.com" label="Email" />
                <InputField type="password" placeholder="Arthurlouis" label="Password" />
                <div className="py-4 mx-auto flex items-center justify-between space-x-4">
                <Button buttonType="submit" label="Login" />
                    {islogin && removeTokenAndReloadButton()}
                </div>

            </form>
        );
    }


    function removeTokenAndReloadButton() {

        const removeToken = () => {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            window.location.reload();
        }

        return (
            // <Button onClick={removeToken} label="Remove Token and Reload" />
            <button onClick={removeToken} className="underline text-slate-400">
                Remove Token and Reload
            </button>
        );
    }
    return ( 
        <div className="
            justify-between items-center
            border-b border-slate-200 
            border-l-4 border-l-transparent
            max-w-sm mx-auto my-10 
            bg-white p-8 rounded-xl 
            shadow shadow-slate-300
            sm:max-w-lg
        ">
            <h1 className="font-bold text-lg uppercase tracking-widest mb-8">Login</h1>
            {form()}
            {/* {loading && <p>Loading...</p>}
            {error && <p>{error}</p>} <br /> */}
        </div>
    );
}