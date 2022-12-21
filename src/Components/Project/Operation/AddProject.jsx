import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import SubmitButton from "../../Button";
import { InputField } from "../../Input/Input";

const GET_PROJECT = gql`query project { project { Data { ID name description user_id } } }`;
const ADD_PROJECT = gql`
    mutation addProject (
        $name: String!
        $description: String!
        $company: String!
        $office_location: String!
    ) {
    addProject(
        input: {
            name: $name,
            description: $description,
            status: "Hello World",
            work_area: "Jakarta",
            start_project: "2022-10-20T11:04:48.377+07:00",
            stakeholder_ammount: 10,
            role_id: 10,
            project_type_id: 10,
            budget_health: "OK",
            company: $company,
            considered_success_when: "Everything is done.",
            cost_actual: 1.5,
            cost_plan: 1.5,
            currency_name: "Indonesian Rupiahs",
            currency_code: "IDR",
            currency_symbol: "IDR",
            end_project: "2022-10-20T11:04:48.377+07:00",
            office_location: $office_location,
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
                name,
                description,
                company,
                office_location,
                // start_project,
                // end_project
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