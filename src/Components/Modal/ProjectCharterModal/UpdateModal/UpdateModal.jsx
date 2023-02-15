import { gql, useMutation, useQuery } from "@apollo/client";
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { GET_CHARTER_DATA_BY_USER_ID, GET_MILESTONE_DATA, GET_PHASE_DATA, GET_PROJECT_DATA_BY_USER_ID, GET_TYPE_DATA } from '../../../GraphQL/Queries';
import '../../../../Assets/svgbutton/svgbutton.css';
import { IconDeleteForm, IconEdit, IconPlusForm, IconSaveForm } from '../../../Icons/icon';
import { DatePickerField, InputField } from '../../../Input/Input';
import './UpdateModal.css';
import GetProfile from "../../../Auth/GetProfile";

const UPDATE_CHARTER = gql`
    mutation updateProject(
        $id: String!
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
        $description: String!
        $end_project: DateTime!
        $name: String!
        $office_location: String!
        $phase_id: Int!
        $potential_risk: [String]!
        $total_man_power: Int!
        $project_objectives: [String]!
        $progress_percentage: Float!
        $budget: Int!
        $participants: Int!
        $available_resources:[String]!
        $milestone_id: Int!
    ) {
    updateProject( id: $id,
        input: {
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
            description: $description,
            end_project: $end_project,
            name: $name,
            office_location: $office_location,
            phase_id: $phase_id,
            potential_risk: $potential_risk,
            total_man_power: $total_man_power,
            project_objectives: $project_objectives,
            progress_percentage: $progress_percentage,
            budget: $budget,
            participants: $participants,
            available_resources: $available_resources,
            milestone_id: $milestone_id
        }
    ) {
        Data {
            status
            work_area
            start_project
            stakeholder_ammount
            role_id
            type_id
            considered_success_when
            cost_actual
            cost_plan
            client
            client_contact
            currency_name
            currency_code
            currency_symbol
            description
            end_project
            name
            office_location
            phase_id
            potential_risk
            total_man_power
            project_objectives
            progress_percentage
            budget
            participants
            available_resources
            milestone_id
        }
       }
    }
`;

const UpdateModalProject = (props) => {
    const { projectData, page, limit, sort } = props;
    const [pcData, setPcData] = useState('');


    const [id, setId] = useState('');
    const [status, setStatus] = useState(projectData.status);
    const [work_area, setWorkArea] = useState(projectData.work_area);
    const [start_project, setStartProject] = useState(new Date(projectData.start_project));
    const [stakeholder_ammount, setStakeholderAmmount] = useState(projectData.stakeholder_ammount);
    const [role_id, setRoleId] = useState(projectData.role_id);
    const [considered_success_when, setConsideredSuccessWhen] = useState(projectData.considered_success_when);
    const [cost_actual, setCostActual] = useState(projectData.cost_actual);
    const [cost_plan, setCostPlan] = useState(projectData.cost_plan);
    const [client, setClient] = useState(projectData.client);
    const [client_contact, setClientContact] = useState(projectData.client_contact);
    const [currency_name, setCurrencyName] = useState(projectData.currency_name);
    const [currency_code, setCurrencyCode] = useState(projectData.currency_code);
    const [currency_symbol, setCurrencySymbol] = useState(projectData.currency_symbol);
    const [description, setDescription] = useState(projectData.description);
    const [end_project, setEndProject] = useState(new Date(projectData.end_project));
    const [name, setName] = useState(projectData.name);
    const [office_location, setOfficeLocation] = useState(projectData.office_location);
    const [total_man_power, setTotalManPower] = useState(projectData.total_man_power);
    const [progress_percentage, setProgressPercentage] = useState(projectData.progress_percentage);
    const [budget, setBudget] = useState(projectData.budget);

    const [participants, setParticipants] = useState(projectData.participants);
    const [milestone_id, setMilestoneId] = useState(projectData.milestone_id);

    const [potential_risk, setPotentialRisk] = useState(projectData.potential_risk);
    const [project_objectives, setProjectObjectives] = useState(projectData.project_objectives);
    const [type_id, setTypeId] = useState(projectData.type_id);
    const [phase_id, setPhaseId] = useState(projectData.phase_id);

    const [available_resources, setAvailableResources] = useState(projectData.available_resources);

    const inputRefType = useRef(null);
    const inputRefPhase = useRef(null);
    const inputRefMilestone = useRef(null);
    const profile = GetProfile();

    const [updateProject, { loading: updateProjectLoading, error: updateProjectError }] = useMutation(UPDATE_CHARTER,
        {
            refetchQueries: [
                { query: GET_PROJECT_DATA_BY_USER_ID, variables: { userId: String(profile.id), page: String(page), limit: String(limit), sort: String(sort)  }},
            ],
            // refetchQueries: refetchQueries,
            onComplete : () => {console.log("refetchQueries updateProject Completed")}
        });

    const { data: readPCData, error: readPCDataError } = useQuery(GET_CHARTER_DATA_BY_USER_ID, {
        variables: { id: String(projectData.ID) },
    });

    const { data: dataMilestone, loading: loadingMilestone, error: errorMilestone } = useQuery(GET_MILESTONE_DATA);
    const [milestoneStatus, setMilestoneStatus] = useState([]);

    const { data, loading, error } = useQuery(GET_TYPE_DATA);
    const { data: dataPhase, loading: loadingPhase, error: errorPhase } = useQuery(GET_PHASE_DATA);
    const [typeName, setTypeName] = useState([]);
    const [phaseName, setPhaseName] = useState([]);

    useEffect(() => {
        if (dataMilestone) {
            setMilestoneStatus(dataMilestone.projectMilestone.Data);
            console.log("Data Ready Milestone Update Charter", dataMilestone.projectMilestone.Data)
        }
        if(readPCData){
            setPcData(readPCData.projectByUserId.Data);
            console.log("Data Ready Read update Charter Data", readPCData.projectByUserId.Data);
        }
        if (data) {
            setTypeName(data.projectType.Data);
            console.log("Data Ready type update charter", data.projectType.Data);
        }
        if (dataPhase) {
            setPhaseName(dataPhase.projectPhase.Data);
            console.log("Data Ready phase update charter", dataPhase.projectPhase.Data)
        }

        else {
            console.log("No data update charter");
        }
    }, [data, dataPhase, dataMilestone, readPCData]);

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

    function printListMilestoneName() {
        return milestoneStatus.map(({ ID, status }) => (
            <>
                <option value={ID}>{status}</option>
            </>
        ));
    }

    const handleChangeType = (event) => {
        setTypeId(parseInt(event.target.value));
        // console.log("TYPE ID", typeof parseInt(event.target.value), event.target.value);
    };

    const handleChangePhase = (event) => {
        setPhaseId(parseInt(event.target.value));
        // console.log("PHASE ID", typeof parseInt(event.target.value), event.target.value);
    };

    const handleChangeMilestone = (event) => {
        setMilestoneId(parseInt(event.target.value));
        // console.log("Milestone ID", typeof parseInt(event.target.value), event.target.value);
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

    const handleFormChangeResources = (value, index) => {
        const dataResource = available_resources.map((resourceItem, resourceIndex) => {
            return resourceIndex === index ? value : resourceItem
        })
        setAvailableResources(dataResource)
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

    const removeFieldsResources = (index) => {
        let dataResource = [...available_resources];
        dataResource.splice(index, 1)
        setAvailableResources(dataResource)
    }

    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

    // if (loading) return "Submitting...";
    // if (error) console.log(JSON.stringify(error));
    // if (loadingMilestone) return "submitting...";
    // if (errorMilestone) console.log(JSON.stringify(errorMilestone));
    // if (loadingPhase) return "submitting...";
    // if (errorPhase) console.log(JSON.stringify(errorPhase));

    // if (updateProjectError) console.log(JSON.stringify(updateProjectError));

    const handleSubmit = (e) => {
        e.preventDefault();

        const milestone_id = parseInt(inputRefMilestone.current.value);
        const phase_id = parseInt(inputRefPhase.current.value);
        const type_id = parseInt(inputRefType.current.value);

        type_id !== 0 ? type_id : setTypeId(parseInt(inputRefType.current.value))
        phase_id !== 0 ? phase_id : setPhaseId(parseInt(inputRefPhase.current.value))
        milestone_id === 0 ? setMilestoneId(parseInt(inputRefMilestone.current.value)) : milestone_id

        // console.log(typeof parseInt(inputRefMilestone.current.value), parseInt(inputRefMilestone.current.value));
        // console.log(typeof milestone_id, milestone_id);
        // console.log(typeof parseInt(inputRefType.current.value), parseInt(inputRefType.current.value));
        // console.log(typeof parseInt(inputRefPhase.current.value), parseInt(inputRefPhase.current.value));

        console.log("Berhasil submit Update Modal")

        updateProject({
            variables: {
                id: String(projectData.ID),
                participants,
                available_resources,
                milestone_id,
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

        hideDialog();

    }

    const dataProjectCharter = [
        {
            label: "Name",
            name: "name",
            placeholder: "Example: Project Anomaly",
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
        },
        {
            label: "Description",
            name: "description",
            placeholder: "Example: This project is about anomaly detection",
            type: "text",
            value: description,
            onChange: (e) => setDescription(e.target.value),
        },
        {
            label: "Client",
            name: "client",
            placeholder: "Example: Makmur Group",
            type: "text",
            value: client,
            onChange: (e) => setClient(e.target.value),
        },
        {
            label: "Client Contact",
            name: "client_contact",
            placeholder: "Example: 08123456789",
            type: "number",
            value: client_contact,
            onChange: (e) => setClientContact(e.target.value),
        },
        {
            label: "Office Location",
            name: "office_location",
            placeholder: "Example: Sudriman",
            type: "text",
            value: office_location,
            onChange: (e) => setOfficeLocation(e.target.value),
        },
        {
            label: "Work Area",
            name: "work_area",
            placeholder: "Example: Jakarta",
            type: "text",
            value: work_area,
            onChange: (e) => setWorkArea(e.target.value),
        },
        {
            label: "Role ID",
            name: "role_id",
            placeholder: "Example: 1",
            type: "number",
            value: role_id,
            onChange: (e) => setRoleId(parseInt(e.target.value)),
        },
        {
            label: "Stakeholder Ammount",
            name: "stakeholder_ammount",
            placeholder: "Example: 1",
            type: "number",
            value: stakeholder_ammount,
            onChange: (e) => setStakeholderAmmount(parseInt(e.target.value)),
        },
        {
            label: "Total Man Power",
            name: "total_man_power",
            placeholder: "Example: 1",
            type: "number",
            value: total_man_power,
            onChange: (e) => setTotalManPower(parseInt(e.target.value)),
        },
        {
            label: "Participant",
            name: "participants",
            placeholder: "Example: 1",
            type: "number",
            value: participants,
            onChange: (e) => setParticipants(parseInt(e.target.value)),
        },
        {
            label: "Progress Precentage",
            name: "progress_percentage",
            placeholder: "Example: 10",
            type: "number",
            value: progress_percentage,
            onChange: (e) => setProgressPercentage(parseFloat(e.target.value)),
        },
        {
            label: "Currency Name",
            name: "currency_name",
            placeholder: "Example: Rupiah",
            type: "text",
            value: currency_name,
            onChange: (e) => setCurrencyName(e.target.value),
        },
        {
            label: "Currency Code",
            name: "currency_code",
            placeholder: "Example: IDR",
            type: "text",
            value: currency_code,
            onChange: (e) => setCurrencyCode(e.target.value),
        },
        {
            label: "Currency Symbol",
            name: "currency_symbol",
            placeholder: "Example: IDR",
            type: "text",
            value: currency_symbol,
            onChange: (e) => setCurrencySymbol(e.target.value),
        },
        {
            label: "Cost Actual",
            name: "cost_actual",
            placeholder: "Example: 1000000",
            type: "number",
            value: cost_actual,
            onChange: (e) => setCostActual(parseFloat(e.target.value)),
        },
        {
            label: "Cost Plan",
            name: "cost_plan",
            placeholder: "Example: 1000000",
            type: "number",
            value: cost_plan,
            onChange: (e) => setCostPlan(parseFloat(e.target.value)),
        },
        {
            label: "Budget",
            name: "budget",
            placeholder: "Example: 1000000",
            type: "number",
            value: budget,
            onChange: (e) => setBudget(parseInt(e.target.value)),
        },
        {
            label: "Status",
            name: "status",
            placeholder: "Example: In Progress",
            type: "text",
            value: status,
            onChange: (e) => setStatus(e.target.value),
        },
        {
            label: "Considered Success When",
            name: "considered_success_when",
            placeholder: "Example: Project is done",
            type: "text",
            value: considered_success_when,
            onChange: (e) => setConsideredSuccessWhen(e.target.value),
        },

    ];

    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <button onClick={showDialog} className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white" id='icon'>
                    <IconEdit />
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40" onClose={hideDialog}>
                    <Transition
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="px-24 py-16 w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-bold leading-6 pb-8"
                                    >
                                       Edit Project Charter
                                    </Dialog.Title>

                                    {/* participants */}
                                    {dataProjectCharter.map((data, index) => {
                                        return (
                                            <InputField
                                                key={index}
                                                label={data.label}
                                                name={data.name}
                                                placeholder={data.placeholder}
                                                type={data.type}
                                                value={data.value}
                                                onChange={data.onChange}
                                            />
                                        );
                                    })}

                                    {/*  resource */}
                                    <div className="pb-2">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Resources</label>
                                        {available_resources.map((input, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className="pb-2 w-full min-w-5xl">
                                                        <div className="flex justify-start">
                                                            <input
                                                                className="input input-border border-primary-light shadow appearance-none w-full"
                                                                name='resources'
                                                                placeholder="Example: 20 workers"
                                                                value={input}
                                                                onChange={event => handleFormChangeResources(event.target.value, index)}
                                                            />
                                                            {available_resources.length !== 1 && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={() => removeFieldsResources(index)}><IconDeleteForm /></button>}
                                                            {available_resources.length - 1 === index && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={() => { setAvailableResources([...available_resources, '']) }}><IconPlusForm /></button>}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

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
                                                                placeholder="Example : Build a house"
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
                                                                placeholder="Example : Resource is not enough"
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

                                    {/* milestone */}
                                    <div className="pt-1 pb-3">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Milestone Status</label>
                                        <div className="flex flex-col w-full">
                                            <select ref={inputRefMilestone} value={milestone_id} onChange={handleChangeMilestone} className="editor_type select select-bordered w-full max-w-5xl">
                                                {printListMilestoneName()}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Type */}
                                    <div className="pt-1 pb-3">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Type Name</label>
                                        <div className="flex flex-col w-full">
                                            <select ref={inputRefType} value={type_id} onChange={handleChangeType} className="editor_type select select-bordered w-full max-w-5xl">
                                                {printListTypeName()}
                                            </select>
                                        </div>
                                    </div>



                                    {/* Phase */}
                                    <div className="pt-1 pb-4">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Phase Name</label>
                                        <div className="flex flex-col w-full">
                                            <select ref={inputRefPhase} value={phase_id} onChange={handleChangePhase} className="editor_type select select-bordered w-full max-w-5xl">
                                                {printListPhaseName()}
                                            </select>
                                        </div>
                                    </div>

                                    {/* <p className="label-text">Project ID: <span className="label-text font-bold">{String(projectData.ID)}</span></p> */}

                                    <div className="mt-10">
                                        <div className='flex justify-end'>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={handleSubmit}
                                            >
                                                <IconSaveForm />
                                                <p className='text-base text-white pt-0.5 px-1'>Save</p>
                                            </button>
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition>
                        </div>
                    </div>
                </Dialog>
            </Transition>


        </>
    )
}
export default UpdateModalProject;
