import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect, useRef } from "react";
import SubmitButton from "../../Button";
import { DatePickerField, InputField } from "../../Input/Input";
import { IconDeleteForm, IconPlusForm } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css'
import { GET_PHASE_DATA, GET_TYPE_DATA } from "../../GraphQL/Queries";


const GET_PROJECT = gql`
  query project {
    project {
      Data {
        ID
        name
        description
      }
    }
  }
`;
const ADD_PROJECT = gql`
  mutation addProject(
    $status: String
    $work_area: String
    $start_project: DateTime
    $stakeholder_ammount: Int
    $role_id: Int
    $type_id: Int
    $considered_success_when: String
    $cost_actual: Float
    $cost_plan: Float
    $client: String
    $client_contact: String
    $currency_name: String
    $currency_code: String
    $currency_symbol: String
    $description: String
    $end_project: DateTime
    $name: String
    $office_location: String
    $phase_id: Int
    $potential_risk: [String]
    $total_man_power: Int
    $project_objectives: [String]
    $progress_percentage: Float
    $budget: Int
  ) {
    addProject(
      input: {
        status: $status
        work_area: $work_area
        start_project: $start_project
        stakeholder_ammount: $stakeholder_ammount
        role_id: $role_id
        type_id: $type_id
        considered_success_when: $considered_success_when
        cost_actual: $cost_actual
        cost_plan: $cost_plan
        client: $client
        client_contact: $client_contact
        currency_name: $currency_name
        currency_code: $currency_code
        currency_symbol: $currency_symbol
        description: $description
        end_project: $end_project
        name: $name
        office_location: $office_location
        phase_id: $phase_id
        potential_risk: $potential_risk
        total_man_power: $total_man_power
        project_objectives: $project_objectives
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
    const [considered_success_when, setConsideredSuccessWhen] = useState("");
    const [cost_actual, setCostActual] = useState(0);
    const [cost_plan, setCostPlan] = useState(0);
    const [client, setClient] = useState("");
    const [client_contact, setClientContact] = useState("");
    const [currency_name, setCurrencyName] = useState("");
    const [currency_code, setCurrencyCode] = useState("");
    const [currency_symbol, setCurrencySymbol] = useState("");
    const [description, setDescription] = useState("");
    const [end_project, setEndProject] = useState("");
    const [name, setName] = useState("");
    const [office_location, setOfficeLocation] = useState("");
    const [total_man_power, setTotalManPower] = useState(0);
    const [progress_percentage, setProgressPercentage] = useState(0);
    const [budget, setBudget] = useState(0);

    const [potential_risk, setPotentialRisk] = useState(['']);
    const [project_objectives, setProjectObjectives] = useState(['']);
    const [type_id, setTypeId] = useState(1);
    const [phase_id, setPhaseId] = useState(1);

    const inputRefType = useRef(null);
    const inputRefPhase = useRef(null);

    const [addProject, { loading: addProjectLoading, error: addProjectError }] = useMutation(ADD_PROJECT, {
        refetchQueries: [{ query: GET_PROJECT }],
    });

    const { data, loading, error } = useQuery(GET_TYPE_DATA, {
        pollInterval: 1000,
    });
    const { data: dataPhase, loading: loadingPhase, error: errorPhase } = useQuery(GET_PHASE_DATA, {
        pollInterval: 1000,
    });
    const [typeName, setTypeName] = useState([]);
    const [phaseName, setPhaseName] = useState([]);

    useEffect(() => {
        if (data) {
            setTypeName(data.projectType.Data);
        }
        if (dataPhase){
            setPhaseName(dataPhase.projectPhase.Data);
        }
    }, [data, dataPhase]);



    function printListTypeName() {

        return typeName.map(({ ID, name }) => (
            <>
                <option value={ID}>{name}</option>
            </>
        ));
    }

    function printListPhaseName() {

        return phaseName.map(({ ID, name }) => (
            <>
                <option value={ID}>{name}</option>
            </>
        ));
    }


    const handleChangeType = (event) => {
        setTypeId(parseInt(event.target.value));
    };

    const handleChangePhase = (event) => {
        setPhaseId(parseInt(event.target.value));
    };

    const handleFormChangeProjectobj = (value, index) => {
        const dataObj = project_objectives.map((objItem, objIndex) => {
            return objIndex === index ? value : objItem
        })
        setProjectObjectives(dataObj)
    }

    const handleFormChangeRisk = (value, index) => {
        const dataRisk = potential_risk.map((riskItem, riskIndex) => {
            return riskIndex === index ? value : riskItem
        })
        setPotentialRisk(dataRisk)
    }

    const removeFieldsProjectobj = (index) => {
        let dataObj = [...project_objectives];
        dataObj.splice(index, 1)
        setProjectObjectives(dataObj)
    }

    const removeFieldsRisk = (index) => {
        let dataRisk = [...potential_risk];
        dataRisk.splice(index, 1)
        setPotentialRisk(dataRisk)
    }

    const handleSubmit = (e) => {
        type_id !== 0 ? type_id : setTypeId(parseInt(inputRefType.current.value))
        phase_id !== 0 ? phase_id : setPhaseId(parseInt(inputRefPhase.current.value))

        e.preventDefault();
        addProject({
            variables: {
                status,
                work_area,
                start_project,
                stakeholder_ammount,
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
                description,
                end_project,
                name,
                office_location,
                phase_id,
                potential_risk,
                total_man_power,
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
        setConsideredSuccessWhen("");
        setCostActual(0);
        setCostPlan(0);
        setClient("");
        setClientContact("");
        setCurrencyName("");
        setCurrencyCode("");
        setCurrencySymbol("");
        setDescription("");
        setEndProject("");
        setName("");
        setOfficeLocation("");
        setPhaseId(0);
        setPotentialRisk([""]);
        setTotalManPower(0);
        setProjectObjectives([""]);
        setProgressPercentage(0);
        setBudget(0);
    };

    const projectList = [
        {
            label: "Name",
            name: "name",
            placeholder: "Name",
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
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
            label: "Client",
            name: "client",
            placeholder: "Client",
            type: "text",
            value: client,
            onChange: (e) => setClient(e.target.value),
        },
        {
            label: "Client Contact",
            name: "client_contact",
            placeholder: "Client Contact",
            type: "number",
            value: client_contact,
            onChange: (e) => setClientContact(e.target.value),
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
            label: "Work Area",
            name: "work_area",
            placeholder: "Work Area",
            type: "text",
            value: work_area,
            onChange: (e) => setWorkArea(e.target.value),
        },
        {
            label: "Role ID",
            name: "role_id",
            placeholder: "Role ID",
            type: "number",
            value: role_id,
            onChange: (e) => setRoleId(parseInt(e.target.value)),
        },
        {
            label: "Stakeholder Ammount",
            name: "stakeholder_ammount",
            placeholder: "Stakeholder Ammount",
            type: "number",
            value: stakeholder_ammount,
            onChange: (e) => setStakeholderAmmount(parseInt(e.target.value)),
        },
        {
            label: "Total Man Power",
            name: "total_man_power",
            placeholder: "total_man_power",
            type: "number",
            valueL: total_man_power,
            onChange: (e) => setTotalManPower(parseInt(e.target.value)),
        },
        {
            label: "Progress Precentage",
            name: "progress_percentage",
            placeholder: "Progress Precentage",
            type: "number",
            value: progress_percentage,
            onChange: (e) => setProgressPercentage(parseFloat(e.target.value)),
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
            label: "Cost Actual",
            name: "cost_actual",
            placeholder: "Cost Actual",
            type: "number",
            value: cost_actual,
            onChange: (e) => setCostActual(parseFloat(e.target.value)),
        },
        {
            label: "Cost Plan",
            name: "cost_plan",
            placeholder: "Cost Plan",
            type: "number",
            value: cost_plan,
            onChange: (e) => setCostPlan(parseFloat(e.target.value)),
        },
        {
            label: "Budget",
            name: "budget",
            placeholder: "Budget",
            type: "number",
            value: budget,
            onChange: (e) => setBudget(parseInt(e.target.value)),
        },
        {
            label: "Status",
            name: "status",
            placeholder: "Status",
            type: "text",
            value: status,
            onChange: (e) => setStatus(e.target.value),
        },
        {
            label: "Considered Success When",
            name: "considered_success_when",
            placeholder: "Considered Success When",
            type: "text",
            value: considered_success_when,
            onChange: (e) => setConsideredSuccessWhen(e.target.value),
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


                {/* project objectives */}
                <div className="pb-2">
                    <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Project Objectives</label>
                    {project_objectives.map((input, index) => {
                        return (
                            <div key={index}>
                                <div className="pb-2 w-full min-w-5xl" id="buttonInside">
                                    <div className="flex justify-start">
                                        <input
                                            className="input input-border border-primary-light shadow appearance-none w-full"
                                            name='ProjectObjectives'
                                            placeholder="Project Objectives"
                                            value={input}
                                            onChange={event => handleFormChangeProjectobj(event.target.value, index)}
                                        />
                                        {project_objectives.length !== 1 && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={() => removeFieldsProjectobj(index)}><IconDeleteForm /></button>}
                                        {project_objectives.length - 1 === index && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={() => { setProjectObjectives([...project_objectives, '']) }}><IconPlusForm /></button>}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>


                {/* potential Risk */}
                <div className="pb-2">
                    <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Potential Risk</label>
                    {potential_risk.map((input, index) => {
                        return (
                            <div key={index}>
                                <div className="pb-2 w-full min-w-5xl" id="buttonInside">
                                    <div className="flex justify-start">
                                        <input
                                            className="input input-border border-primary-light shadow appearance-none w-full"
                                            name='PotentialRisk'
                                            placeholder="Potential Risk"
                                            value={input}
                                            onChange={event => handleFormChangeRisk(event.target.value, index)}
                                        />
                                        {potential_risk.length !== 1 && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={() => removeFieldsRisk(index)}><IconDeleteForm /></button>}
                                        {potential_risk.length - 1 === index && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={() => { setPotentialRisk([...potential_risk, '']) }}><IconPlusForm /></button>}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>


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

                {/* Type */}
                <div className="pt-1 pb-3">
                    <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Type Name</label>
                    <div className="flex flex-col items-center">
                        <select ref={inputRefType} value={type_id} onChange={handleChangeType} className="editor_type select select-bordered w-full max-w-lg">
                            {printListTypeName()}
                        </select>
                    </div>
                </div>


                {/* Phase */}
                <div className="pt-1 pb-4">
                    <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Phase Name</label>
                    <div className="flex flex-col items-center">
                        <select ref={inputRefPhase} value={phase_id} onChange={handleChangePhase} className="editor_type select select-bordered w-full max-w-lg">
                            {printListPhaseName()}
                        </select>
                    </div>
                </div>

                <SubmitButton label="Add Project" />
            </form>
        </>
    );
};

export default AddProject;
