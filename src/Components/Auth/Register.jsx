import React, { useRef, useState } from "react";
import { useMutation, gql } from '@apollo/client';
import Button from "../Button";
import './toast.css'
import { InputField, SelectField, MenuItem, SelectorField } from "../Input/Input";
import { REGISTER } from "../../Middleware/GraphQL/mutations";

export const RegisterHandler = () => {
    const [register, { error: registerError }] = useMutation(REGISTER, {
        onCompleted: (data) => {
            console.log("Registration successful!", data);
            handleRegisterSuccess();
        },
        onError: (error) => {
            console.log("Register Error :", JSON.stringify(error, null, 2));

            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                const errorMessage = error.graphQLErrors[0].message; // HTTP Error: 500, Could not invoke operation POST /register
                const errorDetails = error.graphQLErrors[0].extensions.responseBody.errors.error;
                const errorText = `Error: \n${errorMessage}\n\n Error Details:\n${JSON.stringify(errorDetails, null, 2)}`;
                alert(errorText);
            } else {
                console.log("Register Error :", JSON.stringify(error));
            }
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [testate, settestate] = useState('');
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
        company_id: 'dc9076aa-2fda-4019-bd2c-900a8284b9aa',
        created_by: 'user',
    });
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const gender = [
        { id: 1, name: 'Male', value: "Male", unavailable: false },
        { id: 2, name: 'Female', value: "Female", unavailable: false },
    ]

    const inputRefGender = useRef(null);

    const [errorValidate, setErrorValidate] = useState({});
    const [errorValidate2, setErrorValidate2] = useState({});
    const validate = () => {
        let passwordError = "";
        let confirmPasswordError = "";

        if (input.password.length < 8) {
            passwordError = "Password must be more than 8 characters";
        }
        if (passwordError) {
            setErrorValidate({ passwordError });
            return false;
        }
        if (password_confirmation.length < 8) {
            confirmPasswordError = "Password must be more than 8 characters";
        }
        if (confirmPasswordError) {
            setErrorValidate2({ confirmPasswordError });
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Gender Change", inputRefGender.current.value);
        setInput({ ...input, [name]: value });
    }

    const handleSubmit = async (e) => {

        const data = input;
        data.gender === '' ? data.gender = inputRefGender.current.value : data.gender;
        const inputHasEmptyValues = Object.values(input).some(value => value === '');

        if (input.password !== password_confirmation) {
            alert("Password confirmation does not match");
        }

        if (inputHasEmptyValues === true) {
            alert("Please fill all the fields");
        }

        const isValid = validate();
        if (isValid) {
            setErrorValidate("");
            setErrorValidate2("");
            setPasswordConfirmation("");
            setInput({
                username: '',
                first_name: '',
                last_name: '',
                nik: '',
                address: '',
                phone_number: '',
                gender: '',
                email: '',
                password: '',
                company_id: 'dc9076aa-2fda-4019-bd2c-900a8284b9aa',
                created_by: 'user',
            });
            // alert("Register Success");
        }

        e.preventDefault();

        setLoading(true);
        try {
            console.log(data);
            register({
                variables: data
            });
            console.log("Data Success");
            setError('');
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
        setLoading(false);
    }

    function handleRegisterSuccess() {
        //to show toast when sucesss create report
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        setTimeout(function () { window.location.href = '/#/login'; }, 3000);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex space-x-8">
                    <div className="w-full">
                        <InputField name="username" label="Username" placeholder="Enter your username" type="text" minlength="5" maxlength="100" value={input.username} onChange={handleChange} required="*" />
                        <InputField name="first_name" label="First Name" type="text" placeholder="Enter first name" minlength="5" maxlength="100" value={input.first_name} onChange={handleChange} required="*" />
                        <InputField name="last_name" label="Last Name" type="text" placeholder="Enter last name" minlength="5" maxlength="100" value={input.last_name} onChange={handleChange} required="*" />
                        <InputField name="nik" label="NIK" type="text" placeholder="Enter your nik" minlength="5" maxlength="100" value={input.nik} onChange={handleChange} required="*" />
                        <InputField name="address" label="Address" type="text" placeholder="Enter your address" value={input.address} onChange={handleChange} required="*" />
                        <InputField name="phone_number" label="Phone Number" placeholder="Enter your phone number" type="text" minlength="11" maxlength="13" value={input.phone_number} onChange={handleChange} required="*" />
                        <div className="form-group">
                            <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Gender</label>
                            <select
                                value={input.gender}
                                name="gender"
                                className="form-control mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-darkest leading-tight focus:outline-none focus:shadow-outline "
                                onChange={handleChange}
                                error={error}
                                ref={inputRefGender}
                            >
                                {gender.map((option) => (
                                    <option key={option.id} value={option.value} className="hover:bg-gray-400 rounded-none">
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <InputField name="email" label="Email" placeholder="example@gmail.com" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={input.email} onChange={handleChange} required="*" />
                        <InputField name="password" label="Password" placeholder="Min Password 8 Characters" type="password" minlength="8" value={input.password} onChange={handleChange} required="*" />
                        <div className="mt-3" style={{ color: "red" }}>{errorValidate.passwordError}</div>
                        <InputField label="Password Confirmation" placeholder="Min Password 8 Characters" type="password" value={password_confirmation} onChange={e => setPasswordConfirmation(e.target.value)} required="*" />
                        <div className="mt-3" style={{ color: "red" }}>{errorValidate2.confirmPasswordError}</div>
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

                <div id="snackbar">Register success</div>
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