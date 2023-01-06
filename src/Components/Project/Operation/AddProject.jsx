import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import SubmitButton from "../../Button";
import DatePicker from "react-datepicker";
import { InputField } from "../../Input/Input";

const GET_PROJECT = gql`
  query project {
    project {
      Data {
        ID
        name
        description
        user_id
      }
    }
  }
`;
const ADD_PROJECT = gql`
  mutation addProject(
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
    $description: String!
    $end_project: DateTime!
    $name: String!
    $office_location: String!
    $phase_id: Int!
    $potential_risk: [String]!
    $project_duration: Int!
    $project_objectives: [String]!
    $progress_percentage: Float!
    $budget: Int!
  ) {
    addProject(
      input: {
        status: $status
        work_area: $work_area
        start_project: $start_project
        stakeholder_ammount: $stakeholder_ammount
        role_id: $role_id
        type_id: $type_id
        company: $company
        considered_success_when: $considered_success_when
        cost_actual: $cost_actual
        cost_plan: $cost_plan
        currency_name: $currency_name
        currency_code: $currency_code
        currency_symbol: $currency_symbol
        description: $description
        end_project: $end_project
        name: $name
        office_location: $office_location
        phase_id: $phase_id
        potential_risk: [$potential_risk]
        project_duration: $project_duration
        project_objectives: [$project_objectives]
        progress_percentage: $progress_percentage
        budget: $budget
      }
    ) {
      Data {
        ID
        name
        description
      }
    }
  }
`;

const AddProject = () => {
  const [status, setStatus] = useState("");
  const [work_area, setWorkArea] = useState("");
  const [start_project, setStartProject] = useState("");
  const [stakeholder_ammount, setStakeholderAmmount] = useState(0);
  const [role_id, setRoleId] = useState(0);
  const [type_id, setTypeId] = useState(0);
  const [company, setCompany] = useState("");
  const [considered_success_when, setConsideredSuccessWhen] = useState("");
  const [cost_actual, setCostActual] = useState(0);
  const [cost_plan, setCostPlan] = useState(0);
  const [currency_name, setCurrencyName] = useState("");
  const [currency_code, setCurrencyCode] = useState("");
  const [currency_symbol, setCurrencySymbol] = useState("");
  const [description, setDescription] = useState("");
  const [end_project, setEndProject] = useState("");
  const [name, setName] = useState("");
  const [office_location, setOfficeLocation] = useState("");
  const [phase_id, setPhaseId] = useState(0);
  const [potential_risk, setPotentialRisk] = useState("");
  const [project_duration, setProjectDuration] = useState(0);
  const [project_objectives, setProjectObjectives] = useState("");
  const [progress_percentage, setProgressPercentage] = useState(0);
  const [budget, setBudget] = useState(0);
  const [addProject, { loading, error }] = useMutation(ADD_PROJECT, {
    refetchQueries: [{ query: GET_PROJECT }],
  });

  if (loading) return "Submitting...";
  // if (error) window.location.reload();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(typeof start_project);
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
        budget,
      },
    });
    setStatus("");
    setWorkArea("");
    setStartProject("");
    setStakeholderAmmount(0);
    setRoleId(0);
    setTypeId(0);
    setCompany("");
    setConsideredSuccessWhen("");
    setCostActual(0);
    setCostPlan(0);
    setCurrencyName("");
    setCurrencyCode("");
    setCurrencySymbol("");
    setDescription("");
    setEndProject("");
    setName("");
    setOfficeLocation("");
    setPhaseId(0);
    setPotentialRisk("");
    setProjectDuration(0);
    setProjectObjectives("");
    setProgressPercentage(0);
    setBudget(0);
  };

  const projectList = [
    {
      label: "Status",
      name: "status",
      placeholder: "Status",
      type: "text",
      value: status,
      onChange: (e) => setStatus(e.target.value),
    },
    {
      label: "Work Area",
      name: "work_area",
      placeholder: "Work Area",
      type: "text",
      value: work_area,
      onChange: (e) => setWorkArea(e.target.value),
    },
    {
      label: "Stakeholder Ammount",
      name: "stakeholder_ammount",
      placeholder: "Stakeholder Ammount",
      type: "number",
      value: stakeholder_ammount,
      onChange: (e) => setStakeholderAmmount(e.target.value),
    },
    {
      label: "Role ID",
      name: "role_id",
      placeholder: "Role ID",
      type: "number",
      value: role_id,
      onChange: (e) => setRoleId(e.target.value),
    },
    {
      label: "Type ID",
      name: "type_id",
      placeholder: "Type ID",
      type: "number",
      value: type_id,
      onChange: (e) => setTypeId(e.target.value),
    },
    {
      label: "Company",
      name: "company",
      placeholder: "Company",
      type: "text",
      value: company,
      onChange: (e) => setCompany(e.target.value),
    },
    {
      label: "Considered Success When",
      name: "considered_success_when",
      placeholder: "Considered Success When",
      type: "text",
      value: considered_success_when,
      onChange: (e) => setConsideredSuccessWhen(e.target.value),
    },
    {
      label: "Cost Actual",
      name: "cost_actual",
      placeholder: "Cost Actual",
      type: "number",
      value: cost_actual,
      onChange: (e) => setCostActual(e.target.value),
    },
    {
      label: "Cost Plan",
      name: "cost_plan",
      placeholder: "Cost Plan",
      type: "number",
      value: cost_plan,
      onChange: (e) => setCostPlan(e.target.value),
    },
    {
      label: "Currency Name",
      name: "currency_name",
      placeholder: "Currency Name",
      type: "text",
      value: currency_name,
      onChange: (e) => setCurrencyName(e.target.value),
    },
    {
      label: "Currency Code",
      name: "currency_code",
      placeholder: "Currency Code",
      type: "text",
      value: currency_code,
      onChange: (e) => setCurrencyCode(e.target.value),
    },
    {
      label: "Currency Symbol",
      name: "currency_symbol",
      placeholder: "Currency Symbol",
      type: "text",
      value: currency_symbol,
      onChange: (e) => setCurrencySymbol(e.target.value),
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Description",
      type: "text",
      value: description,
      onChange: (e) => setDescription(e.target.value),
    },
    {
      label: "End Project",
      name: "end_project",
      placeholder: "End Project",
      type: "date",
      value: end_project,
      onChange: (e) => setEndProject(e.target.value),
    },
    {
      label: "Name",
      name: "name",
      placeholder: "Name",
      type: "text",
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      label: "Office Location",
      name: "office_location",
      placeholder: "Office Location",
      type: "text",
      value: office_location,
      onChange: (e) => setOfficeLocation(e.target.value),
    },
    {
      label: "Phase ID",
      name: "phase_id",
      placeholder: "Phase ID",
      type: "number",
      value: phase_id,
      onChange: (e) => setPhaseId(e.target.value),
    },
    {
      label: "Potential Risk",
      name: "potential_risk",
      placeholder: "Potential Risk",
      type: "text",
      value: potential_risk,
      onChange: (e) => setPotentialRisk(e.target.value),
    },
    {
      label: "Project Duration",
      name: "project_duration",
      placeholder: "Project Duration",
      type: "number",
      value: project_duration,
      onChange: (e) => setProjectDuration(e.target.value),
    },
    {
      label: "Project Objectives",
      name: "project_objectives",
      placeholder: "Project Objectives",
      type: "text",
      value: project_objectives,
      onChange: (e) => setProjectObjectives(e.target.value),
    },
    {
      label: "Progress Precentage",
      name: "progress_percentage",
      placeholder: "Progress Precentage",
      type: "number",
      value: progress_percentage,
      onChange: (e) => setProgressPercentage(e.target.value),
    },
    {
      label: "Budget",
      name: "budget",
      placeholder: "Budget",
      type: "number",
      value: budget,
      onChange: (e) => setBudget(e.target.value),
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        {projectList.map((project, index) => {
          return (
            <InputField
              key={index}
              label={project.label}
              name={project.name}
              placeholder={project.placeholder}
              type={project.type}
              value={project.value}
              onChange={project.onChange}
            />
          );
        })}
        <DatePicker
          selected={start_project}
          onChange={(date) => setStartProject(date)}
          placeholder="MM/DD/YYYY"
        >
            <label></label>
            <input  type="text" className="form-control" />
        </DatePicker>
        <SubmitButton label="Add Project" />
      </form>
    </>
  );
};

export default AddProject;
