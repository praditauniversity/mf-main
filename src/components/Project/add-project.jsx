import React from "react";
import { useMutation, gql } from '@apollo/client';

const GET_PROJECT = gql`query project { project { Data { ID name description user_id } } }`;
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

const UPDATE_PROJECT = gql`
    mutation updateProject (
        $id: String!
        $name: String!
        $description: String!
    ) {
    updateProject( id: $id, input: {
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
        <label className="block py-2 mb-4">{label}</label>
    );
}

const InputLabel = ({ label }) => {
    return(
        <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{label}</label>
        </div>
    );
}

function Add() {
    let name, description;
    const [addProject, { loading, error }] = useMutation(ADD_PROJECT,{
        refetchQueries: [
            { query: GET_PROJECT }
        ]
    });

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
    }
    return (
        <form onSubmit={handleSubmit}>
            <InputLabel label={"Project Name"} />
            <input ref={node => { name = node; }} className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " />
            <InputLabel label={"Description"} />
            <input ref={node => { description = node; }} className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " />
            <button type="submit" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" >
                Add Project
            </button>
        </form>
    );
}

function Update() {
    let id, name, description;
    const [updateProject, { loading, error }] = useMutation(UPDATE_PROJECT, {
        refetchQueries: [
            { query: GET_PROJECT }
        ]
    });

    return (
        <form onSubmit={e => {
            e.preventDefault();
            updateProject({
                variables: {
                    id: id.value,
                    name: name.value,
                    description: description.value
                }
            });
            id.value = '';
            name.value = '';
            description.value = '';
        }}>
            <InputLabel label={"ID"} />
            <input ref={node => { id = node; }} className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " />
            <InputLabel label={"Project Name"} />
            <input ref={node => { name = node; }} className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " />
            <InputLabel label={"Description"} />
            <input ref={node => { description = node; }} className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " />
            <button type="submit" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" >
                Update Project
            </button>
        </form>
    );
}


export default function AddProject() {

    return(
        <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
            <HeadingOne label="Add New Project" />
            {Add()}
            {Update()}
        </div>
    )
}