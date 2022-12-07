import React from "react";
import { RegisterHandler } from "../../Components/Auth/Register";

const RegisterPage = () => {
    return (
        <div className="w-full h-full m-auto bg-white">
            <div className="flex md:items-center justify-center h-full w-full p-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold text-gray-900"> Welcome! </h2>
                        <p className="mt-2 text-sm text-gray-500">Please Register</p>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="h-px w-16 bg-gray-200"></span>
                        <span className="text-gray-300 font-normal">or continue with</span>
                        <span className="h-px w-16 bg-gray-200"></span>
                    </div>
                    <RegisterHandler />
                </div>
            </div>
        </div>
    );
}
export default RegisterPage;