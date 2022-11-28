import React from "react";
import { useMutation, gql } from '@apollo/client';
import SubmitButton from "../Button";
import { InputField } from "../Input";

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

const AddProject = () => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [addProject, { loading, error }] = useMutation(ADD_PROJECT,{
        refetchQueries: [ { query: GET_PROJECT } ]
    });

    if (loading) return 'Submitting...';
    if (error) window.location.reload();

    const handleSubmit = (e) => {
        e.preventDefault();
        addProject({ variables: { name, description } });
        setName('');
        setDescription('');
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <InputField value={name} label={"Name"} name={"name"} placeholder={"Name"} type={"text"} onChange={e => setName(e.target.value)} />
            <InputField value={description} label={"Description"} name={"description"} placeholder={"Description"} type={"text"} onChange={e => setDescription(e.target.value)} />
            <SubmitButton label="Add Project" />
        </form>
        </>
    );
}

export default AddProject;