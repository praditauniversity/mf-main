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
        $start_project: DateTime!
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
        $end_project: DateTime!
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
            status: $status, 
            work_area: $work_area, 
            start_project: $start_project,
            stakeholder_ammount: $stakeholder_ammount,
            role_id: $role_id,
            type_id: $type_id,
            company:   $company,
            considered_success_when: "Everything is done.",
            cost_actual: $cost_actual,
            cost_plan: $cost_plan,
            currency_name: $currency_name,
            currency_code: $currency_code,
            currency_symbol: $currency_symbol,
            end_project: $end_project,
            office_location: $office_location,
            phase_id: $phase_id,
            potential_risk: [$potential_risk],
            project_duration: $project_duration,
            project_objectives: [$project_objectives],
            progress_percentage: $progress_percentage,
            budget: $budget
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
    const [status, setStatus] = React.useState('');
    const [work_area, setWorkArea] = React.useState('');
    const [start_project, setStartProject] = React.useState('');
    const [stakeholder_ammount, setStakeholderAmmount] = React.useState('');
    const [role_id, setRoleId] = React.useState('');
    const [type_id, setTypeId] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [considered_success_when, setConsideredSuccessWhen] = React.useState('');
    const [cost_actual, setCostActual] = React.useState('');
    const [cost_plan, setCostPlan] = React.useState('');
    const [currency_name, setCurrencyName] = React.useState('');
    const [currency_code, setCurrencyCode] = React.useState('');
    const [currency_symbol, setCurrencySymbol] = React.useState('');
    const [end_project, setEndProject] = React.useState('');
    const [office_location, setOfficeLocation] = React.useState('');
    const [phase_id, setPhaseId] = React.useState('');
    const [potential_risk, setPotentialRisk] = React.useState('');
    const [project_duration, setProjectDuration] = React.useState('');
    const [project_objectives, setProjectObjectives] = React.useState('');
    const [progress_percentage, setProgressPercentage] = React.useState('');
    const [budget, setBudget] = React.useState('');
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