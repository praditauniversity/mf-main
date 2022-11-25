import React from "react";
import { useMutation, gql } from '@apollo/client';

const ADD_PROJECT = gql`
    mutation addProject (
        $name: String!
        $description: String!
    ) {
    addProject(
        input: {
            name: $name,
            description: $description,
            status: "Hello World"
            work_area: "Jakarta"
            start_project: "2022-10-20T11:04:48.377+07:00",
            stakeholder_ammount: 10,
            role_id: 10,
            project_type_id: 10,
            budget_health: "OK",
            company: "Anomaly co.",
            considered_success_when: "Everything is done.",
            cost_actual: 1.5,
            cost_plan: 1.5,
            currency_name: "Indonesian Rupiahs",
            currency_code: "IDR",
            currency_symbol: "IDR",
            end_project: "2022-10-20T11:04:48.377+07:00",
            office_location: "Other Dimesions",
            phase_id: 1,
            potential_risk: "Others",
            project_duration: 10,
            project_objectives: "2022-10-20T11:04:48.377+07:00",
            progress_percentage: 1.5
        }
    )   {
            Data {
                ID
                name
                description
            }
        }
    }
`;

const HeadingOne = ({ label }) => {
    return(
        <label className="block py-2">{label}</label>
    );
}

function Add() {
    let name, description;
    const [addProject, { data, loading, error }] = useMutation(ADD_PROJECT);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        addProject({
            variables: {
                name: name.value,
                description: description.value
            }
        });
        name.value = '';
        description.value = '';
        window.location.reload();
    }

    return (
        <form onSubmit={handleSubmit} >
            <HeadingOne label={"Hello"} />
            <input ref={node => { name = node; }} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            /> <br />
            <label className="block py-2">Description</label>
            <input ref={node => { description = node; }} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            /> <br />
            <br />
            <button type="submit"
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
                Add Project
            </button>
        </form>
    );
}

export default function AddProject() {

    return(
        <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
            <HeadingOne label="Add New Project" />
            {Add()}
        </div>
    )
}