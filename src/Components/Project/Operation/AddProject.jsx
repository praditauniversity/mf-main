import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import SubmitButton from "../../Button";
import { InputField } from "../../Input/Input";

const GET_PROJECT = gql`query project { project { Data { ID name description user_id } } }`;
const ADD_PROJECT = gql`
    mutation addProject (
        $status: String!,
        $work_area: String!,
        $start_project: DateTime!,
        $stakeholder_ammount: Int!,
        $role_id: Int!,
        $type_id: Int!,
        $company: String!,
        $considered_success_when: String!,
        $cost_actual: Float!,
        $cost_plan: Float!,
        $currency_name: String!,
        $currency_code: String!,
        $currency_symbol: String!,
        $description: String!,
        $end_project: DateTime!,
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
            status: $status,
            work_area: $work_area,
            start_project: $start_project,
            stakeholder_ammount: $stakeholder_ammount,
            role_id: $role_id,
            type_id: $type_id,
            company: $company,
            considered_success_when: $considered_success_when,
            cost_actual: $cost_actual,
            cost_plan: $cost_plan,
            currency_name: $currency_name,
            currency_code: $currency_code,
            currency_symbol: $currency_symbol,
            description: $description,
            end_project: $end_project,
            name: $name,
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

const AddProject = () => {
    const [status, setStatus] = useState('');
    const [work_area, setWorkArea] = useState('');
    const [start_project, setStartProject] = useState('');
    const [stakeholder_ammount, setStakeholderAmmount] = useState(0);
    const [role_id, setRoleId] = useState(0);
    const [type_id, setTypeId] = useState(0);
    const [company, setCompany] = useState('');
    const [considered_success_when, setConsideredSuccessWhen] = useState('');
    const [cost_actual, setCostActual] = useState(0);
    const [cost_plan, setCostPlan] = useState(0);
    const [currency_name, setCurrencyName] = useState('');
    const [currency_code, setCurrencyCode] = useState('');
    const [currency_symbol, setCurrencySymbol] = useState('');
    const [description, setDescription] = useState('');
    const [end_project, setEndProject] = useState('');
    const [name, setName] = useState('');
    const [office_location, setOfficeLocation] = useState('');
    const [phase_id, setPhaseId] = useState(0);
    const [potential_risk, setPotentialRisk] = useState('');
    const [project_duration, setProjectDuration] = useState(0);
    const [project_objectives, setProjectObjectives] = useState('');
    const [progress_percentage, setProgressPercentage] = useState(0);
    const [budget, setBudget] = useState(0);
    const [addProject, { loading, error }] = useMutation(ADD_PROJECT, {
        refetchQueries: [{ query: GET_PROJECT }]
    });

    if (loading) return 'Submitting...';
    // if (error) window.location.reload();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(typeof stakeholder_ammount);
        addProject({
            variables: {
                status,
                work_area,
                start_project,
                stakeholder_ammount,
                role_id,
                type_id,
                company,
                considered_success_when,
                cost_actual,
                cost_plan,
                currency_name,
                currency_code,
                currency_symbol,
                description,
                end_project,
                name,
                office_location,
                phase_id,
                potential_risk,
                project_duration,
                project_objectives,
                progress_percentage,
                budget
            }
        });
        setStatus('');
        setWorkArea('');
        setStartProject('');
        setStakeholderAmmount(0);
        setRoleId(0);
        setTypeId(0);
        setCompany('');
        setConsideredSuccessWhen('');
        setCostActual(0);
        setCostPlan(0);
        setCurrencyName('');
        setCurrencyCode('');
        setCurrencySymbol('');
        setDescription('');
        setEndProject('');
        setName('');
        setOfficeLocation('');
        setPhaseId(0);
        setPotentialRisk('');
        setProjectDuration(0);
        setProjectObjectives('');
        setProgressPercentage(0);
        setBudget(0);
    }
    
  
    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField value={status} label={"Status"} name={"status"} placeholder={"Status"} type={"text"} onChange={e => setStatus(e.target.value)} />
                <InputField value={work_area} label={"Work Area"} name={"work_area"} placeholder={"Work Area"} type={"text"} onChange={e => setWorkArea(e.target.value)} />
                <InputField value={start_project} label={"Start Project"} name={"start_project"} placeholder={"Start Project"} type={"text"} onChange={e => setStartProject(e.target.value)} />
                <InputField value={stakeholder_ammount} label={"Stakeholder Ammount"} name={"stakeholder_ammount"} placeholder={"Stakeholder Ammount"} type={"number"} onChange={e => setStakeholderAmmount(parseInt(e.target.value))} />
                <InputField value={role_id} label={"Role ID"} name={"role_id"} placeholder={"Role ID"} type={"number"} onChange={e => setRoleId(parseInt(e.target.value))} />
                <InputField value={type_id} label={"Type ID"} name={"type_id"} placeholder={"Type ID"} type={"number"} onChange={e => setTypeId(parseInt(e.target.value))} />
                <InputField value={company} label={"Company"} name={"company"} placeholder={"Company"} type={"text"} onChange={e => setCompany(e.target.value)} />
                <InputField value={considered_success_when} label={"Considered Success When"} name={"considered_success_when"} placeholder={"Considered Success When"} type={"text"} onChange={e => setConsideredSuccessWhen(e.target.value)} />
                <InputField value={cost_actual} label={"Cost Actual"} name={"cost_actual"} placeholder={"Cost Actual"} type={"number"} onChange={e => setCostActual(parseInt(e.target.value))} />
                <InputField value={cost_plan} label={"Cost Plan"} name={"cost_plan"} placeholder={"Cost Plan"} type={"number"} onChange={e => setCostPlan(parseInt(e.target.value))} />
                <InputField value={currency_name} label={"Currency Name"} name={"currency_name"} placeholder={"Currency Name"} type={"text"} onChange={e => setCurrencyName(e.target.value)} />
                <InputField value={currency_code} label={"Currency Code"} name={"currency_code"} placeholder={"Currency Code"} type={"text"} onChange={e => setCurrencyCode(e.target.value)} />
                <InputField value={currency_symbol} label={"Currency Symbol"} name={"currency_symbol"} placeholder={"Currency Symbol"} type={"text"} onChange={e => setCurrencySymbol(e.target.value)} />
                <InputField value={description} label={"Description"} name={"description"} placeholder={"Description"} type={"text"} onChange={e => setDescription(e.target.value)} />
                <InputField value={end_project} label={"End Project"} name={"end_project"} placeholder={"End Project"} type={"text"} onChange={e => setEndProject(e.target.value)} />
                <InputField value={name} label={"Name"} name={"name"} placeholder={"Name"} type={"text"} onChange={e => setName(e.target.value)} />
                <InputField value={office_location} label={"Office Location"} name={"office_location"} placeholder={"Office Location"} type={"text"} onChange={e => setOfficeLocation(e.target.value)} />
                <InputField value={phase_id} label={"Phase ID"} name={"phase_id"} placeholder={"Phase ID"} type={"number"} onChange={e => setPhaseId(parseInt(e.target.value))} />
                <InputField value={potential_risk} label={"Potential Risk"} name={"potential_risk"} placeholder={"Potential Risk"} type={"text"} onChange={e => setPotentialRisk(e.target.value)} />
                <InputField value={project_duration} label={"Project Duration"} name={"project_duration"} placeholder={"Project Duration"} type={"number"} onChange={e => setProjectDuration(parseInt(e.target.value))} />
                <InputField value={project_objectives} label={"Project Objectives"} name={"project_objectives"} placeholder={"Project Objectives"} type={"text"} onChange={e => setProjectObjectives(e.target.value)} />
                <InputField value={progress_percentage} label={"Progress Percentage"} name={"progress_percentage"} placeholder={"Progress Percentage"} type={"number"} onChange={e => setProgressPercentage(parseInt(e.target.value))} />
                <InputField value={budget} label={"Budget"} name={"budget"} placeholder={"Budget"} type={"number"} onChange={e => setBudget(parseInt(e.target.value))} />
                <SubmitButton label="Add Project" />
            </form>
        </>
    );
}

export default AddProject;