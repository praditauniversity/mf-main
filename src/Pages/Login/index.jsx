import React from "react";
import { LoginHandler } from "../../Components/Auth/Login";

const LoginPage = () => {
    return (
        <div className="w-full h-screen m-auto bg-white flex items-center justify-center px-8">
            <div className="max-w-md w-full space-y-8 items-center justify-center">

                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900"> Welcome Back!  </h2>
                    <p className="mt-2 text-sm text-gray-500">Please sign in to your account</p>
                </div>

                <LoginHandler />

                <div className="flex items-center justify-center space-x-2">
                    <span className="h-px w-16 bg-gray-200"></span>
                    <span className="text-gray-300 font-normal">or continue with</span>
                    <span className="h-px w-16 bg-gray-200"></span>
                </div>

                <div className="flex items-center justify-between space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white w-full p-2 font-bold rounded">
                        Facebook
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white w-full p-2 font-bold rounded">
                        Google
                    </button>
                </div>

            </div>
        </div>
    );
}
export default LoginPage;