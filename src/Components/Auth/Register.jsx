import React, { useRef, useState } from "react";
import { useMutation, gql } from '@apollo/client';
import Button from "../Button";
import { InputField, SelectField, MenuItem, SelectorField } from "../Input/Input";
import { REGISTER } from "../../Middleware/GraphQL/mutations";

export const RegisterHandler = () => {
    const [register, { error: registerError }] = useMutation(REGISTER);
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
        company_id: 'dc9076aa-2fda-4019-bd2c-900a8284b9aa',
        created_by: 'user',
    });
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const gender = [
        { id: 1, name: 'Male', value: "male", unavailable: false },
        { id: 2, name: 'Female', value: "female", unavailable: false },
    ]
    console.log("error register", JSON.stringify(registerError))
    // if (error) return console.log("error", JSON.stringify(error));
    // if (loading) return <Text>Loading...</Text>;
    // if (error) return <Text>Error :(</Text>;
    const inputRefGender = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("ASDASDASD", inputRefGender.current.value);
        
        setInput({ ...input, [name]: value });
    }
    
    const handleSubmit = async (e) => {
        
        console.log("ASDASDASD", inputRefGender.current.value, "input gender", input.gender);
        input.gender === '' ? setInput({ ...input, gender: inputRefGender.current.value}) : input.gender;
        console.log("INPUT GENDER", input.gender);
        if (input.password !== password_confirmation) {
            alert("Password confirmation does not match");
        }

        const inputHasEmptyValues = Object.values(input).some(value => value === '');
        console.log(inputHasEmptyValues);
        if (inputHasEmptyValues) {
            alert("Please fill all the fields");
        }

        e.preventDefault();
        setLoading(true);
        try {
            const data = input;
            console.log(data);
            const response = await register({
                variables: data
            });
            // window.location.href = '/#/login';
            // window.location.reload();
            console.log("data berhasil");
            setError('');
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
        setLoading(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex space-x-8">
                    <div className="w-full">
                        <InputField name="username" label="Username" placeholder="Enter your username" type="text" minlength="5" maxlength="100" value={input.username} onChange={handleChange} required />
                        <InputField name="first_name" label="First Name" type="text" placeholder="Enter first name" minlength="5" maxlength="100" value={input.first_name} onChange={handleChange} required />
                        <InputField name="last_name" label="Last Name" type="text" placeholder="Enter last name" minlength="5" maxlength="100" value={input.last_name} onChange={handleChange} required />
                        <InputField name="nik" label="NIK" type="text" placeholder="Enter your nik" minlength="5" maxlength="100" value={input.nik} onChange={handleChange} required />
                        <InputField name="address" label="Address" type="text" placeholder="Enter your address" value={input.address} onChange={handleChange} required />
                        <InputField name="phone_number" label="Phone Number" placeholder="Enter your phone number" type="text" minlength="11" maxlength="13" value={input.phone_number} onChange={handleChange} required />
                        {/* <SelectField ref={inputRefGender} name="gender" options={gender} label="Gender" onChange={handleChange} value={input.gender} /> */}
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
                        <InputField name="email" label="Email" placeholder="Enter your email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={input.email} onChange={handleChange} required />
                        <InputField name="password" label="Password" placeholder="Enter your password" type="password" minlength="8" value={input.password} onChange={handleChange} required />
                        <InputField label="Password Confirmation" placeholder="Enter your password again" type="password" value={password_confirmation} onChange={e => setPasswordConfirmation(e.target.value)} required />
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