import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconDelete, IconSaveForm } from '../../Icons/icon';
import './AddModal.css'
import GetProfile from '../../Auth/GetProfile';
import { DELETE_GANTT } from '../../../Middleware/GraphQL/mutations';
import { useMutation } from "@apollo/client";
import { GET_GANTT_PROJECT_ID } from '../../GraphQL/Queries';
import { useParams } from 'react-router-dom';

const DeleteModalGantt = (props) => {
    const { ganttID, ganttName, total } = props;

    let { projectID } = useParams();

    const [isOpen, setIsOpen] = useState(false);

    const profile = GetProfile();

    const [deleteGantt, { data: deleteGanttData, error: deleteGanttError }] = useMutation(DELETE_GANTT, {
        refetchQueries: [
            {
                query: GET_GANTT_PROJECT_ID,
                variables: { project_id: projectID }
            },
        ],
        onCompleted: () => { console.log("refetchQueries deleteGantt Completed") }
    }
    );

    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

    const handleDelete = (e) => {
        e.preventDefault();

        deleteGantt({
            variables: {
                id: String(ganttID),
            },
        });

        if (deleteGanttError) {
            console.log(JSON.stringify(deleteGanttError, null, 2));
        }

        if (String(ganttID) === localStorage.getItem('ganttID')) {
            localStorage.removeItem('ganttID');
        }

        //to show toast when sucesss delete gantt
        var x = document.getElementById("snackbardel");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        hideDialog();
    };

    return (
        <>
            <button
                onClick={showDialog}
                className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white"
                id="icon"
            >
                <IconDelete />
            </button>
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
                                        Delete Gantt
                                    </Dialog.Title>
                                    <div className="mt-3">
                                        <div className="form-control w-full max-w-5xl text-center">
                                            <p className="label-text text-lg">Are you sure?</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="form-control w-full max-w-5xl text-center item-center">
                                            <p className="label-text text-lg">Delete Gantt: <span className="label-text font-bold text-error text-xl">{ganttName}</span></p>
                                        </div>
                                    </div>
                                    <div className="mt-10">
                                        <div className='flex justify-between px-56'>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-grey px-4 py-2 text-sm font-medium text-primary hover:bg-grey-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={hideDialog}
                                            >
                                                <IconSaveForm />
                                                <p className='text-base text-white pt-0.5 px-1'>cancel</p>
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-error px-4 py-2 text-sm font-medium text-primary hover:bg-error-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                value={ganttID}
                                                onClick={handleDelete}
                                            >
                                                <IconSaveForm />
                                                <p className='text-base text-white pt-0.5 px-1'>delete</p>
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
export default DeleteModalGantt;
