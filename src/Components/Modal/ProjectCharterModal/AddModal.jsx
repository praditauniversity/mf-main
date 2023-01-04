import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconPlus } from '../../Icons/icon';
import '../../../Assets/svgbutton/svgbutton.css'

const AddModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

    const AddDialog = () => {
        return (
            <>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={hideDialog}>
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
                                    <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-bold leading-6"
                                        >
                                            Project Charter
                                        </Dialog.Title>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Project Name</span>
                                                </label>
                                                <input type="text" placeholder="Enter project name" className="input input-bordered w-full" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Project Manager</span>
                                                </label>
                                                <input type="text" placeholder="Enter your name" className="input input-bordered w-full" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Customer</span>
                                                </label>
                                                <input type="text" placeholder="Enter customer name" className="input input-bordered w-full" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Description</span>
                                                </label>
                                                <textarea className="textarea textarea-bordered h-24 w-full" placeholder="Enter a project description"></textarea>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Project Objectives</span>
                                                </label>
                                                <div className='pb-2'>
                                                    <input type="text" placeholder="Enter your objective" className="input input-bordered w-full" />
                                                </div>
                                                <div className='pb-2'>
                                                    <input type="text" placeholder="Enter your objective" className="input input-bordered w-full" />
                                                </div>
                                                <div className='pb-2'>
                                                    <input type="text" placeholder="Enter your objective" className="input input-bordered w-full" />
                                                </div>
                                                <div className='pb-2 pl-2'>
                                                    <button className='text-primary'>+ New List</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Project Team Members</span>
                                                </label>
                                                <input type="text" placeholder="Enter project team members" className="input input-bordered w-full" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Stakeholders</span>
                                                </label>
                                                <input type="text" placeholder="Enter stakeholders" className="input input-bordered w-full" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Participants</span>
                                                </label>
                                                <input type="text" placeholder="Enter participants" className="input input-bordered w-full" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Planned Budget</span>
                                                </label>
                                                <input type="text" placeholder="Enter planned budget" className="input input-bordered w-full" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Actual Budget</span>
                                                </label>
                                                <input type="text" placeholder="Enter actual budget" className="input input-bordered w-full" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Resources</span>
                                                </label>
                                                <div className='pb-2'>
                                                    <input type="text" placeholder="Enter your resource" className="input input-bordered w-full" />
                                                </div>
                                                <div className='pb-2'>
                                                    <input type="text" placeholder="Enter your resource" className="input input-bordered w-full" />
                                                </div>
                                                <div className='pb-2'>
                                                    <input type="text" placeholder="Enter your resource" className="input input-bordered w-full" />
                                                </div>
                                                <div className='pb-2 pl-2'>
                                                    <button className='text-primary'>+ New List</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3">
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
                                                            <input type="text" placeholder="Enter start date" className="input input-bordered w-full" />
                                                        </div>
                                                    </div>
                                                    <div className='col-span-9'>
                                                        <label className="label">
                                                            <p className='text-base font-medium'>End Date</p>
                                                        </label>
                                                        <div className='pb-2'>
                                                            <input type="text" placeholder="Enter end date" className="input input-bordered w-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-18 gap-5 pt-2'>
                                                    <div className='col-span-9'>
                                                        <label className="label">
                                                            <p className='text-base font-medium'>Phases</p>
                                                        </label>
                                                        <div className='pb-2'>
                                                            <input type="text" placeholder="Enter phase" className="input input-bordered w-full" />
                                                        </div>
                                                        <div className='pb-2'>
                                                            <input type="text" placeholder="Enter phase" className="input input-bordered w-full" />
                                                        </div>
                                                        <div className='pb-2'>
                                                            <input type="text" placeholder="Enter phase" className="input input-bordered w-full" />
                                                        </div>
                                                    </div>
                                                    <div className='col-span-9'>
                                                        <label className="label">
                                                            <p className='text-base font-medium'>End Date</p>
                                                        </label>
                                                        <div className='pb-2'>
                                                            <input type="text" placeholder="Enter end date" className="input input-bordered w-full" />
                                                        </div>
                                                        <div className='pb-2'>
                                                            <input type="text" placeholder="Enter end date" className="input input-bordered w-full" />
                                                        </div>
                                                        <div className='pb-2'>
                                                            <input type="text" placeholder="Enter end date" className="input input-bordered w-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='pb-2 pl-2'>
                                                    <button className='text-primary'>+ New List</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Potential Risks</span>
                                                </label>
                                                <div className='pb-2'>
                                                    <input type="text" placeholder="Enter potential risks" className="input input-bordered w-full" />
                                                </div>
                                                <div className='pb-2'>
                                                    <input type="text" placeholder="Enter potential risks" className="input input-bordered w-full" />
                                                </div>
                                                <div className='pb-2'>
                                                    <input type="text" placeholder="Enter potential risks" className="input input-bordered w-full" />
                                                </div>
                                                <div className='pb-2 pl-2'>
                                                    <button className='text-primary'>+ New List</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={hideDialog}
                                            >
                                                Save
                                            </button>
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
export default AddModal;
