import React from "react";
import { useMutation, gql } from '@apollo/client';
import { InputField } from "../../Input/Input";

const GET_PROJECT = gql`query project { project { Data { ID name description user_id } } }`;
const UPDATE_PROJECT = gql`
    mutation updateProject (
        $id: String!
        $name: String!
        $description: String!
        $status: String!
        $work_area: String!
        $start_project: String!
        $stakeholder_ammount: Int!
        $role_id: Int!
        $type_id: Int!
        $company: String!
        $considered_success_when: String!
        $cost_actual: Float!
        $cost_plan: Float!
        $currency_name: String!
        $currency_code: String!
        $currency_symbol: String!
        $end_project: String!
        $office_location: String!
        $phase_id: Int!
        $potential_risk: [String]!
        $project_duration: Int!
        $project_objectives: [String]!
        $progress_percentage: Float!
        $budget: Int!
    ) {
    updateProject( id: $id, input: {
            name: $name,
            description: $description,
            status: "None", 
            work_area: "Other Dimensions", 
            start_project: "2023-01-02T11:04:48.377+07:00",
            stakeholder_ammount: 10,
            role_id: 10,
            type_id: 1,
            company: "Anomaly co.",
            considered_success_when: "Everything is done.",
            cost_actual: 1.5,
            cost_plan: 1.5,
            currency_name: "Indonesian Rupiahs",
            currency_code: "IDR",
            currency_symbol: "IDR",
            end_project: "2023-04-20T11:04:48.377+07:00",
            office_location: "Other Dimesions",
            phase_id: $phase_id,
            potential_risk: ["deadline late", "engagement failure", "run of budget"],
            project_duration: 10,
            project_objectives: ["make everything good", "increase efficiency"],
            progress_percentage: 1.5,
            budget: 770000
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