import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';

const LOGIN = gql`
    mutation Login ($email: EmailAddress!, $password: String! ){
        login (input: { email: $email, password: $password }) {
            data { auth_token }
        }
    }
`;


// create login page
function LoginPage(){

}



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
            window.location.reload();
            setError('');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }
    const ButtonLogin = () => {
        return(
            <button type="submit" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" >
                Login
            </button>
        )
    }

    function form () {
        return (
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                />
                <div className="flex">
                <ButtonLogin />
                {islogin && removeTokenAndReloadButton()}
                </div>

            </form>
        );
    }


    function removeTokenAndReloadButton() {

        const removeToken = () => {
            localStorage.removeItem('token');
            window.location.reload();
        }

        return (
            <button onClick={removeToken}
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >Remove Token and Reload</button>
        );
    }

    return ( 
        <div className="
            justify-between items-center
            py-3 px-2 
            border-b border-slate-200 
            border-l-4 border-l-transparent
            max-w-lg mx-auto my-10 
            bg-white p-8 rounded-xl 
            shadow shadow-slate-300
        ">
            <h1>Login</h1>
            {form()}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>} <br />
        </div>
    );
}