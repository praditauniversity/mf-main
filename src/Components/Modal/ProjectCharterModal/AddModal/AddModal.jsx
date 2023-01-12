import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import '../../../../Assets/svgbutton/svgbutton.css'
import { IconDateForm, IconDeleteForm, IconPlus, IconPlusForm, IconSaveForm } from '../../../Icons/icon';
import './AddModal.css'
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_MILESTONE_DATA, GET_PROJECT_DATA_BY_ID } from '../../../GraphQL/Queries';
import { InputField } from '../../../Input/Input';

const ADD_CHARTER = gql`
        mutation addProjectCharter(
            $project_id: Int!,
            $participants: Int!,
            $available_resources:[String]!,
            $milestone_id: Int!
        ) {
        addProjectCharter(
            input: {
            project_id: $project_id, 
            participants: $participants,
            available_resources: $available_resources,
            milestone_id: $milestone_id
            }
        ) {
            Data {
                ID
                project_id
                participants
                available_resources
                milestone_id
            }
        }
        }
    `;

const AddModalProjectCharter = () => {
    const [participants, setParticipants] = useState(0);
    const [available_resources, setAvailableResources] = useState(['']);
    const [project_id, setProjectId] = useState(0);
    const [milestone_id, setMilestoneId] = useState(0);

    const inputRefProject = useRef(null);
    const inputRefMilestone = useRef(null);

    const [addProjectCharter, { loading: addProjectLoading, error: addProjectError }] = useMutation(ADD_CHARTER);


    const { data, loading, error } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: project_id }
    });
    const { data: dataMilestone, loading: loadingMilestone, error: errorMilestone } = useQuery(GET_MILESTONE_DATA);
    const [projectName, setProjectName] = useState([]);
    const [milestoneStatus, setMilestoneStatus] = useState([]);

    useEffect(() => {
        if (data, dataMilestone) {
            console.log("Data Ready list project and milestone");
            // setProjectName(data.project.Data);
            setMilestoneStatus(dataMilestone.projectMilestone.Data);
            // console.log("Data Ready", data.project.Data);
            console.log("Data Ready", dataMilestone.projectMilestone.Data)
        } else {
            console.log("No data list project and milestone");
        }
        console.log("USE EFFECT list project and milestone");
    }, [data, dataMilestone]);

    function printListProjectName() {
        return projectName.map(({ ID, name }) => (
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

    const handleChangeProject = (event) => {
        setProjectId(parseInt(event.target.value));
        console.log("Project ID", typeof parseInt(event.target.value), event.target.value);
    };

    const handleChangeMilestone = (event) => {
        setMilestoneId(parseInt(event.target.value));
        console.log("Milestone ID", typeof parseInt(event.target.value), event.target.value);
    };

    const handleFormChangeResources = (value, index) => {
        const dataResource = available_resources.map((resourceItem, resourceIndex) => {
            return resourceIndex === index ? value : resourceItem
        })
        setAvailableResources(dataResource)

        console.log("DATA", dataResource)
        console.log("PROJECTOBJ", available_resources)
    }

    const removeFieldsResources = (index) => {
        let dataResource = [...available_resources];
        dataResource.splice(index, 1)
        console.log("removefields", available_resources)
        console.log("removefields", dataResource)
        setAvailableResources(dataResource)
    }

    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

    if (loading) return "Submitting...";
    if (error) console.log(JSON.stringify(error));
    if (loadingMilestone) return "submitting...";
    if (errorMilestone) console.log(JSON.stringify(errorMilestone));


    const handleSubmit = (e) => {
        project_id !== 0 ? project_id : setProjectId(parseInt(inputRefProject.current.value))
        milestone_id !== 0 ? milestone_id : setMilestoneId(parseInt(inputRefMilestone.current.value))

        console.log(typeof parseInt(inputRefProject.current.value), parseInt(inputRefProject.current.value));
        console.log(typeof parseInt(inputRefMilestone.current.value), parseInt(inputRefMilestone.current.value));
        console.log(typeof project_id, project_id);
        console.log(typeof milestone_id, milestone_id);

        e.preventDefault();
        addProjectCharter({
            variables: {
                project_id,
                participants,
                available_resources,
                milestone_id
            },
        });

    }

    const dataDailyReport = [
        {
            label: "Participants",
            name: "participants",
            placeholder: "Participants",
            type: "text",
            value: participants,
            onChange: (e) => setParticipants(parseInt(e.target.value)),
        },
    ]

    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <button onClick={showDialog} className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white" id='icon'>
                    <IconPlus />
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
                                        className="text-lg font-bold leading-6"
                                    >
                                        Project Charter
                                    </Dialog.Title>

                                    {/* project */}
                                    <div className="pt-1 pb-3">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Project Name</label>
                                        <div className="flex flex-col items-center">
                                            <select ref={inputRefProject} value={project_id} onChange={handleChangeProject} className="editor_type select select-bordered w-full max-w-lg">
                                                {printListProjectName()}
                                            </select>
                                        </div>
                                    </div>

                                    {/* milestone */}
                                    <div className="pt-1 pb-3">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Milestone Status</label>
                                        <div className="flex flex-col items-center">
                                            <select ref={inputRefMilestone} value={milestone_id} onChange={handleChangeMilestone} className="editor_type select select-bordered w-full max-w-lg">
                                                {printListMilestoneName()}
                                            </select>
                                        </div>
                                    </div>

                                    {/* participants */}
                                    {dataDailyReport.map((data, index) => {
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
                                                                placeholder="Resources"
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
export default AddModalProjectCharter;
