import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import '../../../../Assets/svgbutton/svgbutton.css'
import Addnewprojectobj from './Addnewprojectobj';
import Addnewresource from './Addnewresource';
import Addnewphase from './Addnewphase';
import Addnewrisk from './Addnewrisk';
import { IconDateForm, IconDeleteForm, IconPlus, IconPlusForm, IconSaveForm } from '../../../Icons/icon';
import './AddModal.css'
import { gql, useMutation, useQuery } from "@apollo/client";
import FetchProjectByUserId from '../../../../Middleware/Fetchers/FetchProjectByUserId';
import FetchMilestone from '../../../../Middleware/Fetchers/FetchMilestone';

const AddModalProjectCharter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

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

    const [project_id, setProjectId] = useState(1);
    const projectData = FetchProjectByUserId();
    function printListProjectName() {
        return projectData.map(({ ID, name }) => (
            <>
                <option value={ID}>{name}</option>
            </>
        ));
    }
    const handleChangeProject= (event) => {
        setProjectId(parseInt(event.target.value));
        console.log("Project ID", typeof parseInt(event.target.value), event.target.value);
    };

    const handleChangeParticipant= (event) => {
        // setProjectId(parseInt(event.target.value));
        setParticipants(parseInt(event.target.value));
        console.log("Participants", typeof parseInt(event.target.value), event.target.value);
    };

    const [participants, setParticipants] = useState(0);

    // const [resources, setResources] = useState(['']);
    // const handleFormChangeResources = (value, index) => {
    //     const dataResources = resources.map((resourcesItem, resourcesIndex) => {
    //         return resourcesIndex === index ? value : resourcesItem
    //     })
    //     setResources(dataResources)

    //     console.log("DATA", dataResources)
    //     console.log("RESOURCES", resources)
    // }
    // const removeFieldsResources = (index) => {
    //     let dataResources = [...resources];
    //     dataResources.splice(index, 1)
    //     console.log("removefields", resources)
    //     console.log("removefields", dataResources)
    //     setResources(dataResources)
    // }

    const [milestone_id, setMilestoneId] = useState(1);
    const milestoneData = FetchMilestone();
    function printListMilestoneName() {
        return milestoneData.map(({ID, status}) => (
            <>
                <option value={ID}>{status}</option>
            </> 
        ));
    }
    const handleChangeMilestone = (event) => {
        setMilestoneId(parseInt(event.target.value));
        console.log("Milestone ID", typeof parseInt(event.target.value), event.target.value);
    };

    const inputRefProject = useRef(null);
    const inputRefMilestone = useRef(null);

    const AddDialog = () => {
        return (
            <>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40" onClose={hideDialog}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
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
                                        {/* Project */}
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Project Name</span>
                                                </label>
                                                <select ref={inputRefProject} value={project_id} onChange={handleChangeProject} className="editor_type select select-bordered w-full max-w-lg">
                                                    {printListProjectName()}
                                                </select>
                                            </div>
                                        </div>
                                        {/* <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Project Name</span>
                                                </label>
                                                <input type="text" placeholder="Enter project name" className="input input-bordered w-full bg-table-dark border-primary-light" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Project Manager</span>
                                                </label>
                                                <input type="text" placeholder="Enter your name" className="input input-bordered w-full bg-table-dark border-primary-light" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Customer</span>
                                                </label>
                                                <input type="text" placeholder="Enter customer name" className="input input-bordered w-full bg-table-dark border-primary-light" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Description</span>
                                                </label>
                                                <textarea className="textarea textarea-bordered h-36 w-full bg-table-dark border-primary-light" placeholder="Enter a project description"></textarea>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Project Objectives</span>
                                                </label>
                                                <Addnewprojectobj />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Project Team Members</span>
                                                </label>
                                                <input type="text" placeholder="Enter project team members" className="input input-bordered w-full bg-table-dark border-primary-light" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Stakeholders</span>
                                                </label>
                                                <input type="text" placeholder="Enter stakeholders" className="input input-bordered w-full bg-table-dark border-primary-light" />
                                            </div>
                                        </div> */}
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Participants</span>
                                                </label>
                                                <input 
                                                type="text" 
                                                value={participants} 
                                                name="participants" 
                                                placeholder="Enter participants" 
                                                className="input input-bordered w-full bg-table-dark border-primary-light" 
                                                onChange={handleChangeParticipant}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Planned Budget</span>
                                                </label>
                                                <input type="text" placeholder="Enter planned budget" className="input input-bordered w-full bg-table-dark border-primary-light" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Actual Budget</span>
                                                </label>
                                                <input type="text" placeholder="Enter actual budget" className="input input-bordered w-full bg-table-dark border-primary-light" />
                                            </div>
                                        </div> */}
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Resources</span>
                                                </label>
                                                <Addnewresource />
                                            </div>
                                        </div>

                                        {/* <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Milestone</span>
                                                </label>
                                                <div className='grid grid-cols-18 gap-5 pb-2'>
                                                    <div className='col-span-9'>
                                                        <label className="label">
                                                            <p className='text-base font-medium'>Start Date</p>
                                                        </label>
                                                        <div className='pb-2'>
                                                            <input type="text" placeholder="Enter start date" className="input input-bordered w-full bg-table-dark border-primary-light" />
                                                        </div>
                                                    </div>
                                                    <div className='col-span-9'>
                                                        <label className="label">
                                                            <p className='text-base font-medium'>End Date</p>
                                                        </label>
                                                        <div className='pb-2'>
                                                            <input type="text" placeholder="Enter end date" className="input input-bordered w-full bg-table-dark border-primary-light" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Addnewphase/>
                                            </div>
                                        </div> */}

                                        {/* <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Milestone</span>
                                                </label>
                                                <label className="label">
                                                    <p className='text-base font-medium'>Start Date</p>
                                                </label>
                                                <div className="pb-2 w-full min-w-5xl" id="buttonInside">
                                                    <div className="flex justify-start">
                                                        <input type="text" placeholder="Enter start date" className="input input-bordered w-full bg-table-dark border-primary-light" />
                                                        <button id="buttonInputInside" className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2"><IconDateForm /></button>
                                                    </div>
                                                </div>

                                                <label className="label">
                                                    <p className='text-base font-medium'>End Date</p>
                                                </label>
                                                <div className="pb-2 w-full min-w-5xl" id="buttonInside">
                                                    <div className="flex justify-start">
                                                        <input type="text" placeholder="Enter end date" className="input input-bordered w-full bg-table-dark border-primary-light" />
                                                        <button id="buttonInputInside" className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2"><IconDateForm /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Potential Risks</span>
                                                </label>
                                                <Addnewrisk />
                                            </div>
                                        </div> */}

                                        {/* Milestone */}
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Milestone Name</span>
                                                </label>
                                                <select ref={inputRefMilestone} value={milestone_id} onChange={handleChangeMilestone} className="editor_type select select-bordered w-full max-w-lg">
                                                    {printListMilestoneName()}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mt-10">
                                            <div className='flex justify-end'>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={hideDialog}
                                                >
                                                    <IconSaveForm />
                                                    <p className='text-base text-white pt-0.5 px-1'>Save</p>
                                                </button>
                                            </div>

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
        )
    }

    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <button onClick={showDialog} className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white" id='icon'>
                    <IconPlus />
                </button>
            </div>
            <AddDialog />
        </>
    )
}
export default AddModalProjectCharter;
