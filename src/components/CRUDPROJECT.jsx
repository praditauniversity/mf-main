import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Button from "./Button";

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

const InputField  = ({ type, placeholder, label }) => {
    return (
        <div className="input-field">
            <label htmlFor={label}>{label}</label>
            <input type={type} placeholder={placeholder} />
        </div>
    );
};

const AddProjectGraphql = () => {
    const [addProject] = useMutation(ADD_PROJECT);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addProject({ variables: { name, description } });
        setName('');
        setDescription('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className="py-4 mx-auto flex items-center justify-between space-x-4">
                <Button buttontype="submit" label="Add Project" />
            </div>
        </form>
    );
}

export default AddProjectGraphql;