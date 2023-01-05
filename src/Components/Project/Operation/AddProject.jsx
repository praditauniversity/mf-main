import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import SubmitButton from "../../Button";
import { InputField } from "../../Input/Input";

const GET_PROJECT = gql`query project { project { Data { ID name description user_id } } }`;
const ADD_PROJECT = gql`
    mutation addProject (
        $stetus: String!,
        $work_area: String!,
        $start_project: String!,
        $stakeholder_amount: Int!,
        $role_id: Int!,
        $type_id: Int!,
        $company: String!,
        $considered_success_when: String!,
        $cost_actual: Int!,
        $cost_plan: Int!,
        $currency_name: String!,
        $currency_code: String!,
        $currency_symbol: String!,
        $description: String!,
        $end_project: String!,
        $name: String!,
        $office_location: String!,
        $phase_id: Int!,
        $potential_risk: [String]!,
        $project_duration: Int!,
        $project_objectives: [String]!,
        $progress_percentage: Float!,
        $budget: Int!
    ) {
    addProject(
        input: {
            status: "None", 
            work_area: "Other Dimensions", 
            start_project: "2023-02-05T11:04:48.377+07:00",
            stakeholder_ammount: 10,
            role_id: 10,
            type_id: 1,
            company: "Anomaly co.",
            considered_success_when: "Everything is done.",
            cost_actual: 700000,
            cost_plan: 440000,
            currency_name: "Indonesian Rupiahs",
            currency_code: "IDR",
            currency_symbol: "IDR",
            description: "A Project of anomaly",
            end_project: "2023-03-13T11:04:48.377+07:00",
            name: "Anomaly Project", 
            office_location: "Other Dimesions",
            phase_id: 1,
            potential_risk: ["deadline late", "engagement failure", "run of budget"],
            project_duration: 10,
            project_objectives: ["make everything good", "increase efficiency"],
            progress_percentage: 1.5,
            budget: 56000
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
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [office_location, setOfficeLocation] = useState('');
    const [start_project, setStartProject] = useState('');
    const [end_project, setEndProject] = useState('');
    const [addProject, { loading, error }] = useMutation(ADD_PROJECT, {
        refetchQueries: [{ query: GET_PROJECT }]
    });

    if (loading) return 'Submitting...';
    if (error) window.location.reload();

    const handleSubmit = (e) => {
        e.preventDefault();
        addProject({
            variables: {
                status: $status,
                
            }
        });
        setName('');
        setDescription('');
        setCompany('');
        setOfficeLocation('');
        // setStartProject('');
        // setEndProject('');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField value={name} label={"Name"} name={"name"} placeholder={"Name"} type={"text"} onChange={e => setName(e.target.value)} />
                <InputField value={description} label={"Description"} name={"description"} placeholder={"Description"} type={"text"} onChange={e => setDescription(e.target.value)} />
                <InputField value={company} label={"Company"} name={"company"} placeholder={"Company"} type={"text"} onChange={e => setCompany(e.target.value)} />
                <InputField value={office_location} label={"Office Location"} name={"office_location"} placeholder={"Office Location"} type={"text"} onChange={e => setOfficeLocation(e.target.value)} />
                {/* <InputField value={start_project} label={"Start Project"} name={"start_project"} placeholder={"Start Project"} type={"text"} onChange={e => setStartProject(e.target.value)} />
                <InputField value={end_project} label={"End Project"} name={"end_project"} placeholder={"End Project"} type={"text"} onChange={e => setEndProject(e.target.value)} /> */}
                <SubmitButton label="Add Project" />
            </form>
        </>
    );
}

export default AddProject;