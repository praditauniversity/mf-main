import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import Button from "../Button";
import { InputField, SelectField, MenuItem, SelectorField } from "../Input/Input";
import { REGISTER } from "../../Middleware/GraphQL/mutations";

export const RegisterHandler = () => {
    const [register] = useMutation(REGISTER);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [input, setInput] = useState({
        username: '',
        first_name: '',
        last_name: '',
        nik: '',
        address: '',
        phone_number: '',
        gender: '',
        email: '',
        password: '',
        company_id: '',
        created_by: 'user',
    });
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const gender = [
    { id: 1, name: 'Male', value: "male", unavailable: false },
    { id: 2, name: 'Female', value: "female", unavailable: false },
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = { input };
            console.log(data);
            const response = await register({ variables: data });
            window.location.href = '/#/login';
            window.location.reload();
            setError('');
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
        setLoading(false);
    }

    return (
        <>
            <form onSubmit={ handleSubmit }>
                <div className="flex space-x-8">
                    <div className="w-full">
                        <InputField name="username" label="Username" type="text" value={ input.username } onChange={ handleChange } required />
                        <InputField name="first_name" label="First Name" type="text" value={ input.first_name } onChange={ handleChange } required />
                        <InputField name="last_name" label="Last Name" type="text" value={ input.last_name } onChange={ handleChange } required />
                        <InputField name="nik" label="NIK" type="text" value={ input.nik } onChange={ handleChange } required />
                        <InputField name="address" label="Address" type="text" value={ input.address } onChange={ handleChange } required />
                        <InputField name="phone_number" label="Phone Number" type="text" value={ input.phone_number } onChange={ handleChange } required />
                        <SelectField name="gender" options={gender} label="Gender" onChange={handleChange} value={input.gender} />
                        <InputField name="email" label="Email" type="email" value={input.email} onChange={handleChange} required />
                        <InputField name="password" label="Password" type="password" value={input.password} onChange={handleChange} required />
                        <InputField label="Password Confirmation" type="password" value={password_confirmation} onChange={e => setPasswordConfirmation(e.target.value)} required />
                    </div>
                </div>
                <div className="py-4 mx-auto flex items-center justify-between space-x-4">
                    <button type="submit"
                        className="w-full flex justify-center bg-gradient-to-r from-indigo-600 to-indigo-800  
                        text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer">
                        Register
                    </button>
                </div>
                <div className="text-center mx-auto">
                    Have an account?
                    <a className="text-center text-primary" href="/#/login"> Sign In </a>
                </div>
            </form>
        </>
    );
}

const Register = () => {
    return (
        <div className=" max-w-sm h-full mx-auto my-10 bg-white rounded-xl shadow shadow-slate-300 sm:max-w-lg">
            <p className="font-bold text-md tracking-widest uppercase">Register</p>
            <p className="mb-8 italic text-sm">Register to the system.</p>
            <RegisterHandler />
        </div>
    );
}

export default Register;