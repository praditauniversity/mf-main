import React from "react";
import { useMutation, gql } from '@apollo/client';
import { DatePickerField, InputField } from "../../Input/Input";

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
        $considered_success_when: String!
        $cost_actual: Float!
        $cost_plan: Float!
        $client: String!
        $client_contact: String!
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
            considered_success_when: $considered_success_when,
            cost_actual: $cost_actual,
            cost_plan: $cost_plan,
            client: $client,
            client_contact: $client_contact,
            currency_name: $currency_name,
            currency_code: $currency_code,
            currency_symbol: $currency_symbol,
            end_project: $end_project,
            office_location: $office_location,
            phase_id: $phase_id,
            potential_risk: $potential_risk,
            project_duration: $project_duration,
            project_objectives: $project_objectives,
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
    const [considered_success_when, setConsideredSuccessWhen] = React.useState('');
    const [cost_actual, setCostActual] = React.useState('');
    const [cost_plan, setCostPlan] = React.useState('');
    const [client, setClient] = React.useState('');
    const [client_contact, setClientContact] = React.useState('');
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
    const handleSubmit = e => {
        e.preventDefault();
        console.log(typeof"WUAW", id);
        updateProject({ variables: { 
            id, 
            name, 
            description,
            status,
            work_area,
            stakeholder_ammount,
            start_project,
            role_id,
            type_id,
            considered_success_when,
            cost_actual,
            cost_plan,
            client,
            client_contact,
            currency_name,
            currency_code,
            currency_symbol,
            end_project,
            office_location,
            phase_id,
            potential_risk,
            project_duration,
            project_objectives,
            progress_percentage,
            budget
        },
    });
            setId('');
            setName('');
            setDescription('');
            setStatus('');
            setWorkArea('');
            setStakeholderAmmount('');
            setStartProject('');
            setRoleId('');
            setTypeId('');
            setConsideredSuccessWhen('');
            setCostActual('');
            setCostPlan('');
            setClient('');
            setClientContact('');
            setCurrencyName('');
            setCurrencyCode('');
            setCurrencySymbol('');
            setEndProject('');
            setOfficeLocation('');
            setPhaseId('');
            setPotentialRisk('');
            setProjectDuration('');
            setProjectObjectives('');
            setProgressPercentage('');
            setBudget('');
        };
        

    const ProjectList =[{
        label: "ID",
        name: "id",
        placeholder: "ID",
        type: "number",
        value: id,
        onChange: e => setId(e.target.value)
    },
    {
        label: "Name",
        name: "name",
        placeholder: "Name",
        type: "text",
        value: name,
        onChange: e => setName(e.target.value)
    },
    {
        label: "Description",
        name: "description",
        placeholder: "Description",
        type: "text",
        value: description,
        onChange: e => setDescription(e.target.value)
    },
    {
        label: "Status",
        name: "status",
        placeholder: "Status",
        type: "text",
        value: status,
        onChange: e => setStatus(e.target.value)
    },
    {
        label: "Work Area",
        name: "work_area",
        placeholder: "Work Area",
        type: "text",
        value: work_area,
        onChange: e => setWorkArea(e.target.value)
    },
    {
        label: "Stakeholder Ammount",
        name: "stakeholder_ammount",
        placeholder: "Stakeholder Ammount",
        type: "number",
        value: stakeholder_ammount,
        onChange: e => setStakeholderAmmount(parseInt(e.target.value))
    },
    {
        label: "Role ID",
        name: "role_id",
        placeholder: "Role ID",
        type: "number",
        value: role_id,
        onChange: e => setRoleId(parseInt(e.target.value))
    },
    {
        label: "Type ID",
        name: "type_id",
        placeholder: "Type ID",
        type: "number",
        value: type_id,
        onChange: e => setTypeId(parseInt(e.target.value))
    },
    {
        label: "Considered Success When",
        name: "considered_success_when",
        placeholder: "Considered Success When",
        type: "text",
        value: considered_success_when,
        onChange: e => setConsideredSuccessWhen(e.target.value)
    },
    {
        label: "Cost Actual",
        name: "cost_actual",
        placeholder: "Cost Actual",
        type: "number",
        value: cost_actual,
        onChange: e => setCostActual(parseFloat(e.target.value))
    },
    {
        label: "Cost Plan",
        name: "cost_plan",
        placeholder: "Cost Plan",
        type: "number",
        value: cost_plan,
        onChange: e => setCostPlan(parseFloat(e.target.value))
    },
    {
        label: "Client",
        name: "client",
        placeholder: "Client",
        type: "text",
        value: client,
        onChange: e => setClient(e.target.value)
    },
    {
        label: "Client Contact",
        name: "client_contact",
        placeholder: "Client Contact",
        type: "text",
        value: client_contact,
        onChange: e => setClientContact(e.target.value)
    },
    {
        label: "Currency Name",
        name: "currency_name",
        placeholder: "Currency Name",
        type: "text",
        value: currency_name,
        onChange: e => setCurrencyName(e.target.value)
    },
    {
        label: "Currency Code",
        name: "currency_code",
        placeholder: "Currency Code",
        type: "text",
        value: currency_code,
        onChange: e => setCurrencyCode(e.target.value)
    },
    {
        label: "Currency Symbol",
        name: "currency_symbol",
        placeholder: "Currency Symbol",
        type: "text",
        value: currency_symbol,
        onChange: e => setCurrencySymbol(e.target.value)
    },
    {
        label: "Office Location",
        name: "office_location",
        placeholder: "Office Location",
        type: "text",
        value: office_location,
        onChange: e => setOfficeLocation(e.target.value)
    },
    {
        label: "Phase ID",
        name: "phase_id",
        placeholder: "Phase ID",
        type: "number",
        value: phase_id,
        onChange: e => setPhaseId(parseInt(e.target.value))
    },
    {
        label: "Potential Risk",
        name: "potential_risk",
        placeholder: "Potential Risk",
        type: "text",
        value: potential_risk,
        onChange: e => setPotentialRisk(e.target.value)
    },
    {
        label: "Project Duration",
        name: "project_duration",
        placeholder: "Project Duration",
        type: "number",
        value: project_duration,
        onChange: e => setProjectDuration(parseInt(e.target.value))
    },
    {
        label: "Project Objectives",
        name: "project_objectives",
        placeholder: "Project Objectives",
        type: "text",
        value: project_objectives,
        onChange: e => setProjectObjectives(e.target.value)
    },
    {
        label: "Progress Percentage",
        name: "progress_percentage",
        placeholder: "Progress Percentage",
        type: "number",
        value: progress_percentage,
        onChange: e => setProgressPercentage(parseFloat(e.target.value))
    },
    {
        label: "Budget",
        name: "budget",
        placeholder: "Budget",
        type: "number",
        value: budget,
        onChange: e => setBudget(parseInt(e.target.value))
    },
];

    return (
        <form onSubmit={handleSubmit}>
            {ProjectList.map((project, index) => {
                return (
                    <InputField
                        key={index}
                        label={project.label}
                        type={project.type}
                        value={project.value}
                        onChange={project.onChange}
                    />
                );
                })}
             <DatePickerField
                    label="Start Project"
                    selected={start_project}
                    onChange={(date) => setStartProject(date)}
                    placeholder="DD/MM/YYYY"

                />
                <DatePickerField
                    label="End Project"
                    selected={end_project}
                    onChange={(date) => setEndProject(date)}
                    placeholder="DD/MM/YYYY"
                />

            <button type="submit" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" >
                Update Project
            </button>
        </form>
    );
}

export default UpdateProject;