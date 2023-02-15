import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {IconPlus, IconSaveForm } from '../../Icons/icon';
import './AddModal.css'
import GetProfile from '../../Auth/GetProfile';
import { ADD_GANTT } from '../../../Middleware/GraphQL/mutations';
import { useMutation } from "@apollo/client";
import { DatePickerField, InputField } from '../../Input/Input';
import { GET_GANTT_PROJECT_ID } from '../../GraphQL/Queries';
import { useParams } from 'react-router-dom';


// note
//Kalo make localstorage, projectID mesti di trigger ke project dashboard dulu baru muncul
//Kalo static, aman

const AddModalGantt = () => {
    let { projectID } = useParams();
    
    const [isOpen, setIsOpen] = useState(false);

    const profile = GetProfile();
    // const [projectID, setProjectID] = useLocalStorage('projectID');

    const [addGantt, { data: addGanttData, error: addGanttError }] = useMutation(ADD_GANTT, {
        refetchQueries: [
            {
                query: GET_GANTT_PROJECT_ID,
                variables: { project_id: projectID }
            },
        ],
        onCompleted: () => { console.log("Berhasil Fetch") }
    });

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [user_id, setUserId] = useState(profile.id);
    const [version, setVersion] = useState(0);
    const [start_time, setStartTime] = useState(new Date());
    const [end_time, setEndTime] = useState(new Date());
    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

    const settingtUserProject = ({ value }) => {
        value(value);
    }

    const handleSave = (e) => {
        console.log("Handle Save", typeof start_time, start_time);
        e.preventDefault();

        addGantt({
            variables: {
                name,
                description,
                user_id: profile.id,
                version,
                project_id: parseInt(projectID),
                start_time,
                end_time
            },
        });

        if (addGanttError) {
            console.log(JSON.stringify(addGanttError, null, 2));
        }

        setUserId(profile.id);

        hideDialog();
    };

    const ganttList = [
        {
            label: "Name",
            name: "name",
            placeholder: "Example:  Gantt First Project",
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
        },
        {
            label: "Description",
            name: "descrtiption",
            placeholder: "Example:  Gantt for First Project",
            type: "text",
            value: description,
            onChange: (e) => setDescription(e.target.value),
        },
        {
            label: "Version",
            name: "version",
            placeholder: "Example:  1",
            type: "number",
            value: version,
            onChange: (e) => setVersion(parseInt(e.target.value)),
        },
    ]


    return (
        <>
            <button
                onClick={showDialog}
                className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white"
                id="icon"
            >
                <IconPlus />
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
                                        Create Gantt
                                    </Dialog.Title>
                                    <>
                                        {ganttList.map((item, index) => {
                                            return (
                                                <div className="mt-3">
                                                    <div className="form-control w-full max-w-5xl">
                                                        <label className="label">
                                                            <span className="label-text">{item.label}</span>
                                                        </label>
                                                        <InputField
                                                            key={index}
                                                            name={item.name}
                                                            placeholder={item.placeholder}
                                                            type={item.type}
                                                            value={item.value}
                                                            onChange={item.onChange}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>

                                    <div className="pb-2 w-full min-w-5xl" id="buttonInside">
                                        <div className="">
                                            <label className="label">
                                                <span className="label-text">Start Date</span>
                                            </label>
                                            <DatePickerField
                                                selected={start_time}
                                                onChange={(date) => setStartTime(date)}
                                                placeholder="DD/MM/YYYY"
                                            />
                                        </div>
                                    </div>

                                    <div className="pb-2 w-full min-w-5xl" id="buttonInside">
                                        <div className="">
                                            <label className="label">
                                                <span className="label-text">End Date</span>
                                            </label>
                                            <DatePickerField
                                                selected={end_time}
                                                onChange={(date) => setEndTime(date)}
                                                placeholder="DD/MM/YYYY"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-10">
                                        <div className='flex justify-end'>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={handleSave}
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
export default AddModalGantt;
