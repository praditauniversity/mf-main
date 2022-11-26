import React, { useRef } from "react";
import { useMutation, gql } from '@apollo/client';
import Button from "../Button";
import InputField from "../Input";


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

const DELETE_PROJECT = gql`
    mutation deleteProject ($id: String!) {
    deleteProject(id: $id)
    }
`;

const HeadingOne = ({ label }) => {
    return(
        <label className="block py-2 mb-4 text-md uppercase font-bold text-gray-800 tracking-widest">{label}</label>
    );
}

const InputLabel = ({ label }) => {
    return(
        <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{label}</label>
        </div>
    );
}

const Add = () => {
    const name = useRef();
    const description= useRef();
    const [addProject, { loading, error }] = useMutation(ADD_PROJECT,{
        refetchQueries: [
            { query: GET_PROJECT }
        ]
    });

    if (loading) return 'Submitting...';
    if (error) window.location.reload();

    const handleSubmit = (e) => {
        e.preventDefault();
        addProject({
            variables: {
                name: name.current.value,
                description: description.current.value
            }
        });
        name.current.value = '';
        description.current.value = '';
    }


    return (
        <form onSubmit={handleSubmit}>
            <InputField ref={name} placeholder="Project Name" label="Project Name" required />
            <InputField ref={description} label="Project Description" placeholder="Description of the project." required />
            <Button buttonType="submit" label="Add Project" />
</form>
    );
}

const Update = () => {
    const id = useRef();
    const name = useRef();
    const description = useRef();
    const [updateProject, { loading, error }] = useMutation(UPDATE_PROJECT, {
        refetchQueries: [
            { query: GET_PROJECT }
        ]
    });
    // center using tailwindcss flex
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <form onSubmit={e => {
            e.preventDefault();
            updateProject({
                variables: {
                    id: id.current.value,
                    name: name.current.value,
                    description: description.current.value
                }
            });
            id.current.value = '';
            name.current.value = '';
            description.current.value = '';
        }}>
            <InputLabel label={"ID"} />
            <input ref={id} className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " />
            <InputLabel label={"Project Name"} />
            <input ref={name} className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " />
            <InputLabel label={"Description"} />
            <input ref={description} className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " />
            <button type="submit" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" >
                Update Project
            </button>
        </form>
    );
}


const Delete = () => {
    const id = useRef();
    const [deleteProject, { loading, error }] = useMutation(DELETE_PROJECT, {
        refetchQueries: [
            { query: GET_PROJECT }
        ]
    });

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <form onSubmit={e => {
            e.preventDefault();
            deleteProject({
                variables: {
                    id: id.current.value
                }
            });
            id.current.value = '';
        }}>
            <InputLabel label={"ID"} />
            <input ref={id} className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " />
            <button type="submit" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" >
                Delete Project by ID
            </button>
        </form>
    );
}


const CrudProject = () => {
    return(
        <div>
            <div className="max-w-sm mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 sm:max-w-lg">
                <HeadingOne label="Add New Project" />
                {Add()}
            </div>

            <div className="max-w-sm mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 sm:max-w-lg">
                <HeadingOne label="Update Project" />
                {Update()}
            </div>

            <div className="max-w-sm mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 sm:max-w-lg">
                <HeadingOne label="Delete Project By ID" />
                {Delete()}
            </div>
        </div>
    )
}

export default CrudProject;