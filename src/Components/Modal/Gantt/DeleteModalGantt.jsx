import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Addnewprojectobj from '../ProjectCharterModal/AddModal/Addnewprojectobj';
import Addnewresource from '../ProjectCharterModal/AddModal/Addnewresource';
import Addnewphase from '../ProjectCharterModal/AddModal/Addnewphase';
import Addnewrisk from '../ProjectCharterModal/AddModal/Addnewrisk';
import { IconDateForm, IconPlus, IconSaveForm } from '../../Icons/icon';
import './AddModal.css'
import Button from '../../Button';
import GetProfile from '../../Auth/GetProfile';
import useLocalStorage from '../../../Middleware/useLocalStorage';
import { ADD_GANTT } from '../../../Middleware/GraphQL/mutations';
import { useQuery, gql, useMutation } from "@apollo/client";
import { DatePickerField } from '../../Input/Input';
import TableDatePicker from '../ModalDatePicker/DatePickerModal';

const DeleteModalGantt = () => {
    const [isOpen, setIsOpen] = useState(false);

    const profile = GetProfile();
    const [projectID, setProjectID] = useLocalStorage('projectID', null);

    const [addGantt, { data: addGanttData, error: addGanttError }] = useMutation(ADD_GANTT);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [user_id, setUserId] = useState(profile.id);
    const [version, setVersion] = useState(0);
    const [project_id, setProjectId] = useState(0);
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');

    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

    const handleSave = (e) => {
        e.preventDefault();
        
        addGantt({
            variables: {
                name,
                description,
                user_id: profile.id,
                version,
                project_id: projectID,
                start_time,
                end_time
            },
        });

        if (addGanttError) {
            console.log(JSON.stringify(addGanttError, null, 2));
        }

        setName('');
        setDescription('');
        setUserId(profile.id);
        setVersion('');
        setProjectId(0);
        setStartTime('');
        setEndTime('');

        hideDialog();
    };

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
                                            Create Gantt
                                        </Dialog.Title>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Name</span>
                                                </label>
                                                <input type="text" placeholder="Enter Gantt name" className="input input-bordered w-full bg-table-dark border-primary-light" onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Description</span>
                                                </label>
                                                <input type="text" placeholder="Enter gantt description" className="input input-bordered w-full bg-table-dark border-primary-light" onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <span className="label-text">Version</span>
                                                </label>
                                                <input type="number" placeholder="Enter version" className="input input-bordered w-full bg-table-dark border-primary-light" onChange={(e) => setVersion(parseInt(e.target.value))} />
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <div className="form-control w-full max-w-5xl">
                                                <label className="label">
                                                    <p className='text-base font-medium'>Start Date</p>
                                                </label>
                                                <div className="pb-2 w-full min-w-5xl" id="buttonInside">
                                                    <div className="">
                                                        <TableDatePicker />
                                                    </div>
                                                </div>

                                                <label className="label">
                                                    <p className='text-base font-medium'>End Date</p>
                                                </label>
                                                <div className="pb-2 w-full min-w-5xl" id="buttonInside">
                                                    <div className="">
                                                        <TableDatePicker />
                                                    </div>
                                                </div>
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
            <div className="h-full px-5 align-right">
                <Button onClick={showDialog} label="Delete GANTT"></Button>
            </div>
            <AddDialog />
        </>
    )
}
export default DeleteModalGantt;
