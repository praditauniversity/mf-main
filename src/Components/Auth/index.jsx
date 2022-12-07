import React from "react";
import LoginPage from "../../Pages/Login";
import RegisterPage from "../../Pages/Register";
import Button from "../Button";

const Logout = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('token');
        window.location.href = '/';
        window.location.reload();
    }

    return (
        <div className=" max-w-sm mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 sm:max-w-lg ">
            <p className="font-bold text-xl tracking-widest uppercase">Logout</p>
            <p className="mb-8 italic text-sm">Logout from the system.</p>
            <form onSubmit={handleSubmit}>
                <div className="py-4 mx-auto flex items-center justify-between space-x-4">
                    <Button buttontype="submit" label="Logout" />
                </div>
            </form>
        </div>
    );
}

export const Auth = () => {
    const islogin = sessionStorage.getItem('token') !== null;
    if (islogin) {
        return (
            <div className="flex-col w-full-md">
                <Logout />
            </div>
        );
    } else {
        return (
            <LoginPage />
        );
    }
}

export const Register = () => {
    return (
        <RegisterPage />
    );
}