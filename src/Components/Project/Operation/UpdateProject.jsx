import React from "react";
import { useMutation, gql } from '@apollo/client';
import { InputField } from "../../Input/Input";

const GET_PROJECT = gql`query project { project { Data { ID name description user_id } } }`;
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

const UpdateProject = () => {
    const [id, setId] = React.useState('');
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [updateProject, { loading, error }] = useMutation(UPDATE_PROJECT,{
        refetchQueries: [ { query: GET_PROJECT } ]
    });

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <form onSubmit={e => {
            e.preventDefault();
            updateProject({ variables: { id, name, description } });
            setId('');
            setName('');
            setDescription('');
        }}>
            <InputField label={"ID"} value={id} placeholder="ID" onChange={e => setId(e.target.value)} />
            <InputField label={"Name"} value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
            <InputField label={"Description"} value={description} placeholder="Description" onChange={e => setDescription(e.target.value)} />
            <button type="submit" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" >
                Update Project
            </button>
        </form>
    );
}

export default UpdateProject;