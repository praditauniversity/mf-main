import { useMutation } from '@apollo/client';
import React, { useState } from "react";
import { LOGIN } from "../../Middleware/GraphQL/mutations";
import useLocalStorage from "../../Middleware/useLocalStorage";
import { InputField } from "../Input/Input";

const SubmitHandler = async (e, login, email, password, setProfile, setError) => {
    e.preventDefault();
    try {
        console.log("Try to Login");
        const response = await login({ variables: { email, password } });
        const data = response.data.login.data;
        const token = data.auth_token;
        localStorage.setItem('token', token, JSON.stringify(token));
        window.location.href = '/#/maindashboard';
        window.location.reload();
        setProfile({
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            phone_number: data.phone_number,
            gender: data.gender,
            email: data.email,
            created_at: data.CreatedAt,
        });
        setError('');
        
    } catch (err) {
        console.log("SubmitHandler ERROR", err);
        setError(JSON.stringify(err.message));
        alert("Error : " + "\n" + "Check your email and password");
    }
}
export const LoginHandler = () => {
    const [login] = useMutation(LOGIN);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const [email, setEmail] = useLocalStorage('email', 'coba@gmail.com');
    // const [password, setPassword] = useLocalStorage('password', '4dM1nSuPeR');
    const [error, setError] = useState('');
    const [profile, setProfile] = useLocalStorage('profile', () => {
        return {
            first_name: '',
            last_name: '',
            company: '',
        }
    });

    const handleSubmitWrapper = (e) => {
        e.preventDefault();
        SubmitHandler(e, login, email, password, setProfile, setError);
    }

    const rainbow = "w-full flex justify-center bg-gradient-to-r from-indigo-600 to-indigo-800  text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer";

    return (
        <div>
            <form onSubmit={handleSubmitWrapper}>
                <InputField label="Email" type="email" placeholder="example@gmail.com" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField label="Password" type="password" placeholder="Enter your password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="py-4 mx-auto flex items-center justify-between space-x-4">
                    <button type="submit"
                        className={rainbow}>
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