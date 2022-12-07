import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import Button from "../Button";
import { InputField } from "../Input/Input";
import { LOGIN, REFETCH_TOKEN } from "../../Middleware/GraphQL/mutations";

export const LoginHandler = () => {
    const [login] = useMutation(LOGIN);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('Arthur@mail.com');
    const [password, setPassword] = useState('Arthurlouis');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login({ variables: { email, password } });
            const token = response.data.login.data.auth_token;
            sessionStorage.setItem('token', token, JSON.stringify(token));
            window.location.href = '/#/project';
            window.location.reload();
            setError('');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <div className="py-4 mx-auto flex items-center justify-between space-x-4">
                    <button type="submit"
                        className="w-full flex justify-center 
                    bg-gradient-to-r 
                    from-indigo-600 to-indigo-800  
                    text-gray-100 p-2  
                    rounded-lg tracking-wide font-semibold  
                    shadow-lg cursor-pointer">
                        Sign in
                    </button>
                </div>
                <div className="text-center mx-auto">
                    Don&apos;t have an account?
                    <a className="text-center text-primary" href="/#/register"> Sign Up </a>
                </div>
            </form>
        </div>
    );
}

const Login = () => {
    return (
        <div className="max-w-sm mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 sm:max-w-lg">
            <p className="font-bold text-md tracking-widest uppercase">Login</p>
            <p className="mb-8 italic text-sm">Login to access the project.</p>
            <LoginHandler />
        </div>
    );
}

export default Login;